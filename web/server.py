"""Local web UI for playing against the Bagh-Chal agent (not part of the graded core).

    python -m web.server [--port 8765] [--host 127.0.0.1]

Standard library only. The server is stateless: every request carries the
start position and the full move list, and the server replays them through
baghchal.rules. Replaying (at most MOVE_CAP moves) keeps the repetition
history exact (R8.4), makes undo trivial, and means the browser always shows
what the real engine computed, never a JavaScript copy of the rules.

Endpoints (JSON):
    GET  /api/topology   points with row, col, degree; the R1 edge list
    POST /api/state      {start?, moves} -> position, legal moves, result
    POST /api/search     {start?, moves, depth, algorithm, eval} -> move, score, nodes, ms, pv
"""
from __future__ import annotations

import argparse
import json
import sys
import time
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from baghchal import rules
from baghchal.adapter import Adapter
from baghchal.board import DEGREE, EDGES, EVEN, GOAT, POINTS, TIGER, to_rc
from baghchal.state import NUM_GOATS, BoardFormatError, State, initial_state, make_state, parse_board, parse_side
from experiments.engine_api import ALGORITHMS, ALPHABETA, BASELINE, DESIGNED, MINIMAX, SearchStats

STATIC = Path(__file__).resolve().parent / "static"
MAX_DEPTH = {ALPHABETA: 6, MINIMAX: 5}
SIDE = {GOAT: "GOAT", TIGER: "TIGER"}
KIND = {rules.K_PLACE: "place", rules.K_GOAT_STEP: "step", rules.K_TIGER_STEP: "step",
        rules.K_JUMP: "jump"}
ENGINE = Adapter()


class ApiError(ValueError):
    """A bad request; the message is shown to the user."""


# --- request -> state -----------------------------------------------------------

def start_state(start) -> State:
    """The game's start position: the standard start, or a typed position (fresh history)."""
    if not start:
        return initial_state()
    if not isinstance(start, dict):
        raise ApiError("start must be an object with board, to_move, in_hand and captured.")
    try:
        board = parse_board(start.get("board"))
        captured = int(start.get("captured", 0) or 0)
        in_hand = start.get("in_hand")
        in_hand = NUM_GOATS - board.count(GOAT) - captured if in_hand in (None, "") else int(in_hand)
        return make_state(board, parse_side(start.get("to_move")), in_hand, captured)
    except (TypeError, ValueError) as exc:
        raise ApiError(str(exc)) from None


def replay(payload) -> State:
    """Start position plus every move, each checked against the legal moves."""
    state = start_state(payload.get("start"))
    moves = payload.get("moves") or []
    if not isinstance(moves, list):
        raise ApiError("moves must be a list of move names such as \"G@12\".")
    for i, name in enumerate(moves, start=1):
        if rules.is_terminal(state):
            raise ApiError(f"Move {i} ({name}) was played after the game had ended.")
        move = next((m for m in rules.legal_moves(state) if str(m) == name), None)
        if move is None:
            raise ApiError(f"Move {i} ({name}) is not legal in that position.")
        state = rules.apply(state, move)
    return state


# --- state -> JSON --------------------------------------------------------------------

def result_text(state: State) -> str:
    """Why the game ended, in R8's order."""
    if state.goats_captured >= 5:
        return "Tigers captured five goats."
    if state.to_move == TIGER and not rules.legal_moves(state):
        return "Goats trapped every tiger."
    if state.to_move == GOAT and not state.goats_in_hand and not rules.legal_moves(state):
        return "Goats have no legal move."
    if state.reps >= 3:
        return "Draw by threefold repetition."
    return f"Draw: the {rules.MOVE_CAP}-ply limit was reached."


def move_json(move) -> dict:
    return {"text": str(move), "kind": KIND[move.kind], "from": move.frm,
            "over": move.over, "to": move.to}


def state_json(state: State) -> dict:
    terminal = rules.is_terminal(state)
    winner = rules.winner(state) if terminal else None
    return {
        "board": list(state.board),
        "to_move": SIDE[state.to_move],
        "in_hand": state.goats_in_hand,
        "captured": state.goats_captured,
        "ply": state.ply,
        "reps": state.reps,
        "legal": [] if terminal else [move_json(m) for m in rules.legal_moves(state)],
        "terminal": terminal,
        "winner": SIDE.get(winner) if terminal else None,
        "result": result_text(state) if terminal else None,
    }


