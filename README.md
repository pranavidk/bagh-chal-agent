# Bagh-Chal Agent

A Bagh-Chal (tigers and goats) game-playing agent using Minimax with Alpha-Beta pruning and a designed evaluation function. BCSE306L Artificial Intelligence course project, VIT Vellore.

| Member | Reg. No. | Owns |
|---|---|---|
| Pranav Shankar | 24BCE2773 | Experiment framework, experiments, report |
| Shalom Santosh | 24BCE2731 | Minimax and alpha-beta search |
| Vishal | 24BCE2802 | Evaluation function |

## Status

Starter repo. The experiment framework (`experiments/`) is built and tested. The agent (`baghchal/`) is built phase by phase following `docs/prompts.md`.

## Where to start

1. Read `docs/PRD.md` — scope, frozen game rules, interfaces, milestones.
2. Follow `docs/prompts.md` from Phase 0.
3. `CLAUDE.md` holds the working rules Claude Code follows in this repo.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m pytest -q
```

## Running

Filled in during Phase 4. Experiment commands are documented in `docs/experiments.md`.

Rules hot-path benchmark (not part of the test suite; prints calls/s against the targets):

```bash
python benchmarks/bench_rules.py
```
