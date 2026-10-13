"""Minimax and alpha-beta search (PRD §6.3). Function bodies are written by Shalom.

This file is a stub: signatures and contracts only. Per CLAUDE.md and PRD
§6.1/§10, the bodies of minimax, alphabeta and choose_move are written by a
team member, not generated.

The search sees only the §6.2 game protocol (`game.legal_moves`, `game.apply`,
`game.is_terminal`, `game.utility`, `game.is_max_to_move`) and must not import
baghchal.rules, so it can be tested on a textbook tree as well as Bagh-Chal.
Tigers are MAX and goats are MIN (R9); values are from the tiger's side.
"""
from __future__ import annotations

from typing import Any, Callable, List, Tuple

from experiments.engine_api import ALGORITHMS, ALPHABETA, MINIMAX, SearchResult, SearchStats

__all__ = ["minimax", "alphabeta", "choose_move", "SearchResult", "SearchStats",
           "MINIMAX", "ALPHABETA", "ALGORITHMS"]

Evaluate = Callable[[Any], float]


def minimax(game, state, depth: int, ply: int, evaluate: Evaluate,
            stats: SearchStats) -> Tuple[float, List[Any]]:
    """Depth-limited minimax value of `state` and its principal variation.

    Parameters
    ----------
    game     : object implementing the §6.2 Game protocol.
    state    : the node to search; never mutated (use game.apply for children).
    depth    : plies left to search below this node. depth == 0 is the cutoff (§5).
    ply      : plies from the search root to this node (0 at the root). It is
               the `d` in R9, passed as game.utility(state, ply), so wins found
               sooner score higher and losses later score less badly.
    evaluate : evaluate(state) -> float, the heuristic from the tiger's side,
               used only at a non-terminal cutoff. Increment stats.evals once
               per call to it (optional).
    stats    : SearchStats. `stats.nodes += 1` must be the FIRST statement of
               every call, root and cutoff calls included (engine_api.py).

    Returns
    -------
    (value, pv) where value is the backed-up minimax value (terminal states use
    game.utility, cutoff states use evaluate) and pv is the list of moves from
    this node along the best line ([] at a terminal or cutoff node).

    Children are visited in game.legal_moves order (R10). Ties keep the FIRST
    best move: strict > when MAX is to move, strict < when MIN is (R11).
    """
    raise NotImplementedError("minimax: to be written by Shalom (PRD §6.3)")


def alphabeta(game, state, depth: int, ply: int, alpha: float, beta: float,
              evaluate: Evaluate, stats: SearchStats) -> Tuple[float, List[Any]]:
    """Minimax with alpha-beta pruning. Same contract and return value as `minimax`.

    alpha : best value MAX can already guarantee on the path to this node.
    beta  : best value MIN can already guarantee on the path to this node.
    The root call uses alpha = -inf and beta = +inf. Stop expanding a node's
    remaining children once alpha >= beta (§6.3).

    The root value must equal minimax's for the same (state, depth, evaluate);
    the chosen move may differ when moves tie (R11), which is why E1 compares
    scores, not moves. `stats.nodes += 1` is the first statement of every call.
    """
    raise NotImplementedError("alphabeta: to be written by Shalom (PRD §6.3)")


def choose_move(game, state, depth: int, algorithm: str, evaluate: Evaluate,
                stats: SearchStats) -> SearchResult:
    """Search `state` to `depth` plies and return SearchResult(move, score, pv).

    algorithm : 'minimax' or 'alphabeta' (MINIMAX / ALPHABETA); anything else
                raises ValueError.
    Requires depth >= 1 and a non-terminal `state`. The root call is made with
    ply = 0 (and alpha = -inf, beta = +inf for alpha-beta). `move` is pv[0],
    one of game.legal_moves(state); `score` is the root value from the tiger's
    side; `pv` is the principal variation starting with `move`.
    """
    raise NotImplementedError("choose_move: to be written by Shalom (PRD §6.3)")
