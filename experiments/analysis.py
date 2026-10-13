"""
Turn raw experiment CSVs into the summary numbers and tables used in the report.

E1 summary, per (phase, depth, algorithm):
    median / mean nodes, median time per move, median effective branching factor,
    and for alpha-beta the median fraction of minimax's nodes it needed.

Effective branching factor b*: the uniform branching factor a tree of depth d
would need to contain the same number of nodes N. Because nodes are counted at
every call including the root,
        N = 1 + b* + b*^2 + ... + b*^d
which we solve for b* by bisection. For plain minimax b* is close to the true
average branching factor; for alpha-beta with good ordering it falls toward
sqrt(b), which is the b^(d/2) result from the textbook.

E2 summary, per side the designed evaluator played:
    wins / draws / losses, win rate with a 95% Wilson interval, mean goats captured.
The interval matters: with 50 games, a 60% win rate has an interval of roughly
46-72%, and the report should say so rather than over-claim.
"""
from __future__ import annotations

import csv
import math
import statistics
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Sequence

from .engine_api import ALPHABETA, MINIMAX

ALL_PHASES = "all"


# ---- helpers ----------------------------------------------------------------

def read_csv(path) -> List[dict]:
    with Path(path).open(newline="") as fh:
        return list(csv.DictReader(fh))


def effective_branching_factor(nodes: int, depth: int) -> float:
    """Solve nodes = sum_{i=0..depth} b^i for b (b >= 0)."""
    nodes = float(nodes)
    if depth <= 0 or nodes <= 1:
        return 0.0
    def total(b):
        return float(depth + 1) if b == 1 else (b ** (depth + 1) - 1) / (b - 1)
    lo, hi = 0.0, max(2.0, nodes)
    for _ in range(200):
        mid = (lo + hi) / 2
        if total(mid) < nodes:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def wilson_interval(wins: int, n: int, z: float = 1.96):
    if n == 0:
        return (0.0, 0.0)
    p = wins / n
    denom = 1 + z * z / n
    centre = (p + z * z / (2 * n)) / denom
    half = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / denom
    return (max(0.0, centre - half), min(1.0, centre + half))


# ---- E1 ---------------------------------------------------------------------

def summarise_e1(rows: Sequence[dict]) -> List[dict]:
    rows = [dict(r, depth=int(r["depth"]), nodes=int(r["nodes"]),
                 time_ms_median=float(r["time_ms_median"])) for r in rows]
    mm_nodes = {(r["position_id"], r["depth"]): r["nodes"] for r in rows if r["algorithm"] == MINIMAX}

    groups: Dict[tuple, List[dict]] = defaultdict(list)
    for r in rows:
        groups[(r["phase"], r["depth"], r["algorithm"])].append(r)
        groups[(ALL_PHASES, r["depth"], r["algorithm"])].append(r)

    out = []
    for (phase, depth, algo), rs in sorted(groups.items(),
                                           key=lambda kv: (kv[0][0] != ALL_PHASES, kv[0])):
        nodes = [r["nodes"] for r in rs]
        ratios = [r["nodes"] / mm_nodes[(r["position_id"], depth)]
                  for r in rs if (r["position_id"], depth) in mm_nodes]
        out.append({
            "phase": phase, "depth": depth, "algorithm": algo, "positions": len(rs),
            "nodes_median": statistics.median(nodes),
            "nodes_mean": round(statistics.mean(nodes), 1),
            "nodes_min": min(nodes), "nodes_max": max(nodes),
            "time_ms_median": round(statistics.median(r["time_ms_median"] for r in rs), 3),
            "ebf_median": round(statistics.median(effective_branching_factor(n, depth)
                                                  for n in nodes), 3),
            "fraction_of_minimax_nodes": round(statistics.median(ratios), 4) if ratios else "",
        })
    return out


# ---- E2 ---------------------------------------------------------------------

def summarise_e2(rows: Sequence[dict]) -> List[dict]:
    by_side: Dict[str, List[dict]] = defaultdict(list)
    for r in rows:
        by_side[r["designed_side"]].append(r)
    out = []
    for side in sorted(by_side, key=lambda s: s != "TIGER"):
        rs = by_side[side]
        n = len(rs)
        w = sum(r["result"] == "W" for r in rs)
        d = sum(r["result"] == "D" for r in rs)
        l = sum(r["result"] == "L" for r in rs)
        lo, hi = wilson_interval(w, n)
        out.append({
            "designed_side": side, "games": n, "wins": w, "draws": d, "losses": l,
            "win_rate": round(w / n, 3) if n else 0.0,
            "win_rate_ci95_low": round(lo, 3), "win_rate_ci95_high": round(hi, 3),
            "mean_goats_captured": round(statistics.mean(int(r["goats_captured"]) for r in rs), 2),
            "mean_plies": round(statistics.mean(int(r["plies"]) for r in rs), 1),
            "capped_games": sum(str(r["capped"]) == "True" for r in rs),
        })
    return out


# ---- writing ----------------------------------------------------------------

def write_csv(path, rows: Sequence[dict]) -> None:
    if not rows:
        return
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with Path(path).open("w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)


def e1_markdown(summary: Sequence[dict]) -> str:
    """Report-ready table: one row per (phase, depth), minimax and alpha-beta side by side."""
    idx = {(s["phase"], s["depth"], s["algorithm"]): s for s in summary}
    lines = [
        "| Phase | Depth | Minimax nodes (median) | Alpha-beta nodes (median) | "
        "Alpha-beta / minimax | Minimax ms | Alpha-beta ms | b* minimax | b* alpha-beta |",
        "|---|---|---:|---:|---:|---:|---:|---:|---:|",
    ]
    for (phase, depth) in sorted({(k[0], k[1]) for k in idx},
                                 key=lambda k: (k[0] != ALL_PHASES, k[0], k[1])):
        mm, ab = idx.get((phase, depth, MINIMAX)), idx.get((phase, depth, ALPHABETA))
        if not (mm and ab):
            continue
        frac = ab["fraction_of_minimax_nodes"]
        lines.append(
            f"| {phase} | {depth} | {mm['nodes_median']:,.0f} | {ab['nodes_median']:,.0f} | "
            f"{float(frac) * 100:.1f}% | {_ms(mm['time_ms_median'])} | {_ms(ab['time_ms_median'])} | "
            f"{mm['ebf_median']:.2f} | {ab['ebf_median']:.2f} |"
        )
    return "\n".join(lines)


def _ms(x: float) -> str:
    return f"{x:,.1f}" if x >= 10 else f"{x:.3f}"


def e2_markdown(summary: Sequence[dict]) -> str:
    lines = [
        "| Designed eval plays | Games | W | D | L | Win rate (95% CI) | Mean goats captured |",
        "|---|---:|---:|---:|---:|---|---:|",
    ]
    for s in summary:
        lines.append(
            f"| {s['designed_side'].title()} | {s['games']} | {s['wins']} | {s['draws']} | "
            f"{s['losses']} | {s['win_rate'] * 100:.0f}% ({s['win_rate_ci95_low'] * 100:.0f}–"
            f"{s['win_rate_ci95_high'] * 100:.0f}%) | {s['mean_goats_captured']:.2f} |"
        )
    return "\n".join(lines)
