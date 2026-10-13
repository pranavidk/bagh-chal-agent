"""Acceptance tests for baghchal.search (PRD §6.3), against the §6.2 Game protocol.

The search bodies are written by Shalom; these tests were written first.
A trivial evaluator (goats captured) is used so nothing here depends on Phase 3.
"""
from __future__ import annotations

import ast
import pathlib
import random

import pytest

from baghchal import rules
from baghchal.board import GOAT, TIGER
from baghchal.game import BaghChalGame
from baghchal.search import (ALPHABETA, MINIMAX, SearchResult, SearchStats,
                             alphabeta, choose_move, minimax)
from baghchal.state import from_text, initial_state

INF = float("inf")
WIN = 1_000_000
GAME = BaghChalGame()

# Tigers 0, 12, 20, 24; goats 1, 5, 6, 13. Jumps available: 0x1>2, 0x5>10, 12x13>14.
TIGER_ORDER = "TG.../GG.../..TG./...../T...T"
# h = 0, k = 4: 16 goats, empties 12, 16, 17, 18, 23.
MOVEMENT = "TGGGT/GGGGG/GG.GG/G...G/TGG.T"
# Tigers 0, 1, 5, 6 boxed in except 6x12>18; a goat on 18 traps them all.
ALMOST_TRAPPED = "TTGG./TTGG./GGG../GG.../....."


def captured(state) -> float:
    """Trivial evaluator for these tests: goats captured (tiger's side)."""
    return state.goats_captured


# --- a tiny game tree implementing the §6.2 protocol --------------------------

class TreeGame:
    """Game protocol over a nested list. A state is the path of child indices from the root.

    A leaf is a number (a terminal with that utility) or the string "WIN", a
    tiger win scored by the R9 rule as WIN - ply. The root is MAX; levels alternate.
    """

    def __init__(self, tree):
        self.tree = tree

    def _node(self, path):
        node = self.tree
        for i in path:
            node = node[i]
        return node

    def initial_state(self):
        return ()

    def legal_moves(self, path):
        node = self._node(path)
        return list(range(len(node))) if isinstance(node, list) else []

    def apply(self, path, move):
        return path + (move,)

    def is_terminal(self, path):
        return not isinstance(self._node(path), list)

    def utility(self, path, ply_from_root):
        leaf = self._node(path)
        return WIN - ply_from_root if leaf == "WIN" else leaf

    def is_max_to_move(self, path):
        return len(path) % 2 == 0


# Russell & Norvig Fig. 5.2: MAX root, three MIN children, leaves 3 12 8 | 2 4 6 | 14 5 2.
RN_TREE = TreeGame([[3, 12, 8], [2, 4, 6], [14, 5, 2]])


def must_not_evaluate(state):
    raise AssertionError("evaluate() called on a terminal state; use game.utility (R9)")


# --- textbook tree -----------------------------------------------------------

def test_textbook_tree_minimax_value_and_nodes():
    """§6.3: minimax on R&N Fig. 5.2 returns 3 and expands 13 nodes (root + 3 + 9)."""
    stats = SearchStats()
    value, pv = minimax(RN_TREE, (), 2, 0, must_not_evaluate, stats)
    assert value == 3
    assert stats.nodes == 13
    assert pv == [0, 0]


def test_textbook_tree_alphabeta_value_and_nodes():
    """§6.3: alpha-beta on Fig. 5.2 returns 3 and expands 11 nodes (C is cut after its leaf 2)."""
    stats = SearchStats()
    value, pv = alphabeta(RN_TREE, (), 2, 0, -INF, INF, must_not_evaluate, stats)
    assert value == 3
    assert stats.nodes == 11
    assert pv[0] == 0


def test_textbook_tree_terminal_checked_before_depth_cutoff():
    """§5 CUTOFF and R9: a terminal leaf scores by utility even when depth is 0 there,
    and searching deeper than the tree changes nothing."""
    for depth in (2, 3, 6):
        for algorithm in (MINIMAX, ALPHABETA):
            stats = SearchStats()
            result = choose_move(RN_TREE, (), depth, algorithm, must_not_evaluate, stats)
            assert (result.move, result.score) == (0, 3)
            assert stats.nodes == (13 if algorithm == MINIMAX else 11)


