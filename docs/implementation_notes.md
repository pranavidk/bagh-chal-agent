# 4. Implementation notes (draft)

> **Draft status.** Drafted by Claude Code from the code on 2026-10-13. It describes what the code does. Places marked **[OWNER: …]** need the owner's own reasoning in their own words; delete each marker once it's filled. Per PRD §10, Claude Code wrote `search.py` and `evaluation.py` at Pranav's direction. Shalom owns the search and Vishal owns the evaluation, and the report's declaration (§8) must say so.

## 4.1 State representation

A position is an immutable `State` (a frozen dataclass, `baghchal/state.py`). The board is a 25-tuple indexed by `i = 5·row + col`, where each entry is `EMPTY = 0`, `GOAT = 1` or `TIGER = 2`. Alongside the board the state holds the side to move, goats in hand `h`, goats captured `k` and the ply count `n`. These five fields define equality and hashing, matching the formal state `⟨B, h, k, p, H, n⟩` of §2.

Four more fields are bookkeeping and take no part in equality:

- `tigers`: the sorted points of the four tigers. Tiger moves can then be generated without scanning the board.
- `history` and `reps`: the repetition record for R8.4 (see §4.4).
- `moves_cache`: the legal moves, filled the first time they are asked for.

`apply(state, move)` never changes its argument. It copies the board into a list, edits two or three points, and builds a new `State`. Immutability means a search can hold any number of states without one move corrupting another. Every test checks it: across 200 random games, the input of `apply` is compared before and after every move.

Text boards (`"T...T/...../...../...../T...T"`) are parsed and validated only at the program's edges, by the CLI and when loading positions. The checks are: 4 tigers, goats on board + in hand + captured = 20, and legal characters and row lengths. Inside the search no state is ever re-validated.

[OWNER: Shalom/Vishal: one or two sentences on why a tuple board and an immutable state suit minimax, in your own words.]

## 4.2 Board topology generated from the rule

Adjacency is never typed in by hand. `baghchal/board.py` generates it at import time from rule R1. Two points are adjacent when they differ by at most 1 in each coordinate, and a diagonal step is allowed only from a point where `row + col` is even. From that one rule the module builds:

| Table | Contents | Check in the tests |
|---|---|---|
| `NEIGHBOURS[x]` | neighbours of `x`, ascending | adjacency is symmetric; no diagonal leaves an odd point |
| `DEGREE[x]` | number of neighbours | degrees 3 (12 points), 4 (4), 5 (4), 8 (5: points 6, 8, 12, 16, 18) |
| `EDGES` | each edge once, `(a, b)` with `a < b` | 56 edges |
| `JUMPS` | every `(x, over, land)` triple | 80 directed jumps |
| `TIGER_TARGETS[x]` | every step and jump from `x`, sorted by landing point | equals `NEIGHBOURS` plus `JUMPS` |

The tables are generated rather than typed because a single wrong entry in a hand-typed 25-point adjacency list would quietly change the game, and with it every experiment. Generating from the rule leaves one line to get right, and the known counts above (56 edges, 13 even points, 80 jumps) test that line.

## 4.3 The jump lemma

R2 states that if `over` is a neighbour of `x` and `land = 2·over − x` is on the board, then `land` is a neighbour of `over` along the same line. The jump table is therefore built from coordinates alone. For each neighbour `over` of `x`, it continues one more step in the same direction and keeps the triple if the landing point is on the board.

The lemma holds because diagonals exist only on even points. Moving one diagonal step changes `row + col` by 0 or ±2, so parity is preserved: if `x` is even, `over` and `land` are even too, and the diagonal continues. The tests check the lemma on all 80 triples instead of assuming it. During play a jump is therefore just two lookups: `over` must hold a goat and `land` must be empty.

## 4.4 Move generation, move order and repetition

`baghchal/rules.py` implements R5–R8.

- **Goat placement (R5):** one move per empty point, ascending.
- **Goat steps (R6):** for each goat in index order, each empty neighbour in ascending order.
- **Tiger moves (R7):** for each tiger in `tigers` order, the precomputed `TIGER_TARGETS` list. A step needs an empty landing point; a jump also needs a goat on `over`. Because that list is sorted by landing point, steps and jumps come out interleaved in `(from, to)` order. This is exactly R10, and no sorting happens at runtime.

Moves are single objects created once at import, such as `PLACE[12]` and `JUMP[0][6]`, so generating moves creates no new objects. They print as `G@12`, `G 7-12`, `T 0-1` and `T 0x6>12`.

The legal moves are stored on the state the first time they are computed. That avoids repeated work, because the terminal test (R8.2/R8.3: "does the side to move have a move?") and the search's own move loop both need the same list.

**Repetition (R8.4)** is tracked with a linked chain of positions, `(key, previous)`, where `key = (board, side to move, h)`. The chain holds only the positions since the last placement or capture, because those moves are irreversible:

- a placement lowers `h`, and nothing ever raises it;
- a capture permanently removes a goat.

So no position from before an irreversible move can recur, and the short chain is exactly as good as the full game history. `apply` computes `reps`, the number of times the new position has occurred, once. It walks the chain comparing only every second entry (same side to move), and the terminal test then reads `reps` in constant time.

