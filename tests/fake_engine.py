"""
A TEST DOUBLE for the engine interface -- not Bagh-Chal, and not a search.

It exists only so the experiment framework can be tested before the real
engine is plugged in. It follows the Position bookkeeping (4 tigers, 20 goats
accounted for) but its "rules" are deliberately toy rules, and search() does
not search: it returns a canned move and writes plausible node counts.

    goat, placement : place on any empty point
    goat, movement  : move any goat to the next empty point after it
    tiger           : 'step' (no board change) always; 'cap' (remove a goat)
                      only on plies 9, 19, 29, ...
    end             : 5 captures (tiger win) or 60 plies (draw)
"""
from __future__ import annotations

from dataclasses import dataclass, replace

from experiments.engine_api import ALPHABETA, DESIGNED, SearchResult, SearchStats
from experiments.position import GOAT, TIGER, Position, initial_position

MAX_PLIES = 60


@dataclass(frozen=True)
class FakeState:
    pos: Position
    ply: int = 0


def _cells(board):
    return [(r, c) for r in range(5) for c in range(5)]


def _set(board, r, c, ch):
    rows = [list(row) for row in board]
    rows[r][c] = ch
    return tuple("".join(row) for row in rows)


class FakeEngine:
    def __init__(self, mutate=False, bad_ab=False, nondeterministic=False):
        self.mutate = mutate                    # flags used to test that check-engine catches bugs
        self.bad_ab = bad_ab
        self.nondeterministic = nondeterministic
        self._calls = 0

    # conversion
    def from_position(self, pos):
        return FakeState(pos)

    def to_position(self, state):
        return replace(state.pos, id="", note="")

    # stepping
    def initial_state(self):
        return FakeState(replace(initial_position(), id=""))

    def legal_moves(self, s):
        p, b = s.pos, s.pos.board
        if p.to_move == GOAT:
            if p.goats_in_hand > 0:
                return [f"P{r}{c}" for r, c in _cells(b) if b[r][c] == "."]
            moves = []
            empties = [(r, c) for r, c in _cells(b) if b[r][c] == "."]
            for r, c in _cells(b):
                if b[r][c] == "G":
                    after = [e for e in empties if e > (r, c)] or empties
                    if after:
                        moves.append(f"M{r}{c}{after[0][0]}{after[0][1]}")
            return moves
        moves = ["step"]
        if s.ply % 10 == 9 and p.goats_on_board > 0:
            moves.append("cap")
        return moves

    def apply(self, s, m):
        p = s.pos
        board, hand, capt = p.board, p.goats_in_hand, p.goats_captured
        if m.startswith("P"):
            board, hand = _set(board, int(m[1]), int(m[2]), "G"), hand - 1
        elif m.startswith("M"):
            board = _set(_set(board, int(m[1]), int(m[2]), "."), int(m[3]), int(m[4]), "G")
        elif m == "cap":
            r, c = next((r, c) for r, c in _cells(board) if board[r][c] == "G")
            board, capt = _set(board, r, c, "."), capt + 1
        new = FakeState(replace(p, board=board, goats_in_hand=hand, goats_captured=capt,
                                to_move=GOAT if p.to_move == TIGER else TIGER), s.ply + 1)
        if self.mutate:
            object.__setattr__(s, "pos", new.pos)   # simulate an engine that mutates in place
        return new

    def is_terminal(self, s):
        return s.pos.goats_captured >= 5 or s.ply >= MAX_PLIES or not self.legal_moves(s)

    def winner(self, s):
        if s.pos.goats_captured >= 5:
            return TIGER
        return None

    # "search" -- canned, no tree
    def search(self, s, depth, algorithm, evaluator, stats: SearchStats):
        moves = self.legal_moves(s)
        b = max(1, len(moves))
        full = sum(b ** i for i in range(depth + 1))
        stats.nodes += full if algorithm != ALPHABETA else max(1 + b, int(full ** 0.6))
        if self.nondeterministic:
            self._calls += 1
            stats.nodes += self._calls
        stats.evals += b ** depth
        if s.pos.to_move == TIGER:
            move = "cap" if (evaluator == DESIGNED and "cap" in moves) else moves[0]
        else:
            move = moves[0]
        score = 10.0 * s.pos.goats_captured - 0.1 * s.pos.goats_on_board + depth
        if self.bad_ab and algorithm == ALPHABETA:
            score += 1.0
        return SearchResult(move=move, score=score)
