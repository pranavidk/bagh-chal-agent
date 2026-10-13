"""Tests for baghchal.adapter: the experiments.engine_api.Engine contract (PRD §6.5)."""
from __future__ import annotations

import pytest

from baghchal import rules
from baghchal.adapter import Adapter
from baghchal.state import from_text, initial_state
from experiments.conformance import check_engine
from experiments.engine_api import ALPHABETA, BASELINE, DESIGNED, MINIMAX, SearchResult, SearchStats
from experiments.position import Position, initial_position

TRAPPED = "TTGG./TTGG./GGG../GG.G./....."
MOVEMENT = "TGGGT/GGGGG/GG.GG/G...G/TGG.T"
ENGINE = Adapter()


def test_initial_state_matches_rules_start():
    """R3 through the adapter."""
    assert ENGINE.initial_state() == initial_state()


def test_position_round_trip():
    """§6.5: from_position / to_position round trip, fresh history (ply 0)."""
    pos = Position(board=("TG..T", ".G...", "..G..", ".....", "T...T"), to_move="TIGER",
                   goats_in_hand=16, goats_captured=1)
    state = ENGINE.from_position(pos)
    assert state.ply == 0 and state.reps == 1
    back = ENGINE.to_position(state)
    assert (back.board, back.to_move, back.goats_in_hand, back.goats_captured) == \
           (pos.board, pos.to_move, pos.goats_in_hand, pos.goats_captured)
    assert ENGINE.from_position(initial_position()) == initial_state()


def test_legal_moves_is_a_list_in_r10_order():
    s = ENGINE.initial_state()
    moves = ENGINE.legal_moves(s)
    assert isinstance(moves, list)
    assert moves == list(rules.legal_moves(s))


def test_apply_does_not_mutate():
    s = ENGINE.initial_state()
    before = (s.board, s.to_move, s.goats_in_hand, s.ply)
    t = ENGINE.apply(s, ENGINE.legal_moves(s)[0])
    assert (s.board, s.to_move, s.goats_in_hand, s.ply) == before
    assert t.ply == 1


def test_winner_uses_framework_strings():
    """R8 through the adapter: 'TIGER', 'GOAT' or None for a draw."""
    assert ENGINE.winner(from_text(TRAPPED, "TIGER", 10, 0)) == "GOAT"
    assert ENGINE.winner(from_text(TRAPPED, "TIGER", 5, 5)) == "TIGER"
    draw = from_text(MOVEMENT, "GOAT", 0, 4, ply=rules.MOVE_CAP)
    assert ENGINE.is_terminal(draw) and ENGINE.winner(draw) is None


def test_search_rejects_unknown_evaluator_and_algorithm():
    s = ENGINE.initial_state()
    with pytest.raises(ValueError):
        ENGINE.search(s, 2, ALPHABETA, "fancy", SearchStats())
    with pytest.raises(ValueError):
        ENGINE.search(s, 2, "negamax", DESIGNED, SearchStats())


@pytest.mark.parametrize("algorithm", [MINIMAX, ALPHABETA])
@pytest.mark.parametrize("evaluator", [DESIGNED, BASELINE])
def test_search_returns_result_with_pv(algorithm, evaluator):
    """§6.5: search returns SearchResult(move, score, pv) and counts nodes."""
    s = ENGINE.initial_state()
    stats = SearchStats()
    result = ENGINE.search(s, 2, algorithm, evaluator, stats)
    assert isinstance(result, SearchResult)
    assert result.move in ENGINE.legal_moves(s)
    assert result.pv and result.pv[0] is result.move
    assert stats.nodes > 0


def test_check_engine_reports_no_failures():
    """§6.5: python -m experiments check-engine passes with 0 failures."""
    assert check_engine(ENGINE, log=lambda *args: None)
