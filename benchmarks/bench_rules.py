"""Rules hot-path benchmark (not part of pytest).

    python benchmarks/bench_rules.py

Collects about 3,000 states from seeded random games, then reports calls per
second for legal_moves (on fresh, un-memoised states) and apply, and nodes per
second for full-width perft to depth 4 from one placement-phase and one
movement-phase state. Each measurement is the best of 3 runs.
"""
from __future__ import annotations

import os
import platform
import random
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from baghchal.board import TIGER  # noqa: E402
from baghchal.rules import K_JUMP, apply, is_terminal, legal_moves  # noqa: E402
from baghchal.state import State, initial_state  # noqa: E402

SEED = 2026
TARGET_STATES = 3000
REPEATS = 3
TARGETS = {"legal_moves": 100_000, "apply": 200_000,
           "perft placement": 150_000, "perft movement": 150_000}


def collect_states(seed: int, n: int):
    """Non-terminal states from random games. Tigers capture so fast under random play that
    the movement phase is rare, so goats avoid captures when they can (still seeded)."""
    rng = random.Random(seed)
    states = []
    while len(states) < n:
        s = initial_state()
        while not is_terminal(s) and len(states) < n:
            states.append(s)
            moves = legal_moves(s)
            if s.to_move == TIGER:
                quiet = [m for m in moves if m.kind != K_JUMP]
                s = apply(s, rng.choice(quiet if quiet and rng.random() < 0.9 else moves))
            else:
                s = apply(s, rng.choice(moves))
    return states


def fresh(s: State) -> State:
    return State(s.board, s.to_move, s.goats_in_hand, s.goats_captured, s.ply,
                 s.tigers, s.history, s.reps, None)


def best_time(fn) -> float:
    best = float("inf")
    for _ in range(REPEATS):
        t0 = time.perf_counter()
        fn()
        best = min(best, time.perf_counter() - t0)
    return best


def perft_nodes(state: State, depth: int) -> int:
    """Nodes visited by full-width perft (every state, root included). Not a search."""
    if depth == 0 or is_terminal(state):
        return 1
    return 1 + sum(perft_nodes(apply(state, m), depth - 1) for m in legal_moves(state))


def main() -> None:
    states = collect_states(SEED, TARGET_STATES)
    placement = next(s for s in states if s.goats_in_hand > 0 and s.ply >= 6)
    # The first movement-phase state with a wide branching factor, so depth 4 is a real tree.
    movement = next(s for s in states if s.goats_in_hand == 0 and s.goats_captured <= 2
                    and len(legal_moves(s)) >= 12)
    rows = []

    batches = [[fresh(s) for s in states] for _ in range(REPEATS)]
    calls = len(states)

    def run_legal():
        for s in batches.pop():
            legal_moves(s)
    rows.append(("legal_moves", calls / best_time(run_legal), "calls/s"))

    pairs = [(s, m) for s in states for m in legal_moves(s)]

    def run_apply():
        for s, m in pairs:
            apply(s, m)
    rows.append(("apply", len(pairs) / best_time(run_apply), "calls/s"))

    for label, root in (("perft placement", placement), ("perft movement", movement)):
        nodes = perft_nodes(fresh(root), 4)
        elapsed = best_time(lambda root=root: perft_nodes(fresh(root), 4))
        rows.append((label, nodes / elapsed, f"nodes/s ({nodes:,} nodes)"))

    print(f"Python {platform.python_version()} on {platform.system()} {platform.machine()}; "
          f"seed {SEED}; {len(states):,} states; {len(pairs):,} apply pairs; best of {REPEATS}")
    print(f"{'measure':<17}{'rate':>12}  {'target':>9}  ok   unit")
    for label, rate, unit in rows:
        target = TARGETS[label]
        ok = "yes" if rate >= target else "NO"
        print(f"{label:<17}{rate:>12,.0f}  {target:>9,}  {ok:<4} {unit}")


if __name__ == "__main__":
    main()
