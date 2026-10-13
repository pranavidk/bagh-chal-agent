# Claude Code prompts — phase by phase

How to use this file: open a terminal in the repo, run `claude`, and paste one prompt at a time. Wait for each to finish and check its **Done when** before moving on. Every prompt assumes Claude Code has read `CLAUDE.md` (it loads automatically) and `docs/PRD.md`.

> **Ownership changed on 2026-10-13 (PRD §3 C3, §6.1, §10).** Shalom and Vishal were unavailable, so at Pranav's direction Claude Code wrote the bodies of `search.py` and `evaluation.py` (including the initial weights). The Phase 2a and 3a prompts below are kept as the original plan and record. They were run with Claude Code writing the stubs and tests, then the code. Shalom and Vishal now *own* those files: they run the 2b and 3b review prompts to understand and sign them off. The final report's declaration must say Claude Code wrote them.

Who runs what:

| Phase | Runs the prompt | Writes the AI code |
|---|---|---|
| 0 Setup | Pranav | — |
| 1 Rules | Pranav (or anyone) | — |
| 2 Search | Pranav (2a); Shalom reviews (2b) | Claude Code, owned by **Shalom** (was: Shalom) |
| 3 Evaluation | Pranav (3a); Vishal reviews (3b) | Claude Code, owned by **Vishal** (was: Vishal) |
| 4 Integration | Pranav | — |
| 5 Experiments | Pranav | — |
| 6 Report & viva | Everyone | — |

Phases 2 and 3 can run at the same time on separate branches once Phase 1 is merged.

---

## Phase 0 — Setup (Pranav)

**Before:** unzip the starter into `~/projects/bagh-chal-agent`, `cd` into it, run `claude`.

```text
Read CLAUDE.md and docs/PRD.md fully. Then set up the project:

1. Create a Python virtual environment in .venv, install requirements.txt, and confirm the Python version is 3.9 or later.
2. Initialise git if needed, add a .gitignore (venv, __pycache__, .pytest_cache, .DS_Store), and make an initial commit on main.
3. Run python -m pytest -q. The experiment framework's tests in tests/test_framework.py should pass against tests/fake_engine.py. Do not change anything in experiments/.
4. Create the empty package baghchal/ with __init__.py only. Don't create any other module yet.

Then summarise in 5 lines: Python version, test result, and anything in the PRD you think is ambiguous or contradictory. Don't resolve ambiguities yourself — list them.
```

**Done when:** tests pass, one commit on `main`, and you've read the ambiguity list (bring anything real to the team).

Then create a GitHub repo, push, and add Shalom and Vishal as collaborators.

---

## Phase 1 — Board and rules (Claude Code builds; Vishal reviews)

```text
Branch: phase-1-rules. Implement PRD §4 rules R1–R11 test-first. Do NOT create search.py or evaluation.py.

Build:
- baghchal/board.py — R1 adjacency generated from the rule at import time; R2 jump table of (x, y, z) triples generated from the rule; degree(x); point/coordinate helpers; even-parity helper.
- baghchal/state.py — immutable State (frozen dataclass) holding: board as a 25-tuple (EMPTY=0, GOAT=1, TIGER=2), to_move, goats_in_hand, goats_captured, ply, and a repetition history suitable for R8.4. Parse/print the 5-row text format ("T...T/....." or 5 lines), with clear errors for bad input. Conversion to and from experiments.position.Position.
- baghchal/rules.py — legal_moves (R5–R7, in R10 order), apply (never mutates), is_terminal and winner (R8 in the stated order), utility(state, ply_from_root) (R9). A Move type that prints readably, e.g. "G@12", "G 7-12", "T 0-1", "T 0x6>12".
- baghchal/game.py — BaghChalGame implementing the Game protocol in PRD §6.2.

Tests (tests/test_board.py, tests/test_rules.py), each citing the rule number:
- R1: 56 edges; 13 even points; degree histogram {3:12, 4:4, 5:4, 8:5}; corner degree 3; (2,2) degree 8; adjacency symmetric; no diagonal from an odd point.
- R2: 80 directed jump triples; every z is a neighbour of y; the lemma holds for all triples.
- R3: start position; 12 tiger step moves at the start; goat has 21 placements at the start.
- R5/R6: goats can't move pieces while in hand; can step once h = 0; never jump.
- R7: jump captures and increments k; jump onto an occupied point illegal; jump off-board illegal; no multi-jump; capture is optional (steps still listed).
- R8: each terminal condition separately, and the ordering between them; threefold repetition reached by shuffling two pieces back and forth; MOVE_CAP draw.
- R9: utility values and the depth adjustment.
- R10: move order is deterministic and sorted as specified.
- Immutability: apply() never changes its input (check on 200 random states).
- Conservation: tigers + goats on board + in hand + captured is always 4 + 20, over 200 random full games with a fixed seed.
- Round-trip: State -> Position -> State and text -> State -> text.

Keep it fast: precomputed tables, tuple boards. Run the full suite and report timings for generating legal moves on 10,000 random states.
```

