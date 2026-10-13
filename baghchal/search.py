"""Minimax and alpha-beta search (PRD §6.3).

Authorship: written by Claude Code on 2026-10-13 at Pranav's direction (PRD §10).
Owner from here: Shalom, who reviews it and must be able to explain it at the viva.

The search sees only the §6.2 game protocol (`game.legal_moves`, `game.apply`,
`game.is_terminal`, `game.utility`, `game.is_max_to_move`) and does not import
baghchal.rules, so the same code runs on the textbook tree in the tests and on
Bagh-Chal. Tigers are MAX and goats are MIN (R9); every value is from the
tiger's side.

Both algorithms follow the same skeleton (Russell & Norvig, Ch. 5):

    1. count the node                         (stats.nodes += 1, first statement)
    2. terminal?  -> return utility(state, ply)  (exact win/loss/draw, R9)
    3. depth 0?   -> return evaluate(state)       (heuristic estimate at the cutoff)
    4. otherwise  -> try every child in R10 order, keep the best for the side to move

Alpha-beta adds two bounds, alpha (MAX's guaranteed value so far on this path)
and beta (MIN's), and stops looking at a node's remaining children as soon as
alpha >= beta, because the opponent would never let play reach this node.
"""
from __future__ import annotations

from typing import Any, Callable, List, Tuple

from experiments.engine_api import ALGORITHMS, ALPHABETA, MINIMAX, SearchResult, SearchStats

__all__ = ["minimax", "alphabeta", "choose_move", "SearchResult", "SearchStats",
           "MINIMAX", "ALPHABETA", "ALGORITHMS"]

Evaluate = Callable[[Any], float]

INF = float("inf")


def minimax(game, state, depth: int, ply: int, evaluate: Evaluate,
            stats: SearchStats) -> Tuple[float, List[Any]]:
    """Depth-limited minimax value of `state` and its principal variation.

    Parameters
    ----------
    game     : object implementing the §6.2 Game protocol.
    state    : the node to search; never mutated (game.apply builds children).
    depth    : plies left to search below this node. depth == 0 is the cutoff (§5).
    ply      : plies from the search root to this node (0 at the root). It is
               the `d` in R9, passed as game.utility(state, ply), so wins found
               sooner score higher and losses later score less badly.
    evaluate : evaluate(state) -> float, the heuristic from the tiger's side,
               used only at a non-terminal cutoff; stats.evals counts its calls.
    stats    : SearchStats. `stats.nodes += 1` is the FIRST statement of every
               call, root and cutoff calls included (engine_api.py).

    Returns
    -------
    (value, pv): the backed-up minimax value, and the list of moves from this
    node along the best line ([] at a terminal or cutoff node).

    Children are visited in game.legal_moves order (R10). Ties keep the FIRST
    best move: strict > when MAX is to move, strict < when MIN is (R11).
    """
    # Count every call, before any test, so minimax and alpha-beta are counted
    # the same way (E1 compares these numbers). Depth 1 gives 1 + len(moves).
    stats.nodes += 1

    # A finished game is scored exactly, even when depth has also run out:
    # utility knows who won; the heuristic would only guess (§5, R9).
    if game.is_terminal(state):
        return game.utility(state, ply), []

    # Cutoff: no plies left, so estimate the position instead of searching on.
    if depth == 0:
        stats.evals += 1
        return evaluate(state), []

    maximizing = game.is_max_to_move(state)
    # Start below (MAX) or above (MIN) every possible value, so the first
    # child always becomes the provisional best.
    best_value = -INF if maximizing else INF
    best_pv: List[Any] = []

    for move in game.legal_moves(state):
        child = game.apply(state, move)
        value, child_pv = minimax(game, child, depth - 1, ply + 1, evaluate, stats)
        # Strict comparison: a later move that only ties never replaces an
        # earlier one, so the first best move in R10 order is kept (R11).
        if (value > best_value) if maximizing else (value < best_value):
            best_value = value
            best_pv = [move] + child_pv

    return best_value, best_pv


def alphabeta(game, state, depth: int, ply: int, alpha: float, beta: float,
              evaluate: Evaluate, stats: SearchStats) -> Tuple[float, List[Any]]:
    """Minimax with alpha-beta pruning. Same contract and return value as `minimax`.

    alpha : best value MAX can already guarantee on the path to this node.
    beta  : best value MIN can already guarantee on the path to this node.
    The root call uses alpha = -inf and beta = +inf. A node stops expanding
    its remaining children once alpha >= beta (§6.3).

    The root value always equals minimax's for the same (state, depth,
    evaluate). The chosen move may differ when moves tie (R11), which is why
    E1 compares scores, not moves. `stats.nodes += 1` is the first statement
    of every call, exactly as in minimax.
    """
    stats.nodes += 1                       # first statement, every call (as in minimax)

    if game.is_terminal(state):            # exact result beats any estimate (R9)
        return game.utility(state, ply), []

    if depth == 0:                         # cutoff: heuristic estimate
        stats.evals += 1
        return evaluate(state), []

    best_pv: List[Any] = []

    if game.is_max_to_move(state):
        best_value = -INF
        for move in game.legal_moves(state):
            value, child_pv = alphabeta(game, game.apply(state, move), depth - 1, ply + 1,
                                        alpha, beta, evaluate, stats)
            if value > best_value:         # strict: keep the first best move (R11)
                best_value = value
                best_pv = [move] + child_pv
            # MAX can now guarantee at least best_value on this path.
            if best_value > alpha:
                alpha = best_value
            # MIN already has an alternative worth beta or less higher up, so it
            # will never allow this node: the remaining children can't matter.
            if alpha >= beta:
                break
    else:
        best_value = INF
        for move in game.legal_moves(state):
            value, child_pv = alphabeta(game, game.apply(state, move), depth - 1, ply + 1,
                                        alpha, beta, evaluate, stats)
            if value < best_value:         # strict: keep the first best move (R11)
                best_value = value
                best_pv = [move] + child_pv
            # MIN can now hold MAX to at most best_value on this path.
            if best_value < beta:
                beta = best_value
            # MAX already has an alternative worth alpha or more higher up.
            if alpha >= beta:
                break

    return best_value, best_pv


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
    if depth < 1:
        raise ValueError(f"choose_move needs depth >= 1, got {depth}")
    if algorithm == MINIMAX:
        score, pv = minimax(game, state, depth, 0, evaluate, stats)
    elif algorithm == ALPHABETA:
        score, pv = alphabeta(game, state, depth, 0, -INF, INF, evaluate, stats)
    else:
        raise ValueError(f"algorithm must be one of {ALGORITHMS}, got {algorithm!r}")
    if not pv:  # only happens when the root is terminal: there is no move to choose
        raise ValueError("choose_move called on a terminal state")
    return SearchResult(move=pv[0], score=score, pv=pv)
