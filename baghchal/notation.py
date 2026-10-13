"""Reading moves typed by a human, with a reason when they are illegal (PRD §6.6 play).

Design note
-----------
Accepted forms (points are indices 0-24, see `python -m baghchal rules`):
    "12" or "G@12"                 goat placement
    "7-12", "7 12", "G 7-12"       step (goat or tiger)
    "0-12", "T 0x6>12", "0>12"     tiger jump, by its from and landing points
parse_move returns the matching singleton Move from rules.legal_moves, or
raises IllegalMoveError with one sentence citing the rule that forbids it.
Boundary code only; O(25) per call.
"""
from __future__ import annotations

import re

from .board import EMPTY, GOAT, JUMPS, NEIGHBOURS, POINTS, TIGER
from .rules import Move, legal_moves
from .state import State

_JUMP_OVER = {(x, z): y for x, y, z in JUMPS}
_PIECE_NAME = {GOAT: "goat", TIGER: "tiger"}


class IllegalMoveError(ValueError):
    """A typed move that can't be read or isn't legal; the message says why."""


def _point(text: str) -> int:
    p = int(text)
    if not 0 <= p < POINTS:
        raise IllegalMoveError(f"Point {p} is off the board; points are 0-24.")
    return p


def parse_move(state: State, text: str) -> Move:
    """Return the legal Move that `text` describes, or raise IllegalMoveError with the reason."""
    raw = text.strip()
    cleaned = raw.upper()
    if cleaned[:1] in ("G", "T") and len(cleaned) > 1:
        cleaned = cleaned[1:]
    numbers = re.findall(r"\d+", cleaned)
    if not numbers or len(numbers) > 3 or re.search(r"[^\d\s@\-X>]", cleaned):
        raise IllegalMoveError(
            f"Could not read {raw!r}; type a point like 12 to place, or from-to like 7-12.")
    points = [_point(n) for n in numbers]
    board = state.board
    side = state.to_move

    if len(points) == 1:                                   # placement (R5)
        to = points[0]
        if side == TIGER:
            raise IllegalMoveError("Tigers can't place; move a tiger with from-to, e.g. 0-1.")
        if state.goats_in_hand == 0:
            raise IllegalMoveError("All goats are placed; move a goat with from-to (R6).")
        if board[to] != EMPTY:
            raise IllegalMoveError(f"Point {to} is occupied.")
        return _find(state, -1, to)

    frm, to = points[0], points[-1]                        # step or jump (R6, R7)
    if side == GOAT and state.goats_in_hand > 0:
        raise IllegalMoveError(
            f"Goats can't move until all are placed ({state.goats_in_hand} still in hand, R5).")
    if board[frm] != side:
        raise IllegalMoveError(f"Point {frm} has no {_PIECE_NAME[side]}.")
    if board[to] != EMPTY:
        raise IllegalMoveError(f"Point {to} is occupied.")
    if to in NEIGHBOURS[frm]:
        return _find(state, frm, to)
    over = _JUMP_OVER.get((frm, to))
    if side == GOAT:
        raise IllegalMoveError(f"Goats only step to an adjacent point, and {to} is not next to {frm} (R6).")
    if over is None:
        raise IllegalMoveError(f"Point {to} is not one step or one jump from {frm} (R1, R7).")
    if board[over] != GOAT:
        what = "empty" if board[over] == EMPTY else "a tiger"
        raise IllegalMoveError(f"A tiger can only jump over a goat; point {over} is {what} (R7).")
    return _find(state, frm, to)


def _find(state: State, frm: int, to: int) -> Move:
    for move in legal_moves(state):
        if move.frm == frm and move.to == to:
            return move
    raise IllegalMoveError("That move is not legal here.")
