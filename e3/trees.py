"""Synthetic uniform game trees, where the textbook node-count formulas hold exactly.

A UniformTree has branching factor b and depth d. Its states are paths of
child indices from the root (the same idea as the textbook tree in
tests/test_search.py); the root is MAX and levels alternate. Every leaf sits at
depth d and is reached through the depth-0 cutoff, so `evaluate` returns the
leaf's value and SearchStats.evals counts leaves. Leaf values are distinct
integers drawn from a seeded generator, so there are no ties.
"""
from __future__ import annotations

import random
from fractions import Fraction
from typing import List, Tuple


def minimax_nodes(b: int, d: int) -> int:
    """Nodes minimax expands on a uniform tree: 1 + b + b^2 + ... + b^d."""
    return sum(b ** i for i in range(d + 1))


def minimax_leaves(b: int, d: int) -> int:
    """Leaves minimax evaluates: b^d (also alpha-beta's worst case)."""
    return b ** d


def knuth_moore_leaves(b: int, d: int) -> int:
    """Leaves alpha-beta evaluates with perfect ordering: b^ceil(d/2) + b^floor(d/2) - 1."""
    return b ** ((d + 1) // 2) + b ** (d // 2) - 1


class UniformTree:
    """§6.2 game protocol over a uniform tree with seeded, distinct leaf values."""

    def __init__(self, b: int, d: int, seed: int) -> None:
        self.b = b
        self.d = d
        rng = random.Random(seed)
        n = b ** d
        self.leaves: List[int] = rng.sample(range(-10 * n, 10 * n), n)

    @classmethod
    def worst_case(cls, b: int, d: int) -> "UniformTree":
        """A tree whose leaves are placed so alpha-beta in R10 order prunes nothing.

        Built top-down with the window alpha-beta will have at each node: every
        child is better for the side to move than the one before it (so the
        worst move always comes first), and every value stays strictly inside
        the (alpha, beta) window it is searched with, so `alpha >= beta` never
        happens. Exact fractions keep the windows exact; siblings never tie
        (values may repeat in unrelated subtrees, which cannot cause a cutoff).
        """
        tree = cls(b, d, seed=0)
        leaves: List[Fraction] = []

        def build(lo: Fraction, hi: Fraction, target: Fraction, depth: int, maximizing: bool):
            if depth == 0:
                leaves.append(target)
                return
            if maximizing:
                # Increasing children ending at target, all above lo: each one raises alpha.
                targets = [lo + (target - lo) * (k + 1) / b for k in range(b)]
                for k, t in enumerate(targets):
                    build(lo if k == 0 else targets[k - 1], hi, t, depth - 1, False)
            else:
                # Decreasing children ending at target, all below hi: each one lowers beta.
                targets = [hi - (hi - target) * (k + 1) / b for k in range(b)]
                for k, t in enumerate(targets):
                    build(lo, hi if k == 0 else targets[k - 1], t, depth - 1, True)

        build(Fraction(0), Fraction(1), Fraction(1, 2), d, True)
        tree.leaves = leaves
        return tree

    def initial_state(self) -> Tuple[int, ...]:
        return ()

    def legal_moves(self, path):
        return list(range(self.b)) if len(path) < self.d else []

    def apply(self, path, move):
        return path + (move,)

    def is_terminal(self, path) -> bool:
        return False                       # leaves are reached by the depth cutoff

    def utility(self, path, ply_from_root):
        raise AssertionError("a uniform tree has no terminal states")

    def is_max_to_move(self, path) -> bool:
        return len(path) % 2 == 0

    def evaluate(self, path) -> float:
        """Value of the leaf at `path` (path read as a base-b number)."""
        index = 0
        for i in path:
            index = index * self.b + i
        return self.leaves[index]
