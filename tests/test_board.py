"""Tests for baghchal.board: PRD §4 R1 (topology) and R2 (jump lemma)."""
from __future__ import annotations

from collections import Counter

from baghchal import board as B


def test_r1_index_helpers_round_trip():
    """R1: point index i = 5*row + col."""
    for i in range(25):
        r, c = B.to_rc(i)
        assert B.to_index(r, c) == i
    assert B.to_index(2, 3) == 13
    assert B.to_rc(13) == (2, 3)


def test_r1_thirteen_even_points():
    """R1: 13 points have (row + col) even."""
    assert sum(B.EVEN) == 13
    assert all(B.EVEN[i] == B.is_even(i) for i in range(25))
    assert B.is_even(0) and B.is_even(12) and not B.is_even(1)


def test_r1_fifty_six_edges():
    """R1: the board has 56 undirected edges, each listed once as (a, b), a < b."""
    assert len(B.EDGES) == 56
    assert all(a < b for a, b in B.EDGES)
    assert list(B.EDGES) == sorted(B.EDGES)
    assert sum(B.DEGREE) == 2 * 56


def test_r1_degree_histogram():
    """R1: degrees are 3 (12 points), 4 (4), 5 (4), 8 (5)."""
    assert Counter(B.DEGREE) == {3: 12, 4: 4, 5: 4, 8: 5}


def test_r1_degree_eight_points():
    """R1: the degree-8 points are (1,1), (1,3), (2,2), (3,1), (3,3) = 6, 8, 12, 16, 18."""
    assert [i for i in range(25) if B.DEGREE[i] == 8] == [6, 8, 12, 16, 18]


def test_r1_corner_and_centre_degree():
    """R1: corner (0,0) has degree 3; centre (2,2) has degree 8."""
    assert B.DEGREE[0] == 3
    assert B.DEGREE[12] == 8
    assert B.NEIGHBOURS[0] == (1, 5, 6)


def test_r1_neighbours_ascending_and_degree_consistent():
    """R1: NEIGHBOURS[x] is ascending and DEGREE[x] is its length."""
    for x in range(25):
        assert list(B.NEIGHBOURS[x]) == sorted(B.NEIGHBOURS[x])
        assert B.DEGREE[x] == len(B.NEIGHBOURS[x])
        assert x not in B.NEIGHBOURS[x]


def test_r1_adjacency_symmetric():
    """R1: y in N(x) iff x in N(y)."""
    for x in range(25):
        for y in B.NEIGHBOURS[x]:
            assert x in B.NEIGHBOURS[y]


def test_r1_no_diagonal_from_odd_point():
    """R1: a diagonal link exists only through points with (row + col) even."""
    for x in range(25):
        rx, cx = B.to_rc(x)
        for y in B.NEIGHBOURS[x]:
            ry, cy = B.to_rc(y)
            if rx != ry and cx != cy:
                assert B.EVEN[x] and B.EVEN[y]
    # (0,1) is odd: it has no diagonal neighbours.
    assert B.NEIGHBOURS[1] == (0, 2, 6)


def test_r1_edges_match_neighbours():
    """R1: EDGES is exactly the set of adjacent pairs."""
    pairs = [(x, y) for x in range(25) for y in B.NEIGHBOURS[x] if x < y]
    assert sorted(pairs) == list(B.EDGES)


def test_r2_eighty_jump_triples():
    """R2: 80 directed jump triples (x, over, land)."""
    assert len(B.JUMPS) == 80
    assert len(set(B.JUMPS)) == 80


def test_r2_jump_lemma_holds_for_every_triple():
    """R2: over is in N(x), land = 2*over - x is on the board and in N(over), on the same line."""
    for x, y, z in B.JUMPS:
        assert y in B.NEIGHBOURS[x]
        assert z in B.NEIGHBOURS[y]
        (rx, cx), (ry, cy), (rz, cz) = B.to_rc(x), B.to_rc(y), B.to_rc(z)
        assert (rz - ry, cz - cy) == (ry - rx, cy - cx)


def test_r2_every_on_board_line_is_a_jump():
    """R2: every neighbour pair whose continuation stays on the board yields a jump."""
    expected = []
    for x in range(25):
        rx, cx = B.to_rc(x)
        for y in B.NEIGHBOURS[x]:
            ry, cy = B.to_rc(y)
            rz, cz = 2 * ry - rx, 2 * cy - cx
            if 0 <= rz < 5 and 0 <= cz < 5:
                expected.append((x, y, B.to_index(rz, cz)))
    assert sorted(expected) == sorted(B.JUMPS)


def test_r10_tiger_targets_sorted_and_complete():
    """R7/R10: TIGER_TARGETS[x] lists every step (over = -1) and jump from x, sorted by `to`."""
    for x in range(25):
        targets = B.TIGER_TARGETS[x]
        assert [to for to, _ in targets] == sorted(to for to, _ in targets)
        steps = [to for to, over in targets if over == -1]
        jumps = [(x, over, to) for to, over in targets if over != -1]
        assert steps == list(B.NEIGHBOURS[x])
        assert sorted(jumps) == sorted(j for j in B.JUMPS if j[0] == x)
    assert B.TIGER_TARGETS[0] == ((1, -1), (2, 1), (5, -1), (6, -1), (10, 5), (12, 6))


def test_tables_are_tuples():
    """Tables are immutable tuples built once at import."""
    for table in (B.NEIGHBOURS, B.DEGREE, B.EVEN, B.EDGES, B.JUMPS, B.TIGER_TARGETS):
        assert isinstance(table, tuple)
    assert all(isinstance(row, tuple) for row in B.NEIGHBOURS)
    assert all(isinstance(row, tuple) for row in B.TIGER_TARGETS)
