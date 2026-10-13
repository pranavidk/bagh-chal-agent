"""
Command-line entry point.  Run `python -m experiments --help`.

    validate      check a positions file for format and piece-count errors
    show          print positions from a file as boards
    check-engine  contract tests for the engine adapter (run this first)
    generate      build the fixed test-position suite from seeded play
    e1            minimax vs alpha-beta: nodes and time per move across depths
    e2            designed evaluation vs capture-count baseline, self-play
    report        rebuild summaries, tables and plots from existing raw CSVs
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from . import analysis
from .engine_api import load_engine
from .position import load_positions, save_positions

DEFAULT_POSITIONS = "data/positions.json"
DEFAULT_RESULTS = "results"


def _depths(text: str):
    return [int(x) for x in text.split(",") if x.strip()]


def cmd_validate(a):
    ps = load_positions(a.positions)
    phases = {}
    for p in ps:
        phases[(p.phase, p.to_move)] = phases.get((p.phase, p.to_move), 0) + 1
    print(f"OK: {len(ps)} valid, distinct positions in {a.positions}")
    for (phase, side), n in sorted(phases.items()):
        print(f"   {phase:<9} {side:<5} to move: {n}")


def cmd_show(a):
    for p in load_positions(a.positions):
        if a.id and p.id not in a.id:
            continue
        print(f"[{p.id}] {p.note}".rstrip())
        print(p.pretty())
        print()


def cmd_check_engine(a):
    from .conformance import check_engine
    engine = load_engine(a.engine)
    positions = load_positions(a.positions) if a.positions and Path(a.positions).exists() else None
    sys.exit(0 if check_engine(engine, positions, depth=a.depth) else 1)


def cmd_generate(a):
    from .generate_positions import generate
    engine = load_engine(a.engine)
    if Path(a.out).exists() and not a.force:
        sys.exit(f"{a.out} already exists. The suite is meant to stay fixed; pass --force to overwrite.")
    suite, meta = generate(engine, seed=a.seed, per_phase=a.per_phase, games=a.games,
                           epsilon=a.epsilon, depth=a.policy_depth)
    save_positions(a.out, suite, meta)
    print(f"Wrote {len(suite)} positions to {a.out} (pool of {meta['candidate_pool_size']} candidates)")


def cmd_e1(a):
    from .e1 import run_e1
    engine = load_engine(a.engine)
    positions = load_positions(a.positions)
    if a.only:
        positions = [p for p in positions if p.id in a.only]
    out = Path(a.out)
    run_e1(engine, positions, depths=_depths(a.depths), out_csv=out / "e1_raw.csv",
           repeats=a.repeats)
    _report(out)


def cmd_e2(a):
    from .e2 import run_e2
    engine = load_engine(a.engine)
    out = Path(a.out)
    run_e2(engine, games_per_side=a.games, depth=a.depth, opening_plies=a.opening_plies,
           seed=a.seed, max_plies=a.max_plies, out_csv=out / "e2_raw.csv")
    _report(out)


def cmd_report(a):
    _report(Path(a.out))


def _report(out: Path):
    from . import plots
    from .e1 import score_mismatches
    md = ["# Experiment results", ""]
    e1_raw, e2_raw = out / "e1_raw.csv", out / "e2_raw.csv"
    if e1_raw.exists():
        rows = analysis.read_csv(e1_raw)
        summary = analysis.summarise_e1(rows)
        analysis.write_csv(out / "e1_summary.csv", summary)
        plots.plot_e1(rows, out)
        bad = score_mismatches(rows)
        md += ["## E1 — Minimax vs Alpha-Beta", "",
               "Medians across test positions. b* is the effective branching factor.", "",
               analysis.e1_markdown(summary), "",
               (f"**Correctness:** {len(bad)} root-score mismatch(es) between minimax and alpha-beta."
                if bad else "**Correctness:** alpha-beta returned the same root score as minimax "
                            "on every position and depth."), ""]
        print(f"E1: summary, plots and table written to {out}/")
    if e2_raw.exists():
        rows = analysis.read_csv(e2_raw)
        summary = analysis.summarise_e2(rows)
        analysis.write_csv(out / "e2_summary.csv", summary)
        plots.plot_e2(summary, out)
        md += ["## E2 — Designed evaluation vs capture-count baseline", "",
               analysis.e2_markdown(summary), ""]
        print(f"E2: summary, plot and table written to {out}/")
    if len(md) > 2:
        (out / "tables.md").write_text("\n".join(md))


def main(argv=None):
    p = argparse.ArgumentParser(prog="python -m experiments",
                                description="Bagh-Chal experiment framework (E1, E2)")
    sub = p.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("validate", help="check a positions file")
    s.add_argument("positions", nargs="?", default=DEFAULT_POSITIONS)
    s.set_defaults(func=cmd_validate)

    s = sub.add_parser("show", help="print positions as boards")
    s.add_argument("positions", nargs="?", default=DEFAULT_POSITIONS)
    s.add_argument("--id", nargs="*", help="only these ids, e.g. --id P01 M03")
    s.set_defaults(func=cmd_show)

    s = sub.add_parser("check-engine", help="contract tests for the engine adapter")
    s.add_argument("--engine", required=True, help="module:ClassName of the engine adapter")
    s.add_argument("--positions", default=DEFAULT_POSITIONS)
    s.add_argument("--depth", type=int, default=2)
    s.set_defaults(func=cmd_check_engine)

    s = sub.add_parser("generate", help="build the fixed test-position suite")
    s.add_argument("--engine", required=True)
    s.add_argument("--out", default=DEFAULT_POSITIONS)
    s.add_argument("--seed", type=int, default=2026)
    s.add_argument("--per-phase", type=int, default=15)
    s.add_argument("--games", type=int, default=200)
    s.add_argument("--epsilon", type=float, default=0.3)
    s.add_argument("--policy-depth", type=int, default=2)
    s.add_argument("--force", action="store_true")
    s.set_defaults(func=cmd_generate)

    s = sub.add_parser("e1", help="minimax vs alpha-beta")
    s.add_argument("--engine", required=True)
    s.add_argument("--positions", default=DEFAULT_POSITIONS)
    s.add_argument("--depths", default="2,3,4")
    s.add_argument("--repeats", type=int, default=3, help="timing repeats per search (median reported)")
    s.add_argument("--only", nargs="*", help="run only these position ids")
    s.add_argument("--out", default=DEFAULT_RESULTS)
    s.set_defaults(func=cmd_e1)

    s = sub.add_parser("e2", help="designed evaluation vs baseline")
    s.add_argument("--engine", required=True)
    s.add_argument("--games", type=int, default=50, help="games per side")
    s.add_argument("--depth", type=int, default=3)
    s.add_argument("--opening-plies", type=int, default=4)
    s.add_argument("--seed", type=int, default=2026)
    s.add_argument("--max-plies", type=int, default=400)
    s.add_argument("--out", default=DEFAULT_RESULTS)
    s.set_defaults(func=cmd_e2)

    s = sub.add_parser("report", help="rebuild summaries and plots from raw CSVs")
    s.add_argument("--out", default=DEFAULT_RESULTS)
    s.set_defaults(func=cmd_report)

    args = p.parse_args(argv)
    args.func(args)


if __name__ == "__main__":
    main()
