# CLAUDE.md — Bagh-Chal agent

University AI course project (VIT, BCSE306L). A Bagh-Chal agent using Minimax and Alpha-Beta with a designed evaluation function, plus two experiments. **`docs/PRD.md` is the source of truth** — read it before any task. Phase prompts live in `docs/prompts.md`.

## Commands

```bash
source .venv/bin/activate                  # always work inside the venv
python -m pytest -q                        # all tests
python -m pytest tests/test_rules.py -q    # one file
python -m baghchal analyse --board "T...T/...../...../...../T...T" --to-move GOAT --in-hand 20 --captured 0 --depth 3
python -m experiments check-engine --engine baghchal.adapter:Adapter
```

## Authorship — read this first

This is graded coursework with a written AI-tool declaration.

**Changed 2026-10-13 (PRD §3 C3, §6.1, §10):** with Shalom and Vishal unavailable, Pranav directed Claude Code to write the bodies of `baghchal/search.py` (`minimax`, `alphabeta`, `choose_move`) and `baghchal/evaluation.py` (`features`, `designed_eval`, `baseline_eval` and the initial `WEIGHTS`). Shalom owns `search.py` and Vishal owns `evaluation.py` from here: they review it, may rewrite it, and must be able to explain it at the viva.

- Keep the authorship record truthful. If a team member rewrites either file, record it in PRD §10.
- The final report's declaration must say Claude Code wrote the search and evaluation. Never describe that code as written by a team member.

## Rules you must not break

1. **Game rules are frozen in PRD §4 (R1–R11).** Never change a rule to make a test pass. If a rule seems wrong, stop and ask.
2. **Standard library only** in `baghchal/`. matplotlib and pytest are the only third-party packages, and only for plots and tests.
3. **Determinism.** Fixed move order (R10). Never iterate a `set` or `dict` built from unordered input to generate moves. No randomness without an explicit seed.
4. **Immutability.** `apply()` returns a new state and never mutates its argument.
5. **Topology is generated** from the R1 rule at import time. Never hard-code an adjacency list or jump table.
6. **Do not modify `experiments/`** except to fix a bug you can demonstrate with a failing test. It is Pranav's module and its interface (`experiments/engine_api.py`) is the contract the adapter implements.
7. **Tests first** for rules and integration: write the test, see it fail, then implement.
8. Never weaken or delete an existing test to get green. Fix the code or ask.

## Style

- Python 3.9+ (`from __future__ import annotations`; no `match`, no `X | Y` at runtime).
- Small pure functions, type hints, docstrings that cite the PRD rule they implement (e.g. `"""R7: tiger jumps."""`).
- Board as a 25-tuple, index `i = 5*row + col`; `EMPTY=0, GOAT=1, TIGER=2`.
- No print statements in library code; only in `__main__.py`.

## Definition of done for any task

- `python -m pytest -q` passes.
- New behaviour has tests that cite PRD rule numbers.
- `README.md` updated if a command or output changed.
- Summarise what changed in 3–5 lines and list anything left for a human.

## Git

One branch per phase (`phase-1-rules`, `phase-2-search`, …). Small commits with clear messages. Never force-push `main`.
