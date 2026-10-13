"""Command-line demo: python -m baghchal {analyse, play, selfplay, rules} (PRD §6.6).

Design note
-----------
Every command parses and validates its input at the boundary (state.py,
notation.py), then calls the same Adapter the experiments use, so the demo and
E1/E2 exercise identical code. Bad input of any kind prints one line,
"error: ...", to stderr and exits 1; there are no tracebacks for user errors.
This is the only module that prints.
"""
from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path
from typing import List, Optional

from experiments.engine_api import ALGORITHMS, ALPHABETA, BASELINE, DESIGNED, SearchStats

from .adapter import Adapter
from .board import DEGREE, EDGES, GOAT, JUMPS, SIZE, TIGER
from .notation import IllegalMoveError, parse_move
from .rules import WIN, is_terminal, legal_moves, winner
from .state import NUM_GOATS, BoardFormatError, State, board_rows, make_state, parse_board, parse_side

SIDE_NAME = {GOAT: "GOAT", TIGER: "TIGER"}


class UsageError(Exception):
    """Bad command-line usage; reported as a one-line error."""


class _Parser(argparse.ArgumentParser):
    def error(self, message):  # argparse would print usage and exit 2
        raise UsageError(message)


# --- formatting --------------------------------------------------------------

def format_board(state: State) -> str:
    """The board with the position details alongside."""
    info = [
        f"Side to move  : {SIDE_NAME[state.to_move]}",
        f"Goats in hand : {state.goats_in_hand}",
        f"Goats captured: {state.goats_captured}",
        f"Phase         : {'placement' if state.goats_in_hand else 'movement'}",
        "",
    ]
    rows = [" ".join(row) for row in board_rows(state)]
    return "\n".join(f"  {rows[i]:<12}{info[i]}" for i in range(SIZE))


def format_score(score: float) -> str:
    """Score from the tiger's side; forced wins are spelled out (R9)."""
    text = f"{score:,.0f}" if float(score).is_integer() else f"{score:,.2f}"
    if abs(score) > WIN // 2:
        plies = int(WIN - abs(score))
        side = "tigers" if score > 0 else "goats"
        text += f"  ({side} win in {plies} ply{'' if plies == 1 else 's'})"
    return text


def format_result(state: State) -> str:
    result = winner(state)
    if result is None:
        why = "threefold repetition" if state.reps >= 3 else "move cap"
        return f"Game over: draw ({why})."
    return f"Game over: {'tigers' if result == TIGER else 'goats'} win."


# --- input -------------------------------------------------------------------

def _positive_depth(depth: int) -> int:
    if depth < 1:
        raise UsageError(f"--depth must be at least 1, got {depth}")
    return depth


def state_from_args(a) -> State:
    """Build the analysed position from --board/--file and the side and count flags."""
    if a.board is None and a.file is None:
        raise UsageError("give the position with --board \"T...T/...\" or --file pos.txt")
    if a.file is not None:
        try:
            text = Path(a.file).read_text()
        except OSError as exc:
            raise UsageError(f"cannot read {a.file}: {exc.strerror or exc}") from None
    else:
        text = a.board
    board = parse_board(text)
    side = parse_side(a.to_move)
    in_hand = a.in_hand
    if in_hand is None:
        in_hand = NUM_GOATS - board.count(GOAT) - a.captured
    return make_state(board, side, in_hand, a.captured)


def _search(engine: Adapter, state: State, depth: int, algorithm: str, evaluator: str):
    stats = SearchStats()
    t0 = time.perf_counter()
    result = engine.search(state, depth, algorithm, evaluator, stats)
    return result, stats, (time.perf_counter() - t0) * 1000


# --- commands ----------------------------------------------------------------

def cmd_analyse(a) -> int:
    state = state_from_args(a)
    depth = _positive_depth(a.depth)
    print(format_board(state))
    print()
    if is_terminal(state):
        print(format_result(state))
        return 0
    result, stats, ms = _search(Adapter(), state, depth, a.algorithm, a.eval)
    print(f"Search        : {a.algorithm}, depth {depth}, {a.eval} evaluation")
    print(f"Move          : {result.move}")
    print(f"Score         : {format_score(result.score)}")
    print(f"Nodes expanded: {stats.nodes:,}")
    print(f"Time          : {ms:,.1f} ms")
    print("Principal variation:")
    for i, move in enumerate(result.pv or [result.move], start=1):
        print(f"  {i}. {move}")
    return 0


