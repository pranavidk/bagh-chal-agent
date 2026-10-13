"""Acceptance tests for baghchal.evaluation (PRD §6.4).

Tests written first, then the feature logic and initial weights (both by Claude Code; PRD §10).
Every expected count below is worked out by hand in the comment above its board.
Index = 5*row + col. Degrees (R1): corners 3; (0,2) (2,0) (2,4) (4,2) 5;
(1,1) (1,3) (2,2) (3,1) (3,3) = 6, 8, 12, 16, 18 are 8; odd points 3 or 4.
"""
from __future__ import annotations

import numbers
import random
import time

import pytest

from baghchal import rules
from baghchal.evaluation import FEATURES, WEIGHTS, baseline_eval, designed_eval, features
from baghchal.state import from_text, initial_state

BOUND = 100_000

# --- hand-built boards: (text, side to move, goats in hand, captured, expected features) ----

BOARDS = {
    # START  T...T / ..... / ..... / ..... / T...T, h = 20, k = 0.
    # capt 0. mob: each corner tiger has 3 empty neighbours -> 4 x 3 = 12.
    # threat 0, trapped 0, conn 0, hub 0 (no goats on the board).
    "start": ("T...T/...../...../...../T...T", "GOAT", 20, 0,
              dict(capt=0, mob=12, threat=0, trapped=0, conn=0, hub=0)),

    # TIGER_ORDER  TG... / GG... / ..TG. / ..... / T...T
    # tigers 0, 12, 20, 24; goats 1, 5, 6, 13; h = 16, k = 0.
    # mob: tiger 0 -> neighbours 1, 5, 6 all goats: 0. Tiger 12 -> neighbours
    #      6 7 8 11 13 16 17 18, empty 7 8 11 16 17 18: 6. Tiger 20 -> 15 16 21: 3.
    #      Tiger 24 -> 18 19 23: 3. Total 12.
    # threat: 0x1>2 (2 empty) yes; 0x5>10 yes; 0x6>12 lands on a tiger, no;
    #      12x13>14 yes; 12x6>0 lands on a tiger, no. Goats {1, 5, 13} -> 3.
    # trapped: tiger 0 has no step but has jumps -> NOT trapped. 0.
    # conn: goat-goat edges 1-6 and 5-6. 1-5 is a diagonal through odd (0,1): not an edge. 2.
    # hub: only goat 6 is on an even point; degree 8 -> 8.
    "tiger_order": ("TG.../GG.../..TG./...../T...T", "TIGER", 16, 0,
                    dict(capt=0, mob=12, threat=3, trapped=0, conn=2, hub=8)),

    # Same board with k = 3 (h = 13): only capt changes.
    "tiger_order_k3": ("TG.../GG.../..TG./...../T...T", "TIGER", 13, 3,
                       dict(capt=3, mob=12, threat=3, trapped=0, conn=2, hub=8)),

    # TRAPPED  TTGG. / TTGG. / GGG.. / GG.G. / .....
    # tigers 0, 1, 5, 6; goats 2 3 7 8 10 11 12 15 16 18; h = 10, k = 0.
    # mob 0: every tiger neighbour is a tiger or a goat.
    # threat 0: every jump lands on an occupied point (1x2>3, 5x10>15, 6x7>8,
    #      6x11>16, 6x12>18) or off the board (6x2, 6x10). trapped: all 4.
    # conn, counting each goat's goat-neighbours with a higher index:
    #      2: 3 7 8 (3) | 3: 8 (1) | 7: 8 12 (2) | 8: 12 (1) | 10: 11 15 16 (3)
    #      11: 12 16 (2) | 12: 16 18 (2) | 15: 16 (1) | 16: - | 18: -  -> 15.
    # hub: even goats 2 (deg 5), 8 (8), 10 (5), 12 (8), 16 (8), 18 (8) -> 42.
    "trapped": ("TTGG./TTGG./GGG../GG.G./.....", "TIGER", 10, 0,
                dict(capt=0, mob=0, threat=0, trapped=4, conn=15, hub=42)),

    # TWO_ATTACKERS  T.T.. / .G... / ..... / ..... / T...T
    # tigers 0, 2, 20, 24; goat 6; h = 19, k = 0.
    # mob: tiger 0 -> 1, 5 (6 is a goat): 2. Tiger 2 -> 1 3 7 8: 4. 20: 3. 24: 3. Total 12.
    # threat: 0x6>12 and 2x6>10 both capture goat 6 -> ONE distinct goat -> 1.
    # trapped 0, conn 0, hub: goat 6 degree 8 -> 8.
    "two_attackers": ("T.T../.G.../...../...../T...T", "GOAT", 19, 0,
                      dict(capt=0, mob=12, threat=1, trapped=0, conn=0, hub=8)),

    # ONE_BOXED  TGG.T / GG... / G.G.. / ..... / T...T
    # tigers 0, 4, 20, 24; goats 1 2 5 6 10 12; h = 14, k = 0.
    # mob: tiger 0 -> 1 5 6 goats: 0. Tiger 4 -> 3 8 9: 3. 20: 3. 24: 3. Total 9.
    # threat: tiger 0's jumps 0x1>2, 0x5>10, 0x6>12 all land on goats; no other
    #      tiger touches a goat -> 0. trapped: tiger 0 only -> 1.
    # conn: 1: 2 6 (2) | 2: 6 (1) | 5: 6 10 (2) | 6: 10 12 (2) | 10: - | 12: -  -> 7.
    # hub: even goats 2 (5), 6 (8), 10 (5), 12 (8) -> 26.
    "one_boxed": ("TGG.T/GG.../G.G../...../T...T", "TIGER", 14, 0,
                  dict(capt=0, mob=9, threat=0, trapped=1, conn=7, hub=26)),

    # CORNER_GOATS  GT.TG / ..... / ..... / ..... / .T.T.
    # tigers 1, 3, 21, 23; goats 0, 4; h = 18, k = 0.
    # mob: tiger 1 -> 0 2 6, 0 is a goat: 2. Tiger 3 -> 2 4 8: 2. 21 -> 16 20 22: 3.
    #      23 -> 18 22 24: 3. Total 10.
    # threat: 1x0 and 3x4 would land off the board -> 0. trapped 0.
    # conn: 0 and 4 are not adjacent -> 0. hub: corners are even, degree 3 each -> 6.
    "corner_goats": ("GT.TG/...../...../...../.T.T.", "GOAT", 18, 0,
                     dict(capt=0, mob=10, threat=0, trapped=0, conn=0, hub=6)),
}


