# Minimax vs alpha-beta: comparison, best case, worst case, and which wins when

*Written by Claude Code on 2026-10-22 at Pranav's direction (PRD §10). The team reviews and owns it.*
Data: E1 (`results/tables.md`) and E3 (`results/e3_tables.md`). Reproduce E3 with `python -m e3` (about 15 s).

---

## 1. Side-by-side comparison

| | **Minimax** | **Alpha-beta** |
|---|---|---|
| **Idea** | Search every move to depth *d*; back up max at tiger (MAX) nodes, min at goat (MIN) nodes | Same search, but carry two bounds: α (best MAX can already guarantee) and β (best MIN can). Stop expanding a node once α ≥ β, because the opponent will never let play reach it |
| **Result** | The minimax value and a best move | **The same root value**, always (E1: 90/90 position–depth pairs; E3: all 360 alpha-beta runs, 30 positions × 3 depths × 4 orderings) |
| **Nodes, worst case** | O(b^d) | O(b^d), no better than minimax, but **never worse** |
| **Nodes, best case** | O(b^d), with no best case | O(b^(d/2)): exactly b^⌈d/2⌉ + b^⌊d/2⌋ − 1 leaves (Knuth & Moore) |
| **Nodes, random order** | O(b^d) | about O(b^(3d/4)) (Russell & Norvig §5.3) |
| **Effect of move order** | **None.** Minimax visits every node whatever the order (tested in `tests/test_ordering.py`) | **Everything.** The same position at depth 4 costs between 1.5% and 86% of minimax's nodes, depending on order (E3) |
| **Memory** | O(b·d) (depth-first) | O(b·d), the same |
| **Values of non-best moves** | Exact for every root move | Only bounds for pruned moves ("this move is worse than X"), not their exact value |
| **Code** | About 15 lines | About 25 lines, plus two parameters and a cutoff test |
| **Bagh-Chal, depth 4, R10 order** (E1) | 6,996 nodes, 24.7 ms median | 1,214 nodes (14.1%), 3.9 ms |

**Graphs:**
- `results/e1_nodes_vs_depth.png`: minimax vs alpha-beta, nodes against depth (E1).
- `results/e3_ordering_nodes.png`: alpha-beta's worst case, R10 order and best case against minimax.
- `results/e3_ratio_d4.png`: alpha-beta's share of minimax's nodes under each ordering.
- `results/e3_trees.png`: measured results on uniform trees against the textbook formulas.

## 2. Best case and worst case: what they are

Alpha-beta prunes when it has **already seen a good enough move** for one side. Whether that happens early or late depends entirely on the order in which it tries moves:

- **Best case: best move first at every node.** The first child already sets a bound that refutes every sibling of the opponent's moves. Each sibling then needs one reply to be cut. On a uniform tree, alpha-beta evaluates b^⌈d/2⌉ + b^⌊d/2⌋ − 1 leaves. That is roughly 2·b^(d/2), so the effective branching factor drops from b to √b. With the same effort, alpha-beta can search **about twice as deep** as minimax.
- **Worst case: worst move first at every node.** Every new move is better than the ones before it, so the bounds never tighten fast enough to cut anything. Alpha-beta then searches the whole tree, b^d leaves, like minimax, plus a little bookkeeping.

### How E3 implements them

The search code is not changed. `baghchal/ordering.py` wraps the game and changes only the order of `legal_moves`, which is the only thing the search sees (PRD §6.2). Four orderings:

| Ordering | How the moves are sorted | Role |
|---|---|---|
| **Worst** | Exact child values (oracle), worst for the side to move first | Realises the worst case |
| **R10** | Ascending point index, the fixed rule order used in E1 | What the agent actually uses |
| **Heuristic** | `designed_eval` of each child, best first | Cheap, practical ordering |
| **Best** | Exact child values (oracle), best first | Realises the best case |

The oracle finds each child's exact value with a separate alpha-beta search that **is not counted**. So the best and worst orderings measure the bounds; they are not a way to play faster. The oracle costs more than the search it orders.

On **uniform trees** (`e3/trees.py`), the formulas hold exactly. The best order evaluates b^⌈d/2⌉ + b^⌊d/2⌋ − 1 leaves for every b ∈ {2, 4, 8} and every depth tested. On a tree built so that each move is better than the last (`UniformTree.worst_case`), alpha-beta evaluates all b^d leaves. Both facts are pinned down by tests.

