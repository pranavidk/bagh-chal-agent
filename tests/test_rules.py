"""Tests for baghchal.rules and baghchal.game: PRD §4 R3, R5–R11 and the §6.2 protocol."""
from __future__ import annotations

import random

import pytest

from baghchal import rules
from baghchal.board import EMPTY, GOAT, TIGER
from baghchal.game import BaghChalGame
from baghchal.rules import (DRAW, MOVE_CAP, apply, generate_moves, is_terminal,
                            legal_moves, outcome, utility, winner)
from baghchal.state import from_text, initial_state

# --- hand-built boards (rows top to bottom, index = 5*row + col) -------------

# Tigers 0, 12, 20, 24; goats 1, 5, 6, 13. Interleaves steps and jumps (R10).
TIGER_ORDER = "TG.../GG.../..TG./...../T...T"
# h = 0, k = 4: 16 goats, empties 12, 16, 17, 18, 23.
MOVEMENT = "TGGGT/GGGGG/GG.GG/G...G/TGG.T"
# Tigers 0, 1, 5, 6 boxed in by goats 2, 3, 7, 8, 10, 11, 12, 15, 16, 18.
TRAPPED = "TTGG./TTGG./GGG../GG.G./....."
# Only empty point is 0, whose neighbours 1, 5, 6 are tigers; 20 goats fill the rest.
GOATS_BLOCKED = ".TGGG/TTGGG/GGGGG/GGGGG/GGGGT"


def names(moves):
    return [str(m) for m in moves]


def play(state, *move_names):
    """Apply moves given by their printed names; fails if a name is not legal."""
    for name in move_names:
        by_name = {str(m): m for m in legal_moves(state)}
        assert name in by_name, f"{name} not legal; legal: {sorted(by_name)}"
        state = apply(state, by_name[name])
    return state


def chain_length(state):
    n, link = 0, state.history
    while link is not None:
        n, link = n + 1, link[1]
    return n


def perft(state, depth):
    """Count leaf positions at exactly `depth` plies (terminal before then counts 0). Not a search."""
    if depth == 0:
        return 1
    if is_terminal(state):
        return 0
    return sum(perft(apply(state, m), depth - 1) for m in legal_moves(state))


# --- moves -------------------------------------------------------------------

def test_move_strings():
    """Moves print as G@12, G 7-12, T 0-1, T 0x6>12."""
    assert str(rules.PLACE[12]) == "G@12"
    assert str(rules.GOAT_STEP[7][12]) == "G 7-12"
    assert str(rules.TIGER_STEP[0][1]) == "T 0-1"
    assert str(rules.JUMP[0][6]) == "T 0x6>12"


# --- R3 ----------------------------------------------------------------------

def test_r3_goat_has_21_placements_at_start():
    """R3/R5: 21 empty points to place on at the start."""
    moves = legal_moves(initial_state())
    assert len(moves) == 21
    assert all(m.kind == rules.K_PLACE for m in moves)


def test_r3_tiger_has_12_moves_after_any_first_placement():
    """R3: after any first placement the tiger has exactly 12 moves."""
    start = initial_state()
    for m in legal_moves(start):
        s = apply(start, m)
        assert s.to_move == TIGER
        assert len(legal_moves(s)) == 12, str(m)


@pytest.mark.parametrize("depth,expected", [(1, 21), (2, 252), (3, 5052), (4, 68204)])
def test_r3_r10_perft_from_start(depth, expected):
    """R3–R8: perft leaf counts from the start position."""
    assert perft(initial_state(), depth) == expected


# --- R5 / R6 -----------------------------------------------------------------

def test_r5_no_goat_steps_while_goats_in_hand():
    """R5: while h > 0, goats only PLACE, even with goats on the board."""
    s = from_text(TIGER_ORDER, "GOAT", 16, 0)
    moves = legal_moves(s)
    assert all(m.kind == rules.K_PLACE for m in moves)
    assert [m.to for m in moves] == [i for i in range(25) if s.board[i] == EMPTY]