def test_choose_move_returns_search_result():
    """§6.3: choose_move returns SearchResult(move, score, pv) with pv[0] == move."""
    result = choose_move(RN_TREE, (), 2, MINIMAX, must_not_evaluate, SearchStats())
    assert isinstance(result, SearchResult)
    assert result.move == 0 and result.score == 3 and result.pv == [0, 0]


def test_choose_move_rejects_unknown_algorithm():
    with pytest.raises(ValueError):
        choose_move(RN_TREE, (), 2, "negamax", must_not_evaluate, SearchStats())


@pytest.mark.parametrize("algorithm", [MINIMAX, ALPHABETA])
def test_faster_win_preferred(algorithm):
    """R9: with a win in 3 listed first and a win in 1 second, the win in 1 is chosen.

    Child 0 is MIN with one reply to a MAX node with one winning move (terminal at
    ply 3, worth WIN - 3). Child 1 is a win at ply 1 (WIN - 1). Only the ply term
    separates them, so this checks `ply` reaches game.utility correctly.
    """
    game = TreeGame([[["WIN"]], "WIN"])
    result = choose_move(game, (), 3, algorithm, must_not_evaluate, SearchStats())
    assert result.move == 1
    assert result.score == WIN - 1


@pytest.mark.parametrize("algorithm", [MINIMAX, ALPHABETA])
def test_r11_first_best_move_kept_on_ties(algorithm):
    """R11: strict comparison keeps the first of several equally good root moves."""
    game = TreeGame([[5, 7], [6, 5], [5, 9]])   # every MIN child is worth 5
    result = choose_move(game, (), 2, algorithm, must_not_evaluate, SearchStats())
    assert result.move == 0 and result.score == 5


# --- Bagh-Chal positions -----------------------------------------------------

def random_positions(n: int, seed: int):
    """n reachable, non-terminal positions from seeded random play (fresh history)."""
    rng = random.Random(seed)
    positions = []
    while len(positions) < n:
        s = initial_state()
        for _ in range(rng.randint(0, 60)):
            if rules.is_terminal(s):
                break
            s = rules.apply(s, rng.choice(rules.legal_moves(s)))
        if not rules.is_terminal(s):
            positions.append(s)
    return positions


POSITIONS = random_positions(50, seed=2026)


def test_fixture_positions_cover_both_phases_and_sides():
    """The 50 random positions include placement and movement, goat and tiger to move."""
    assert any(s.goats_in_hand > 0 for s in POSITIONS)
    assert any(s.goats_in_hand == 0 for s in POSITIONS)
    assert {s.to_move for s in POSITIONS} == {GOAT, TIGER}


@pytest.mark.parametrize("state", [
    initial_state(),
    from_text(TIGER_ORDER, "TIGER", 16, 0),
    from_text(TIGER_ORDER, "GOAT", 16, 0),
    from_text(MOVEMENT, "GOAT", 0, 4),
], ids=["start", "tiger-order", "placement-goat", "movement-goat"])
def test_depth_one_minimax_expands_root_plus_children(state):
    """§6.3: depth-1 minimax expands exactly 1 + len(legal_moves) nodes."""
    stats = SearchStats()
    minimax(GAME, state, 1, 0, captured, stats)
    assert stats.nodes == 1 + len(GAME.legal_moves(state))


@pytest.mark.parametrize("depth", [1, 2, 3])
def test_alphabeta_matches_minimax_on_random_positions(depth):
    """§6.3: on 50 random positions, alpha-beta score == minimax score and nodes <= minimax nodes."""
    for i, s in enumerate(POSITIONS):
        mm_stats, ab_stats = SearchStats(), SearchStats()
        mm = choose_move(GAME, s, depth, MINIMAX, captured, mm_stats)
        ab = choose_move(GAME, s, depth, ALPHABETA, captured, ab_stats)
        assert ab.score == mm.score, f"position {i}, depth {depth}"
        assert ab_stats.nodes <= mm_stats.nodes, f"position {i}, depth {depth}"


def test_fixture_tiger_capture_wins_with_k4():
    """Fixture check (rules only): with k = 4 each of the three jumps ends the game, tigers winning."""
    s = from_text(TIGER_ORDER, "TIGER", 12, 4)
    jumps = [m for m in rules.legal_moves(s) if m.kind == rules.K_JUMP]
    assert [str(m) for m in jumps] == ["T 0x1>2", "T 0x5>10", "T 12x13>14"]
    assert all(rules.winner(rules.apply(s, m)) == TIGER for m in jumps)


