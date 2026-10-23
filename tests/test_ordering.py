"""Tests for baghchal.ordering and e3.trees: alpha-beta's best and worst case (E3).

Tests written first, then the code (both by Claude Code; see PRD §10).

Facts tested (Russell & Norvig §5.3; Knuth & Moore 1975):
- Minimax expands every node whatever the move order, so its node count does
  not depend on ordering.
- Alpha-beta returns the minimax value under every ordering (§6.3).
- Worst case: alpha-beta can never expand more than minimax, and on a tree
  built so that every move is better than the one before it (the worst move
  always first), no cutoff fires and it expands exactly as many nodes, O(b^d).
  Simply reversing the oracle order reaches this at depth <= 3; deeper, a few
  cutoffs still fire from bounds set by an ancestor's earlier siblings.
- Best ordering (best move first at every node): on a uniform tree with
  distinct leaf values, alpha-beta evaluates exactly b^ceil(d/2) + b^floor(d/2) - 1
  leaves, O(b^(d/2)).
"""
from __future__ import annotations

import pathlib

import pytest

from baghchal.evaluation import designed_eval
from baghchal.game import BaghChalGame
from baghchal.ordering import (BEST, HEURISTIC, NATURAL, ORDERINGS, WORST, OrderedGame,
                               ordered_search)
from baghchal.search import ALPHABETA, MINIMAX, SearchStats
from baghchal.state import from_position
from e3.trees import UniformTree, knuth_moore_leaves, minimax_leaves, minimax_nodes
from experiments.position import load_positions

from tests.test_search import RN_TREE

GAME = BaghChalGame()
ROOT = pathlib.Path(__file__).resolve().parent.parent
SUITE = [from_position(p) for p in load_positions(ROOT / "data" / "positions.json")]
# 5 placement + 5 movement positions keep the oracle orderings quick.
SAMPLE = [s for s in SUITE if s.goats_in_hand > 0][:5] + [s for s in SUITE if s.goats_in_hand == 0][:5]


def run(game, state, depth, algorithm, order, evaluate=designed_eval, ply_of=None):
    stats = SearchStats()
    kwargs = {} if ply_of is None else {"ply_of": ply_of}
    result = ordered_search(game, state, depth, algorithm, order, evaluate, stats, **kwargs)
    return result, stats


# --- formulas -------------------------------------------------------------------

def test_formulas_on_small_cases():
    """b=3, d=2: minimax 1+3+9 = 13 nodes, 9 leaves; Knuth-Moore 3^1 + 3^1 - 1 = 5 leaves."""
    assert minimax_nodes(3, 2) == 13
    assert minimax_leaves(3, 2) == 9
    assert knuth_moore_leaves(3, 2) == 5
    # b=2, d=3: 2^2 + 2^1 - 1 = 5
    assert knuth_moore_leaves(2, 3) == 5


def test_uniform_tree_has_distinct_seeded_leaves():
    """Same seed -> same leaves; all b^d leaf values distinct (so no ties)."""
    a, b = UniformTree(3, 3, seed=7), UniformTree(3, 3, seed=7)
    assert a.leaves == b.leaves
    assert len(set(a.leaves)) == 27


# --- uniform trees: the exact textbook results ----------------------------------

TREE_CASES = [(b, d) for b in (2, 3, 4) for d in (2, 3, 4, 5)]


@pytest.mark.parametrize("b,d", TREE_CASES)
def test_minimax_expands_every_node_under_any_order(b, d):
    tree = UniformTree(b, d, seed=2026)
    for order in (WORST, NATURAL, BEST):
        _, stats = run(tree, tree.initial_state(), d, MINIMAX, order, tree.evaluate, len)
        assert stats.nodes == minimax_nodes(b, d)
        assert stats.evals == minimax_leaves(b, d)


@pytest.mark.parametrize("b,d", TREE_CASES)
def test_worst_case_tree_alphabeta_prunes_nothing(b, d):
    """Worst case: on UniformTree.worst_case, R10 order (and WORST) expand every node."""
    tree = UniformTree.worst_case(b, d)
    for order in (NATURAL, WORST):
        _, stats = run(tree, tree.initial_state(), d, ALPHABETA, order, tree.evaluate, len)
        assert stats.nodes == minimax_nodes(b, d)
        assert stats.evals == minimax_leaves(b, d)


@pytest.mark.parametrize("b,d", TREE_CASES)
def test_worst_order_on_random_tree_is_near_minimax(b, d):
    """Reversed oracle order: all nodes at d <= 3; never more than minimax, never fewer than R10."""
    tree = UniformTree(b, d, seed=2026)
    _, worst = run(tree, tree.initial_state(), d, ALPHABETA, WORST, tree.evaluate, len)
    _, natural = run(tree, tree.initial_state(), d, ALPHABETA, NATURAL, tree.evaluate, len)
    if d <= 3:
        assert worst.nodes == minimax_nodes(b, d)
    assert natural.nodes <= worst.nodes <= minimax_nodes(b, d)


