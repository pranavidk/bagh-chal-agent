# Slides: 6-slide outline

> Content, figures and numbers come from `results/` and the report. Claude Code wrote the talking points on 2026-10-22 at Pranav's direction (declared on slide 6 and in report §8). Build in PowerPoint or Keynote; one idea per slide.

## 1. The problem
- Bagh-Chal: 4 tigers vs 20 goats, 5×5 board, diagonals only through even points.
- Tigers win with 5 captures; goats win by trapping every tiger.
- Question: (a) how much does alpha-beta save over minimax? (b) does our evaluation beat a naive one?
- Visual: start position from `python -m baghchal rules` (point indices and degrees).
- Talking point: it fits the textbook model exactly (deterministic, fully observable, zero-sum, turn-based); the sides are asymmetric, so the evaluation must be designed; and the branching factor drops from ~21 in placement to ~8 in movement, so one program shows pruning at two branching factors.

## 2. Formulation
- State `⟨B, h, k, p, H, n⟩`; actions PLACE / STEP / JUMP; terminal test R8; utility ±(1,000,000 − d).
- Tigers MAX, goats MIN; one zero-sum evaluation.
- Visual: the formulation table (report §2.2), trimmed to 5 rows.
- Talking point: a win is worth 1,000,000 − d, where d is the distance from the search root. A win in 1 (999,999) beats a win in 3 (999,997), so the agent takes the quickest win and delays a loss as long as it can, instead of drifting between equally winning moves.

## 3. Search and evaluation
- Minimax and alpha-beta; node counted first in every call; fixed move order; first-best tie-breaking.
- `EVAL = 100·capt + 3·mob + 15·threat − 40·trapped − 2·conn − 1·hub`, bounded by ±896.
- Visual: the R&N Fig. 5.2 tree with the alpha-beta cut-off marked (13 vs 11 nodes).
- Talking point (tiger terms): a capture (100) is permanent and five win, so it outweighs everything else; a threat (15) is a likely capture that can still be defended; mobility (3) is small but has many units.
- Talking point (goat terms): a trapped tiger (40) is progress toward the goats' win but can be freed; connected goats (2) and goats on hub points (1) build the wall that cuts the tigers' lines.

## 4. E1: alpha-beta vs minimax
- Visual: `results/e1_nodes_vs_depth.png`.
- Depth 4: placement 45,746 → 2,627 nodes (8.4%); movement 4,536 → 818 (18.6%).
- Same root score and same move on all 90 position/depth pairs.
- Talking point: on a log scale the slope is the effective branching factor b\*. Alpha-beta's slope is lower and the gap grows with depth: 54% → 35% → 14% of minimax's nodes. Placement has more moves per position (b\* ≈ 14 vs 8), so every cutoff skips more siblings. We are still above the √b ideal because moves are searched in fixed rule order, not best-first.

## 5. E2: designed vs baseline evaluation
- Visual: `results/e2_results.png`.
- As tiger: 48 W · 2 D · 0 L (96%, CI 86–99%). As goat: 16 W · 9 D · 25 L (32%, CI 21–46%).
- All draws by threefold repetition; no game hit the move cap.
- Talking point: as tiger, the threat and mobility terms set up double attacks that a capture-only goat can't see coming. As goat, the job is harder: one oversight loses a goat, and depth 3 can't see a double attack being prepared two moves ahead. The designed goat's 16 wins were all traps of a tiger that ignores mobility.

## 6. Live demo and takeaways
- Demo: `python -m baghchal analyse --board "<examiner's position>" --to-move … --depth 4`, which prints move, score, nodes, time and PV in ~10 ms.
- Talking point: depth is limited to 3–4, there is no move ordering, and the weights were reasoned rather than tuned. Next: captures-first move ordering, a short weight-tuning round-robin, and iterative deepening with a time limit.
- Declaration: Claude Code (Anthropic) wrote the code, including the search and evaluation, and the report text, at Pranav's direction; full details in report §8.