def test_r5_placement_always_has_a_move():
    """R5/R8.3 shortcut: in placement, empty points = 1 + h + k >= 2, so the goat can always move."""
    s = from_text(TIGER_ORDER, "GOAT", 16, 0)
    assert len(legal_moves(s)) == 1 + 16 + 0
    rng = random.Random(7)
    for _ in range(50):
        s = initial_state()
        while not is_terminal(s):
            if s.to_move == GOAT and s.goats_in_hand > 0:
                n = len(legal_moves(s))
                assert n == 1 + s.goats_in_hand + s.goats_captured >= 2
            s = apply(s, rng.choice(legal_moves(s)))


def test_r6_goats_step_once_hand_is_empty_and_never_jump():
    """R6: with h = 0 goats STEP to adjacent empty points; no goat jumps (e.g. no G 21-23)."""
    s = from_text(MOVEMENT, "GOAT", 0, 4)
    moves = legal_moves(s)
    assert all(m.kind == rules.K_GOAT_STEP for m in moves)
    assert "G 21-23" not in names(moves)


# --- R7 ----------------------------------------------------------------------

def test_r7_jump_captures_and_increments_k():
    """R7: T 12x13>14 removes the goat on 13 and k goes 0 -> 1."""
    s = from_text(TIGER_ORDER, "TIGER", 16, 0)
    t = play(s, "T 12x13>14")
    assert (t.board[12], t.board[13], t.board[14]) == (EMPTY, EMPTY, TIGER)
    assert t.goats_captured == 1 and t.goats_in_hand == 16
    assert t.to_move == GOAT and t.ply == 1
    assert t.tigers == (0, 14, 20, 24)


def test_r7_no_jump_onto_occupied_point():
    """R7: tiger 0, goats 1 and 2: 0x1>2 is illegal because 2 is occupied."""
    s = from_text("TGG.T/...../...../...../T...T", "TIGER", 18, 0)
    from0 = [str(m) for m in legal_moves(s) if m.frm == 0]
    assert from0 == ["T 0-5", "T 0-6"]


def test_r7_no_jump_off_the_board():
    """R7: tiger 1 next to goat 0 cannot jump to (0, -1)."""
    s = from_text("GT..T/...../...../...../T...T", "TIGER", 19, 0)
    from1 = [str(m) for m in legal_moves(s) if m.frm == 1]
    assert from1 == ["T 1-2", "T 1-6"]


def test_r7_no_jump_along_diagonal_through_odd_point():
    """R1/R7: tiger on odd point 7 has no diagonals, so goats on 11 and 13 can't be jumped."""
    s = from_text("T...T/..T../.G.G./...../....T", "TIGER", 18, 0)
    from7 = [str(m) for m in legal_moves(s) if m.frm == 7]
    assert from7 == ["T 7-2", "T 7-6", "T 7-8", "T 7-12"]
    assert not any(m.kind == rules.K_JUMP for m in legal_moves(s))


def test_r7_no_multi_jump():
    """R7: 0x1>2 is one move; the follow-up jump over 3 to 4 is never offered."""
    s = from_text("TG.G./...../...../...../T.T.T", "TIGER", 18, 0)
    from0 = [str(m) for m in legal_moves(s) if m.frm == 0]
    assert from0 == ["T 0x1>2", "T 0-5", "T 0-6"]
    t = play(s, "T 0x1>2")
    assert t.to_move == GOAT
    assert t.board[3] == GOAT and t.board[4] == EMPTY
    assert all(m.kind == rules.K_PLACE for m in legal_moves(t))


def test_r7_capture_is_optional():
    """R7: steps from 12 are listed alongside the jump."""
    s = from_text(TIGER_ORDER, "TIGER", 16, 0)
    from12 = [str(m) for m in legal_moves(s) if m.frm == 12]
    assert "T 12x13>14" in from12 and "T 12-7" in from12


# --- R10 ---------------------------------------------------------------------

def test_r10_order_goat_placement():
    """R10: PLACE by ascending point index (start: every point but the corners)."""
    expected = ["G@%d" % i for i in [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                                     15, 16, 17, 18, 19, 21, 22, 23]]
    assert names(legal_moves(initial_state())) == expected


