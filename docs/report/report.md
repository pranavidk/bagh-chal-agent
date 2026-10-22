# Bagh-Chal Game-Playing Agent: Minimax and Alpha-Beta with a Designed Evaluation Function

**BCSE306L Artificial Intelligence · Module 3 (Adversarial Search) · VIT Vellore**
Pranav Shankar (24BCE2773) · Vishal (24BCE2802) · Shalom Santosh (24BCE2731)

> **Authorship.** Claude Code wrote this report's text on 2026-10-22 at Pranav's direction (PRD §6.1, §10); see the declaration in §8. Sections follow PRD §9 (course-mandated). Items marked **[CHECK]** are facts only the team can confirm.

---

## 1. Problem statement and motivation

Bagh-Chal ("move the tiger") is a traditional two-player game from Nepal. It is played on the 25 points of a 5×5 alquerque board, where diagonal lines pass only through every other point. One player has four tigers, which start on the corners. The other has twenty goats, which start off the board and are placed one per turn. Tigers capture by jumping over a goat, as in draughts, and win after five captures. Goats cannot capture; they win by surrounding the tigers until none of them can move.

The game is a good test bed for adversarial search for three reasons.

- **It fits the textbook model exactly.** It is deterministic, fully observable, turn-based and zero-sum, so minimax applies without modification.
- **The two sides are asymmetric.** They have different pieces, moves and goals. A symmetric evaluation such as "material difference" doesn't exist, so the evaluation function has to be designed.
- **The branching factor changes with the phase.** While goats are being placed, a position has about 21 moves; once all goats are on the board, it has about 8. One program therefore lets us see how pruning behaves at two very different branching factors.

The game tree is also too large to solve by brute force in Python, yet small enough that a depth-4 search answers in milliseconds. That makes the measurements practical.

We answer two questions (PRD §1):

- **(a)** How many nodes does alpha-beta pruning save over plain minimax, and how does the saving change with depth and phase?
- **(b)** Does our six-feature evaluation function play better than a naive one that only counts captured goats?
- **(c)** *(added for the final review)* What are alpha-beta's best case and worst case, how close does our agent come to each, and when is each algorithm the better choice?

In short: at depth 4, alpha-beta expands 14% of minimax's nodes (8.4% in the placement phase) and returns the same root score in all 90 searches. The designed evaluation beats the baseline in 96% of games as tiger, but in only 32% as goat. Move order alone moves alpha-beta between about 86% of minimax's nodes (worst order) and 2.5% (best order), and a cheap heuristic order reaches 4.8% (E3).

## 2. AI formulation

We model Bagh-Chal as a two-player, deterministic, fully observable, zero-sum game, using the formulation of Russell & Norvig (Ch. 5): an initial state, the legal actions, a transition model, a terminal test and a utility function. Tigers are MAX and goats are MIN. From most positions, a depth-limited search cannot reach the end of the game. At the depth limit, a cutoff test therefore replaces the terminal test, and a heuristic evaluation estimates the utility.

Bagh-Chal has regional variants (for example, whether captures are compulsory and how repetition is handled). We fixed one set of rules, R1–R11, before writing any code and never changed it, so every experiment measures the same game.

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

**One evaluation keeps the game zero-sum.** The two sides make progress in different ways: tigers by capturing and threatening, goats by blocking and trapping. A natural idea is to give each side its own score. Then, however, one side's gain would no longer be exactly the other side's loss. The game would become general-sum, and the argument that lets alpha-beta skip moves would no longer hold.

We instead combine both kinds of progress into **one number from the tiger's side**: tiger features are added and goat features are subtracted (§3.3). Tigers maximise this number and goats minimise it, so every point gained by one side is lost by the other. `alpha` and `beta` are then bounds on the same quantity, and pruning is sound. The evaluation is also bounded: `|EVAL| ≤ 896`, which is far below the smallest win or loss value, `1,000,000 − 200`. A position that is merely good can therefore never outrank a real win.

### 2.3 AI and ML in this project

