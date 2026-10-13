"""
Report figures. matplotlib only draws the results; it plays no part in search.

    e1_nodes_vs_depth.png  -- log-scale nodes expanded vs depth, placement and
                              movement phases side by side (the key E1 figure)
    e1_time_vs_depth.png   -- same layout, time per move in milliseconds
    e2_results.png         -- win / draw / loss for the designed evaluator,
                              playing tiger and playing goat

Each E1 panel shows the median as a line and every individual position as a
faint dot, so the spread across the 15 positions is visible rather than hidden
behind an average.
"""
from __future__ import annotations

import statistics
from collections import defaultdict
from pathlib import Path
from typing import Sequence

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib.ticker import FuncFormatter, NullFormatter  # noqa: E402

from .engine_api import ALPHABETA, MINIMAX  # noqa: E402
from .position import MOVEMENT, PLACEMENT  # noqa: E402

# Validated categorical pair (light surface): CVD dE 24.7, normal-vision dE 33.6.
SURFACE = "#fcfcfb"
INK = "#2b2b29"
INK_MUTED = "#6b6a63"
GRID = "#e4e3de"
SERIES = {MINIMAX: "#2a78d6", ALPHABETA: "#eb6834"}
MARKER = {MINIMAX: "o", ALPHABETA: "s"}          # shape is the secondary encoding
LABEL = {MINIMAX: "Minimax", ALPHABETA: "Alpha-beta"}
OUTCOME = {"W": "#2a78d6", "D": "#b9b8b0", "L": "#eb6834"}   # two poles + neutral middle
OUTCOME_LABEL = {"W": "Win", "D": "Draw", "L": "Loss"}


def _style(ax):
    ax.set_facecolor(SURFACE)
    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    for side in ("left", "bottom"):
        ax.spines[side].set_color(GRID)
    ax.tick_params(colors=INK_MUTED, labelsize=9, length=0)
    ax.grid(True, axis="y", color=GRID, linewidth=0.8, which="major")
    ax.set_axisbelow(True)


def _num(v: float) -> str:
    """Plain numbers on axes and labels: 12,000 / 350 / 4.2 / 0.035 -- never 1e-2 notation."""
    if v >= 100:
        return f"{v:,.0f}"
    if v >= 1:
        return f"{v:.3g}"
    return f"{v:.2g}"


def _e1_figure(rows: Sequence[dict], metric: str, ylabel: str, title: str, out_path):
    data = defaultdict(lambda: defaultdict(list))   # (phase, algo) -> depth -> values
    for r in rows:
        # log scale cannot show 0 (a sub-microsecond time rounds to 0.0): clip to a floor
        data[(r["phase"], r["algorithm"])][int(r["depth"])].append(max(float(r[metric]), 1e-3))

    phases = [p for p in (PLACEMENT, MOVEMENT) if any(k[0] == p for k in data)]
    fig, axes = plt.subplots(1, len(phases), figsize=(4.6 * len(phases), 3.8),
                             sharey=True, squeeze=False)
    fig.patch.set_facecolor(SURFACE)
    for ax, phase in zip(axes[0], phases):
        _style(ax)
        ax.set_yscale("log")
        all_depths = set()
        for algo in (MINIMAX, ALPHABETA):
            series = data.get((phase, algo), {})
            depths = sorted(series)
            all_depths.update(depths)
            if not depths:
                continue
            for d in depths:   # every position, faint
                ax.scatter([d] * len(series[d]), series[d], s=10, color=SERIES[algo],
                           alpha=0.22, linewidths=0, zorder=2)
            med = [statistics.median(series[d]) for d in depths]
            ax.plot(depths, med, color=SERIES[algo], linewidth=2, marker=MARKER[algo],
                    markersize=7, markeredgecolor=SURFACE, markeredgewidth=1.5, zorder=3,
                    label=LABEL[algo])
            ax.annotate(f"{LABEL[algo]}  {_num(med[-1])}", (depths[-1], med[-1]),
                        xytext=(8, 0), textcoords="offset points", va="center",
                        fontsize=8.5, color=INK)
        ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: _num(v)))
        ax.yaxis.set_minor_formatter(NullFormatter())
        ax.set_xticks(sorted(all_depths))
        ax.set_xlim(min(all_depths) - 0.3, max(all_depths) + 1.1)
        ax.set_xlabel("Search depth (plies)", color=INK_MUTED, fontsize=9)
        n = len(data.get((phase, MINIMAX), {}).get(min(all_depths), []))
        ax.set_title(f"{phase.title()} phase  ·  {n} positions", color=INK, fontsize=10,
                     loc="left")
    axes[0][0].set_ylabel(ylabel, color=INK_MUTED, fontsize=9)
    handles, labels = axes[0][0].get_legend_handles_labels()
    fig.legend(handles, labels, loc="upper right", bbox_to_anchor=(0.99, 0.99), frameon=False,
               fontsize=9, ncol=2, labelcolor=INK)
    fig.suptitle(title, x=0.01, y=0.975, ha="left", color=INK, fontsize=11.5, fontweight="bold")
    fig.text(0.01, 0.885, "Line = median across positions; dots = individual positions",
             color=INK_MUTED, fontsize=8.5)
    fig.subplots_adjust(left=0.1, right=0.98, bottom=0.14, top=0.76, wspace=0.08)
    fig.savefig(out_path, dpi=200, facecolor=SURFACE)
    plt.close(fig)