**Done when:** all tests pass; the conservation and immutability tests run over hundreds of random games; merge to `main`.

### Phase 1 review (Vishal runs this)

```text
I'm Vishal. I need to understand and sign off the rules code before I build the evaluation on top of it. Walk me through board.py, state.py and rules.py against PRD §4, one rule at a time: show me the exact lines that implement each rule and the test that proves it. Then quiz me with 5 questions about edge cases (e.g. what happens when a tiger could jump but a goat is behind the landing point). Don't change any code unless I ask.
```

---

## Phase 2 — Search (planned: Shalom writes the algorithm)

> Superseded 2026-10-13: Claude Code wrote `search.py` (see the note at the top). 2a is the original plan; Shalom now runs 2b to review and own the code.

### 2a. Stubs and tests (Shalom runs this)

```text
Branch: phase-2-search. I'm Shalom and I will write the search myself. Per CLAUDE.md you must not write the bodies of minimax, alphabeta or choose_move.

1. Add an optional `pv` field (default None) to SearchResult in experiments/engine_api.py if it is missing, and confirm the framework tests still pass.
2. Create baghchal/search.py with the exact signatures from PRD §6.3, full docstrings explaining parameters and return values, and `raise NotImplementedError` bodies. Import SearchStats and SearchResult from experiments.engine_api.
3. Write tests/test_search.py covering every acceptance item in PRD §6.3:
   - A tiny TreeGame implementing the Game protocol for the Russell & Norvig Fig. 5.2 tree (leaves 3 12 8 | 2 4 6 | 14 5 2, leaves are terminal with those utilities). Expect value 3 from both algorithms, 13 nodes for minimax, 11 for alpha-beta.
   - Depth-1 minimax node count = 1 + number of legal moves on several Bagh-Chal positions.
   - alpha-beta score == minimax score and alpha-beta nodes <= minimax nodes on 50 random reachable positions (fixed seed) at depths 1, 2, 3. Use a trivial evaluate (e.g. goats captured) so these tests don't depend on Phase 3.
   - Tiger to move with k = 4 and a capture available: the chosen move is a jump and the score is 1_000_000 - 1.
   - Goats can trap the last mobile tiger in one move: score is -1_000_000 + 1 and the move achieves it.
   - Faster win preferred: a position with a win in 1 and a win in 3 picks the win in 1.
   - Determinism: same node count across 3 runs.
   - The returned move is always in legal_moves; the PV starts with the returned move.
4. Run the tests and confirm they all fail with NotImplementedError and nothing else (no import errors).

Then explain to me, in words and pseudocode only (no Python), how minimax and alpha-beta work, where `stats.nodes += 1` goes and why, how `ply` feeds the R9 utility, and how R11 tie-breaking must be done. Use the textbook tree as the worked example and trace alpha and beta through it step by step.
```