The agent is a **rational agent built on classical AI**. Its environment is two-player, deterministic, fully observable and zero-sum, and its decisions come from **adversarial search**: minimax and alpha-beta, depth-limited, with a cutoff. A **hand-designed heuristic evaluation** (§3.3) scores positions at the cutoff. The six features and their weights encode our knowledge of the game.

The project uses **no machine learning**. There is no training data, no learned parameter and no training loop. The weights were set by reasoning (§3.3), the agent plays identically every time, and E2's games only measure it; they never adjust it. This was deliberate: the course module is adversarial search, and PRD §2 and C1 exclude learned weights and external AI services from the agent.

ML could be added later by learning the weights through self-play or TD-learning, or by replacing `EVAL` with a learned network. The search would stay the same. Separately, an AI *tool*, Claude Code, was used to write much of the code and this report; that is declared in §8. Full explanation: `docs/ai_ml_usage.md`.

## 3. Algorithm description

### 3.1 Minimax

Minimax assumes that both players play optimally. MAX picks the child with the highest value, MIN picks the lowest, and the value of a position is the result of that alternation down to the depth limit. Our version returns the value together with the **principal variation (PV)**: the line of best moves for both sides.

```
function MINIMAX(s, depth, ply) returns (value, pv)
    nodes ← nodes + 1                          # count every call, first
    if TERMINAL(s) then return (UTILITY(s, ply), [])
    if depth = 0   then return (EVAL(s), [])
    best ← −∞ if MAX to move else +∞;  pv ← []
    for each a in ACTIONS(s), in the fixed R10 order do
        (v, line) ← MINIMAX(RESULT(s, a), depth − 1, ply + 1)
        if (MAX to move and v > best) or (MIN to move and v < best) then
            best ← v;  pv ← [a] + line
    return (best, pv)
```

Three details matter for the experiments.

- **The node is counted first.** Every call counts itself, including the root and calls that stop immediately at a terminal or cutoff. Minimax and alpha-beta are counted the same way, which makes E1 a fair comparison. A depth-1 search expands exactly `1 + (number of legal moves)` nodes, and we test this.
- **Terminal comes before cutoff.** If a game is over at the depth limit, its exact result is used rather than the heuristic's guess.
- **`ply` is passed to the utility.** A win is worth `1,000,000 − ply`, so a win found nearer the root scores higher. The agent prefers the fastest win and the slowest loss, instead of wandering between equally winning moves.

`depth` counts down (plies left to search), while `ply` counts up (distance from the root). With branching factor `b` and depth `d`, minimax takes `O(b^d)` time and `O(b·d)` memory.

### 3.2 Alpha-beta pruning

Alpha-beta computes the same value as minimax but skips subtrees that cannot affect it. It carries two bounds down the tree:

- `alpha` is the best value MAX can already guarantee on the path to the current node;
- `beta` is the best (lowest) value MIN can already guarantee.

Once `alpha ≥ beta`, the player above will never allow play to reach this node, so its remaining children are skipped.

```
function ALPHABETA(s, depth, ply, α, β) returns (value, pv)
    nodes ← nodes + 1
    if TERMINAL(s) then return (UTILITY(s, ply), [])
    if depth = 0   then return (EVAL(s), [])
    if MAX to move then
        best ← −∞
        for each a in ACTIONS(s) do
            (v, line) ← ALPHABETA(RESULT(s, a), depth − 1, ply + 1, α, β)
            if v > best then best ← v;  pv ← [a] + line
            α ← max(α, best)
            if α ≥ β then break                # MIN above will never allow this node
    else                                       # MIN to move: mirror image
        best ← +∞
        for each a in ACTIONS(s) do
            (v, line) ← ALPHABETA(RESULT(s, a), depth − 1, ply + 1, α, β)
            if v < best then best ← v;  pv ← [a] + line
            β ← min(β, best)
            if α ≥ β then break
    return (best, pv)                          # root call: α = −∞, β = +∞
```

**Hand trace (Russell & Norvig Fig. 5.2).** The root A is MAX. Its three MIN children are B, C and D, with leaves 3 12 8 | 2 4 6 | 14 5 2.

