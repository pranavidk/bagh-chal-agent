"""E3 runner: node counts for minimax and alpha-beta under each move ordering.

Two parts:

    positions  the 30 fixed Bagh-Chal positions (data/positions.json), depths
               2-4, designed evaluation. Minimax once (its count does not
               depend on order), alpha-beta under WORST, NATURAL, HEURISTIC, BEST.
    trees      synthetic uniform trees (e3/trees.py) where the formulas are exact:
               minimax b^d leaves, alpha-beta best case b^ceil(d/2) + b^floor(d/2) - 1,
               worst case b^d.

Every alpha-beta score is checked against minimax's; a mismatch aborts the run.
Time for BEST and WORST includes the oracle's own searches, so only the node
counts of those two configurations mean anything.
"""
from __future__ import annotations

import csv
import statistics
import time
from collections import defaultdict
from pathlib import Path
from typing import Dict, Iterable, List, Sequence

from baghchal.evaluation import designed_eval
from baghchal.game import BaghChalGame
from baghchal.ordering import BEST, HEURISTIC, NATURAL, ORDERINGS, WORST, ordered_search
from baghchal.search import ALPHABETA, MINIMAX, SearchStats
from baghchal.state import from_position
from experiments.analysis import effective_branching_factor
from experiments.position import Position

from .trees import UniformTree, knuth_moore_leaves, minimax_leaves, minimax_nodes

MM = "minimax"
CONFIGS = (MM,) + tuple(f"ab_{o}" for o in ORDERINGS)     # minimax, ab_worst, ab_natural, ...
CONFIG_LABEL = {MM: "Minimax", "ab_worst": "Alpha-beta, worst order",
                "ab_natural": "Alpha-beta, R10 order", "ab_heuristic": "Alpha-beta, heuristic order",
                "ab_best": "Alpha-beta, best order (oracle)"}
ALL_PHASES = "all"
GAME = BaghChalGame()


def _search(state, depth: int, algorithm: str, order: str):
    stats = SearchStats()
    t0 = time.perf_counter()
    result = ordered_search(GAME, state, depth, algorithm, order, designed_eval, stats)
    return result, stats, (time.perf_counter() - t0) * 1000.0


def run_positions(positions: Sequence[Position], depths: Iterable[int], log=None) -> List[dict]:
    rows = []
    for depth in depths:
        for pos in positions:
            state = from_position(pos)
            runs = [(MM, MINIMAX, NATURAL)] + [(f"ab_{o}", ALPHABETA, o) for o in ORDERINGS]
            mm_score = None
            for config, algorithm, order in runs:
                result, stats, ms = _search(state, depth, algorithm, order)
                if mm_score is None:
                    mm_score = result.score
                elif result.score != mm_score:
                    raise RuntimeError(f"{pos.id} depth {depth} {config}: score {result.score} "
                                       f"!= minimax {mm_score}")
                rows.append({"position_id": pos.id, "phase": pos.phase, "to_move": pos.to_move,
                             "depth": depth, "config": config, "nodes": stats.nodes,
                             "evals": stats.evals, "time_ms": round(ms, 3),
                             "score": result.score, "move": str(result.move)})
            if log:
                log(f"  depth {depth} {pos.id}: " + ", ".join(
                    f"{r['config']} {r['nodes']:,}" for r in rows[-len(runs):]))
    return rows


TREE_BRANCHING = (2, 4, 8)
TREE_MAX_LEAVES = 50_000
TREE_SEED = 2026


def run_trees(branching: Iterable[int] = TREE_BRANCHING, max_depth: int = 6) -> List[dict]:
    """Measured leaves and nodes on uniform trees next to the exact formulas."""
    rows = []
    for b in branching:
        for d in range(1, max_depth + 1):
            if b ** d > TREE_MAX_LEAVES:
                continue
            random_tree = UniformTree(b, d, seed=TREE_SEED)
            worst_tree = UniformTree.worst_case(b, d)
            cases = [("random", MM, random_tree, MINIMAX, NATURAL),
                     ("random", "ab_worst", random_tree, ALPHABETA, WORST),
                     ("random", "ab_natural", random_tree, ALPHABETA, NATURAL),
                     ("random", "ab_best", random_tree, ALPHABETA, BEST),
                     ("worst_case", "ab_natural", worst_tree, ALPHABETA, NATURAL),
                     ("worst_case", "ab_best", worst_tree, ALPHABETA, BEST)]
            for tree_kind, config, tree, algorithm, order in cases:
                stats = SearchStats()
                ordered_search(tree, (), d, algorithm, order, tree.evaluate, stats, ply_of=len)
                rows.append({"b": b, "d": d, "tree": tree_kind, "config": config,
                             "nodes": stats.nodes, "leaves": stats.evals,
                             "minimax_nodes": minimax_nodes(b, d),
                             "minimax_leaves": minimax_leaves(b, d),
                             "knuth_moore_leaves": knuth_moore_leaves(b, d)})
    return rows


