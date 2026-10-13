"""Legal moves, apply, terminal test and utility: PRD §4 R4–R11.

Design note
-----------
Moves are singleton Move objects built once at import: PLACE[x],
GOAT_STEP[x][y], TIGER_STEP[x][y] and JUMP[x][over]. Goat and tiger steps are
separate tables because a move prints its side ("G 7-12" vs "T 0-1").
Generation returns these existing objects and allocates only the result tuple.
Complexity (h = goats in hand, g = goats on board, L = plies since the last
placement or capture, L <= MOVE_CAP):

    legal_moves  placement O(25); goat movement O(25 + 8g); tiger O(4 x 8),
                 iterating state.tigers, no board scan. Memoised on the state.
    apply        O(25) to copy the board, + O(L) for steps (repetition count)
    outcome, is_terminal, winner, utility   O(1) after the memoised legal_moves

The hot path uses no copying helpers, sorting, per-call sets/dicts, string
building, recursion or exceptions, and never re-validates a state.
"""
from __future__ import annotations

from typing import Optional, Tuple

from .board import EMPTY, GOAT, NEIGHBOURS, POINTS, TIGER, TIGER_TARGETS
from .state import GOATS_TO_WIN, State

MOVE_CAP = 200          # R8.5
WIN = 1_000_000         # R9
DRAW = 3                # outcome() code for a draw (distinct from the piece codes)

K_PLACE = 0
K_GOAT_STEP = 1
K_TIGER_STEP = 2
K_JUMP = 3


class Move:
    """One move. `over` is the jumped point for a JUMP and -1 otherwise; `frm` is -1 for PLACE."""

    __slots__ = ("kind", "frm", "over", "to")

    def __init__(self, kind: int, frm: int, over: int, to: int) -> None:
        self.kind = kind
        self.frm = frm
        self.over = over
        self.to = to

    def __str__(self) -> str:
        if self.kind == K_PLACE:
            return f"G@{self.to}"
        if self.kind == K_GOAT_STEP:
            return f"G {self.frm}-{self.to}"
        if self.kind == K_TIGER_STEP:
            return f"T {self.frm}-{self.to}"
        return f"T {self.frm}x{self.over}>{self.to}"

    __repr__ = __str__


def _step_table(kind: int) -> tuple:
    return tuple(tuple(Move(kind, x, -1, y) if y in NEIGHBOURS[x] else None
                       for y in range(POINTS)) for x in range(POINTS))


PLACE = tuple(Move(K_PLACE, -1, -1, x) for x in range(POINTS))
GOAT_STEP = _step_table(K_GOAT_STEP)
TIGER_STEP = _step_table(K_TIGER_STEP)
JUMP = tuple(
    tuple(next((Move(K_JUMP, x, y, to) for to, over in TIGER_TARGETS[x] if over == y), None)
          for y in range(POINTS))
    for x in range(POINTS)
)

# Per-point candidate lists, so generation is a flat loop over precomputed tuples.
_GOAT_STEPS = tuple(tuple((y, GOAT_STEP[x][y]) for y in NEIGHBOURS[x]) for x in range(POINTS))
_TIGER_CANDIDATES = tuple(
    tuple((to, over, TIGER_STEP[x][to] if over < 0 else JUMP[x][over])
          for to, over in TIGER_TARGETS[x])
    for x in range(POINTS)
)

_set = object.__setattr__


def generate_moves(state: State) -> Tuple[Move, ...]:
    """R5–R7 legal moves for the side to move, in R10 order. Not memoised; see legal_moves."""
    board = state.board
    if state.to_move == TIGER:
        # R7, R10: tigers ascending, then TIGER_TARGETS order (steps and jumps by `to`).
        out = []
        append = out.append
        for t in state.tigers:
            for to, over, move in _TIGER_CANDIDATES[t]:
                if board[to] == EMPTY and (over < 0 or board[over] == GOAT):
                    append(move)
        return tuple(out)
    if state.goats_in_hand:
        # R5: place on any empty point, ascending.
        return tuple([p for p, v in zip(PLACE, board) if v == EMPTY])
    # R6: step a goat to an adjacent empty point, by (from, to).
    out = []
    append = out.append
    for x in range(POINTS):
        if board[x] == GOAT:
            for y, move in _GOAT_STEPS[x]:
                if board[y] == EMPTY:
                    append(move)
    return tuple(out)