def plot_e1(rows: Sequence[dict], out_dir="results") -> list:
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    nodes_path = out_dir / "e1_nodes_vs_depth.png"
    time_path = out_dir / "e1_time_vs_depth.png"
    _e1_figure(rows, "nodes", "Nodes expanded (log scale)",
               "E1 · Nodes expanded per move: minimax vs alpha-beta", nodes_path)
    _e1_figure(rows, "time_ms_median", "Time per move, ms (log scale)",
               "E1 · Time per move: minimax vs alpha-beta", time_path)
    return [nodes_path, time_path]


def plot_e2(summary: Sequence[dict], out_dir="results"):
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / "e2_results.png"
    fig, ax = plt.subplots(figsize=(8, 2.6))
    fig.patch.set_facecolor(SURFACE)
    _style(ax)
    ax.grid(False)
    rows = list(summary)
    labels = [f"Designed eval as {s['designed_side'].title()}" for s in rows]
    for i, s in enumerate(rows):
        left = 0
        for key, field in (("W", "wins"), ("D", "draws"), ("L", "losses")):
            v = s[field]
            if v == 0:
                continue
            ax.barh(i, v, left=left, height=0.55, color=OUTCOME[key],
                    edgecolor=SURFACE, linewidth=2)
            if v / max(1, s["games"]) >= 0.07:
                ax.text(left + v / 2, i, str(v), ha="center", va="center", fontsize=9,
                        color="white" if key != "D" else INK)
            left += v
        ax.text(s["games"] * 1.01, i,
                f"win {s['win_rate'] * 100:.0f}%  (95% CI {s['win_rate_ci95_low'] * 100:.0f}–"
                f"{s['win_rate_ci95_high'] * 100:.0f}%)", va="center", fontsize=8.5, color=INK)
    ax.set_yticks(range(len(rows)))
    ax.set_yticklabels(labels, color=INK, fontsize=9)
    ax.invert_yaxis()
    games = max((s["games"] for s in rows), default=1)
    ax.set_xlim(0, games * 1.42)
    ax.set_xticks([0, games // 2, games])
    ax.set_xlabel("Games", color=INK_MUTED, fontsize=9)
    # Legend carries identity in addition to color (W / D / L are also in the table).
    from matplotlib.patches import Patch
    fig.legend([Patch(color=OUTCOME[k]) for k in "WDL"], [OUTCOME_LABEL[k] for k in "WDL"],
               loc="upper right", bbox_to_anchor=(0.99, 0.99), ncol=3, frameon=False,
               fontsize=9, labelcolor=INK)
    fig.suptitle("E2 · Designed evaluation vs capture-count baseline", x=0.01, y=0.96, ha="left",
                 color=INK, fontsize=11.5, fontweight="bold")
    fig.subplots_adjust(left=0.22, right=0.98, bottom=0.22, top=0.8)
    fig.savefig(path, dpi=200, facecolor=SURFACE)
    plt.close(fig)
    return path