def summarise(rows: Sequence[dict]) -> List[dict]:
    """Per phase, depth and config: median nodes, b*, and median share of minimax's nodes."""
    rows = [dict(r, depth=int(r["depth"]), nodes=int(r["nodes"])) for r in rows]
    mm = {(r["position_id"], r["depth"]): r["nodes"] for r in rows if r["config"] == MM}
    groups: Dict[tuple, List[dict]] = defaultdict(list)
    for r in rows:
        groups[(r["phase"], r["depth"], r["config"])].append(r)
        groups[(ALL_PHASES, r["depth"], r["config"])].append(r)
    out = []
    phase_order = {ALL_PHASES: 0, "placement": 1, "movement": 2}
    for (phase, depth, config) in sorted(groups, key=lambda k: (phase_order.get(k[0], 3), k[1],
                                                                 CONFIGS.index(k[2]))):
        rs = groups[(phase, depth, config)]
        nodes = [r["nodes"] for r in rs]
        out.append({"phase": phase, "depth": depth, "config": config, "positions": len(rs),
                    "nodes_median": statistics.median(nodes),
                    "nodes_min": min(nodes), "nodes_max": max(nodes),
                    "ebf_median": round(statistics.median(
                        effective_branching_factor(n, depth) for n in nodes), 3),
                    "fraction_of_minimax_nodes": round(statistics.median(
                        r["nodes"] / mm[(r["position_id"], depth)] for r in rs), 4)})
    return out


def write_csv(path, rows: Sequence[dict]) -> None:
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def read_csv(path) -> List[dict]:
    with Path(path).open(newline="") as fh:
        return list(csv.DictReader(fh))


def _n(x) -> str:
    x = float(x)
    return f"{x:,.0f}" if x == int(x) else f"{x:,.1f}"


def markdown(summary: Sequence[dict], trees: Sequence[dict]) -> str:
    lines = ["# E3 results: best case and worst case of alpha-beta", "",
             "## Bagh-Chal positions", "",
             "Median nodes expanded per move (30 positions, designed evaluation); in brackets, "
             "the median share of minimax's nodes. Minimax's count is the same under every order.",
             "",
             "| Phase | Depth | Minimax | AB worst order | AB R10 order | AB heuristic order "
             "| AB best order (oracle) |",
             "|---|---:|---:|---:|---:|---:|---:|"]
    by_key = {(s["phase"], int(s["depth"]), s["config"]): s for s in summary}
    for phase in ("placement", "movement", ALL_PHASES):
        for depth in sorted({int(s["depth"]) for s in summary}):
            cells = []
            for config in CONFIGS:
                s = by_key[(phase, depth, config)]
                cell = _n(s["nodes_median"])
                if config != MM:
                    cell += f" ({float(s['fraction_of_minimax_nodes']) * 100:.1f}%)"
                cells.append(cell)
            lines.append(f"| {phase.title()} | {depth} | " + " | ".join(cells) + " |")
    lines += ["", "Effective branching factor b* (median):", "",
              "| Phase | Depth | Minimax | AB worst | AB R10 | AB heuristic | AB best | √(minimax b*) |",
              "|---|---:|---:|---:|---:|---:|---:|---:|"]
    for phase in ("placement", "movement"):
        for depth in sorted({int(s["depth"]) for s in summary}):
            ebf = [float(by_key[(phase, depth, c)]["ebf_median"]) for c in CONFIGS]
            lines.append(f"| {phase.title()} | {depth} | " + " | ".join(f"{e:.2f}" for e in ebf)
                         + f" | {ebf[0] ** 0.5:.2f} |")
    lines += ["", "## Uniform trees (exact formulas)", "",
              "Leaves evaluated. Worst case = alpha-beta in R10 order on a tree built so that "
              "every move is better than the one before it (`UniformTree.worst_case`); "
              "the other columns use a tree with random distinct leaves (seed "
              f"{TREE_SEED}).", "",
              "| b | d | Minimax = b^d | AB worst case (built tree) | AB reversed-oracle order "
              "| AB R10 order (random) | AB best order | Knuth–Moore b^⌈d/2⌉+b^⌊d/2⌋−1 |",
              "|---:|---:|---:|---:|---:|---:|---:|---:|"]
    t = {(int(r["b"]), int(r["d"]), r["tree"], r["config"]): r for r in trees}
    for (b, d) in sorted({(int(r["b"]), int(r["d"])) for r in trees}):
        cell = lambda tree, config: _n(t[(b, d, tree, config)]["leaves"])  # noqa: E731
        lines.append(f"| {b} | {d} | {cell('random', MM)} | {cell('worst_case', 'ab_natural')} | "
                     f"{cell('random', 'ab_worst')} | {cell('random', 'ab_natural')} | "
                     f"{cell('random', 'ab_best')} | "
                     f"{_n(t[(b, d, 'random', MM)]['knuth_moore_leaves'])} |")
    return "\n".join(lines) + "\n"