def topology_json() -> dict:
    return {
        "points": [{"i": i, "row": to_rc(i)[0], "col": to_rc(i)[1], "degree": DEGREE[i],
                    "even": EVEN[i]} for i in range(POINTS)],
        "edges": [list(e) for e in EDGES],
    }


# --- endpoints ------------------------------------------------------------------------

def api_state(payload: dict) -> dict:
    return state_json(replay(payload))


def api_search(payload: dict) -> dict:
    state = replay(payload)
    if rules.is_terminal(state):
        raise ApiError("The game is over; there is no move to search for.")
    algorithm = payload.get("algorithm", ALPHABETA)
    evaluator = payload.get("eval", DESIGNED)
    if algorithm not in ALGORITHMS:
        raise ApiError(f"algorithm must be one of {', '.join(ALGORITHMS)}.")
    if evaluator not in (DESIGNED, BASELINE):
        raise ApiError("eval must be designed or baseline.")
    try:
        depth = int(payload.get("depth", 3))
    except (TypeError, ValueError):
        raise ApiError("depth must be a whole number.") from None
    if not 1 <= depth <= MAX_DEPTH[algorithm]:
        raise ApiError(f"depth for {algorithm} must be between 1 and {MAX_DEPTH[algorithm]}.")
    stats = SearchStats()
    t0 = time.perf_counter()
    result = ENGINE.search(state, depth, algorithm, evaluator, stats)
    ms = (time.perf_counter() - t0) * 1000
    return {
        "move": str(result.move),
        "score": result.score,
        "nodes": stats.nodes,
        "evals": stats.evals,
        "time_ms": round(ms, 2),
        "pv": [str(m) for m in (result.pv or [result.move])],
        "depth": depth,
        "algorithm": algorithm,
        "eval": evaluator,
        "side": SIDE[state.to_move],
    }


ROUTES = {"/api/state": api_state, "/api/search": api_search}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(STATIC), **kwargs)

    def log_message(self, fmt, *args):  # keep the terminal quiet except for errors
        if not str(args[1] if len(args) > 1 else "").startswith(("2", "3")):
            super().log_message(fmt, *args)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _json(self, status, body):
        data = json.dumps(body).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path == "/api/topology":
            return self._json(HTTPStatus.OK, topology_json())
        return super().do_GET()

    def do_POST(self):
        route = ROUTES.get(self.path)
        if route is None:
            return self._json(HTTPStatus.NOT_FOUND, {"error": f"No endpoint {self.path}."})
        try:
            length = int(self.headers.get("Content-Length") or 0)
            payload = json.loads(self.rfile.read(length) or b"{}")
            if not isinstance(payload, dict):
                raise ApiError("The request body must be a JSON object.")
            return self._json(HTTPStatus.OK, route(payload))
        except json.JSONDecodeError:
            return self._json(HTTPStatus.BAD_REQUEST, {"error": "The request body is not valid JSON."})
        except (ApiError, BoardFormatError) as exc:
            return self._json(HTTPStatus.BAD_REQUEST, {"error": str(exc)})


def make_server(host: str = "127.0.0.1", port: int = 8765) -> ThreadingHTTPServer:
    return ThreadingHTTPServer((host, port), Handler)


def main(argv=None) -> int:
    p = argparse.ArgumentParser(prog="python -m web.server")
    p.add_argument("--host", default="127.0.0.1")
    p.add_argument("--port", type=int, default=8765)
    a = p.parse_args(argv)
    if not (STATIC / "app.js").exists():
        print("web/static/app.js is missing; build it with: cd web/frontend && npm install && npm run build",
              file=sys.stderr)
        return 1
    server = make_server(a.host, a.port)
    print(f"Bagh-Chal UI on http://{a.host}:{server.server_address[1]}  (Ctrl+C to stop)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    return 0


if __name__ == "__main__":
    sys.exit(main())