| b = 8 | d = 2 | d = 3 | d = 4 | d = 5 |
|---|---:|---:|---:|---:|
| Minimax = alpha-beta worst case (b^d) | 64 | 512 | 4,096 | 32,768 |
| Alpha-beta, random leaf values, R10 order | 34 | 279 | 1,107 | 4,317 |
| Alpha-beta best case = Knuth–Moore formula | 15 | 71 | 127 | 575 |

### E3 on the 30 Bagh-Chal positions (depth 4, median nodes; share of minimax's nodes in brackets)

| Phase | Minimax | AB worst order | AB R10 order | AB heuristic order | AB best order |
|---|---:|---:|---:|---:|---:|
| Placement | 45,746 | 23,417 (86.1%) | 2,627 (8.4%) | 720 (2.3%) | 650 (1.5%) |
| Movement | 4,536 | 4,353 (90.6%) | 818 (18.6%) | 280 (7.0%) | 190 (4.1%) |

The same algorithm on the same positions varies by a factor of about 60 in placement (86.1% down to 1.5%) **purely because of move order.** Real game trees aren't uniform: they have ties and terminal nodes. So reversing the oracle order doesn't always remove every cutoff. At depth 2, worst order equals minimax on 23 of the 30 positions; at depth 4 it searches between 37% and 100% of minimax's nodes. Cutoffs can still fire from bounds set by an ancestor's earlier siblings. The constructed worst-case tree shows that the full b^d is reached when every node is ordered adversarially.

## 3. Which algorithm does better in which case, and why

**Alpha-beta never does worse in nodes.** It searches a subset of minimax's tree and returns the same value. The question is *how much better*, and what minimax still offers.

| Situation | Better | Why (with our numbers) |
|---|---|---|
| **Deep search** | Alpha-beta, by more each ply | A cutoff removes a whole subtree, and deeper trees have bigger subtrees. R10 order: 54% of minimax's nodes at depth 2, 35% at depth 3, 14% at depth 4 (E1). |
| **Many moves per position** (placement, b ≈ 14) | Alpha-beta, by most | Every cutoff skips all remaining siblings, so more siblings means more saved. Depth 4: 8.4% in placement vs 18.6% in movement (b ≈ 8). |
| **Good move ordering** (best moves tried first) | Alpha-beta, dramatically | Close to the best case. A cheap heuristic order brings depth 4 down to 4.8% of minimax's nodes overall (2.3% in placement), close to the oracle's 2.5%. |
| **Bad move ordering** (worst moves first) | **A tie**, effectively | The worst case: alpha-beta prunes little or nothing (median 86–100% of minimax's nodes in E3; exactly 100% on the constructed tree) and adds a few comparisons per node. |
| **Depth 1** | **A tie** | Nothing can be cut: the root has to look at every child. Both expand 1 + (number of moves) nodes (checked by `check-engine`). |
| **Very shallow search, tiny trees** | Roughly a tie | At depth 2 the movement-phase saving is only a third (68 → 46 nodes), and both take well under a millisecond. |
| **Exact value of every root move needed** (e.g. ranking all moves, explaining *why* each move is worse, teaching) | **Minimax** | Alpha-beta returns only bounds for the moves it prunes. Minimax scores every move exactly. |
| **Simplicity, debugging, reference implementation** | **Minimax** | It has no α/β bookkeeping, so it is easier to trace by hand and to check. We use it as the reference that alpha-beta's scores are tested against. |
| **Choosing a move to play under a time limit** | Alpha-beta | Same decision for a fraction of the work. In E1 at depth 4, placement takes 118 ms with minimax and 7 ms with alpha-beta, so the spare time can buy an extra ply. |

### Two honest caveats

1. **Fewer nodes doesn't always mean less time with ordering.** The heuristic order cuts depth-4 nodes from 2,627 to 720 in placement, yet takes *longer* (12.0 ms vs 7.3 ms median). Sorting calls `designed_eval` on every child, and that costs more than the nodes it saves at this depth. Cheaper orderings (captures first, killer moves) or deeper searches would tip the balance. E1's timing comparison (R10 order) is not affected.
2. **The oracle orderings are measuring tools, not agents.** They need the answer to order the search, so they cost more than they save. They show what is *possible* (the floor and ceiling), which is why their time is not reported as a result.

### One-sentence answer for the viva

> Alpha-beta always gives the same answer as minimax and never searches more nodes. Its advantage ranges from nothing (worst move order, or depth 1) to searching only about b^(d/2) nodes (best move order). It wins most with deep searches, many moves per position and good move ordering. Minimax is only preferable when you need the exact value of every move or the simplest possible code.