def legal_moves(state: State) -> Tuple[Move, ...]:
    """R5–R7 in R10 order, memoised on the state (the state stays observably immutable)."""
    moves = state.moves_cache
    if moves is None:
        moves = generate_moves(state)
        _set(state, "moves_cache", moves)
    return moves


def apply(state: State, move: Move) -> State:
    """RESULT(s, a): a new state; `state` is never mutated. `move` must come from legal_moves(state).

    Repetition (R8.4): placements and captures are irreversible, so they restart
    the history chain with just the new position (see State for why that equals
    the full history). After a step, reps = 1 + the number of earlier positions
    in the chain with the same key; only every second link can match, because
    the side to move alternates, so the walk skips the others.
    """
    board = list(state.board)
    kind = move.kind
    to = move.to
    h = state.goats_in_hand
    k = state.goats_captured
    tigers = state.tigers
    if kind == K_PLACE:                       # R5
        board[to] = GOAT
        h -= 1
        side = TIGER
        irreversible = True
    elif kind == K_GOAT_STEP:                 # R6
        board[move.frm] = EMPTY
        board[to] = GOAT
        side = TIGER
        irreversible = False
    else:                                     # R7
        frm = move.frm
        board[frm] = EMPTY
        board[to] = TIGER
        if kind == K_JUMP:
            board[move.over] = EMPTY
            k += 1
            irreversible = True
        else:
            irreversible = False
        side = GOAT
        # Replace frm by `to` in the sorted 4-tuple without sorting.
        rest = [t for t in tigers if t != frm]
        if to < rest[0]:
            tigers = (to, rest[0], rest[1], rest[2])
        elif to < rest[1]:
            tigers = (rest[0], to, rest[1], rest[2])
        elif to < rest[2]:
            tigers = (rest[0], rest[1], to, rest[2])
        else:
            tigers = (rest[0], rest[1], rest[2], to)
    new_board = tuple(board)
    key = (new_board, side, h)
    if irreversible:
        history = (key, None)
        reps = 1
    else:
        history = (key, state.history)
        reps = 1
        link = state.history[1]               # grandparent: same side to move as the new state
        while link is not None:
            if link[0] == key:
                reps += 1
            link = link[1]
            if link is None:
                break
            link = link[1]
    return State(new_board, side, h, k, state.ply + 1, tigers, history, reps, None)


def outcome(state: State) -> Optional[int]:
    """R8 in the stated order: TIGER or GOAT for a win, DRAW, or None if not terminal."""
    if state.goats_captured >= GOATS_TO_WIN:                       # R8.1
        return TIGER
    if state.to_move == TIGER:
        if not legal_moves(state):                                 # R8.2
            return GOAT
    # R8.3. During placement the goat always has a move: empty points =
    # 25 - 4 tigers - (20 - h - k) goats on board = 1 + h + k >= 2 when h >= 1.
    elif not state.goats_in_hand and not legal_moves(state):
        return TIGER
    if state.reps >= 3:                                            # R8.4
        return DRAW
    if state.ply >= MOVE_CAP:                                      # R8.5
        return DRAW
    return None


def is_terminal(state: State) -> bool:
    """R8 terminal test."""
    return outcome(state) is not None


def winner(state: State) -> Optional[int]:
    """TIGER or GOAT, or None for a draw. Raises ValueError on a non-terminal state."""
    result = outcome(state)
    if result is None:
        raise ValueError("winner() called on a non-terminal state")
    return None if result == DRAW else result


def utility(state: State, ply_from_root: int) -> int:
    """R9: +WIN - d for a tiger win, -WIN + d for a goat win, 0 for a draw (terminal states only)."""
    result = outcome(state)
    if result == TIGER:
        return WIN - ply_from_root
    if result == GOAT:
        return -WIN + ply_from_root
    if result == DRAW:
        return 0
    raise ValueError("utility() called on a non-terminal state")
