# Slides: 6-slide outline

> Content, figures and numbers are filled in from `results/` and the report skeleton. The talking points marked **[TEAM]** are yours to write and say. Build in PowerPoint or Keynote; one idea per slide.

## 1. The problem
- Bagh-Chal: 4 tigers vs 20 goats, 5×5 board, diagonals only through even points.
- Tigers win with 5 captures; goats win by trapping every tiger.
- Question: (a) how much does alpha-beta save over minimax? (b) does our evaluation beat a naive one?
- Visual: start position from `python -m baghchal rules` (point indices and degrees).
- [TEAM] why this game is a good adversarial-search problem.

## 2. Formulation
- State `⟨B, h, k, p, H, n⟩`; actions PLACE / STEP / JUMP; terminal test R8; utility ±(1,000,000 − d).
- Tigers MAX, goats MIN; one zero-sum evaluation.
- Visual: the formulation table (report §2.2), trimmed to 5 rows.
- [TEAM] why the `d` in the utility makes the agent prefer faster wins.

## 3. Search and evaluation
- Minimax and alpha-beta; node counted first in every call; fixed move order; first-best tie-breaking.
- `EVAL = 100·capt + 3·mob + 15·threat − 40·trapped − 2·conn − 1·hub`, bounded by ±896.
- Visual: the R&N Fig. 5.2 tree with the alpha-beta cut-off marked (13 vs 11 nodes).
- [TEAM] one sentence per weight group.

## 4. E1: alpha-beta vs minimax
- Visual: `results/e1_nodes_vs_depth.png`.
- Depth 4: placement 45,746 → 2,627 nodes (8.4%); movement 4,536 → 818 (18.6%).
- Same root score and same move on all 90 position/depth pairs.
- [TEAM] what the slopes (b\*) mean and why placement saves more.

## 5. E2: designed vs baseline evaluation
- Visual: `results/e2_results.png`.
- As tiger: 48 W · 2 D · 0 L (96%, CI 86–99%). As goat: 16 W · 9 D · 25 L (32%, CI 21–46%).
- All draws by threefold repetition; no game hit the move cap.
- [TEAM] the explanation of the tiger/goat asymmetry.

## 6. Live demo and takeaways
- Demo: `python -m baghchal analyse --board "<examiner's position>" --to-move … --depth 4`, which prints move, score, nodes, time and PV in ~10 ms.
- [TEAM] limitations and what you'd do next (move ordering, weight tuning).
- [TEAM] AI-tool declaration line (must match report §8).
