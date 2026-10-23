"""
E3 command line: alpha-beta's best and worst case.  Run `python -m e3 --help`.

    python -m e3                          run positions (depths 2-4) and trees, write results/e3_*
    python -m e3 --depths 2,3 --only P01 M04   quick trial on a few positions
    python -m e3 --report                 rebuild summary, tables and plots from existing CSVs
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from experiments.position import load_positions

from . import plots, run


def main(argv=None) -> int:
    p = argparse.ArgumentParser(prog="python -m e3", description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--positions", default="data/positions.json")
    p.add_argument("--out", default="results")
    p.add_argument("--depths", default="2,3,4")
    p.add_argument("--only", nargs="*", help="position ids to run (default: all)")
    p.add_argument("--report", action="store_true",
                   help="only rebuild summary, tables and plots from existing CSVs")
    a = p.parse_args(argv)
    out = Path(a.out)
    raw_path, trees_path = out / "e3_raw.csv", out / "e3_trees.csv"

    if not a.report:
        positions = load_positions(a.positions)
        if a.only:
            positions = [pos for pos in positions if pos.id in set(a.only)]
            if not positions:
                print(f"error: no positions match {a.only}", file=sys.stderr)
                return 1
        depths = [int(d) for d in a.depths.split(",") if d.strip()]
        print(f"E3: {len(positions)} positions, depths {depths}")
        run.write_csv(raw_path, run.run_positions(positions, depths, log=print))
        print("E3: uniform trees")
        run.write_csv(trees_path, run.run_trees())

    rows, trees = run.read_csv(raw_path), run.read_csv(trees_path)
    summary = run.summarise(rows)
    run.write_csv(out / "e3_summary.csv", summary)
    (out / "e3_tables.md").write_text(run.markdown(summary, trees))
    max_depth = max(int(r["depth"]) for r in rows)
    written = [plots.plot_ordering_nodes(rows, out / "e3_ordering_nodes.png"),
               plots.plot_ratio(summary, max_depth, out / f"e3_ratio_d{max_depth}.png"),
               plots.plot_trees(trees, out / "e3_trees.png")]
    for path in [raw_path, trees_path, out / "e3_summary.csv", out / "e3_tables.md", *written]:
        print(f"wrote {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