def test_r10_order_goat_steps():
    """R10: goat STEP by (from, to) ascending.

    Empties 12, 16, 17, 18, 23. Goat by goat: 6->12; 7->12; 8->12; 10->16;
    11->12,16; 13->12,18; 14->18; 15->16; 19->18; 21->16; 22->16,17,18,23.
    Goats 1, 2, 3, 5, 9 have no empty neighbour.
    """
    s = from_text(MOVEMENT, "GOAT", 0, 4)
    assert names(legal_moves(s)) == [
        "G 6-12", "G 7-12", "G 8-12", "G 10-16", "G 11-12", "G 11-16",
        "G 13-12", "G 13-18", "G 14-18", "G 15-16", "G 19-18", "G 21-16",
        "G 22-16", "G 22-17", "G 22-18", "G 22-23",
    ]


def test_r10_order_tiger_steps_and_jumps_interleaved():
    """R10: tiger moves by (from, to), steps and jumps interleaved.

    Tiger 0: neighbours 1, 5, 6 all goats; jumps 0x1>2 and 0x5>10 (0x6>12 lands on a tiger).
    Tiger 12: steps 7, 8, 11, 16, 17, 18; jump 12x13>14 sorts between 11 and 16.
    Tigers 20 and 24: steps to their three empty neighbours.
    """
    s = from_text(TIGER_ORDER, "TIGER", 16, 0)
    assert names(legal_moves(s)) == [
        "T 0x1>2", "T 0x5>10",
        "T 12-7", "T 12-8", "T 12-11", "T 12x13>14", "T 12-16", "T 12-17", "T 12-18",
        "T 20-15", "T 20-16", "T 20-21",
        "T 24-18", "T 24-19", "T 24-23",
    ]


# --- R8 ----------------------------------------------------------------------

def test_r8_1_five_captures_tigers_win():
    """R8.1: k >= 5 -> tigers win, even with goat moves available."""
    s = from_text(MOVEMENT.replace("G", ".", 1), "GOAT", 0, 5)
    assert legal_moves(s)
    assert is_terminal(s) and winner(s) == TIGER


def test_r8_2_tigers_trapped_goats_win():
    """R8.2: tiger to move with no legal move -> goats win."""
    s = from_text(TRAPPED, "TIGER", 10, 0)
    assert legal_moves(s) == ()
    assert is_terminal(s) and winner(s) == GOAT


def test_r8_2_trapped_tigers_not_terminal_on_goats_turn():
    """R8.2 applies only when the tiger is to move."""
    s = from_text(TRAPPED, "GOAT", 10, 0)
    assert not is_terminal(s)


def test_r8_order_five_captures_beats_trapped_tigers():
    """R8 order: k = 5 is checked before the trap, so tigers win."""
    s = from_text(TRAPPED, "TIGER", 5, 5)
    assert legal_moves(s) == ()
    assert winner(s) == TIGER


def test_r8_3_goat_has_no_move_tigers_win():
    """R8.3: goat to move with no legal move -> tigers win (our convention)."""
    s = from_text(GOATS_BLOCKED, "GOAT", 0, 0)
    assert legal_moves(s) == ()
    assert is_terminal(s) and winner(s) == TIGER


def test_r8_4_threefold_repetition_draw():
    """R8.4: shuffling a goat and a tiger back and forth reaches reps = 3 -> draw."""
    s = from_text(MOVEMENT, "GOAT", 0, 4)
    cycle = ("G 22-23", "T 24-18", "G 23-22", "T 18-24")
    seen = [s.reps]
    for name in cycle * 2:
        s = play(s, name)
        seen.append(s.reps)
        if s.ply < 8:
            assert not is_terminal(s)
    assert seen == [1, 1, 1, 1, 2, 2, 2, 2, 3]
    assert is_terminal(s) and winner(s) is None and outcome(s) == DRAW


