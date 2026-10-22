# Bagh-Chal Agent

A Bagh-Chal (tigers and goats) game-playing agent using Minimax with Alpha-Beta pruning and a designed evaluation function. BCSE306L Artificial Intelligence course project, VIT Vellore.

| Member | Reg. No. | Owns |
|---|---|---|
| Pranav Shankar | 24BCE2773 | Experiment framework, experiments, report |
| Shalom Santosh | 24BCE2731 | Minimax and alpha-beta search (owner, reviewer) |
| Vishal | 24BCE2802 | Evaluation function (owner, reviewer) |

## Status

- **Done:** rules, search, evaluation, adapter and CLI are built and tested (`python -m pytest -q`); `python -m experiments check-engine --engine baghchal.adapter:Adapter` reports 0 failures.
- **Done:** experiments E1 and E2 are run, with results, tables and plots committed in `results/`.
- **Done:** report text, slides and implementation notes in `docs/report/` and `docs/`, written by Claude Code on 2026-10-22 at Pranav's direction (PRD §10); a viva guide in `docs/viva_guide.md`.
- **Extra:** a local browser UI for playing the agent (`python -m web.server`); it is not part of the graded core.
- **Left for the team:** the `[CHECK]` items in the report (references, contributions, the declaration's final sentence), reviewing the `[DRAFT]` paragraphs in the implementation notes, Shalom's and Vishal's code reviews (prompts 2b and 3b in `docs/prompts.md`), building the slide deck, and viva practice.

`search.py` and `evaluation.py` were written by Claude Code at Pranav's direction (see `docs/PRD.md` §10); Shalom and Vishal own and review them.

## Where to start

1. Read `docs/PRD.md` — scope, frozen game rules, interfaces, milestones.
2. `docs/prompts.md` holds the phase-by-phase prompts (Phases 0–5 are done; the review and viva prompts are next).
3. `CLAUDE.md` holds the working rules Claude Code follows in this repo.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m pytest -q
```

## Running

All commands run from the repo root inside the venv (`source .venv/bin/activate`). Points are numbered 0–24, `index = 5*row + col`, row 0 at the top; boards use `T` tiger, `G` goat, `.` empty.

```bash
# Board with point indices and degrees
python -m baghchal rules

# Analyse any position: move, score (tiger's side), nodes, time, principal variation
python -m baghchal analyse --board "T...T/...../...../...../T...T" --to-move GOAT --in-hand 20 --captured 0 --depth 4
python -m baghchal analyse --board "TG.../GG.../..TG./...../T...T" --to-move TIGER --captured 4 --depth 3 --algorithm minimax --eval baseline

# Same, reading the five board rows from a file (one row per line; "T . . . T" spacing is fine)
python -m baghchal analyse --file pos.txt --to-move GOAT --captured 0

# Play against the agent (type 12 to place, 7-12 to move, 'moves' to list, 'quit' to stop)
python -m baghchal play --human GOAT --depth 3

# Agent against itself
python -m baghchal selfplay --depth 3 [--tiger-eval designed --goat-eval baseline]
```

`analyse` options: `--depth` (default 4), `--algorithm alphabeta|minimax` (default alphabeta), `--eval designed|baseline` (default designed). `--in-hand` defaults to 20 − goats on the board − `--captured`; `--captured` defaults to 0. Bad input prints one `error:` line and exits 1.

Experiment commands (`check-engine`, `generate`, `e1`, `e2`, `report`) are in `docs/experiments.md`; the engine spec is `baghchal.adapter:Adapter`.

Benchmarks (not part of the test suite):

```bash
python benchmarks/bench_rules.py     # rules hot path: calls/s against targets
python benchmarks/bench_search.py    # minimax vs alpha-beta, depths 2-4, against PRD §7 limits
```

## Play in the browser

A local web UI (not part of the graded core, which is CLI-only per the PRD) talks to the same engine:

```bash
python -m web.server            # then open http://127.0.0.1:8765
```

Click a point to place a goat, or click a piece and then its destination. The panel shows the agent's move, score, positions searched, time and expected line, and a command to re-check any position with `analyse`. The compiled bundle `web/static/app.js` is committed; to rebuild after editing `web/frontend/src/App.jsx`: `cd web/frontend && npm install && npm run build`.

## Results and report

- `results/`: E1 and E2 raw CSVs, summaries, `tables.md` and the three plots (`python -m experiments report` rebuilds them from the CSVs).
- `docs/report/report.md`: the report (PRD §9); `docs/report/report.pdf` is the rendered version with the implementation notes and figures included.
- `docs/report/tables_appendix.md`: per-position and outcome tables; rebuild with `python tools/report_tables.py`.
- `docs/report/slides.md`: 6-slide outline with talking points.
- `docs/implementation_notes.md`: report §4.
- `docs/viva_guide.md`: answers to the viva topics in `docs/prompts.md` Phase 6.
