# Viva guide

> Written by Claude Code on 2026-10-22 at Pranav's direction (PRD §10). It covers the topics the Phase 6 examiner prompt (`docs/prompts.md`) insists on. Read the answer, then explain it aloud without looking, with the code open. Every member is examined on the whole AI core, not only their own module.

## 1. "Show me where your AI makes a decision."

Open `baghchal/search.py`, `choose_move`. It calls `minimax` or `alphabeta` on the current state with a depth and an evaluation function, and plays the first move of the returned principal variation. The decision is the line `if value > best_value` (MAX) or `value < best_value` (MIN) inside the move loop: it keeps the child with the best backed-up value.

Order of a call: count the node → terminal? return exact utility → depth 0? return `evaluate(state)` → otherwise loop over children in R10 order.

## 2. Trace alpha-beta by hand

Use Russell & Norvig Fig. 5.2: root A (MAX), MIN children B, C, D, leaves `3 12 8 | 2 4 6 | 14 5 2`.

- B = min(3, 12, 8) = 3, so α = 3 at A.
- C: first leaf 2, so C ≤ 2. 2 ≤ α, so MAX will never pick C: cut (4 and 6 are never generated).
- D = min(14, 5, 2) = 2.
- A = max(3, ≤2, 2) = 3. Nodes: minimax 13, alpha-beta 11.

Be ready for a variant tree the examiner draws. Rules: at a MAX node, update α = max(α, value); at a MIN node, update β = min(β, value); stop expanding when α ≥ β. α and β are passed **down**; values are passed **up**.

## 3. Same value, maybe a different move. Why?

Alpha-beta only skips children that cannot change the root *value*. A pruned child returns a bound, not its true value. When two root moves are equally good, the bound of a pruned move can equal the best value. With strict `>` / `<` (R11) the earlier move is kept, but which move counts as "earlier and best" can differ from minimax's full calculation. So E1 compares root **scores**, not moves. In our data they also chose the same move on all 90 pairs, but that isn't guaranteed.

Example from the tests: children `[5, 7] [6, 5] [5, 9]` are all worth 5; both algorithms keep move 0 because later ties never replace it.

## 4. The features are asymmetric. Why is it still one zero-sum evaluation?

There is a single number, from the tiger's side: tiger features are added, goat features subtracted. Tigers maximise it and goats minimise the *same* number, so one side's gain is the other's loss. That is what minimax assumes, and it is what makes α and β comparable bounds. If each side maximised its own score, the game would be general-sum and a cutoff could discard the true best line.

Bound: |EVAL| ≤ 896, far below 1,000,000 − 200, so no heuristic value ever outranks a real win.

## 5. What does depth mean?

The number of plies (single moves by one player) searched below the root. Depth 3 from a goat move = goat, tiger, goat. `depth` counts down to the cutoff; `ply` counts up from the root and goes into the utility, `±(1,000,000 − ply)`, so faster wins score higher.

## 6. Read the nodes-vs-depth plot (Figure 1)

The y-axis is logarithmic, so a straight line means exponential growth, and its slope is the effective branching factor b\*. Minimax's slope is about 14–15 in placement and about 8 in movement. Alpha-beta's slope is lower (about 6.9 and 5.1 at depth 4), and the gap widens with depth: 54% → 35% → 14% of minimax's nodes overall. The ideal with perfect ordering is √b (≈ 3.8 and 2.8). We're above it because moves are searched in fixed rule order.

## 7. Why does placement save more than movement?

More moves per position (b\* ≈ 14 vs 8). When a node is refuted, all its remaining siblings are skipped, so a cutoff is worth more when there are more siblings.

## 8. Justify the weights

| Weight | One-line reason |
|---|---|
| capt 100 | permanent; five captures win; must outweigh any positional swing |
| trapped 40 | four trapped tigers win for goats, but a tiger can be freed |
| threat 15 | ~1/7 of a capture: likely lost, but can still be defended |
| mob 3 | up to ~30 units, so small per step |
| conn 2 | many small links (up to 56) that block landing points |
| hub 1 | overlaps with conn, so the smallest |

They were reasoned, not tuned. Tuning is stretch item PRD §11.2.

## 9. Why does the designed evaluation win 96% as tiger but 32% as goat?

As tiger, threat and mobility build double attacks that a capture-only goat can't see coming. As goat, one oversight loses a goat, and depth 3 can't see a double attack being prepared two moves ahead. All 16 goat wins were traps of a baseline tiger that ignores mobility.

## 10. Questions about the rules and the code

- **How is adjacency built?** Generated from R1 at import: points differ by ≤ 1 in each coordinate; diagonals only through even `r + c`. This gives 56 edges, degrees 3/4/5/8, and 80 jumps.
- **How are nodes counted?** `stats.nodes += 1` is the first line of every call, so depth 1 = 1 + number of moves.
- **Why an immutable state?** Children never disturb parents; no undo step; the board doubles as a repetition key.
- **What is a draw?** Threefold repetition or 200 plies (R8). All 11 E2 draws were repetitions.

## Be honest about authorship

If asked who wrote the code or the report, say what the declaration says (report §8): Claude Code wrote the code, including the search and evaluation, and the report text, at Pranav's direction. Then show that you understand every line. An examiner will treat a declared tool and a team that can explain it very differently from a team that can't.