def test_r8_4_capture_resets_repetition():
    """R8.4: a capture is irreversible, so reps and the history chain reset."""
    s = play(from_text(MOVEMENT, "GOAT", 0, 4), "G 22-23", "T 24-18", "G 23-22", "T 18-24", "G 22-23")
    assert s.reps == 2
    t = play(s, "T 24x23>22")
    assert t.reps == 1 and chain_length(t) == 1


def test_r8_4_placement_resets_repetition():
    """R8.4: a placement is irreversible, so the history chain restarts."""
    s = play(initial_state(), "G@12")
    assert chain_length(s) == 1
    s = play(s, "T 0-1")
    assert chain_length(s) == 2
    s = play(s, "G@13")
    assert chain_length(s) == 1 and s.reps == 1


def test_r8_5_move_cap_draw():
    """R8.5: ply reaching MOVE_CAP = 200 -> draw."""
    assert MOVE_CAP == 200
    s = from_text(MOVEMENT, "GOAT", 0, 4, ply=MOVE_CAP - 1)
    assert not is_terminal(s)
    t = play(s, "G 22-23")
    assert t.ply == MOVE_CAP
    assert is_terminal(t) and winner(t) is None


def test_r8_not_terminal_at_start():
    assert not is_terminal(initial_state())
    with pytest.raises(ValueError):
        winner(initial_state())


# --- R9 ----------------------------------------------------------------------

def test_r9_utility_values_and_depth_adjustment():
    """R9: +1e6 - d for a tiger win, -1e6 + d for a goat win, 0 for a draw."""
    tiger_win = from_text(TRAPPED, "TIGER", 5, 5)
    goat_win = from_text(TRAPPED, "TIGER", 10, 0)
    draw = from_text(MOVEMENT, "GOAT", 0, 4, ply=MOVE_CAP)
    assert utility(tiger_win, 0) == 1_000_000
    assert utility(tiger_win, 3) == 1_000_000 - 3
    assert utility(goat_win, 0) == -1_000_000
    assert utility(goat_win, 3) == -1_000_000 + 3
    assert utility(draw, 0) == 0 and utility(draw, 5) == 0


def test_r9_utility_rejects_non_terminal():
    with pytest.raises(ValueError):
        utility(initial_state(), 0)


# --- immutability, memoisation, integrity -------------------------------------

def _snapshot(s):
    return (s.board, s.to_move, s.goats_in_hand, s.goats_captured, s.ply,
            s.tigers, s.history, s.reps)


def test_legal_moves_memoised_on_state():
    """legal_moves returns the same tuple on repeat calls; the state stays equal."""
    s = initial_state()
    before = _snapshot(s)
    first = legal_moves(s)
    assert legal_moves(s) is first
    assert _snapshot(s) == before


def test_integrity_over_random_games():
    """R4–R8 invariants over 200 random games (random.Random(2026))."""
    rng = random.Random(2026)
    for _ in range(200):
        s = initial_state()
        while True:
            assert s.tigers == tuple(i for i, v in enumerate(s.board) if v == TIGER)
            assert (s.board.count(TIGER) + s.board.count(GOAT)
                    + s.goats_in_hand + s.goats_captured) == 4 + 20
            moves = legal_moves(s)
            assert moves == generate_moves(s)
            if is_terminal(s):
                break
            before = _snapshot(s)
            nxt = apply(s, rng.choice(moves))
            assert _snapshot(s) == before
            assert nxt.ply == s.ply + 1
            assert nxt.to_move != s.to_move  # R4
            s = nxt


# --- §6.2 game protocol ------------------------------------------------------

def test_game_protocol_delegates_to_rules():
    """§6.2: BaghChalGame exposes the protocol; tigers are MAX (R9)."""
    g = BaghChalGame()
    s = g.initial_state()
    assert not g.is_max_to_move(s)
    assert list(g.legal_moves(s)) == list(legal_moves(s))
    t = g.apply(s, g.legal_moves(s)[0])
    assert g.is_max_to_move(t)
    assert not g.is_terminal(t)
    win = from_text(TRAPPED, "TIGER", 5, 5)
    assert g.is_terminal(win) and g.utility(win, 2) == 1_000_000 - 2