**Then Shalom writes `search.py` himself.** Use the course textbook (Module 3) pseudocode as the reference.

### 2b. Review (Shalom runs this; he owns search.py)

```text
I'm Shalom. Claude Code wrote baghchal/search.py and I own it now; I'll be examined on it. Run tests/test_search.py, then walk me through the file line by line against PRD §6.3 and the textbook pseudocode: where stats.nodes is incremented and why it must be first, why terminal is checked before the depth cutoff, how ply reaches the R9 utility, how alpha and beta are updated and when the cut happens, why tie-breaking is strict (R11), and how the PV is built. Trace alpha-beta on the R&N Fig. 5.2 tree with me by hand. Then quiz me with 5 questions. Don't change the code unless I ask; if I rewrite any part, record it in PRD §10.
```

**Done when:** all of `tests/test_search.py` passes and Shalom can explain every line; merge to `main`.

---

## Phase 3 — Evaluation (planned: Vishal writes the evaluation)

> Superseded 2026-10-13: Claude Code wrote `evaluation.py` and the initial weights (see the note at the top). 3a is the original plan; Vishal now runs 3b to review the features, decide on the weights and own the code.

### 3a. Stubs and tests (Vishal runs this)

```text
Branch: phase-3-eval. I'm Vishal and I will write the evaluation myself. Per CLAUDE.md you must not write the bodies of features, designed_eval, baseline_eval or the WEIGHTS values.

1. Create baghchal/evaluation.py with the signatures from PRD §6.4: features(state) -> dict, designed_eval(state) -> float, baseline_eval(state) -> float, WEIGHTS dict with the six keys and values left as None. Docstrings must quote the exact feature definitions from the PRD table. Bodies raise NotImplementedError.
2. Write tests/test_evaluation.py:
   - For each of the six features, at least two hand-built boards with the expected count. Put the board and the counting argument in a comment above each test so I can check it by hand. Include an edge case per feature (e.g. a goat threatened by two tigers counts once for `threat`; a tiger with no steps but a jump is NOT trapped).
   - baseline_eval depends only on goats captured.
   - Sign checks: more captures raises designed_eval; a trapped tiger lowers it (all else equal).
   - Bound: |designed_eval| < 100,000 on 500 random reachable states (fixed seed).
   - Speed: report the mean time per designed_eval call over 10,000 states.
3. Run the tests and confirm they fail only with NotImplementedError.

Then explain to me, in words only: why the six features are combined into ONE zero-sum score instead of two separate objectives, why that keeps alpha-beta sound, why the bound matters, and what I should think about when choosing relative weights. Don't propose numbers.
```

**Planned:** Vishal writes `evaluation.py` and chooses the weights, with a one-line justification per weight in a comment. **Actual:** Claude Code wrote both; Vishal reviews and owns them (3b).

### 3b. Review (Vishal runs this; he owns evaluation.py)

```text
I'm Vishal. Claude Code wrote baghchal/evaluation.py and its initial WEIGHTS; I own it now and must justify the weights at the viva. Run tests/test_evaluation.py, then walk me through how each of the six features is computed against PRD §6.4, and the one-line reason given for each weight. Explain in words why one zero-sum score keeps alpha-beta sound and why the ±100,000 bound matters. Then play 10 quick self-play games at depth 2 (seeded) and show me the final boards and results. E2 shows the designed eval wins 96% as tiger but only 32% as goat, so help me decide whether to keep or change the weights. Don't change the weights unless I tell you the new values; if I change them, re-run E1 and E2 and record the change in PRD §10.
```

**Done when:** all of `tests/test_evaluation.py` passes and Vishal has kept or changed the weights with his own justification; merge to `main`.

---

## Phase 4 — Integration and demo CLI (Pranav)

