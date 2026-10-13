"""
Generate the fixed suite of test positions used by E1.

Why generate instead of hand-typing? Hand-typed positions can be illegal or
unreachable, and a typo silently poisons every benchmark. Positions taken
from real play are reachable by construction.

How it works
------------
1. Play games from the standard start. Each move is chosen epsilon-greedily:
   with probability `epsilon` a uniformly random legal move, otherwise the
   engine's own alpha-beta move at a shallow depth. Pure random play is not
   used because random goats are captured long before the placement phase
   ends, so the movement phase would almost never be reached.
2. Snapshot every non-terminal state into a candidate pool, skipping the
   first few plies (the opening is nearly empty and uninteresting).
3. Pick the suite from the pool with fixed quotas: half placement, half
   movement, and within each phase as close to half tiger-to-move and half
   goat-to-move as the pool allows.

Everything is driven by one integer seed, so `--seed 2026` always produces
the same file. The seed and parameters are written into the file's metadata.
"""
from __future__ import annotations

import random
from datetime import datetime, timezone
from typing import Dict, List, Tuple

from .engine_api import ALPHABETA, DESIGNED, Engine, SearchStats
from .position import GOAT, MOVEMENT, PLACEMENT, TIGER, Position


def _choose(engine: Engine, state, rng: random.Random, epsilon: float, depth: int):
    moves = engine.legal_moves(state)
    if not moves:
        return None
    if rng.random() < epsilon:
        return rng.choice(moves)
    return engine.search(state, depth, ALPHABETA, DESIGNED, SearchStats()).move


def collect_candidates(engine: Engine, rng: random.Random, games: int, epsilon: float,
                       depth: int, skip_plies: int, max_plies: int) -> Dict[str, Position]:
    """Play `games` games and return every distinct non-terminal snapshot, keyed by Position.key()."""
    pool: Dict[str, Position] = {}
    for _ in range(games):
        state = engine.initial_state()
        for ply in range(max_plies):
            if engine.is_terminal(state):
                break
            if ply >= skip_plies and engine.legal_moves(state):
                pos = engine.to_position(state).validate()
                pool.setdefault(pos.key(), pos)
            move = _choose(engine, state, rng, epsilon, depth)
            if move is None:
                break
            state = engine.apply(state, move)
    return pool


def select_suite(pool: Dict[str, Position], rng: random.Random,
                 per_phase: int) -> List[Position]:
    """Choose `per_phase` placement and `per_phase` movement positions, balancing side to move."""
    buckets: Dict[Tuple[str, str], List[Position]] = {}
    for key in sorted(pool):                      # sorted -> deterministic before shuffling
        p = pool[key]
        buckets.setdefault((p.phase, p.to_move), []).append(p)
    for b in buckets.values():
        rng.shuffle(b)

    suite: List[Position] = []
    for phase in (PLACEMENT, MOVEMENT):
        tigers = buckets.get((phase, TIGER), [])
        goats = buckets.get((phase, GOAT), [])
        if len(tigers) + len(goats) < per_phase:
            raise RuntimeError(
                f"only {len(tigers) + len(goats)} distinct {phase}-phase positions found, "
                f"need {per_phase}. Increase --games or lower --epsilon."
            )
        want_goat = (per_phase + 1) // 2
        take_goat = min(want_goat, len(goats))
        take_tiger = min(per_phase - take_goat, len(tigers))
        take_goat = per_phase - take_tiger         # top up from goats if tigers ran short
        chosen = goats[:take_goat] + tigers[:take_tiger]
        # Order inside a phase: by goats on board, so the file reads early -> late game.
        chosen.sort(key=lambda p: (p.goats_on_board + p.goats_captured, p.key()))
        suite.extend(chosen)

    prefix = {PLACEMENT: "P", MOVEMENT: "M"}
    counters = {PLACEMENT: 0, MOVEMENT: 0}
    numbered = []
    for p in suite:
        counters[p.phase] += 1
        numbered.append(Position(
            board=p.board, to_move=p.to_move, goats_in_hand=p.goats_in_hand,
            goats_captured=p.goats_captured,
            id=f"{prefix[p.phase]}{counters[p.phase]:02d}", note=p.note,
        ))
    return numbered


def generate(engine: Engine, seed: int = 2026, per_phase: int = 15, games: int = 200,
             epsilon: float = 0.3, depth: int = 2, skip_plies: int = 6,
             max_plies: int = 300) -> Tuple[List[Position], dict]:
    rng = random.Random(seed)
    pool = collect_candidates(engine, rng, games, epsilon, depth, skip_plies, max_plies)
    suite = select_suite(pool, rng, per_phase)
    meta = {
        "generated_by": "experiments.generate_positions",
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "seed": seed, "per_phase": per_phase, "games": games, "epsilon": epsilon,
        "policy_depth": depth, "skip_plies": skip_plies, "max_plies": max_plies,
        "candidate_pool_size": len(pool),
    }
    return suite, meta
