"""BaghChalGame: the PRD §6.2 game protocol that search.py runs against.

Design note
-----------
A stateless wrapper that delegates to rules.py. The rule functions are bound as
staticmethods, so a call like game.legal_moves(s) costs no extra Python frame.
Complexity is that of the rules functions (see rules.py); is_max_to_move is O(1).
"""
from __future__ import annotations

from . import rules
from .board import TIGER
from .state import State, initial_state


class BaghChalGame:
    """Game protocol (§6.2): tigers are MAX, goats are MIN (R9)."""

    legal_moves = staticmethod(rules.legal_moves)     # R5–R7, R10 order
    apply = staticmethod(rules.apply)                 # new state, never mutates
    is_terminal = staticmethod(rules.is_terminal)     # R8
    utility = staticmethod(rules.utility)             # R9, terminal states only
    initial_state = staticmethod(initial_state)       # R3

    @staticmethod
    def is_max_to_move(state: State) -> bool:
        """True when tigers are to move (R9: tigers are MAX)."""
        return state.to_move == TIGER
