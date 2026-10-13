"""Search benchmark against PRD §7 (not part of pytest).

    python benchmarks/bench_search.py [--depths 2,3,4]

Minimax and alpha-beta with the designed evaluation on the start position and
one movement-phase position: nodes expanded and time per move. Flags any
alpha-beta move over 2 s or minimax move over 30 s at depth 4 (PRD §7).
"""
from __future__ import annotations

import argparse
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from baghchal.adapter import Adapter  # noqa: E402
from baghchal.state import from_text, initial_state  # noqa: E402
from experiments.engine_api import ALPHABETA, DESIGNED, MINIMAX, SearchStats  # noqa: E402

POSITIONS = {
    "start (placement)": initial_state(),
    # 17 goats, 3 captured, goat to move, h = 0.
    "movement": from_text("TGGGT/GGGGG/G.G.G/GG.GG/TG.GT", "GOAT", 0, 3),
}
LIMITS = {ALPHABETA: 2.0, MINIMAX: 30.0}


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--depths", default="2,3,4")
    depths = [int(d) for d in p.parse_args().depths.split(",")]
    engine = Adapter()
    print(f"{'position':<19}{'depth':>5}  {'algorithm':<10}{'nodes':>12}{'time (s)':>10}  move")
    for name, state in POSITIONS.items():
        for depth in depths:
            for algorithm in (ALPHABETA, MINIMAX):
                stats = SearchStats()
                t0 = time.perf_counter()
                result = engine.search(state, depth, algorithm, DESIGNED, stats)
                secs = time.perf_counter() - t0
                flag = "  <-- over PRD §7 limit" if depth == 4 and secs > LIMITS[algorithm] else ""
                print(f"{name:<19}{depth:>5}  {algorithm:<10}{stats.nodes:>12,}{secs:>10.3f}  "
                      f"{result.move}{flag}")


if __name__ == "__main__":
    main()
