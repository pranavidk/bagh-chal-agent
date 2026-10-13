"""
E2 -- designed evaluation function vs a capture-count baseline.

Two matchups, both sides searching with alpha-beta at the same depth:
    A. designed plays TIGER  vs  baseline plays GOAT
    B. baseline plays TIGER  vs  designed plays GOAT
with N games each (default 50 per side, depth 3).

The determinism problem, and the fix
------------------------------------
Two deterministic agents playing from the same start play the SAME game every
time, so "50 games" would really be one game repeated 50 times. To get 50
different games, game i begins with a short random opening (default 4 plies)
drawn from random.Random(seed + i). The same opening i is used in matchup A
and matchup B, so the two sides are compared on identical starting
conditions (a paired design). Openings that end the game early are skipped
and redrawn with the next seed.

Draws: the engine's own terminal test handles threefold repetition and its
move cap. As a safety net the framework also stops any game after
`max_plies` plies and records it as a draw with capped=True.
"""
from __future__ import annotations

import csv
import random
import time
from pathlib import Path
from typing import List, Optional

from .engine_api import ALPHABETA, BASELINE, DESIGNED, Engine, SearchStats
from .position import GOAT, TIGER

E2_FIELDS = ["game", "designed_side", "opening_seed", "opening", "winner", "result",
             "goats_captured", "plies", "capped", "nodes_designed", "nodes_baseline",
             "time_s"]


def make_opening(engine: Engine, seed: int, plies: int):
    """Random opening of `plies` moves. Returns (state, moves) or None if it ended the game."""
    rng = random.Random(seed)
    state, moves = engine.initial_state(), []
    for _ in range(plies):
        legal = engine.legal_moves(state)
        if engine.is_terminal(state) or not legal:
            return None
        m = rng.choice(legal)
        moves.append(str(m))
        state = engine.apply(state, m)
    if engine.is_terminal(state):
        return None
    return state, moves


def play_game(engine: Engine, start_state, designed_side: str, depth: int,
              max_plies: int) -> dict:
    state = start_state
    nodes = {DESIGNED: 0, BASELINE: 0}
    plies, capped = 0, False
    while not engine.is_terminal(state):
        if plies >= max_plies:
            capped = True
            break
        side = engine.to_position(state).to_move
        evaluator = DESIGNED if side == designed_side else BASELINE
        stats = SearchStats()
        res = engine.search(state, depth, ALPHABETA, evaluator, stats)
        nodes[evaluator] += stats.nodes
        state = engine.apply(state, res.move)
        plies += 1
    winner: Optional[str] = None if capped else engine.winner(state)
    if winner is None:
        result = "D"
    else:
        result = "W" if winner == designed_side else "L"
    return {
        "winner": winner or "DRAW", "result": result,
        "goats_captured": engine.to_position(state).goats_captured,
        "plies": plies, "capped": capped,
        "nodes_designed": nodes[DESIGNED], "nodes_baseline": nodes[BASELINE],
    }


def run_e2(engine: Engine, games_per_side: int = 50, depth: int = 3, opening_plies: int = 4,
           seed: int = 2026, max_plies: int = 400, out_csv="results/e2_raw.csv",
           log=print) -> List[dict]:
    out = Path(out_csv)
    out.parent.mkdir(parents=True, exist_ok=True)

    # Draw the openings once so both matchups share them.
    openings, s = [], seed
    while len(openings) < games_per_side:
        o = make_opening(engine, s, opening_plies)
        if o is not None:
            openings.append((s, o))
        s += 1
        if s - seed > games_per_side * 20:
            raise RuntimeError("could not find enough non-terminal openings; lower --opening-plies")

    rows = []
    with out.open("w", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=E2_FIELDS)
        writer.writeheader()
        for designed_side in (TIGER, GOAT):
            for i, (oseed, (state, moves)) in enumerate(openings, start=1):
                t0 = time.perf_counter()
                g = play_game(engine, state, designed_side, depth, max_plies)
                row = {"game": i, "designed_side": designed_side, "opening_seed": oseed,
                       "opening": " ".join(moves), **g,
                       "time_s": round(time.perf_counter() - t0, 3)}
                writer.writerow(row)
                fh.flush()
                rows.append(row)
                log(f"[E2 designed={designed_side:<5} {i:>3}/{games_per_side}] "
                    f"{row['result']}  winner={row['winner']:<5} captured={row['goats_captured']} "
                    f"plies={row['plies']}{' (capped)' if row['capped'] else ''}")
    return rows
