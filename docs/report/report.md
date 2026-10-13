# Bagh-Chal Game-Playing Agent: Minimax and Alpha-Beta with a Designed Evaluation Function

**BCSE306L Artificial Intelligence · Module 3 (Adversarial Search) · VIT Vellore**
Pranav Shankar (24BCE2773) · Vishal (24BCE2802) · Shalom Santosh (24BCE2731)

> **How to use this skeleton.** Sections follow PRD §9 (course-mandated). Tables and figures are filled in from `results/` and `docs/PRD.md`. Text marked **[TEAM: …]** is for the team to write. PRD §6.1 gives Claude Code only the tables, and the analysis must be the team's own. Paste into Word, insert the PNGs from `results/`, and export to PDF (8–12 pages).

---

## 1. Problem statement and motivation

[TEAM: ½ page. What Bagh-Chal is (4 tigers vs 20 goats on a 5×5 alquerque board). Why it's a good adversarial-search problem: asymmetric goals, two phases, a branching factor that changes with the phase. The question we answer (PRD §1): (a) how much alpha-beta saves over minimax, (b) whether our evaluation beats a naive one.]

## 2. AI formulation

[TEAM: introduce the formulation in a few sentences. This is the most important section; the rules and tables below are the formal content.]

### 2.1 Rules (frozen, PRD §4)

| # | Rule |
|---|---|
| R1 | Points `(r, c)`, `0 ≤ r, c ≤ 4`, index `5r + c`. Adjacent if they differ by ≤ 1 in each coordinate; diagonal links only through points with `r + c` even. 56 edges; degrees 3 (×12), 4 (×4), 5 (×4), 8 (×5). |
| R2 | Jump lemma: if `y ∈ N(x)` and `z = 2y − x` is on the board, then `z ∈ N(y)` on the same line. 80 directed jumps. |
| R3 | Start: tigers on the four corners, 20 goats in hand, 0 captured, goats move first. |
| R4 | Turns alternate goat, tiger, goat, … |
| R5 | While goats are in hand (`h > 0`), the goat's only move is to PLACE on an empty point. |
| R6 | Once `h = 0`, a goat STEPs to an adjacent empty point. Goats never jump. |
| R7 | A tiger STEPs to an adjacent empty point, or JUMPs over an adjacent goat to the empty point beyond. The goat is captured (`k += 1`). One jump per move; capturing is optional. |
| R8 | Terminal, in order: `k ≥ 5` → tigers win; tiger to move with no move → goats win; goat to move with no move → tigers win; position repeated 3 times → draw; 200 plies → draw. |
| R9 | Tigers are MAX. Utility `+1,000,000 − d` (tiger win), `−1,000,000 + d` (goat win), `0` (draw), with `d` = plies from the search root. |
| R10 | Fixed move order: placements by ascending point; goat steps by (from, to); tiger moves by (from, to), steps and jumps interleaved. |
| R11 | Ties keep the first best move (strict `>` for MAX, `<` for MIN). |

### 2.2 Formal problem definition

| Item | Definition |
|---|---|
| State | `s = ⟨B, h, k, p, H, n⟩`: board B over 25 points, goats in hand h, goats captured k, player to move p, repetition history H, ply count n |
| Initial state | R3 |
| Actions | `PLACE(x)` while h > 0; `STEP(x, y)` to an adjacent empty point; `JUMP(x, y, z)` for tigers (R5–R7) |
| Transition model | `RESULT(s, a)`: apply the move, flip p, update h or k, append to H, increment n |
| Terminal test | R8 |
| Utility | R9 |
| Cutoff | `CUTOFF(s, d) = TERMINAL(s) ∨ d = 0` |
| Evaluation | §3.3: one scalar from the tiger's side |
| Branching factor | ~21 in goat placement, ~10–20 in goat movement, ~8–16 for tigers; measured effective b* in Table 2 |
| Complexity | Minimax O(b^d); alpha-beta best case O(b^(d/2)) |

[TEAM: a short paragraph on why one zero-sum evaluation (tiger features minus goat features) keeps this a true two-player zero-sum game, so minimax and alpha-beta are sound.]

## 3. Algorithm description

### 3.1 Minimax

[TEAM: description and pseudocode in your own words (course Module 3 / Russell & Norvig Ch. 5). Point out: node counted first; terminal before cutoff; `ply` passed to the utility.]

### 3.2 Alpha-beta pruning

[TEAM: description and pseudocode. Include the hand trace of the Russell & Norvig Fig. 5.2 tree (leaves 3 12 8 | 2 4 6 | 14 5 2): value 3; minimax expands 13 nodes, alpha-beta 11 (the second MIN node is cut after its first leaf, 2 ≤ α = 3).]

### 3.3 Evaluation function

`EVAL(s) = w1·capt + w2·mob + w3·threat − w4·trapped − w5·conn − w6·hub` (tiger's side)

| Feature | Favours | Definition | Weight |
|---|---|---|---:|
| `capt` | Tigers | goats captured, k | 100 |
| `mob` | Tigers | legal tiger STEP moves, summed over tigers | 3 |
| `threat` | Tigers | distinct goats some tiger could jump right now | 15 |
| `trapped` | Goats | tigers with no legal STEP or JUMP | 40 |
| `conn` | Goats | board edges with goats on both ends | 2 |
| `hub` | Goats | sum of degree over goats on even points | 1 |

Bound: `|EVAL| ≤ 896` (tiger side) and `≤ 344` (goat side), far inside ±100,000, so no heuristic value outranks a real win (±1,000,000). Baseline for E2: `capt` only.

[TEAM, Vishal: justify each feature and weight in your own words (the code comments give a one-line reason each), and say whether the weights were kept or changed.]

## 4. Implementation notes

See `docs/implementation_notes.md` (draft with [OWNER] markers): state representation, topology generated from R1, jump lemma, move generation and repetition, node counting, tie-breaking, evaluation computation and position generation.

Verification summary (for a short table or paragraph):

| Check | Result |
|---|---|
| Unit and acceptance tests (`python -m pytest -q`) | 209 passed |
| Topology (R1/R2) | 56 edges, 13 even points, degree histogram {3:12, 4:4, 5:4, 8:5}, 80 jumps |
| Perft from the start, depths 1–4 | 21 · 252 · 5,052 · 68,204 |
| Textbook tree (R&N Fig. 5.2) | value 3; minimax 13 nodes; alpha-beta 11 nodes |
| Engine contract (`python -m experiments check-engine`) | 0 failures |
| Rules speed (`benchmarks/bench_rules.py`, Python 3.14) | ~0.94 M `legal_moves`/s; ~1.1 M `apply`/s |
| Evaluation speed | ~1.9 µs per `designed_eval` call |

## 5. Experiments and results

### 5.1 E1: Minimax vs alpha-beta

Setup: 30 fixed positions (15 placement, 15 movement, generated with seed 2026; see §4), depths 2, 3 and 4, designed evaluation. Nodes per search; time is the median of 3 runs.

**Table 1. Median nodes and time per move**

| Phase | Depth | Minimax nodes | Alpha-beta nodes | AB / MM | Minimax ms | Alpha-beta ms |
|---|---:|---:|---:|---:|---:|---:|
| Placement | 2 | 240 | 79 | 37.8% | 0.664 | 0.211 |
| Placement | 3 | 3,055 | 671 | 26.2% | 8.296 | 1.954 |
| Placement | 4 | 45,746 | 2,627 | 8.4% | 117.7 | 6.939 |
| Movement | 2 | 68 | 46 | 66.7% | 0.273 | 0.154 |
| Movement | 3 | 615 | 252 | 47.3% | 1.890 | 0.836 |
| Movement | 4 | 4,536 | 818 | 18.6% | 17.8 | 2.715 |
| All | 2 | 93 | 56 | 53.6% | 0.346 | 0.192 |
| All | 3 | 922 | 332 | 35.4% | 3.041 | 0.988 |
| All | 4 | 6,996 | 1,214 | 14.1% | 24.7 | 3.887 |

**Table 2. Effective branching factor b\*** (solves `N = 1 + b* + … + b*^d`)

| Phase | Depth | b\* minimax | b\* alpha-beta |
|---|---:|---:|---:|
| Placement | 2 / 3 / 4 | 14.97 / 14.16 / 14.36 | 8.35 / 8.39 / 6.88 |
| Movement | 2 / 3 / 4 | 7.70 / 8.14 / 7.93 | 6.23 / 5.94 / 5.06 |

**Correctness:** alpha-beta returned the same root score as minimax on all 90 position/depth pairs, and the same move on all 90 (Appendix Table A3).

**Figure 1.** `results/e1_nodes_vs_depth.png`: nodes expanded per move against depth, log scale, placement and movement side by side.
**Figure 2.** `results/e1_time_vs_depth.png`: time per move, same layout.

### 5.2 E2: Designed evaluation vs baseline

Setup: self-play at depth 3 with alpha-beta. 50 games with the designed evaluation as tiger and 50 as goat, against the capture-count baseline. Game *i* starts after a random 4-ply opening (seed 2026 + *i*), with the same 50 openings for both match-ups.

**Table 3. Results for the designed evaluation**

| Designed eval plays | Games | W | D | L | Win rate (95% Wilson CI) | Mean goats captured |
|---|---:|---:|---:|---:|---|---:|
| Tiger | 50 | 48 | 2 | 0 | 96% (86–99%) | 4.96 |
| Goat | 50 | 16 | 9 | 25 | 32% (21–46%) | 3.68 |

All 11 draws were threefold repetitions; no game reached the 200-ply cap. Mean game length was 45.5 plies (designed as tiger) and 46.2 plies (designed as goat). Outcome breakdown and capture distribution: Appendix Tables A4–A5.

**Figure 3.** `results/e2_results.png`: win/draw/loss for the designed evaluation as tiger and as goat.

## 6. Analysis

[TEAM: what worked, what failed, and why, using Tables 1–3 and the figures. Recorded observations to explain (not conclusions):
- alpha-beta's share of minimax's nodes falls with depth (54% → 35% → 14% overall);
- the saving is larger in placement than in movement at every depth;
- b\* for alpha-beta (5–8) stays well above √b, with fixed rule order and no move ordering;
- the designed evaluation wins 96% as tiger but only 32% as goat at depth 3;
- draws are all repetitions;
- games are short (~46 plies), so many end in or just after placement.]

## 7. Limitations and what we'd do differently

[TEAM: e.g. depth limited to 3–4; no move ordering, transposition table or iterative deepening (PRD non-goals; move ordering is stretch item §11.1); weights chosen by reasoning, not tuned (stretch §11.2); test positions start with an empty repetition history; positions come from the designed evaluation's own play; E2 is at a single depth.]

## 8. References and declaration of AI tool use

**References**
1. S. Russell and P. Norvig, *Artificial Intelligence: A Modern Approach*, 4th ed., Pearson, 2020, Ch. 5 (Adversarial Search).
2. [TEAM: course Module 3 material; any source used for the Bagh-Chal rules.]

**Declaration of external AI tool use**

[TEAM: write the declaration in your own words. It must be accurate. The factual record (PRD §10, git history) is:
- Review 1: Claude was used for scoping and the proposal.
- Claude Code (Anthropic) built the game rules (`board.py`, `state.py`, `rules.py`, `game.py`), all tests, the adapter, the CLI, the benchmarks and the experiment harness.
- On 2026-10-13, at Pranav's direction while Shalom and Vishal were unavailable, Claude Code also wrote `search.py` (minimax, alpha-beta, choose_move) and `evaluation.py` (features, evaluation functions and initial weights). Shalom and Vishal then reviewed and own them. This supersedes the Review 1 statement that Claude wrote no part of the search or evaluation.
- Claude Code drafted the implementation notes (§4) and the tables in this report. The analysis, conclusions and the rest of the prose are the team's.
- Edit this list if any of it changes, e.g. if a team member rewrites search.py or the weights, or if Claude Code drafts more of the report.]

---

## Appendix

Per-position E1 tables, root agreement and E2 outcome breakdowns: `docs/report/tables_appendix.md` (regenerate with `python tools/report_tables.py`).
