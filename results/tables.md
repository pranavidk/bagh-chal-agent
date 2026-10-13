# Experiment results

## E1 — Minimax vs Alpha-Beta

Medians across test positions. b* is the effective branching factor.

| Phase | Depth | Minimax nodes (median) | Alpha-beta nodes (median) | Alpha-beta / minimax | Minimax ms | Alpha-beta ms | b* minimax | b* alpha-beta |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| all | 2 | 93 | 56 | 53.6% | 0.346 | 0.192 | 9.10 | 6.93 |
| all | 3 | 922 | 332 | 35.4% | 3.041 | 0.988 | 9.37 | 6.55 |
| all | 4 | 6,996 | 1,214 | 14.1% | 24.7 | 3.887 | 8.88 | 5.62 |
| movement | 2 | 68 | 46 | 66.7% | 0.273 | 0.154 | 7.70 | 6.23 |
| movement | 3 | 615 | 252 | 47.3% | 1.890 | 0.836 | 8.14 | 5.94 |
| movement | 4 | 4,536 | 818 | 18.6% | 17.8 | 2.715 | 7.93 | 5.06 |
| placement | 2 | 240 | 79 | 37.8% | 0.664 | 0.211 | 14.97 | 8.35 |
| placement | 3 | 3,055 | 671 | 26.2% | 8.296 | 1.954 | 14.16 | 8.39 |
| placement | 4 | 45,746 | 2,627 | 8.4% | 117.7 | 6.939 | 14.36 | 6.88 |

**Correctness:** alpha-beta returned the same root score as minimax on every position and depth.

## E2 — Designed evaluation vs capture-count baseline

| Designed eval plays | Games | W | D | L | Win rate (95% CI) | Mean goats captured |
|---|---:|---:|---:|---:|---|---:|
| Tiger | 50 | 48 | 2 | 0 | 96% (86–99%) | 4.96 |
| Goat | 50 | 16 | 9 | 25 | 32% (21–46%) | 3.68 |