| Step | Node | What happens | α, β at A |
|---|---|---|---|
| 1 | B | leaves 3, 12, 8 → B = 3 | α = 3 |
| 2 | C | first leaf 2 → C ≤ 2. Since 2 ≤ α = 3, MAX will never choose C: **cut**, so leaves 4 and 6 are never generated | α = 3 |
| 3 | D | leaves 14, 5, 2 → D = 2 | α = 3 |
| 4 | A | max(3, ≤2, 2) = **3** | — |

Minimax expands 13 nodes (1 + 3 + 9). Alpha-beta expands 11, because two leaves are skipped. The value is 3 either way: C's value can only be 2 or lower whatever the skipped leaves hold, and MAX already has 3. Both numbers are unit tests.

How much alpha-beta saves depends on move order. With the best move always first, it expands about `O(b^(d/2))` nodes; with the worst order, it expands as many as minimax. We use the fixed rule order R10 with no reordering, so E1 measures plain alpha-beta.

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

**Why these features and weights.** The weights were chosen by reasoning about the game, not tuned; the initial values were kept.

- **`capt` (100)** has the largest weight. A capture is permanent and five end the game, so one capture must outweigh any realistic change in the positional terms.
- **`trapped` (40)** comes next. Trapping all four tigers wins for the goats, but a trapped tiger can be freed later, so it counts for less than a capture.
- **`threat` (15)** is about a seventh of a capture. A goat that can be jumped right now is often lost, but the goats may still defend it. Each goat is counted once, however many tigers attack it.
- **`mob` (3)** is small. Each tiger step is one more way to keep threatening, but mobility ranges up to about 30, so a small weight per step is enough.
- **`conn` (2)** rewards goats standing next to each other. Such goats block landing squares and protect one another. Each link is worth little, but there are up to 56.
- **`hub` (1)** rewards goats on the high-degree even points, which cut the tigers' diagonal lines. It has the smallest weight because it overlaps with `conn`: goats on those points tend to be connected anyway.

The three tiger features measure what tigers want (captures, threats, room to move) and the three goat features measure what goats want (trapped tigers, a solid wall, control of the diagonals). Every feature takes about 100 table lookups to compute, so evaluation costs about 2 µs per call.

## 4. Implementation notes

The full implementation notes are Appendix B (source: `docs/implementation_notes.md`). They cover the state representation, topology generated from R1, the jump lemma, move generation and repetition, node counting, tie-breaking, evaluation computation and position generation. Paragraphs there tagged **[DRAFT]** were written by Claude Code for an owner to check; each owner deletes the tag once they have reviewed or rewritten their paragraph.

The program is plain Python 3 with no third-party libraries in the engine. A position is an immutable tuple, so a search can hold many positions without one move corrupting another. All board tables are generated at start-up from rule R1 rather than typed in by hand. The search sees the game only through five functions, so the same code is tested on the textbook tree and then run on Bagh-Chal.

**Table 0. Verification**

| Check | Result |
|---|---|
| Unit and acceptance tests (`python -m pytest -q`) | 225 passed |
| Topology (R1/R2) | 56 edges, 13 even points, degree histogram {3:12, 4:4, 5:4, 8:5}, 80 jumps |
| Perft from the start, depths 1–4 | 21 · 252 · 5,052 · 68,204 |
| Textbook tree (R&N Fig. 5.2) | value 3; minimax 13 nodes; alpha-beta 11 nodes |
| Engine contract (`python -m experiments check-engine`) | 0 failures |
| Rules speed (`benchmarks/bench_rules.py`, Python 3.15, Apple silicon) | ~1.04 M `legal_moves`/s; ~1.29 M `apply`/s |
| Evaluation speed | ~1.8 µs per `designed_eval` call |

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

### 5.3 E3: Alpha-beta's best case and worst case (move ordering)

Setup: the search code is unchanged. `baghchal/ordering.py` wraps the game so that `legal_moves` returns the same moves in a different order, which is the only thing the search sees (§6.2 of the PRD). There are four orders:

- **Worst:** exact child values, worst move for the side to move first.
- **R10:** the fixed rule order, as in E1.
- **Heuristic:** `designed_eval` of each child, best first.
- **Best:** exact child values, best first.