@pytest.mark.parametrize("algorithm", [MINIMAX, ALPHABETA])
@pytest.mark.parametrize("depth", [1, 2, 3])
def test_tiger_takes_fifth_goat(algorithm, depth):
    """§6.3: tiger to move, k = 4, capture available -> a jump, score 1,000,000 - 1.
    R11: the first winning jump in R10 order is T 0x1>2."""
    s = from_text(TIGER_ORDER, "TIGER", 12, 4)
    result = choose_move(GAME, s, depth, algorithm, captured, SearchStats())
    assert result.move.kind == rules.K_JUMP
    assert result.score == WIN - 1
    assert str(result.move) == "T 0x1>2"


def test_fixture_only_g18_traps_the_tigers():
    """Fixture check (rules only): G@18 is the one placement that leaves the tigers no move."""
    s = from_text(ALMOST_TRAPPED, "GOAT", 11, 0)
    trapping = [str(m) for m in rules.legal_moves(s)
                if rules.is_terminal(rules.apply(s, m))]
    assert trapping == ["G@18"]
    assert rules.winner(rules.apply(s, rules.PLACE[18])) == GOAT


@pytest.mark.parametrize("algorithm", [MINIMAX, ALPHABETA])
@pytest.mark.parametrize("depth", [1, 2, 3])
def test_goats_trap_last_mobile_tiger(algorithm, depth):
    """§6.3: goats can trap the last mobile tiger in one move -> found, score -1,000,000 + 1."""
    s = from_text(ALMOST_TRAPPED, "GOAT", 11, 0)
    result = choose_move(GAME, s, depth, algorithm, captured, SearchStats())
    assert str(result.move) == "G@18"
    assert result.score == -WIN + 1


@pytest.mark.parametrize("algorithm", [MINIMAX, ALPHABETA])
def test_node_counts_deterministic(algorithm):
    """§6.3, C6: identical node counts and results across 3 runs."""
    for s in POSITIONS[:10]:
        runs = []
        for _ in range(3):
            stats = SearchStats()
            result = choose_move(GAME, s, 3, algorithm, captured, stats)
            runs.append((stats.nodes, str(result.move), result.score))
        assert runs[0] == runs[1] == runs[2]


@pytest.mark.parametrize("algorithm", [MINIMAX, ALPHABETA])
def test_move_is_legal_and_pv_is_a_legal_line(algorithm):
    """§6.3: the move is in legal_moves, the PV starts with it and replays legally."""
    for s in POSITIONS:
        result = choose_move(GAME, s, 2, algorithm, captured, SearchStats())
        assert result.move in GAME.legal_moves(s)
        assert result.pv and result.pv[0] is result.move
        assert len(result.pv) <= 2
        node = s
        for move in result.pv:
            assert move in GAME.legal_moves(node)
            node = GAME.apply(node, move)


@pytest.mark.parametrize("algorithm", [MINIMAX, ALPHABETA])
def test_search_does_not_mutate_state(algorithm):
    """Immutability: searching leaves the root state's fields unchanged."""
    for s in POSITIONS[:10]:
        before = (s.board, s.to_move, s.goats_in_hand, s.goats_captured, s.ply,
                  s.tigers, s.history, s.reps)
        choose_move(GAME, s, 2, algorithm, captured, SearchStats())
        assert (s.board, s.to_move, s.goats_in_hand, s.goats_captured, s.ply,
                s.tigers, s.history, s.reps) == before


def test_search_does_not_import_rules():
    """§6.2: search.py sees only the Game protocol, so it must not import baghchal.rules."""
    source = pathlib.Path(__file__).resolve().parent.parent / "baghchal" / "search.py"
    imported = set()
    for node in ast.walk(ast.parse(source.read_text())):
        if isinstance(node, ast.Import):
            imported.update(alias.name for alias in node.names)
        elif isinstance(node, ast.ImportFrom):
            imported.add(node.module or "")
            imported.update(f"{node.module}.{alias.name}" for alias in node.names)
    assert not any("rules" in name.split(".") for name in imported)
