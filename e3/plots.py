"""E3 figures. matplotlib only draws the results; it plays no part in search.

    e3_ordering_nodes.png  median nodes vs depth (log), placement and movement:
                           minimax, and alpha-beta in worst, R10 and best order.
                           The main "best case vs worst case" figure.
    e3_ratio_d4.png        alpha-beta's nodes as % of minimax's at depth 4, for
                           each ordering, placement and movement side by side.
    e3_trees.png           uniform trees: measured leaves vs the exact formulas,
                           one panel per branching factor.

Style constants and helpers come from experiments/plots.py, so the E3 figures
match E1 and E2. Colours were checked with the dataviz palette validator: the
three hues (blue, orange, aqua) pass all-pairs CVD separation. Minimax is a
dashed grey reference line rather than a fourth hue, and the heuristic order is
shown only in the bar chart.
"""
from __future__ import annotations

import statistics
from collections import defaultdict
from pathlib import Path
from typing import Sequence

from experiments.plots import GRID, INK, INK_MUTED, SURFACE, _num, _style, plt
from matplotlib.ticker import FuncFormatter, NullFormatter

from .run import CONFIG_LABEL, MM

BLUE, ORANGE, AQUA = "#2a78d6", "#eb6834", "#1baf7a"
GREY = INK_MUTED
LINE_STYLE = {   # config -> (colour, marker, linestyle)
    MM: (GREY, "o", "--"),
    "ab_worst": (ORANGE, "s", "-"),
    "ab_natural": (BLUE, "o", "-"),
    "ab_best": (AQUA, "D", "-"),
}
PHASES = ("placement", "movement")


def _log_axis(ax):
    ax.set_yscale("log")
    ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: _num(v)))
    ax.yaxis.set_minor_formatter(NullFormatter())


def _line(ax, xs, ys, config, label):
    colour, marker, style = LINE_STYLE[config]
    ax.plot(xs, ys, color=colour, linestyle=style, linewidth=2, marker=marker, markersize=7,
            markeredgecolor=SURFACE, markeredgewidth=1.5, zorder=3, label=label)


def _title(fig, title, subtitle):
    fig.suptitle(title, x=0.01, y=0.975, ha="left", color=INK, fontsize=11.5, fontweight="bold")
    fig.text(0.01, 0.885, subtitle, color=INK_MUTED, fontsize=8.5)


def plot_ordering_nodes(rows: Sequence[dict], path) -> Path:
    data = defaultdict(lambda: defaultdict(list))         # (phase, config) -> depth -> nodes
    for r in rows:
        data[(r["phase"], r["config"])][int(r["depth"])].append(int(r["nodes"]))
    fig, axes = plt.subplots(1, 2, figsize=(9.2, 3.9), sharey=True)
    fig.patch.set_facecolor(SURFACE)
    for ax, phase in zip(axes, PHASES):
        _style(ax)
        _log_axis(ax)
        depths = sorted(data[(phase, MM)])
        for config in LINE_STYLE:
            meds = [statistics.median(data[(phase, config)][d]) for d in depths]
            _line(ax, depths, meds, config, CONFIG_LABEL[config])
        ax.set_xticks(depths)
        ax.set_xlim(min(depths) - 0.3, max(depths) + 0.3)
        ax.set_xlabel("Search depth (plies)", color=INK_MUTED, fontsize=9)
        n = len(data[(phase, MM)][depths[0]])
        ax.set_title(f"{phase.title()} phase  ·  {n} positions", color=INK, fontsize=10, loc="left")
    axes[0].set_ylabel("Nodes expanded, median (log scale)", color=INK_MUTED, fontsize=9)
    handles, labels = axes[0].get_legend_handles_labels()
    fig.legend(handles, labels, loc="lower center", bbox_to_anchor=(0.5, 0.0), ncol=4,
               frameon=False, fontsize=8.5, labelcolor=INK)
    _title(fig, "E3 · Alpha-beta's worst case, R10 order and best case vs minimax",
           "Worst order prunes little (median 86–100% of minimax's nodes); best order is the floor "
           "for any ordering")
    fig.subplots_adjust(left=0.09, right=0.98, bottom=0.24, top=0.79, wspace=0.08)
    fig.savefig(path, dpi=200, facecolor=SURFACE)
    plt.close(fig)
    return Path(path)


