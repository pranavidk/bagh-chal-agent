"""
E1 -- plain Minimax vs Alpha-Beta.

For every test position, every depth and both algorithms, run one search and
record:
    nodes   -- stats.nodes after the search (deterministic: same every run)
    time    -- wall-clock time of the search() call, repeated R times;
               the median is reported, the minimum is kept as well
    score   -- the backed-up root value
    move    -- the move returned (logged, but NOT used as a correctness check)

Correctness check: alpha-beta is guaranteed to return the same root VALUE as
minimax, not the same move -- when two moves tie, which one comes back
depends on move order and tie-breaking. So we compare scores. A score
mismatch means a bug in the pruning, and is reported loudly.

A second check: node counts must be identical across the R repeats. If they
are not, the search is non-deterministic (e.g. iterating over a set), which
would make every node-count comparison meaningless.
"""
from __future__ import annotations

import csv
import statistics
import sys
import time
from pathlib import Path
from typing import Iterable, List, Sequence

from .engine_api import ALPHABETA, DESIGNED, MINIMAX, Engine, SearchStats
from .position import Position

E1_FIELDS = ["position_id", "phase", "to_move", "depth", "algorithm", "nodes", "evals",
             "time_ms_median", "time_ms_min", "repeats", "score", "move"]

SCORE_TOLERANCE = 1e-9


def run_one(engine: Engine, pos: Position, depth: int, algorithm: str,
            evaluator: str, repeats: int) -> dict:
    times, nodes_seen, evals, result = [], set(), 0, None
    for _ in range(repeats):
        state = engine.from_position(pos)   # fresh state each run: no leaked mutation or caches
        stats = SearchStats()
        t0 = time.perf_counter()
        result = engine.search(state, depth, algorithm, evaluator, stats)
        times.append((time.perf_counter() - t0) * 1000.0)
        nodes_seen.add(stats.nodes)
        evals = stats.evals
    if len(nodes_seen) != 1:
        raise RuntimeError(
            f"{pos.id} depth {depth} {algorithm}: node count changed between repeats "
            f"{sorted(nodes_seen)} -- the search is not deterministic"
        )
    nodes = nodes_seen.pop()
    if nodes <= 0:
        raise RuntimeError(f"{pos.id} depth {depth} {algorithm}: stats.nodes is 0 -- "
                           "the engine is not incrementing the node counter")
    return {
        "position_id": pos.id, "phase": pos.phase, "to_move": pos.to_move,
        "depth": depth, "algorithm": algorithm, "nodes": nodes, "evals": evals,
        "time_ms_median": round(statistics.median(times), 4),
        "time_ms_min": round(min(times), 4), "repeats": repeats,
        "score": result.score, "move": str(result.move),
    }


def run_e1(engine: Engine, positions: Sequence[Position], depths: Iterable[int] = (2, 3, 4),
           out_csv="results/e1_raw.csv", repeats: int = 3, evaluator: str = DESIGNED,
           log=print) -> List[dict]:
    """Run E1 and stream rows to out_csv as they finish (so a long run can be watched)."""
    depths = list(depths)
    out = Path(out_csv)
    out.parent.mkdir(parents=True, exist_ok=True)
    rows, mismatches = [], []
    total = len(positions) * len(depths)
    done = 0
    with out.open("w", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=E1_FIELDS)
        writer.writeheader()
        for depth in depths:
            for pos in positions:
                pair = {}
                for algo in (MINIMAX, ALPHABETA):
                    row = run_one(engine, pos, depth, algo, evaluator, repeats)
                    writer.writerow(row)
                    rows.append(row)
                    pair[algo] = row
                fh.flush()
                mm, ab = pair[MINIMAX], pair[ALPHABETA]
                if abs(float(mm["score"]) - float(ab["score"])) > SCORE_TOLERANCE:
                    mismatches.append((pos.id, depth, mm["score"], ab["score"]))
                done += 1
                log(f"[E1 {done:>3}/{total}] d={depth} {pos.id:<4} "
                    f"minimax {mm['nodes']:>9,} nodes {mm['time_ms_median']:>9.2f} ms | "
                    f"alpha-beta {ab['nodes']:>9,} nodes {ab['time_ms_median']:>9.2f} ms")
    if mismatches:
        print("\n!! ROOT SCORE MISMATCH -- alpha-beta disagrees with minimax:", file=sys.stderr)
        for pid, d, s1, s2 in mismatches:
            print(f"   {pid} depth {d}: minimax={s1} alphabeta={s2}", file=sys.stderr)
    else:
        log(f"\nCorrectness: alpha-beta matched minimax's root score on all {total} "
            f"position/depth pairs.")
    return rows


def score_mismatches(rows: Sequence[dict]) -> List[tuple]:
    """Re-check a finished results file for minimax/alpha-beta score disagreements."""
    by_key = {}
    for r in rows:
        by_key.setdefault((r["position_id"], int(r["depth"])), {})[r["algorithm"]] = float(r["score"])
    return [(k[0], k[1], v[MINIMAX], v[ALPHABETA]) for k, v in sorted(by_key.items())
            if MINIMAX in v and ALPHABETA in v
            and abs(v[MINIMAX] - v[ALPHABETA]) > SCORE_TOLERANCE]