The exact values for best and worst order come from a separate alpha-beta search that is not counted, so these two orders measure the bounds rather than offering a practical agent. E3 runs the same 30 positions at depths 2–4 with the designed evaluation, and also uniform synthetic trees (b = 2, 4, 8) where the textbook formulas are exact. Run with `python -m e3` (about 15 s). Minimax's node count and the R10 alpha-beta count reproduce E1 exactly. Every alpha-beta run returned minimax's root score.

**Table 4. Median nodes per move under each ordering** (in brackets: median share of minimax's nodes)

| Phase | Depth | Minimax | AB worst | AB R10 | AB heuristic | AB best |
|---|---:|---:|---:|---:|---:|---:|
| Placement | 2 | 240 | 240 (100%) | 79 (37.8%) | 45 (23.5%) | 44 (18.7%) |
| Placement | 3 | 3,055 | 3,017 (99.2%) | 671 (26.2%) | 280 (9.8%) | 246 (8.4%) |
| Placement | 4 | 45,746 | 23,417 (86.1%) | 2,627 (8.4%) | 720 (2.3%) | 650 (1.5%) |
| Movement | 2 | 68 | 68 (100%) | 46 (66.7%) | 25 (36.8%) | 25 (36.2%) |
| Movement | 3 | 615 | 615 (99.9%) | 252 (47.3%) | 117 (21.4%) | 77 (15.3%) |
| Movement | 4 | 4,536 | 4,353 (90.6%) | 818 (18.6%) | 280 (7.0%) | 190 (4.1%) |
| All | 4 | 6,996 | 5,678 (86.2%) | 1,214 (14.1%) | 453 (4.8%) | 233 (2.5%) |

Depth-4 effective branching factor b\*: placement 14.4 (minimax) → 12.1 / 6.9 / 4.9 / 4.8 (AB worst / R10 / heuristic / best), with √b ≈ 3.8. Movement 7.9 → 7.9 / 5.1 / 3.8 / 3.4, with √b ≈ 2.8.

**Table 5. Uniform trees, b = 8: leaves evaluated**

| | d = 2 | d = 3 | d = 4 | d = 5 |
|---|---:|---:|---:|---:|
| Minimax, b^d | 64 | 512 | 4,096 | 32,768 |
| AB worst case (tree built so that each move beats the last) | 64 | 512 | 4,096 | 32,768 |
| AB, random leaf values, R10 order | 34 | 279 | 1,107 | 4,317 |
| AB best order | 15 | 71 | 127 | 575 |
| Knuth–Moore formula b^⌈d/2⌉ + b^⌊d/2⌋ − 1 | 15 | 71 | 127 | 575 |

The match is exact for every b and d tested (`results/e3_tables.md`), and the tests in `tests/test_ordering.py` enforce it.

**Figure 4.** `results/e3_ordering_nodes.png`: median nodes against depth (log scale) for minimax and alpha-beta in worst, R10 and best order.
**Figure 5.** `results/e3_ratio_d4.png`: alpha-beta's nodes as a share of minimax's at depth 4, for each ordering and phase.
**Figure 6.** `results/e3_trees.png`: uniform trees, measured leaf counts against the b^d and Knuth–Moore formulas.

## 6. Analysis

### 6.1 E1: what alpha-beta saves, and why

**What worked.** Alpha-beta was correct and much cheaper. It returned minimax's root score on all 90 position/depth pairs. Its share of minimax's nodes fell from 54% at depth 2 to 35% at depth 3 and 14% at depth 4 (Table 1). The saving grows with depth because each cutoff removes a whole subtree. The deeper the search, the larger the subtrees that get cut, and cutoffs at one level compound with cutoffs below. In Figure 1 this shows as a lower slope: on a log scale, alpha-beta's line rises less steeply than minimax's, and the gap widens with depth.

**Time follows nodes.** The time ratios track the node ratios closely: at depth 4, alpha-beta takes 16% of minimax's time for 14% of its nodes. Both searches cost about 2.5–3.5 µs per node. The bookkeeping alpha-beta adds per node is negligible, and the whole gain comes from expanding fewer nodes. Figure 2 has the same shape as Figure 1.

**Placement saves more than movement at every depth** (8.4% vs 18.6% at depth 4). The phase changes the branching factor: minimax's b\* is about 14–15 in placement and about 8 in movement (Table 2). Once a node is refuted, all of its remaining siblings are skipped, and in placement there are more siblings to skip. A larger b therefore means a larger saving from every cutoff.

**What didn't reach the ideal.** With perfect move ordering, alpha-beta's b\* would be about √b: roughly 3.8 in placement and 2.8 in movement. We measured 6.9 and 5.1 at depth 4. The reason is move order. We search moves in the fixed rule order R10 (ascending point number), which has nothing to do with which move is best. The refuting move is often found late, so many siblings are searched before the cutoff happens. This was a deliberate choice: E1 measures plain alpha-beta. E3 (§5.3, §6.4) confirms that move order is the cause. With the best moves first, the same search drops to b\* 4.8 in placement and 3.4 in movement.

### 6.2 E2: the designed evaluation against the capture-only baseline

**As tiger, the designed evaluation is decisive: 48 wins, 2 draws, no losses.** All 48 wins came from five captures. The baseline goat sees only captures. It avoids a capture it can see inside its 3-ply horizon, but every non-losing move scores the same (0). The tie rule R11 then picks the first such move in R10 order, the lowest-numbered safe point, so the baseline goat places its goats in a fixed pattern without regard to structure. From the start position, the baseline places at point 2, the first point no tiger can jump to, while the designed evaluation places at point 12, the centre. The designed tiger values `threat` and `mob`, so it steers toward positions where several goats are attacked at once. A threat on two goats can't be parried with one move, and the baseline can't see the second capture coming until it is inside its horizon, too late to stop it.

**As goat, the designed evaluation wins only 32% (16 wins, 9 draws, 25 losses).** The goat side is much harder:

- Goats lose a piece to a single oversight and must avoid oversights for the whole game. Tigers only need to find one.
- A depth-3 search from a goat move sees goat–tiger–goat. That catches an immediate jump, but not a tiger move that sets up a double attack two moves later.
- `conn` and `hub` reward a solid wall, but a wall built from goats still in hand is vulnerable while placement is going on.

The designed goat still won 16 games, all by trapping (Table A4). The baseline tiger has no notion of mobility, so it is happy to walk into a corner as long as no capture is visible. It also explains the spread in Table A5: as goat, the designed evaluation lost between 0 and 5 goats, rather than the near-certain 5 the baseline goat lost.

**A flat evaluation is cheap but uninformed.** Over a whole game, the baseline searched fewer nodes than the designed evaluation (about 3,900 vs 11,700 per game when the designed side was goat). A capture-only evaluation gives most leaves the same value. Equal values make `alpha ≥ beta` happen sooner, so alpha-beta prunes more. The baseline is faster per move but cannot tell good positions from bad ones.

### 6.3 What the games looked like

**Draws were all threefold repetitions** (11 of 100 games); no game reached the 200-ply cap, although the longest went to 196 plies. A repetition happens when neither side can make progress within its horizon. The tigers can't find a capture, the goats can't close the trap, and both sides shuffle back and forth between equally scored positions. The fixed tie-breaking rule makes this more likely: in a position where nothing changes the score, a side picks the same move every time.

**Games were short and were usually decided during placement.** The placement phase lasts 39 plies (20 goat placements and 19 tiger replies). The median game was 40 plies with the designed evaluation as tiger and 36.5 as goat, and 55 of the 100 games were over within 40 plies. Goats are most vulnerable while placing, because each new goat is a new target and a solid wall doesn't exist yet. This is also the phase where alpha-beta saves the most (§6.1), which is fortunate: it is where the extra depth matters.

### 6.4 E3: best case, worst case, and which algorithm wins when

**Minimax has no best or worst case. Alpha-beta's depends entirely on move order.** Minimax expands every node whatever the order: its count was identical under all four orders, and the tests check this. Alpha-beta's count at depth 4 ranged from 86% of minimax's nodes in worst order to 2.5% in best order (Table 4), on the same positions and with the same code. The reason is the cutoff test `alpha ≥ beta`. It fires as soon as one side has seen a move good enough to make the other side avoid this line. In best order, the very first move sets that bound, and each opponent alternative is refuted after one reply. In worst order, every new move is better than the previous one, so the bound never tightens in time to cut anything.

**The uniform trees confirm the textbook exactly.**
- In best order, alpha-beta evaluated exactly b^⌈d/2⌉ + b^⌊d/2⌋ − 1 leaves for every b and d tested (Table 5). That is about 2·b^(d/2), so the effective branching factor becomes √b, and the same work searches about twice as deep.
- On a tree built so that each move is better than the one before it, alpha-beta evaluated all b^d leaves, the same as minimax.
- Random leaf values in a fixed order fall in between.

On Bagh-Chal, simply reversing the oracle order is not quite the worst possible order. It equals minimax on 23 of the 30 positions at depth 2, but at depth 4 a few cutoffs still fire from bounds set by an ancestor's earlier siblings, so it searches between 37% and 100% of minimax's nodes. This is still effectively no pruning. Placement saves more than movement under every order, for the reason given in §6.1.

**A cheap ordering gets most of the way.** Sorting moves by the static evaluation of the child brings depth 4 to 4.8% of minimax's nodes overall (placement 2.3%), against 2.5% for the oracle and 14.1% for R10 order. At depth 4 this does not yet save time. Calling `designed_eval` on every child to sort them costs more than the nodes saved (placement: 12.0 ms vs 7.3 ms median for R10 order). Cheaper orderings, such as captures first, or deeper searches would change that.

**Which algorithm does better, and when.**
- **Alpha-beta never does worse in nodes, and it returns the same value.**
- **Alpha-beta wins most** with deep searches (54% → 35% → 14% of minimax's nodes from depth 2 to 4), with many moves per position (placement saves twice as much as movement), and with good move ordering.
- **They tie** at depth 1, where nothing can be cut, and in the worst order, where alpha-beta does minimax's work plus a few comparisons.
- **Minimax is the better choice** only when the exact value of *every* root move is needed, for example to rank or explain all moves, since alpha-beta gives only a bound for moves it prunes, or when the simplest code matters, as for a reference implementation. We use minimax as the reference that alpha-beta is tested against.

Full comparison: `docs/algorithm_comparison.md`.

### 6.5 Conclusions

1. **(a)** Alpha-beta is exact and its advantage grows with depth: at depth 4 it needs 14% of minimax's nodes overall and 8.4% in placement, with time saved in proportion. Without move ordering, it remains well short of the √b best case.
2. **(b)** The designed evaluation is clearly better than counting captures. The difference is overwhelming for the tiger and real but smaller for the goat, whose defensive task needs more depth than 3 plies.
3. **(c)** Alpha-beta's cost is set by move order. It ranges from about minimax's cost in the worst case (exactly b^d on a constructed tree) to exactly b^⌈d/2⌉ + b^⌊d/2⌋ − 1 leaves in the best case. A heuristic order reaches 4.8% of minimax's nodes at depth 4. Alpha-beta is never worse than minimax, and minimax is preferable only when every move's exact value is needed.

## 7. Limitations and what we'd do differently

**Limitations**

- **Shallow search.** Depth 3–4 cannot see the multi-move plans that decide many goat games (§6.2).
- **No search enhancements in the agent.** The agent plays with R10 order and no transposition table, iterative deepening or quiescence search; these were deliberate non-goals (PRD §2). As a result, alpha-beta's b\* stays well above √b, and tactical positions can be cut off in the middle of a capture sequence (the horizon effect). E3 measures move ordering but does not switch the agent to it.
- **E3's bounds are empirical on Bagh-Chal.** The best and worst orders use an oracle, so they bound what ordering can achieve rather than describing a playable agent. On Bagh-Chal's irregular trees, the reversed oracle order is close to, but not exactly, the worst possible order (§6.4).
- **Weights not tuned.** The weights were chosen by reasoning, not by experiment. We don't know how close to good they are.
- **E2 is limited.** It plays against one weak opponent at one depth (3), with 50 games per side. The confidence intervals are wide (21–46% for the goat win rate). The result shows the designed evaluation beats counting captures, not that it plays well against strong opponents.
- **Test positions are not a uniform sample.** About 70% of the moves that produced the E1 positions were chosen by the designed evaluation itself, so the suite leans toward positions it tends to reach. Every position also starts with an empty repetition history.
- **One rule set.** Results are for our frozen rules R1–R11; variants with compulsory capture or different repetition rules may behave differently.

**What we would do differently**

1. **Order moves before searching.** E3 shows that a heuristic order cuts depth-4 nodes from 14.1% to 4.8% of minimax's. A cheaper key (captures first, then moves that create threats) should keep that saving without the cost of evaluating every child, so it would also save time.
2. **Tune the weights** with a short round-robin over 3–4 candidate weight sets (PRD §11.2), especially to strengthen the goat side.
3. **Use iterative deepening with a time limit,** so the agent searches as deep as the clock allows rather than to a fixed depth. The goat side would gain most.
4. **Run E2 at several depths,** and also against the designed evaluation itself, to see whether the tiger/goat asymmetry shrinks with depth.

## 8. References and declaration of AI tool use

**References**
1. S. Russell and P. Norvig, *Artificial Intelligence: A Modern Approach*, 4th ed., Pearson, 2020, Ch. 5 (Adversarial Search).
2. BCSE306L Artificial Intelligence, Module 3: Adversarial Search, course material, VIT Vellore. **[CHECK: exact title of the course notes.]**
3. **[CHECK: the source the team used for the Bagh-Chal rules, if any. If none, delete this line; the rules as played are stated in full in §2.1.]**

**Declaration of external AI tool use**

We used Claude (Anthropic) during scoping and to help write the Review 1 proposal. Our Review 1 declaration said that any further use would be declared here, and it is:

- **Code.** Claude Code (Anthropic's coding agent) wrote the game rules (`board.py`, `state.py`, `rules.py`, `game.py`), the tests, the adapter, the command-line interface, the benchmarks and the experiment harness.
- **Search and evaluation.** On 2026-10-13, at Pranav's direction while Shalom and Vishal were unavailable, Claude Code also wrote `search.py` (minimax, alpha-beta and move choice) and `evaluation.py` (the six features, both evaluation functions and the weights). This supersedes our Review 1 statement that Claude wrote no part of the search or evaluation. Shalom is responsible for the search and Vishal for the evaluation. **[CHECK: add whether either of them reviewed or changed the code, and when.]**
- **Report.** On 2026-10-22, at Pranav's direction, Claude Code wrote the text of this report, including the analysis and conclusions (§6), the implementation notes (§4), the tables and the slide text.
- **Experiment E3 and the comparison.** Later on 2026-10-22, at Pranav's direction and to meet the professor's request for a best-case/worst-case comparison, Claude Code wrote the move-ordering wrapper (`baghchal/ordering.py`), the E3 experiment (`e3/`) and its tests. It also wrote §2.3, §5.3 and §6.4 of this report, `docs/algorithm_comparison.md` and `docs/ai_ml_usage.md`. `search.py` and `evaluation.py` were not changed.
- **What we did.** Pranav directed the work, chose the scope and the frozen rules recorded in the project specification, and wrote the experiment framework (`experiments/`). **[CHECK: add each member's own contributions; Claude helped with the specification during scoping, as declared above.]** Any further changes by team members are recorded in the project specification (`docs/PRD.md` §10) and the git history.

All three of us have checked the results against the code and output, and each of us can explain the search, the evaluation and the experiments. **[CHECK: every member must confirm this sentence is true before submission.]**

---

## Appendix

E3 tables (all depths, b\* and uniform trees): `results/e3_tables.md`; the full minimax vs alpha-beta comparison: `docs/algorithm_comparison.md`.

Per-position E1 tables, root agreement and E2 outcome breakdowns: `docs/report/tables_appendix.md` (regenerate with `python tools/report_tables.py`).