def plot_ratio(summary: Sequence[dict], depth: int, path) -> Path:
    order = ["ab_worst", "ab_natural", "ab_heuristic", "ab_best"]
    labels = ["Worst order", "R10 order (as in E1)", "Heuristic order", "Best order (oracle)"]
    share = {(s["phase"], s["config"]): float(s["fraction_of_minimax_nodes"]) * 100
             for s in summary if int(s["depth"]) == depth}
    fig, ax = plt.subplots(figsize=(8, 3.2))
    fig.patch.set_facecolor(SURFACE)
    _style(ax)
    ax.grid(True, axis="x", color=GRID, linewidth=0.8)
    ax.grid(False, axis="y")
    height = 0.36
    for k, (phase, colour) in enumerate(zip(PHASES, (BLUE, AQUA))):
        ys = [i + (k - 0.5) * (height + 0.04) for i in range(len(order))]
        vals = [share[(phase, c)] for c in order]
        ax.barh(ys, vals, height=height, color=colour, edgecolor=SURFACE, linewidth=2,
                label=phase.title())
        for y, v in zip(ys, vals):
            ax.text(v + 1.2, y, f"{v:.1f}%", va="center", fontsize=8.5, color=INK)
    ax.set_yticks(range(len(order)))
    ax.set_yticklabels(labels, color=INK, fontsize=9)
    ax.invert_yaxis()
    ax.set_xlim(0, 125)
    ax.set_xticks([0, 25, 50, 75, 100])
    ax.xaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{v:.0f}%"))
    ax.axvline(100, color=GREY, linestyle="--", linewidth=1)
    ax.text(101, len(order) - 0.45, "minimax = 100%", ha="left", va="center", fontsize=8,
            color=INK_MUTED)
    ax.set_xlabel("Alpha-beta nodes as % of minimax's (median over positions)",
                  color=INK_MUTED, fontsize=9)
    fig.legend(loc="upper left", bbox_to_anchor=(0.005, 0.88), ncol=2, frameon=False,
               fontsize=9, labelcolor=INK)
    fig.suptitle(f"E3 · How much of minimax's tree alpha-beta searches, depth {depth}",
                 x=0.01, y=0.96, ha="left", color=INK, fontsize=11.5, fontweight="bold")
    fig.subplots_adjust(left=0.24, right=0.98, bottom=0.17, top=0.76)
    fig.savefig(path, dpi=200, facecolor=SURFACE)
    plt.close(fig)
    return Path(path)


def plot_trees(rows: Sequence[dict], path) -> Path:
    t = {(int(r["b"]), int(r["d"]), r["tree"], r["config"]): r for r in rows}
    bs = sorted({int(r["b"]) for r in rows})
    fig, axes = plt.subplots(1, len(bs), figsize=(3.3 * len(bs), 3.7), sharey=True)
    fig.patch.set_facecolor(SURFACE)
    for ax, b in zip(axes, bs):
        _style(ax)
        _log_axis(ax)
        ds = sorted({int(r["d"]) for r in rows if int(r["b"]) == b})
        get = lambda tree, config, col: [int(t[(b, d, tree, config)][col]) for d in ds]  # noqa: E731
        _line(ax, ds, get("random", MM, "minimax_leaves"), MM, "Formula b^d (minimax)")
        ax.plot(ds, get("random", MM, "knuth_moore_leaves"), color=AQUA, linewidth=1.2,
                linestyle="--", zorder=2, label="Formula b^⌈d/2⌉+b^⌊d/2⌋−1")
        colour, marker, _ = LINE_STYLE["ab_worst"]
        ax.scatter(ds, get("worst_case", "ab_natural", "leaves"), s=48, marker=marker,
                   color=colour, edgecolors=SURFACE, linewidths=1.5, zorder=4,
                   label="Measured: AB worst case")
        colour, marker, _ = LINE_STYLE["ab_natural"]
        ax.scatter(ds, get("random", "ab_natural", "leaves"), s=40, marker=marker,
                   color=colour, edgecolors=SURFACE, linewidths=1.5, zorder=4,
                   label="Measured: AB in R10 order, random leaves")
        colour, marker, _ = LINE_STYLE["ab_best"]
        ax.scatter(ds, get("random", "ab_best", "leaves"), s=40, marker=marker,
                   color=colour, edgecolors=SURFACE, linewidths=1.5, zorder=5,
                   label="Measured: AB best case")
        ax.set_xticks(ds)
        ax.set_xlabel("Depth d", color=INK_MUTED, fontsize=9)
        ax.set_title(f"b = {b}", color=INK, fontsize=10, loc="left")
    axes[0].set_ylabel("Leaves evaluated (log scale)", color=INK_MUTED, fontsize=9)
    handles, labels = axes[0].get_legend_handles_labels()
    fig.legend(handles, labels, loc="lower center", bbox_to_anchor=(0.5, 0.0), ncol=3,
               frameon=False, fontsize=8.5, labelcolor=INK)
    _title(fig, "E3 · Uniform trees: measured leaf counts land exactly on the textbook formulas",
           "Grey line = worst case O(b^d); aqua dashed = best case O(b^(d/2))")
    fig.subplots_adjust(left=0.08, right=0.98, bottom=0.27, top=0.78, wspace=0.08)
    fig.savefig(path, dpi=200, facecolor=SURFACE)
    plt.close(fig)
    return Path(path)
