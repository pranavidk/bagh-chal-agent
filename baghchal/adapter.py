"""Adapter: implements experiments.engine_api.Engine for the experiment framework (PRD §6.5).

Design note
-----------
A thin, stateless bridge. Conversion goes through state.py (O(25), boundaries
only); stepping delegates to rules.py; search() maps the framework's
evaluator name to an evaluation function and calls search.choose_move on a
BaghChalGame. The framework times the whole search() call itself, so nothing
here measures time.
"""
from __future__ import annotations

from typing import Any, List, Optional

from experiments.engine_api import BASELINE, DESIGNED, SearchResult, SearchStats
from experiments.position import Position

from . import evaluation, rules, search
from .board import GOAT, TIGER
from .game import BaghChalGame
from .state import State, from_position, initial_state, to_position

_WINNER_NAMES = {TIGER: "TIGER", GOAT: "GOAT"}


def evaluator_for(name: str):
    """'designed' -> designed_eval, 'baseline' -> baseline_eval; anything else is a ValueError."""
    if name == DESIGNED:
        return evaluation.designed_eval
    if name == BASELINE:
        return evaluation.baseline_eval
    raise ValueError(f"evaluator must be {DESIGNED!r} or {BASELINE!r}, got {name!r}")


class Adapter:
    """The engine side of experiments/engine_api.py."""

    def __init__(self) -> None:
        self.game = BaghChalGame()

    # --- conversion ----------------------------------------------------------
    def from_position(self, pos: Position) -> State:
        return from_position(pos)

    def to_position(self, state: State) -> Position:
        return to_position(state)

    # --- game stepping ---------------------------------------------------------
    def initial_state(self) -> State:
        return initial_state()

    def legal_moves(self, state: State) -> List[Any]:
        return list(rules.legal_moves(state))

    def apply(self, state: State, move) -> State:
        return rules.apply(state, move)

    def is_terminal(self, state: State) -> bool:
        return rules.is_terminal(state)

    def winner(self, state: State) -> Optional[str]:
        """'TIGER', 'GOAT', or None for a draw (R8)."""
        result = rules.winner(state)
        return None if result is None else _WINNER_NAMES[result]

    # --- search ------------------------------------------------------------------
    def search(self, state: State, depth: int, algorithm: str, evaluator: str,
               stats: SearchStats) -> SearchResult:
        evaluate = evaluator_for(evaluator)
        if algorithm not in search.ALGORITHMS:
            raise ValueError(f"algorithm must be one of {search.ALGORITHMS}, got {algorithm!r}")
        return search.choose_move(self.game, state, depth, algorithm, evaluate, stats)
