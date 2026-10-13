"""Immutable game state, text format and Position conversion (PRD §4 R3, R8.4, §5).

Design note
-----------
State is a frozen dataclass. Its position fields (board as a 25-tuple of
EMPTY/GOAT/TIGER, to_move, goats_in_hand, goats_captured, ply) define equality
and hash. Four bookkeeping fields are compare=False: `tigers` (sorted 4-tuple of
tiger points, kept in sync by rules.apply), `history` (repetition chain, see
State), `reps` (times this position has occurred) and `moves_cache` (filled
lazily by rules.legal_moves). rules.apply builds successors with the plain
constructor; everything in this module runs only at boundaries:

    initial_state, make_state, from_text, from_position, to_position,
    to_text, parse_board, validate                              O(25) each
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Optional, Tuple

from experiments.position import GOAT as POS_GOAT
from experiments.position import TIGER as POS_TIGER
from experiments.position import Position

from .board import EMPTY, GOAT, POINTS, SIZE, TIGER

NUM_TIGERS = 4
NUM_GOATS = 20
GOATS_TO_WIN = 5

_CHAR_TO_PIECE = {".": EMPTY, "G": GOAT, "T": TIGER}
_PIECE_TO_CHAR = {EMPTY: ".", GOAT: "G", TIGER: "T"}
_SIDE_NAMES = {"GOAT": GOAT, "G": GOAT, "TIGER": TIGER, "T": TIGER}
_SIDE_TO_POS = {GOAT: POS_GOAT, TIGER: POS_TIGER}


class BoardFormatError(ValueError):
    """Raised for malformed or inconsistent input, with one sentence saying what is wrong."""


@dataclass(frozen=True)
class State:
    """One game position plus the bookkeeping the rules need (§5: s = <B, h, k, p, H, n>).

    Repetition history (R8.4) is an immutable linked chain `(key, previous)`
    whose head is this state's own key, key = (board, to_move, goats_in_hand).
    It holds only the positions since the last irreversible move, because
    placements and captures reset it. That is exactly equivalent to keeping the
    full game history: a placement lowers goats_in_hand and nothing ever raises
    it again, and a capture permanently lowers the number of goats on the board,
    so no position from before an irreversible move can ever recur. `reps` is
    computed once by rules.apply, so the R8.4 test is O(1).
    """

    board: Tuple[int, ...]
    to_move: int
    goats_in_hand: int
    goats_captured: int
    ply: int = 0
    tigers: Tuple[int, ...] = field(default=(), compare=False, repr=False)
    history: Optional[tuple] = field(default=None, compare=False, repr=False)
    reps: int = field(default=1, compare=False, repr=False)
    moves_cache: Optional[tuple] = field(default=None, compare=False, repr=False)


# ---- construction (boundaries only) -----------------------------------------

def make_state(board, to_move, goats_in_hand: int, goats_captured: int, ply: int = 0) -> State:
    """Build and validate a state with an empty history (R8: a loaded position starts fresh)."""
    side = parse_side(to_move)
    for name, value in (("goats in hand", goats_in_hand), ("goats captured", goats_captured),
                        ("ply", ply)):
        if not isinstance(value, int) or isinstance(value, bool):
            raise BoardFormatError(f"The {name} must be a whole number, got {value!r}.")
    board = tuple(board)
    tigers = tuple(i for i, v in enumerate(board) if v == TIGER)
    state = State(board, side, goats_in_hand, goats_captured, ply,
                  tigers, ((board, side, goats_in_hand), None), 1, None)
    return validate(state)


def initial_state() -> State:
    """R3: tigers on (0,0), (0,4), (4,0), (4,4); h = 20, k = 0; goats move first."""
    board = [EMPTY] * POINTS
    for corner in (0, 4, 20, 24):
        board[corner] = TIGER
    return make_state(board, GOAT, NUM_GOATS, 0)


def parse_side(value) -> int:
    """Accept GOAT/TIGER (any case, or G/T) or the piece codes 1/2."""
    if value in (GOAT, TIGER) and not isinstance(value, bool):
        return value
    if isinstance(value, str) and value.strip().upper() in _SIDE_NAMES:
        return _SIDE_NAMES[value.strip().upper()]
    raise BoardFormatError(f"Side to move must be GOAT or TIGER, got {value!r}.")


def parse_board(text) -> Tuple[int, ...]:
    """Parse "T...T/...../...../...../T...T", five lines, or rows spaced like "T . . . T"."""
    if not isinstance(text, str):
        raise BoardFormatError(f"The board must be text, got {type(text).__name__}.")
    raw = text.split("/") if "/" in text else text.strip().splitlines()
    rows = ["".join(row.split()) for row in raw]
    if "/" not in text:
        rows = [row for row in rows if row]
    if len(rows) != SIZE:
        raise BoardFormatError(f"The board must have {SIZE} rows, got {len(rows)}.")
    board = []
    for r, row in enumerate(rows, start=1):
        if len(row) != SIZE:
            raise BoardFormatError(f"Board row {r} must have {SIZE} points, got {len(row)} ({row!r}).")
        for ch in row.upper():
            if ch not in _CHAR_TO_PIECE:
                raise BoardFormatError(f"Board row {r} has the character {ch!r}; use T, G or '.'.")
            board.append(_CHAR_TO_PIECE[ch])
    return tuple(board)


def from_text(text, to_move, goats_in_hand: int, goats_captured: int, ply: int = 0) -> State:
    """Build a validated state from the text board format."""
    return make_state(parse_board(text), to_move, goats_in_hand, goats_captured, ply)


def from_position(pos: Position) -> State:
    """experiments Position -> State, with ply 0 and an empty history."""
    return from_text("/".join(pos.board), pos.to_move, pos.goats_in_hand, pos.goats_captured)


# ---- output -----------------------------------------------------------------

def board_rows(state: State) -> Tuple[str, ...]:
    """The board as five strings of T, G and '.'."""
    chars = "".join(_PIECE_TO_CHAR[v] for v in state.board)
    return tuple(chars[r * SIZE:(r + 1) * SIZE] for r in range(SIZE))


def to_text(state: State, sep: str = "/") -> str:
    """The board in the text format, rows joined by `sep`."""
    return sep.join(board_rows(state))


def to_position(state: State) -> Position:
    """State -> experiments Position (history and ply are not part of a Position)."""
    return Position(board=board_rows(state), to_move=_SIDE_TO_POS[state.to_move],
                    goats_in_hand=state.goats_in_hand, goats_captured=state.goats_captured)


# ---- validation (boundaries only, never inside apply) -----------------------

def validate(state: State) -> State:
    """Check piece counts and field ranges; return the state, or raise BoardFormatError."""
    board = state.board
    if len(board) != POINTS or any(v not in (EMPTY, GOAT, TIGER) for v in board):
        raise BoardFormatError(f"The board must be {POINTS} points of EMPTY, GOAT or TIGER.")
    if state.to_move not in (GOAT, TIGER):
        raise BoardFormatError(f"Side to move must be GOAT or TIGER, got {state.to_move!r}.")
    tigers = board.count(TIGER)
    if tigers != NUM_TIGERS:
        raise BoardFormatError(f"There must be {NUM_TIGERS} tigers on the board, found {tigers}.")
    h, k = state.goats_in_hand, state.goats_captured
    if not 0 <= h <= NUM_GOATS:
        raise BoardFormatError(f"Goats in hand must be between 0 and {NUM_GOATS}, got {h}.")
    if not 0 <= k <= GOATS_TO_WIN:
        raise BoardFormatError(f"Goats captured must be between 0 and {GOATS_TO_WIN}, got {k}.")
    goats = board.count(GOAT)
    if goats + h + k != NUM_GOATS:
        raise BoardFormatError(
            f"Goats on board ({goats}) + in hand ({h}) + captured ({k}) = {goats + h + k}, "
            f"but must be {NUM_GOATS}.")
    if state.ply < 0:
        raise BoardFormatError(f"The ply count cannot be negative, got {state.ply}.")
    if state.tigers != tuple(i for i, v in enumerate(board) if v == TIGER):
        raise BoardFormatError("The tigers field does not match the tigers on the board.")
    return state
