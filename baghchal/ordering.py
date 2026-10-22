"""Move ordering for experiment E3: alpha-beta's best case and worst case.

Authorship: written by Claude Code on 2026-10-22 at Pranav's direction (PRD §10).

Alpha-beta's saving depends entirely on the order in which it visits moves
(Russell & Norvig §5.3):

    worst case  worst move first at every node -> no cutoffs, O(b^d), same as minimax
    best case   best move first at every node  -> O(b^(d/2)) (Knuth & Moore 1975)

search.py visits children in game.legal_moves order (R10) and sees nothing
but the §6.2 game protocol. So instead of changing the search, OrderedGame
wraps a game and returns the same legal moves in a different order. The
minimax and alpha-beta code that runs is exactly the code E1 measured.

Four orderings:

    NATURAL    R10 order (ascending point index), what E1 used.
    HEURISTIC  children sorted by the static evaluation of the child, best for
               the side to move first. Cheap: one evaluate() per child. This is
               the practical ordering a real agent would use (PRD §11.1).
    BEST       an oracle: children sorted by their exact depth-limited value,
               computed by a separate alpha-beta search whose nodes are NOT
               counted. It realises the theoretical best case, at a cost far
               higher than the search it orders. It measures the bound; it is
               not a way to play faster.
    WORST      the oracle order reversed: worst move for the side to move first.

Ties keep R10 order (Python's sort is stable), so every ordering is
deterministic (C6) and the R11 first-best-move rule still applies within it.
"""
from __future__ import annotations

from typing import Any, Callable, List

from .search import ALPHABETA, INF, SearchResult, SearchStats, alphabeta, choose_move

NATURAL = "natural"
HEURISTIC = "heuristic"
BEST = "best"
WORST = "worst"
ORDERINGS = (WORST, NATURAL, HEURISTIC, BEST)

Evaluate = Callable[[Any], float]


def _state_ply(state) -> int:
    """Plies since the game start, for baghchal.state.State (§5: n)."""
    return state.ply


class OrderedGame:
    """§6.2 game protocol around `game`, with legal_moves reordered by `order`.

    depth    : the depth of the search this game will be used for.
    root_ply : ply_of(root state). Remaining depth at a node is
               depth - (ply_of(node) - root_ply); the oracle needs it so that it
               scores each child to exactly the depth the real search will.
    ply_of   : maps a state to its ply count (State.ply for Bagh-Chal, len(path)
               for a tree whose states are index paths).
    """

    def __init__(self, game, order: str, evaluate: Evaluate, depth: int,
                 root_ply: int = 0, ply_of: Callable[[Any], int] = _state_ply) -> None:
        if order not in ORDERINGS:
            raise ValueError(f"order must be one of {ORDERINGS}, got {order!r}")
        self.game = game
        self.order = order
        self.evaluate = evaluate
        self.depth = depth
        self.root_ply = root_ply
        self.ply_of = ply_of

    # Delegated unchanged: only the order of moves differs from the wrapped game.
    def apply(self, state, move):
        return self.game.apply(state, move)

    def is_terminal(self, state) -> bool:
        return self.game.is_terminal(state)

    def utility(self, state, ply_from_root: int) -> float:
        return self.game.utility(state, ply_from_root)

    def is_max_to_move(self, state) -> bool:
        return self.game.is_max_to_move(state)

    def legal_moves(self, state) -> List[Any]:
        """The wrapped game's legal moves (R10 order), reordered by self.order."""
        moves = list(self.game.legal_moves(state))
        if self.order == NATURAL or len(moves) < 2:
            return moves
        maximizing = self.game.is_max_to_move(state)
        if self.order == HEURISTIC:
            values = [self.evaluate(self.game.apply(state, m)) for m in moves]
        else:
            values = self._oracle_values(state, moves)
        # Best for the side to move first: descending for MAX (tigers), ascending
        # for MIN (goats). WORST flips it. sorted() is stable, so ties keep R10 order.
        best_first_sign = -1 if maximizing else 1
        sign = -best_first_sign if self.order == WORST else best_first_sign
        ranked = sorted(range(len(moves)), key=lambda i: sign * values[i])
        return [moves[i] for i in ranked]

    def _oracle_values(self, state, moves) -> List[float]:
        """Exact value of each child to the depth the real search will reach.

        Uses plain alpha-beta on the wrapped game (R10 order) with its own
        SearchStats, so none of this work shows up in the measured node count.
        The child's ply from the root is passed on, so R9's win-distance term
        is the same as in the real search.
        """
        ply = self.ply_of(state) - self.root_ply      # plies from the search root
        remaining = self.depth - ply                  # >= 1: search only asks at depth > 0
        scratch = SearchStats()
        return [alphabeta(self.game, self.game.apply(state, m), remaining - 1, ply + 1,
                          -INF, INF, self.evaluate, scratch)[0]
                for m in moves]


def ordered_search(game, state, depth: int, algorithm: str, order: str, evaluate: Evaluate,
                   stats: SearchStats, ply_of: Callable[[Any], int] = _state_ply) -> SearchResult:
    """choose_move (search.py) on `game` with its moves visited in `order`.

    stats counts only the measured search, never the oracle's work.
    """
    wrapped = OrderedGame(game, order, evaluate, depth, root_ply=ply_of(state), ply_of=ply_of)
    return choose_move(wrapped, state, depth, algorithm, evaluate, stats)


__all__ = ["NATURAL", "HEURISTIC", "BEST", "WORST", "ORDERINGS", "OrderedGame",
           "ordered_search", "ALPHABETA"]
