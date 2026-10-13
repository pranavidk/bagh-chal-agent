# PRD — Bagh-Chal Game-Playing Agent

**Course:** BCSE306L Artificial Intelligence, Module 3 (Adversarial Search)
**Team:** Pranav Shankar (24BCE2773) · Vishal (24BCE2802) · Shalom Santosh (24BCE2731)
**Status:** Not started. This document is the single source of truth for scope, rules and interfaces.

---

## 1. Problem

> Build an agent that plays Bagh-Chal using Minimax with Alpha-Beta pruning and an evaluation function we designed, and measure (a) how much alpha-beta saves over plain minimax and (b) whether our evaluation function beats a naive one.

The game is asymmetric: 4 tigers win by capturing 5 goats; 20 goats win by trapping all tigers. One zero-sum evaluation function, built from two disjoint feature sets (one for tiger progress, one for goat progress), keeps the search a true minimax so alpha-beta stays sound. That design choice is the project's central idea.

## 2. Goals and non-goals

**Goals (what earns marks)**
1. A correct, readable minimax and alpha-beta written from scratch.
2. A designed six-feature evaluation function, with every feature justified.
3. Two honest experiments with tables and plots: E1 (minimax vs alpha-beta) and E2 (designed eval vs baseline).
4. A command-line demo that accepts **any position the examiner types in** and prints the move, score, nodes, time and principal variation.
5. Every team member able to explain the whole AI core at the individual viva.