```text
Branch: phase-4-integration. search.py and evaluation.py are written by the team; do not change their logic.

1. baghchal/adapter.py: class Adapter implementing experiments.engine_api.Engine (read that file for the contract). search() maps evaluator 'designed'/'baseline' to the evaluation functions and algorithm to search.choose_move, and returns SearchResult with the PV.
2. Run python -m experiments check-engine --engine baghchal.adapter:Adapter and fix integration issues in adapter.py until it reports 0 failures. If a failure is in search.py or evaluation.py, stop and tell me which owner needs to fix what.
3. baghchal/__main__.py with the commands in PRD §6.6: analyse (from --board flags or --file), play, selfplay, rules. analyse prints the board, side to move, chosen move, score, nodes expanded, time in ms, and the principal variation as a numbered list. Any bad input prints a one-line error and exits 1, never a traceback.
4. tests/test_cli.py: analyse on the start position and two mid-game positions; five malformed inputs each produce a clean error; play rejects an illegal move with a reason.
5. Benchmark: alpha-beta and minimax at depths 2, 3, 4 on the start position and one movement-phase position; report time and nodes. Flag it if minimax depth 4 exceeds 30 s (PRD §7).
6. Update README.md with exact setup and run instructions for every command.
```

**Done when:** `check-engine` passes, `analyse` works on positions you type by hand, README updated. **This is the Review 2 gate.**

Practice for the demo: have someone else type 5 positions you haven't seen and run `analyse` on each.

---

## Phase 5 — Experiments (Pranav)

```text
Run the experiment pipeline. Don't modify experiments/ unless you can show a bug with a failing test.

1. python -m experiments check-engine --engine baghchal.adapter:Adapter (must be 0 failures).
2. python -m experiments generate --engine baghchal.adapter:Adapter --seed 2026, then validate and show 3 positions from each phase. Commit data/positions.json.
3. A quick E1 trial: --depths 2,3 --repeats 1. Report the runtime and estimate how long the full run (depths 2,3,4, repeats 3) will take. If the full run would exceed 2 hours, tell me and propose options before running it.
4. Run full E1 and E2 (defaults). Use background execution if long, and stream progress.
5. Show me results/tables.md and the three PNGs, and point out anything surprising: score mismatches, alpha-beta saving less than expected at some depth, placement vs movement differences, many capped games in E2. Don't write conclusions for the report — list observations only.
6. Commit results/.
```

**Done when:** `results/tables.md`, `e1_nodes_vs_depth.png`, `e1_time_vs_depth.png`, `e2_results.png` exist and are committed. The analysis paragraphs are written by the team.

---

## Phase 6 — Report support and viva practice (everyone)

### Implementation notes draft

```text
Read the codebase and draft ONLY the "Implementation notes" section of the report (PRD §9 item 4) as docs/implementation_notes.md: state representation, how topology is generated from the rule and why, the jump lemma, how nodes are counted, tie-breaking, and how positions were generated. Describe what the code does; mark every place where the owners (Shalom for search, Vishal for evaluation) should add their own reasoning with [OWNER: ...].
```

### Viva practice (each member separately)

```text
Act as a strict viva examiner for this project. Ask me one question at a time about the whole AI core (search.py and evaluation.py, the formulation, and the experiments), starting with: "Show me the part of your code where your AI makes a decision, and explain how it works." After each answer, tell me what was missing or wrong, then ask a harder follow-up. Include at least: tracing alpha-beta by hand on a small tree, why alpha-beta returns the same value but maybe a different move, why the asymmetric features still form one zero-sum evaluation, what depth means, and how to read the nodes-vs-depth plot. Stop after 10 questions and give me a list of topics to revise.
```

---

## When something goes wrong

**A test is failing and you don't know why:**
```text
Test X is failing. Find the root cause before proposing any fix: reproduce it, explain the cause with evidence, and say which PRD rule is involved. If the cause is in search.py or evaluation.py, explain it in words for the author instead of fixing it.
```

**A rule question comes up:**
```text
Is the following behaviour correct under PRD §4? <describe>. Quote the rule that decides it. If the PRD doesn't decide it, say so and don't change any code.
```