**Terminal test (R8)** checks the conditions in the stated order: `k ≥ 5`; tiger to move with no move; goat to move with no move; three repetitions; the 200-ply cap. During placement the goat always has a move: the number of empty points is `1 + h + k ≥ 2`, so that check is skipped.

The rules were checked by *perft*, counting the positions reachable in exactly *d* plies from the start. The counts were 21, 252, 5,052 and 68,204 for *d* = 1–4, matching two independent implementations. The rules code handles about 1 million `legal_moves` or `apply` calls per second on the team's laptop under Python 3.14 (about 0.6 million under Python 3.9).

## 4.5 Search and node counting

`baghchal/search.py` contains `minimax`, `alphabeta` and `choose_move`. The search sees the game only through five methods (`legal_moves`, `apply`, `is_terminal`, `utility`, `is_max_to_move`, §6.2 of the PRD). It does not import the rules module, so the same code is tested on the Russell & Norvig Fig. 5.2 tree and then runs unchanged on Bagh-Chal.

Each recursive call does four things in order:

1. **Count the node.** `stats.nodes += 1` is the first statement of every call: root, cutoff and terminal calls included.
2. **Terminal?** Return the exact utility `±(1,000,000 − ply)` or 0 (R9). This happens even when the depth has also run out, because a known result beats an estimate.
3. **Depth 0?** Return the heuristic `evaluate(state)`.
4. **Otherwise,** search every child in R10 order and keep the best value for the side to move. Tigers maximise and goats minimise (R9).

Counting at the very top means minimax and alpha-beta are measured the same way, which is what makes the E1 comparison fair. It also gives two checkable facts:

- a depth-1 minimax search expands exactly `1 + (number of legal moves)` nodes;
- on the textbook tree, minimax expands 13 nodes and alpha-beta 11 (the second MIN node is cut after its first leaf).

Both are tests, and `python -m experiments check-engine` checks the first again on real positions.

**Search depth versus distance from the root:** `depth` is the number of plies still to search, and it counts down. `ply` is the distance from the root, and it counts up. `ply` feeds the R9 utility, so a win found sooner scores higher and the agent prefers faster wins and slower losses.

Alpha-beta passes the bounds `alpha` (the best MAX can already guarantee on this path) and `beta` (the best for MIN) down the tree, and stops searching a node's children once `alpha ≥ beta`. The root call uses `(−∞, +∞)`.

[OWNER: Shalom: explain in your own words why the pruned children can't change the root value, using the Fig. 5.2 trace (where alpha becomes 3, and why node C is cut).]

## 4.6 Tie-breaking

At every node the search keeps the **first** move that reaches the best value. It uses strict `>` for MAX and strict `<` for MIN (R11), and children are visited in the fixed R10 order, so results are reproducible. Node counts were identical across repeated runs in every test and in all of E1, which aborts if they differ.

Alpha-beta is guaranteed to return the same *value* as minimax at the root, but not always the same *move*. When moves tie, a pruned subtree can return a bound equal to the best value without being searched in full, and the strict comparison then keeps an earlier move. E1 therefore compares root scores, not moves. They matched on all 90 position/depth pairs.

[OWNER: Shalom: add the example you'd give at the viva.]

## 4.7 Evaluation function

`baghchal/evaluation.py` computes the six features of §6.4 of the PRD in one pass, whoever is to move:

- **mob, threat, trapped:** for each tiger, walk its `TIGER_TARGETS`. Each legal step adds to `mob`. Each legal jump marks the jumped goat in a bitmask, so a goat attackable by two tigers counts once in `threat`. A tiger with neither is `trapped`.
- **conn:** count the 56 edges with a goat at both ends.
- **hub:** add `DEGREE[x]` for every goat on an even point.
- **capt:** equals `k`.

The evaluation is a single tiger-side score:

`EVAL = 100·capt + 3·mob + 15·threat − 40·trapped − 2·conn − 1·hub`

Its magnitude is at most 896 for tigers and 344 for goats, far inside the ±100,000 bound. The bound is also tested on 500 random reachable states. A call takes about 2 µs. The baseline evaluator for E2 is `capt` alone.

[OWNER: Vishal: justify each weight in your own words (the code has a one-line reason per weight), say whether you kept or changed them, and explain why one zero-sum score built from tiger features minus goat features keeps alpha-beta sound.]

## 4.8 How the test positions were generated

The 30 E1 positions (`data/positions.json`) come from real play, not hand-typing, so every one is reachable and legal. `python -m experiments generate --seed 2026`:

1. plays 200 games from the start position;
2. chooses each move epsilon-greedily: a uniformly random legal move 30% of the time, otherwise the engine's own depth-2 alpha-beta move with the designed evaluation;
3. collects every non-terminal position after the first 6 plies into a pool (8,792 distinct candidates);
4. draws 15 placement-phase and 15 movement-phase positions from the pool, with the side to move split 8/7 within each phase.

Pure random play isn't used because random goats are captured long before placement ends, so the movement phase would rarely appear. One seed reproduces the whole file; the seed and parameters are stored in its metadata, and the file is committed and never regenerated.

Each position starts with an empty repetition history and ply 0. This is a known simplification.

[OWNER: Pranav: note any caveat you want the reader to know about the suite, e.g. that the positions come from the designed evaluation's own play.]