def board_state(name):
    text, side, h, k, _ = BOARDS[name]
    return from_text(text, side, h, k)


def expected(name, feature):
    return BOARDS[name][4][feature]


def random_states(n, seed):
    """n reachable states (terminal ones included) from seeded random games."""
    rng = random.Random(seed)
    out = []
    while len(out) < n:
        s = initial_state()
        while len(out) < n:
            out.append(s)
            if rules.is_terminal(s):
                break
            s = rules.apply(s, rng.choice(rules.legal_moves(s)))
    return out


# --- features: shape ---------------------------------------------------------

def test_features_returns_six_integer_counts():
    """§6.4: features(state) -> dict of the six raw counts."""
    f = features(initial_state())
    assert tuple(sorted(f)) == tuple(sorted(FEATURES))
    assert all(isinstance(v, int) for v in f.values())


@pytest.mark.parametrize("name", list(BOARDS))
def test_features_on_hand_built_boards(name):
    """§6.4: all six counts on every hand-built board (see the comments above BOARDS)."""
    assert features(board_state(name)) == BOARDS[name][4]


# --- each feature on its own (>= 2 boards each, plus its edge case) ----------

@pytest.mark.parametrize("name", ["start", "tiger_order", "tiger_order_k3"])
def test_capt_is_goats_captured(name):
    """capt = k."""
    assert features(board_state(name))["capt"] == expected(name, "capt")


@pytest.mark.parametrize("name", ["start", "tiger_order", "trapped", "one_boxed", "corner_goats"])
def test_mob_counts_tiger_steps(name):
    """mob = legal tiger STEP moves summed over tigers (jumps excluded)."""
    assert features(board_state(name))["mob"] == expected(name, "mob")


@pytest.mark.parametrize("name", ["tiger_order", "trapped", "one_boxed"])
def test_threat_counts_jumpable_goats(name):
    """threat = distinct goats some tiger could jump right now."""
    assert features(board_state(name))["threat"] == expected(name, "threat")


def test_threat_edge_goat_attacked_twice_counts_once():
    """threat edge case: goat 6 can be jumped by tigers 0 and 2 -> counted once."""
    assert features(board_state("two_attackers"))["threat"] == 1


def test_threat_edge_landing_off_board_is_no_threat():
    """threat edge case: a goat in the corner beside a tiger can't be jumped (R7)."""
    assert features(board_state("corner_goats"))["threat"] == 0


@pytest.mark.parametrize("name", ["trapped", "one_boxed", "start"])
def test_trapped_counts_tigers_without_moves(name):
    """trapped = tigers with no legal STEP or JUMP."""
    assert features(board_state(name))["trapped"] == expected(name, "trapped")


def test_trapped_edge_tiger_with_only_a_jump_is_not_trapped():
    """trapped edge case: tiger 0 on TIGER_ORDER has no step but can jump -> not trapped."""
    f = features(board_state("tiger_order"))
    assert f["trapped"] == 0


@pytest.mark.parametrize("name", ["trapped", "one_boxed", "two_attackers"])
def test_conn_counts_goat_goat_edges(name):
    """conn = R1 edges whose both endpoints hold goats."""
    assert features(board_state(name))["conn"] == expected(name, "conn")


def test_conn_edge_diagonal_through_odd_point_is_not_an_edge():
    """conn edge case: goats 1 and 5 touch diagonally through odd (0,1); only 1-6, 5-6 count."""
    assert features(board_state("tiger_order"))["conn"] == 2


