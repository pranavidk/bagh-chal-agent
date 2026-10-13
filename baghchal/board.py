"""Board topology: PRD §4 R1 (adjacency) and R2 (jump lemma).

Design note
-----------
Points are ints 0..24, index = 5*row + col; piece codes EMPTY=0, GOAT=1, TIGER=2.
Every table below is generated ONCE at import from the R1 rule (never typed in
by hand) and stored as tuples (of tuples), so lookups in the hot path are a
single C-level index:

    NEIGHBOURS[x]     ascending neighbours of x                   O(1) lookup
    DEGREE[x]         len(NEIGHBOURS[x])                          O(1)
    EVEN[x]           True if row + col is even                   O(1)
    EDGES             sorted (a, b) pairs, a < b (56 of them)     O(1)
    JUMPS             all (x, over, land) triples (80 of them)    O(1)
    TIGER_TARGETS[x]  (to, over) for every step (over = -1) and jump from x,
                      sorted by `to`, which is R10's interleaved order.

Generation is O(25 * 25) once; nothing here runs during play.
"""
from __future__ import annotations

from typing import Tuple

SIZE = 5
POINTS = SIZE * SIZE

EMPTY = 0
GOAT = 1
TIGER = 2


def to_index(r: int, c: int) -> int:
    """R1: point index i = 5*row + col."""
    return SIZE * r + c


def to_rc(i: int) -> Tuple[int, int]:
    """R1: (row, col) of point i."""
    return divmod(i, SIZE)


def is_even(i: int) -> bool:
    """R1: True if (row + col) is even, i.e. the point carries diagonals."""
    r, c = divmod(i, SIZE)
    return (r + c) % 2 == 0


def _on_board(r: int, c: int) -> bool:
    return 0 <= r < SIZE and 0 <= c < SIZE


def _adjacent(x: int, y: int) -> bool:
    """R1: differ by at most 1 in each coordinate; a diagonal needs (r + c) even at x."""
    (rx, cx), (ry, cy) = to_rc(x), to_rc(y)
    if x == y or abs(rx - ry) > 1 or abs(cx - cy) > 1:
        return False
    if rx != ry and cx != cy:
        return (rx + cx) % 2 == 0
    return True


def _build_jumps(neighbours) -> tuple:
    """R2: (x, over, land) for every neighbour `over` of x with land = 2*over - x on the board.

    Built from the coordinates alone; the lemma (land is in N(over), on the same
    line) is checked by the tests rather than assumed here.
    """
    jumps = []
    for x in range(POINTS):
        rx, cx = to_rc(x)
        for y in neighbours[x]:
            ry, cy = to_rc(y)
            rz, cz = 2 * ry - rx, 2 * cy - cx
            if _on_board(rz, cz):
                jumps.append((x, y, to_index(rz, cz)))
    return tuple(jumps)


NEIGHBOURS = tuple(
    tuple(y for y in range(POINTS) if _adjacent(x, y)) for x in range(POINTS)
)
DEGREE = tuple(len(n) for n in NEIGHBOURS)
EVEN = tuple(is_even(i) for i in range(POINTS))
EDGES = tuple((x, y) for x in range(POINTS) for y in NEIGHBOURS[x] if x < y)
JUMPS = _build_jumps(NEIGHBOURS)

# R7 + R10: every candidate tiger move from x, as (to, over) with over = -1 for a
# step, sorted by `to` so steps and jumps come out interleaved by (from, to).
TIGER_TARGETS = tuple(
    tuple(sorted([(y, -1) for y in NEIGHBOURS[x]]
                 + [(z, y) for (f, y, z) in JUMPS if f == x]))
    for x in range(POINTS)
)