def cmd_play(a) -> int:
    engine = Adapter()
    human = parse_side(a.human)
    _positive_depth(a.depth)
    state = engine.initial_state()
    print(f"You play {SIDE_NAME[human]}. Type a point (12) to place, from-to (7-12) to move,")
    print("'moves' to list legal moves, or 'quit'. Run `python -m baghchal rules` for point numbers.")
    while not is_terminal(state):
        print()
        print(format_board(state))
        if state.to_move == human:
            try:
                text = input("Your move: ")
            except EOFError:
                print()
                return 0
            print()
            command = text.strip().lower()
            if command in ("quit", "q", "exit"):
                return 0
            if command in ("moves", "?", "help"):
                print("Legal moves: " + ", ".join(str(m) for m in legal_moves(state)))
                continue
            try:
                move = parse_move(state, text)
            except IllegalMoveError as exc:
                print(f"Illegal: {exc}")
                continue
            print(f"You play {move}")
        else:
            result, stats, ms = _search(engine, state, a.depth, a.algorithm, a.eval)
            move = result.move
            print(f"Agent plays {move}   score {format_score(result.score)}, "
                  f"{stats.nodes:,} nodes, {ms:,.0f} ms")
        state = engine.apply(state, move)
    print()
    print(format_board(state))
    print(format_result(state))
    return 0


def cmd_selfplay(a) -> int:
    engine = Adapter()
    _positive_depth(a.depth)
    evals = {TIGER: a.tiger_eval, GOAT: a.goat_eval}
    state = engine.initial_state()
    print(f"Self-play: {a.algorithm}, depth {a.depth}; tiger uses {a.tiger_eval}, "
          f"goat uses {a.goat_eval}")
    while not is_terminal(state):
        result, stats, ms = _search(engine, state, a.depth, a.algorithm, evals[state.to_move])
        print(f"{state.ply + 1:4}. {str(result.move):<12} score {format_score(result.score):<28} "
              f"{stats.nodes:>9,} nodes {ms:>8,.0f} ms")
        state = engine.apply(state, result.move)
    print()
    print(format_board(state))
    print(format_result(state))
    return 0


def cmd_rules(a) -> int:
    print("Point indices (index = 5*row + col)      Degree of each point (R1)")
    for r in range(SIZE):
        idx = " ".join(f"{5 * r + c:2}" for c in range(SIZE))
        deg = " ".join(f"{DEGREE[5 * r + c]:2}" for c in range(SIZE))
        print(f"  {idx:<40}{deg}")
    print()
    print(f"{len(EDGES)} edges, {len(JUMPS)} jump lines. Diagonals run only through points")
    print("where row + col is even. Goats place first (20 in hand), then step; tigers")
    print("step or jump one goat per move. Tigers win at 5 captures; goats win by trapping.")
    return 0


# --- entry point -------------------------------------------------------------

def build_parser() -> argparse.ArgumentParser:
    p = _Parser(prog="python -m baghchal", description="Bagh-Chal agent: minimax and alpha-beta.")
    sub = p.add_subparsers(dest="command", parser_class=_Parser)

    def search_flags(sp, depth):
        sp.add_argument("--depth", type=int, default=depth, help=f"plies to search (default {depth})")
        sp.add_argument("--algorithm", choices=ALGORITHMS, default=ALPHABETA)

    an = sub.add_parser("analyse", help="best move, score, nodes, time and PV for a position")
    an.add_argument("--board", help='rows joined by "/", e.g. "T...T/...../...../...../T...T"')
    an.add_argument("--file", help="text file with the five board rows")
    an.add_argument("--to-move", required=True, help="GOAT or TIGER")
    an.add_argument("--in-hand", type=int, default=None,
                    help="goats in hand (default: 20 - goats on board - captured)")
    an.add_argument("--captured", type=int, default=0, help="goats captured (default 0)")
    search_flags(an, 4)
    an.add_argument("--eval", choices=(DESIGNED, BASELINE), default=DESIGNED)
    an.set_defaults(func=cmd_analyse)

    pl = sub.add_parser("play", help="play against the agent in the terminal")
    pl.add_argument("--human", required=True, help="the side you play: GOAT or TIGER")
    search_flags(pl, 3)
    pl.add_argument("--eval", choices=(DESIGNED, BASELINE), default=DESIGNED)
    pl.set_defaults(func=cmd_play)

    sp = sub.add_parser("selfplay", help="agent against itself, printing each move")
    search_flags(sp, 3)
    sp.add_argument("--tiger-eval", choices=(DESIGNED, BASELINE), default=DESIGNED)
    sp.add_argument("--goat-eval", choices=(DESIGNED, BASELINE), default=DESIGNED)
    sp.set_defaults(func=cmd_selfplay)

    ru = sub.add_parser("rules", help="board with point indices and degrees")
    ru.set_defaults(func=cmd_rules)
    return p


def main(argv: Optional[List[str]] = None) -> int:
    parser = build_parser()
    try:
        args = parser.parse_args(argv)
        if not getattr(args, "func", None):
            raise UsageError("choose a command: analyse, play, selfplay or rules (see --help)")
        return args.func(args)
    except (UsageError, BoardFormatError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        print(file=sys.stderr)
        return 130


if __name__ == "__main__":
    sys.exit(main())