@pytest.mark.parametrize("name", ["tiger_order", "trapped", "one_boxed"])
def test_hub_sums_degree_of_goats_on_even_points(name):
    """hub = sum of degree(x) over goats on even-parity points."""
    assert features(board_state(name))["hub"] == expected(name, "hub")


def test_hub_edge_corners_are_even_with_degree_three():
    """hub edge case: corner goats count with degree 3; odd-point goats count 0."""
    assert features(board_state("corner_goats"))["hub"] == 6


def test_features_ignore_side_to_move():
    """§6.4: features are computed regardless of whose turn it is."""
    text, _, h, k, _ = BOARDS["tiger_order"]
    assert features(from_text(text, "GOAT", h, k)) == features(from_text(text, "TIGER", h, k))


def test_features_do_not_mutate_state():
    s = board_state("tiger_order")
    before = (s.board, s.to_move, s.goats_in_hand, s.goats_captured, s.ply, s.tigers, s.reps)
    features(s)
    designed_eval(s)
    assert (s.board, s.to_move, s.goats_in_hand, s.goats_captured, s.ply, s.tigers, s.reps) == before


# --- weights and the weighted sum ----------------------------------------------

def test_weights_are_set_for_all_six_features():
    """§6.4: WEIGHTS has the six keys, each a number. Signs live in the formula, so
    w1 (capt) and w4 (trapped) are positive and the rest are non-negative."""
    assert tuple(sorted(WEIGHTS)) == tuple(sorted(FEATURES))
    for name, w in WEIGHTS.items():
        assert isinstance(w, numbers.Real) and not isinstance(w, bool), f"WEIGHTS[{name!r}] = {w!r}"
        assert w >= 0, f"WEIGHTS[{name!r}] is negative; the formula already carries the sign"
    assert WEIGHTS["capt"] > 0 and WEIGHTS["trapped"] > 0


def formula(f):
    w = WEIGHTS
    return (w["capt"] * f["capt"] + w["mob"] * f["mob"] + w["threat"] * f["threat"]
            - w["trapped"] * f["trapped"] - w["conn"] * f["conn"] - w["hub"] * f["hub"])


def test_designed_eval_is_the_weighted_sum():
    """§6.4: designed_eval = w1·capt + w2·mob + w3·threat − w4·trapped − w5·conn − w6·hub."""
    for name in BOARDS:
        s = board_state(name)
        assert designed_eval(s) == pytest.approx(formula(features(s)))
    for s in random_states(200, seed=11):
        assert designed_eval(s) == pytest.approx(formula(features(s)))


def test_sign_more_captures_raises_designed_eval():
    """Sign check: same board, one more goat captured (and one fewer in hand) -> higher value."""
    assert designed_eval(board_state("tiger_order_k3")) > designed_eval(board_state("tiger_order"))


def test_sign_trapped_tiger_lowers_designed_eval():
    """Sign check: with everything else equal, one more trapped tiger lowers the value by w4.
    Shown through the weighted-sum identity (tested above) and w4 > 0."""
    f = features(board_state("one_boxed"))
    g = dict(f, trapped=f["trapped"] + 1)
    assert formula(g) < formula(f)
    assert designed_eval(board_state("one_boxed")) == pytest.approx(formula(f))


def test_baseline_depends_only_on_goats_captured():
    """§6.4: baseline_eval is capt only: equal for equal k, increasing in k."""
    by_k = {}
    for s in random_states(500, seed=5):
        by_k.setdefault(s.goats_captured, set()).add(baseline_eval(s))
    assert all(len(values) == 1 for values in by_k.values()), by_k
    ordered = [by_k[k].pop() for k in sorted(by_k)]
    assert ordered == sorted(ordered) and len(set(ordered)) == len(ordered)
    a, b = board_state("tiger_order"), board_state("trapped")   # very different boards, k = 0
    assert baseline_eval(a) == baseline_eval(b)


def test_bound_on_500_random_states():
    """§6.4: |designed_eval(s)| < 100,000 on 500 random reachable states (seed 2026)."""
    worst = max(abs(designed_eval(s)) for s in random_states(500, seed=2026))
    assert worst < BOUND


def test_bound_on_hand_built_extremes():
    """§6.4: the bound also holds on the most lopsided hand-built boards."""
    for name in BOARDS:
        assert abs(designed_eval(board_state(name))) < BOUND


def test_designed_eval_speed(capsys):
    """§7: mean time per designed_eval over 10,000 states (printed; generous ceiling).

    At depth 4 alpha-beta evaluates tens of thousands of leaves per move, so
    100 µs per call would already use most of the 2 s budget.
    """
    states = random_states(10_000, seed=3)
    t0 = time.perf_counter()
    for s in states:
        designed_eval(s)
    mean_us = (time.perf_counter() - t0) / len(states) * 1e6
    with capsys.disabled():
        print(f"\n  designed_eval: {mean_us:.1f} µs per call over {len(states):,} states")
    assert mean_us < 100