@pytest.mark.parametrize("b,d", TREE_CASES)
def test_best_order_alphabeta_meets_knuth_moore_bound(b, d):
    """Best case: exactly b^ceil(d/2) + b^floor(d/2) - 1 leaves evaluated, on both trees."""
    for tree in (UniformTree(b, d, seed=2026), UniformTree.worst_case(b, d)):
        _, stats = run(tree, tree.initial_state(), d, ALPHABETA, BEST, tree.evaluate, len)
        assert stats.evals == knuth_moore_leaves(b, d)


@pytest.mark.parametrize("b,d", TREE_CASES)
def test_all_orders_same_value_on_trees(b, d):
    tree = UniformTree(b, d, seed=2026)
    reference, _ = run(tree, tree.initial_state(), d, MINIMAX, NATURAL, tree.evaluate, len)
    for order in (WORST, NATURAL, BEST):
        result, _ = run(tree, tree.initial_state(), d, ALPHABETA, order, tree.evaluate, len)
        assert result.score == reference.score


def test_textbook_tree_best_order_beats_natural():
    """R&N Fig. 5.2: natural order expands 11 nodes; best-first expands fewer; worst-first all 13."""
    def evaluate(_path):
        raise AssertionError("leaves are terminal; evaluate is never needed")
    natural, natural_stats = run(RN_TREE, (), 2, ALPHABETA, NATURAL, evaluate, len)
    best, best_stats = run(RN_TREE, (), 2, ALPHABETA, BEST, evaluate, len)
    worst, worst_stats = run(RN_TREE, (), 2, ALPHABETA, WORST, evaluate, len)
    assert natural.score == best.score == worst.score == 3
    assert natural_stats.nodes == 11
    assert best_stats.nodes < 11
    assert worst_stats.nodes == 13


# --- Bagh-Chal positions ----------------------------------------------------------

def test_sample_covers_both_phases():
    assert sum(s.goats_in_hand > 0 for s in SAMPLE) == 5
    assert sum(s.goats_in_hand == 0 for s in SAMPLE) == 5


@pytest.mark.parametrize("depth", [1, 2, 3])
def test_minimax_nodes_do_not_depend_on_order(depth):
    for state in SAMPLE:
        counts = {run(GAME, state, depth, MINIMAX, order)[1].nodes for order in ORDERINGS}
        assert len(counts) == 1


@pytest.mark.parametrize("depth", [1, 2, 3])
def test_alphabeta_score_equals_minimax_under_every_order(depth):
    for state in SAMPLE:
        reference, mm_stats = run(GAME, state, depth, MINIMAX, NATURAL)
        for order in ORDERINGS:
            result, stats = run(GAME, state, depth, ALPHABETA, order)
            assert result.score == reference.score, (order, state)
            assert stats.nodes <= mm_stats.nodes


def test_natural_order_matches_plain_search():
    """NATURAL is R10 order, so it reproduces the E1 alpha-beta node counts exactly."""
    from baghchal.search import choose_move
    for state in SAMPLE:
        plain = SearchStats()
        choose_move(GAME, state, 3, ALPHABETA, designed_eval, plain)
        _, wrapped = run(GAME, state, 3, ALPHABETA, NATURAL)
        assert wrapped.nodes == plain.nodes


def test_best_order_never_worse_than_natural_in_total():
    """Summed over the sample at depth 3: best <= heuristic-or-natural <= worst."""
    totals = {order: sum(run(GAME, s, 3, ALPHABETA, order)[1].nodes for s in SAMPLE)
              for order in ORDERINGS}
    assert totals[BEST] <= totals[NATURAL] <= totals[WORST]
    assert totals[BEST] <= totals[HEURISTIC]


def test_node_counts_are_deterministic():
    state = SAMPLE[0]
    for order in ORDERINGS:
        first = run(GAME, state, 3, ALPHABETA, order)[1].nodes
        assert run(GAME, state, 3, ALPHABETA, order)[1].nodes == first


def test_ordering_is_a_permutation_and_does_not_mutate():
    for state in SAMPLE:
        before = (state.board, state.to_move, state.goats_in_hand, state.goats_captured, state.ply)
        natural = list(GAME.legal_moves(state))
        for order in ORDERINGS:
            wrapped = OrderedGame(GAME, order, designed_eval, depth=3, root_ply=state.ply)
            moves = wrapped.legal_moves(state)
            assert sorted(moves, key=repr) == sorted(natural, key=repr)
        assert (state.board, state.to_move, state.goats_in_hand,
                state.goats_captured, state.ply) == before


def test_natural_order_is_r10_order():
    state = SAMPLE[0]
    wrapped = OrderedGame(GAME, NATURAL, designed_eval, depth=3, root_ply=state.ply)
    assert wrapped.legal_moves(state) == list(GAME.legal_moves(state))


def test_unknown_order_rejected():
    with pytest.raises(ValueError):
        OrderedGame(GAME, "random", designed_eval, depth=3)
