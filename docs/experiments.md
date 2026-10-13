# Experiment framework (`experiments/`)

The measurement side of the Bagh-Chal agent: fixed test positions, node counting and timing, the two experiments, and the plots and tables for the report.

- **E1 — Minimax vs Alpha-Beta.** Same 30 positions, depths 2, 3 and 4. Nodes expanded and time per move for each algorithm, plus a correctness check that alpha-beta returns the same root *score* as minimax.
- **E2 — Designed evaluation vs baseline.** Self-play at depth 3, 50 games with the designed evaluator as tiger and 50 as goat, against a baseline that only counts captured goats. Win / draw / loss and goats captured.

This package contains no search and no evaluation function. Those live in the engine. The framework talks to the engine through one small adapter class (see [The engine contract](#the-engine-contract)).

## Setup

Python 3.9 or later.

```bash
pip install -r requirements.txt
```

## Running

All commands run from the repo root.

```bash
# 1. Check the engine honours the contract (run this first, and after every engine change)
python -m experiments check-engine --engine baghchal.adapter:Adapter

# 2. Generate the fixed test suite once, then commit data/positions.json and never regenerate it
python -m experiments generate --engine baghchal.adapter:Adapter --seed 2026
python -m experiments validate
python -m experiments show --id P01 M01

# 3. E1: minimax vs alpha-beta at depths 2, 3, 4
python -m experiments e1 --engine baghchal.adapter:Adapter

# 4. E2: designed evaluation vs baseline, 50 games per side at depth 3
python -m experiments e2 --engine baghchal.adapter:Adapter

# Rebuild summaries, tables and plots from existing raw CSVs (no re-running)
python -m experiments report
```

Useful options: `e1 --depths 2,3 --repeats 5 --only P01 M04`, `e2 --games 10 --depth 2` for a quick trial run. `python -m experiments <command> --help` lists everything.

### Outputs (in `results/`)

| File | Contents |
|---|---|
| `e1_raw.csv` | One row per position × depth × algorithm: nodes, median and min time, root score, move |
| `e1_summary.csv` | Medians per phase and depth, effective branching factor b*, alpha-beta nodes as a fraction of minimax's |
| `e1_nodes_vs_depth.png` | Log-scale nodes vs depth, placement and movement side by side — the main E1 figure |
| `e1_time_vs_depth.png` | Same layout for time per move |
| `e2_raw.csv` | One row per game: opening, winner, result for the designed side, goats captured, plies |
| `e2_summary.csv` | W/D/L per side, win rate with a 95% Wilson interval, mean goats captured |
| `e2_results.png` | Win / draw / loss bars for the designed evaluator as tiger and as goat |
| `tables.md` | Report-ready Markdown tables for both experiments |

## Design decisions (for the report and viva)

**Why generate positions instead of typing them.** A hand-typed position can be illegal or unreachable, and one typo poisons every benchmark. The generator plays real games (epsilon-greedy: 30% random moves, otherwise the engine's own depth-2 alpha-beta move), snapshots every state, and picks 15 placement-phase and 15 movement-phase positions with side-to-move balanced 8/7 inside each phase. Pure random play isn't used because random goats get captured long before placement ends, so the movement phase would barely appear. One seed reproduces the whole file; the seed and parameters are stored in its metadata.

**Why split by phase.** Branching factor differs sharply between placement (up to ~21 empty points for a goat) and movement (a handful of legal moves). Averaging the two would hide the effect alpha-beta has in each.

**Why compare root scores, not moves.** Alpha-beta is guaranteed to return the same minimax *value* as plain minimax. It is not guaranteed to return the same *move*: when two moves tie, which one comes back depends on move ordering. A move-equality check would report false failures; a score check catches real pruning bugs.

**How nodes are counted.** The engine increments `stats.nodes` as the first statement of every recursive call, root included. Counting at the top (rather than only at leaves) treats both algorithms identically. `check-engine` verifies the placement: a depth-1 minimax search must expand exactly 1 + (number of legal moves) nodes.

**How time is measured.** `time.perf_counter()` around the whole search call, repeated 3 times; the median is reported. Node counts must be identical across repeats, or the run aborts — a non-deterministic search would make every node comparison meaningless.

**Effective branching factor.** b* solves N = 1 + b* + b*² + … + b*ᵈ for the measured node count N. For minimax it approximates the real branching factor; for alpha-beta with good move ordering it falls toward √b, the textbook O(b^(d/2)) result.

**Why E2 needs random openings.** Two deterministic agents playing from the same start play the same game every time, so "50 games" would be one game repeated 50 times. Game *i* therefore starts after a 4-ply random opening from seed 2026 + *i*. The same 50 openings are used for both matchups, so tiger-side and goat-side results are compared on identical starting conditions.

**Why a confidence interval on win rate.** With 50 games, a 60% win rate has a 95% interval of roughly 46–72%. Reporting the interval stops the report over-claiming.

## The engine contract

The adapter (`baghchal/adapter.py`, built in Phase 4) is a class with eight methods. `experiments/engine_api.py` has the full contract.

| Method | Returns |
|---|---|
| `from_position(pos)` | engine state built from a `Position` (empty repetition history) |
| `to_position(state)` | `Position` snapshot of a state |
| `initial_state()` | standard start |
| `legal_moves(state)` | list of moves, fixed order |
| `apply(state, move)` | new state; must not mutate the input |
| `is_terminal(state)` | win, loss, repetition or move cap |
| `winner(state)` | `"TIGER"`, `"GOAT"` or `None` for a draw |
| `search(state, depth, algorithm, evaluator, stats)` | `SearchResult(move, score)`; `algorithm` is `"minimax"` or `"alphabeta"`, `evaluator` is `"designed"` or `"baseline"` |

The one line the search must contain:

```python
def minimax(state, depth, maximizing, stats):
    stats.nodes += 1          # first statement, every call
    ...
```

## Position file format

`data/positions.json`:

```json
{
  "meta": {"seed": 2026, "per_phase": 15, "...": "..."},
  "positions": [
    {"id": "P01", "board": ["T.G.T", ".....", ".....", ".....", "T...T"],
     "to_move": "TIGER", "goats_in_hand": 19, "goats_captured": 0, "phase": "placement", "note": ""}
  ]
}
```

`T` tiger, `G` goat, `.` empty, row 0 at the top. `validate` checks 4 tigers, that goats on board + in hand + captured = 20, that the stored phase matches `goats_in_hand`, and that no id or board is duplicated. Positions start with an empty repetition history.

## Tests

```bash
python -m pytest -q
```

The tests run against `tests/fake_engine.py`, a test double that follows the `Position` bookkeeping but uses toy rules and returns canned search results. It exists only so the framework can be tested before the real engine is plugged in. It is not part of the agent and none of its numbers belong in the report.

## Libraries

Standard library only, except matplotlib (plots) and pytest (tests). Neither is involved in search or decision-making.