**Non-goals (no marks, don't build)**
- Any GUI or web interface. The course gives zero marks for UI.
- Neural networks, learned weights, external AI services or game libraries.
- Transposition tables, iterative deepening, quiescence search, multi-threading. These are listed as optional stretch work in §11, not part of the plan.

**Priorities, in order:** safest marks → something interesting → least total work. When in doubt, choose the simpler option.

## 3. Hard constraints

| # | Constraint | Why |
|---|---|---|
| C1 | Search, evaluation and game logic use the Python standard library only. | Course rule: "if I delete every library import, is there still an AI algorithm left?" |
| C2 | matplotlib (plots) and pytest (tests) are the only third-party packages. | Allowed by the course as non-AI tooling. |
| C3 | Authorship of the search (`search.py`) and evaluation (`evaluation.py`) is recorded truthfully in §6.1 and declared in the final report. | **Changed 2026-10-13** (see §10): Claude Code wrote both at Pranav's direction, so the Review 1 statement no longer holds and the final declaration must say so. |
| C4 | Python 3.9+. Runs on macOS and Linux from the terminal. | Team machines. |
| C5 | The rules in §4 are frozen. Any change is a team decision recorded in this file. | A rule change silently invalidates every experiment. |
| C6 | Everything is deterministic: fixed move order, fixed seeds, no `set` iteration in move generation. | Node counts must be reproducible. |

## 4. Game rules (frozen)

Coordinates are `(row, col)`, `0 ≤ row, col ≤ 4`, row 0 at the top. Point index `i = 5·row + col`.

**R1 — Board topology.** Two points are adjacent if they differ by at most 1 in each coordinate, and a diagonal link exists only through points where `(row + col)` is even:

```
N(r,c) = { (r',c') : |r−r'| ≤ 1, |c−c'| ≤ 1, (r',c') ≠ (r,c),
           and if r ≠ r' and c ≠ c' then (r + c) mod 2 = 0 }
```

Generated at import time from this rule, never hard-coded. Known facts to test against: **56 edges**; 13 even-parity points; degrees are 3 (12 points), 4 (4 points), 5 (4 points), 8 (5 points: (1,1), (1,3), (2,2), (3,1), (3,3)); corner (0,0) has degree 3; **80 directed jump triples** (x, y, z).

**R2 — Jump lemma.** If `y ∈ N(x)` and `z = 2y − x` is on the board, then `z ∈ N(y)` along the same line. Jump legality is a bounds test plus emptiness tests. Precompute a jump table `(x, y, z)` from R1 at import.

**R3 — Start.** Tigers on (0,0), (0,4), (4,0), (4,4). All other points empty. Goats in hand `h = 20`, captured `k = 0`. **Goats move first.** From the start, tigers have 12 legal step moves in total.

**R4 — Turns** alternate goat, tiger, goat, …

**R5 — Goat placement phase (`h > 0`).** The goat's only legal moves are PLACE on any empty point; `h −= 1`. Goats already on the board cannot move while `h > 0`.

**R6 — Goat movement phase (`h = 0`).** STEP one goat to an adjacent empty point. Goats never jump or capture.

**R7 — Tiger moves (both phases).** STEP to an adjacent empty point, or JUMP from `x` over a goat on adjacent `y` to empty `z = 2y − x` (on the board). The jumped goat is removed and `k += 1`. One jump per move, no chains. Capturing is never compulsory.

**R8 — Terminal test**, checked for the side to move, in this order:
1. `k ≥ 5` → **tigers win**.
2. Tiger to move and no legal tiger move → **goats win**.
3. Goat to move and no legal goat move → **tigers win** (our stated convention).
4. The current position (board, side to move, `h`) has occurred 3 times in this game's history → **draw** (threefold repetition; in practice only possible when `h = 0`).
5. Ply count since the game start reaches `MOVE_CAP = 200` → **draw**.

A Position loaded from a file starts with an empty history and a ply count of 0.

**R9 — Utility.** Tigers are MAX, goats are MIN, always.
`U = +1,000,000 − d` for a tiger win, `−1,000,000 + d` for a goat win, `0` for a draw, where `d` is the number of plies from the search root. The `d` term makes the agent prefer faster wins and slower losses.

**R10 — Move order** (fixed, used by both algorithms): goat PLACE by ascending point index; goat STEP by (from, to) ascending; tiger moves by (from, to) ascending with steps and jumps interleaved by that key.

**R11 — Tie-breaking.** At every node, the search keeps the **first** move that achieves the best value (strict `>` for MAX, strict `<` for MIN). This makes results reproducible; it also means minimax and alpha-beta can return different moves with equal value, which is why E1 compares **scores**, not moves.

## 5. AI formulation (for the report, §2)

| Item | Definition |
|---|---|
| State | `s = ⟨B, h, k, p, H, n⟩` — board map B over the 25 points, goats in hand h, goats captured k, player to move p, repetition history H, ply count n |
| Initial state | R3 |
| Actions | `PLACE(x)` while h > 0; `STEP(x, y)` to an adjacent empty point; `JUMP(x, y, z)` for tigers (R5–R7) |
| Transition model | `RESULT(s, a)`: apply the move, flip p, update h or k, append to H, increment n |
| Terminal test | R8 |
| Utility | R9 |
| Cutoff | `CUTOFF(s, d) = TERMINAL(s) ∨ d = 0` |
| Evaluation | §6.3, a single scalar from the tiger's perspective |
| Complexity | Branching ~21 for goat placement, ~10–20 goat movement, ~8–16 tiger. Minimax O(b^d); alpha-beta best case O(b^(d/2)) |

## 6. Architecture

```
bagh-chal-agent/
├── CLAUDE.md                 working rules for Claude Code
├── README.md                 exact run instructions (course requirement)
├── requirements.txt          matplotlib, pytest
├── docs/
│   ├── PRD.md                this file
│   └── prompts.md            phase-by-phase Claude Code prompts
├── baghchal/                 the agent
│   ├── board.py              R1–R2: topology, adjacency and jump tables
│   ├── state.py              immutable State, text parse/print
│   ├── rules.py              legal moves, apply, terminal test, winner, utility
│   ├── game.py               BaghChalGame: the game protocol search runs against
│   ├── search.py             minimax, alpha-beta, choose_move        ← Claude Code; Shalom owns
│   ├── evaluation.py         designed eval + baseline eval           ← Claude Code; Vishal owns
│   ├── adapter.py            bridge to the experiment framework
│   └── __main__.py           CLI: analyse, play, selfplay
├── experiments/              E1, E2, positions, plots (already built — Pranav)
├── data/positions.json       30 fixed test positions (generated once)
├── results/                  experiment outputs
└── tests/
```

### 6.1 Ownership

| Module | Written by | Claude Code's role |
|---|---|---|
| `board.py`, `state.py`, `rules.py`, `game.py` | Claude Code, reviewed by Vishal | Builds it with tests |
| `search.py` | **Claude Code** (2026-10-13, at Pranav's direction); **Shalom** owns it from here | Wrote stubs, tests and function bodies. Shalom reviews, may rewrite, and must explain it at the viva. |
| `evaluation.py` | **Claude Code** (2026-10-13, at Pranav's direction); **Vishal** owns it from here | Wrote stubs, tests, feature logic and initial weights. Vishal reviews, may change the weights, and must justify them at the viva. |
| `adapter.py`, `__main__.py` | Claude Code | Builds it |
| `experiments/` | Pranav (exists) | Wires it up, runs it |
| Report, slides | All three | Drafts tables from results only |

### 6.2 Game protocol (the search sees only this)

`search.py` must not import `rules.py` directly. It works on any object with these methods, which lets it be unit-tested on a textbook game tree.

```python
class Game(Protocol):
    def legal_moves(self, state) -> list            # fixed order (R10)
    def apply(self, state, move) -> State            # new state, never mutates
    def is_terminal(self, state) -> bool             # R8
    def utility(self, state, ply_from_root: int) -> float   # R9; only on terminal states
    def is_max_to_move(self, state) -> bool          # True when tigers are to move
```

### 6.3 Search interface (`search.py`, owner Shalom)

```python
class SearchStats:            # from experiments.engine_api
    nodes: int                # += 1 as the FIRST statement of every recursive call
    evals: int                # += 1 each time the evaluation function is called (optional)

def minimax(game, state, depth, ply, evaluate, stats) -> tuple[float, list]:
    """Returns (value, principal_variation)."""

def alphabeta(game, state, depth, ply, alpha, beta, evaluate, stats) -> tuple[float, list]:
    """Same contract; prunes when alpha >= beta."""

def choose_move(game, state, depth, algorithm, evaluate, stats) -> SearchResult:
    """algorithm in {'minimax', 'alphabeta'}. Returns SearchResult(move, score, pv)."""
```

`evaluate(state) -> float` is passed in, so the same search runs with either evaluator.

**Acceptance (tests and code written by Claude Code; see §10):**
- Textbook tree (Russell & Norvig Fig. 5.2, leaves 3 12 8 | 2 4 6 | 14 5 2): both algorithms return **3**; minimax expands **13** nodes; alpha-beta expands **11**.
- Depth-1 minimax on any position expands exactly `1 + len(legal_moves)` nodes.
- On 50 random Bagh-Chal positions at depths 1–3: alpha-beta score == minimax score, and alpha-beta nodes ≤ minimax nodes.
- Tiger to move, `k = 4`, a capture available → the jump is chosen with score `1,000,000 − 1`.
- Goats can trap the last mobile tiger in one move → found with score `−1,000,000 + 1`.
- Node counts identical across repeated runs.

### 6.4 Evaluation (`evaluation.py`, owner Vishal)

```
EVAL(s) = w1·capt + w2·mob + w3·threat − w4·trapped − w5·conn − w6·hub
```

| Feature | Favours | Definition (exact, so tests can be written) |
|---|---|---|
| `capt` | Tigers | `k`, goats captured |
| `mob` | Tigers | number of legal tiger STEP moves, summed over all tigers |
| `threat` | Tigers | number of distinct goats that some tiger could jump right now |
| `trapped` | Goats | number of tigers with no legal STEP or JUMP |
| `conn` | Goats | number of board edges (R1) whose both endpoints hold goats |
| `hub` | Goats | sum of `degree(x)` over goats on even-parity points x |

Features are computed regardless of whose turn it is.

```python
def features(state) -> dict[str, int]      # the six raw counts
def designed_eval(state) -> float          # weighted sum above
def baseline_eval(state) -> float          # capt only
WEIGHTS: dict[str, float]                   # initial values by Claude Code; Vishal reviews and justifies
```

**Constraints:** `|designed_eval(s)| < 100,000` for every reachable s, so no heuristic value can outrank a real win (±1,000,000). Initial weights were chosen by Claude Code with a one-line justification each; Vishal reviews them and justifies the final values in the report; tuning by tournament is stretch work (§11).

**Acceptance:** Claude Code writes ≥ 2 hand-built boards per feature with expected counts worked out on paper (the board and the arithmetic are in the test as a comment), plus the bound test over 500 random reachable states.

### 6.5 Adapter (`adapter.py`)

Implements `experiments.engine_api.Engine` (see `experiments/engine_api.py`): `from_position`, `to_position`, `initial_state`, `legal_moves`, `apply`, `is_terminal`, `winner`, `search(state, depth, algorithm, evaluator, stats)` with `evaluator ∈ {'designed', 'baseline'}`. Passes `python -m experiments check-engine` with 0 failures.

### 6.6 CLI (`python -m baghchal …`)

| Command | Purpose |
|---|---|
| `analyse --board "T...T/...../...../...../T...T" --to-move GOAT --in-hand 20 --captured 0 --depth 4 [--algorithm alphabeta] [--eval designed]` | The viva/demo command. Prints the board, the chosen move, backed-up score, nodes expanded, time, principal variation. |
| `analyse --file pos.txt` | Same, reading the 5-row text format from a file. |
| `play --human GOAT --depth 3` | Human vs agent in the terminal. Rejects illegal input with a reason. |
| `selfplay --depth 3` | Agent vs agent, prints each move. |
| `rules` | Prints the board with point indices and the adjacency degree of each point. |

Input errors (wrong piece counts, bad characters, wrong row length) print a clear message, never a traceback. The demo "must handle inputs the examiner chooses".

### 6.7 Experiments (built — see `experiments/`)

- **E1:** 30 fixed positions (15 placement, 15 movement), depths 2, 3, 4, both algorithms, design eval. Nodes, median time of 3 runs, root-score agreement, effective branching factor. Log-scale nodes-vs-depth plot.
- **E2:** 50 games per side at depth 3, designed vs baseline, paired random 4-ply openings. W/D/L, 95% Wilson interval, mean goats captured.

## 7. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Alpha-beta depth 4 ≤ 2 s per move on a laptop; minimax depth 4 ≤ 30 s per move. If minimax depth 4 is slower, E1 runs depth 4 on a documented subset. |
| State | Immutable. Board as a 25-tuple (`0` empty, `1` goat, `2` tiger) or similar; precomputed neighbour and jump tables. |
| Comments | The AI core (`search.py`, `evaluation.py`) is thoroughly commented. |
| Tests | `python -m pytest -q` passes on a clean checkout. Rule tests cover every item in R1–R9. |
| Reproducibility | Positions file and results committed; seeds recorded in metadata. |

## 8. Milestones

| Phase | Output | Owner | Gate |
|---|---|---|---|
| 0 Setup | Repo, venv, framework tests green | Pranav + Claude Code | `pytest` passes |
| 1 Rules | `board`, `state`, `rules`, `game` + tests | Claude Code, Vishal reviews | All R1–R9 tests pass |
| 2 Search | `search.py` | Claude Code (Shalom reviews and owns) | §6.3 acceptance tests pass |
| 3 Evaluation | `evaluation.py` | Claude Code (Vishal reviews and owns) | §6.4 acceptance tests pass |
| 4 Integration | `adapter.py`, CLI | Claude Code | `check-engine` 0 failures; `analyse` works on typed positions |
| — **Review 2** | Working AI core on a real test case | All | Live `analyse` demo + E1 quick run |
| 5 Experiments | positions, E1, E2, plots, tables | Pranav | `results/tables.md` |
| 6 Report | 8–12 page PDF, 6 slides | All | Sections in §9 |
| — **Review 3** | Final | All | Demo, report, viva |

Review 2 requires phases 0–4. Phases 2 and 3 can run in parallel once phase 1 is merged.

## 9. Report outline (course-mandated sections)

1. Problem statement and motivation
2. AI formulation — §4 and §5 written formally (**the most important section**)
3. Algorithm description with pseudocode (minimax, alpha-beta)
4. Implementation notes — state representation, topology generation, jump lemma, node counting, tie-breaking
5. Experiments and results — E1 and E2 tables and plots
6. Analysis — what worked, what failed, why
7. Limitations and what we'd do differently
8. References, and the declaration of external AI tool use (§10)

## 10. AI tool use and declaration

The Review 1 proposal declared that Claude was used for scoping and the proposal, wrote no part of the search, evaluation or analysis, and that any further use would be declared in the final report.

**Change recorded 2026-10-13.** With Shalom and Vishal unavailable and time short, Pranav directed Claude Code to write the bodies of `search.py` (minimax, alpha-beta, choose_move) and `evaluation.py` (features, designed_eval, baseline_eval and the initial WEIGHTS). Claude Code therefore builds the game rules, search, evaluation, tests, adapter, CLI and experiment harness; the team reviews and owns that code and does the analysis. The final report's declaration must state this plainly; the Review 1 statement that Claude wrote no part of the search or evaluation is superseded. Any later rewrite by a team member is recorded here. If the team instead decides to have Claude Code write the search or evaluation, change the ownership table in §6.1 and in `CLAUDE.md`, and rewrite the declaration to say so plainly. Each member is still individually examined on the whole AI core.

## 11. Stretch (only after Review 2 gates pass)

1. Move ordering (captures first) as a third E1 configuration.
2. Weight tuning: 3–4 candidate weight sets, short round-robin, keep the best.
3. Depth asymmetry: tiger depth k vs goat depth k ± 1.

## 12. Risks

| Risk | Mitigation |
|---|---|
| Adjacency or jump bug silently corrupts everything | Topology generated by rule, tested against the known counts in R1 |
| Node counter in the wrong place | `check-engine` depth-1 test; textbook-tree node counts |
| Heuristic outranks a real win | Bound test on 500 states |
| Minimax depth 4 too slow | Immutable tuple state, precomputed tables; fallback subset documented |
| One member can't explain the core | Each author walks the other two through their module before Review 2 |
| Last-minute start | 15 of 20 marks are decided before Review 3; phases 0–4 come first |

## 13. Glossary

**Ply** — one move by one player. **Depth** — plies searched below the root. **Node expanded** — one call of the recursive search function. **Branching factor b** — legal moves per position. **Effective branching factor b\*** — the uniform b that gives the measured node count at depth d. **Principal variation** — the sequence of best moves both sides are expected to play.
