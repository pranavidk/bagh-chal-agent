# E3 results: best case and worst case of alpha-beta

## Bagh-Chal positions

Median nodes expanded per move (30 positions, designed evaluation); in brackets, the median share of minimax's nodes. Minimax's count is the same under every order.

| Phase | Depth | Minimax | AB worst order | AB R10 order | AB heuristic order | AB best order (oracle) |
|---|---:|---:|---:|---:|---:|---:|
| Placement | 2 | 240 | 240 (100.0%) | 79 (37.8%) | 45 (23.5%) | 44 (18.7%) |
| Placement | 3 | 3,055 | 3,017 (99.2%) | 671 (26.2%) | 280 (9.8%) | 246 (8.4%) |
| Placement | 4 | 45,746 | 23,417 (86.1%) | 2,627 (8.4%) | 720 (2.3%) | 650 (1.5%) |
| Movement | 2 | 68 | 68 (100.0%) | 46 (66.7%) | 25 (36.8%) | 25 (36.2%) |
| Movement | 3 | 615 | 615 (99.9%) | 252 (47.3%) | 117 (21.4%) | 77 (15.3%) |
| Movement | 4 | 4,536 | 4,353 (90.6%) | 818 (18.6%) | 280 (7.0%) | 190 (4.1%) |
| All | 2 | 93 | 92.5 (100.0%) | 56 (53.6%) | 32.5 (30.5%) | 30 (28.4%) |
| All | 3 | 921.5 | 921.5 (99.5%) | 331.5 (35.4%) | 179.5 (19.4%) | 115.5 (10.5%) |
| All | 4 | 6,995.5 | 5,678 (86.2%) | 1,214 (14.1%) | 453 (4.8%) | 232.5 (2.5%) |

Effective branching factor b* (median):

| Phase | Depth | Minimax | AB worst | AB R10 | AB heuristic | AB best | √(minimax b*) |
|---|---:|---:|---:|---:|---:|---:|---:|
| Placement | 2 | 14.97 | 14.97 | 8.35 | 6.15 | 6.08 | 3.87 |
| Placement | 3 | 14.16 | 14.10 | 8.39 | 6.17 | 5.89 | 3.76 |
| Placement | 4 | 14.36 | 12.11 | 6.88 | 4.89 | 4.76 | 3.79 |
| Movement | 2 | 7.70 | 7.70 | 6.23 | 4.42 | 4.42 | 2.78 |
| Movement | 3 | 8.14 | 8.14 | 5.94 | 4.50 | 3.85 | 2.85 |
| Movement | 4 | 7.93 | 7.85 | 5.06 | 3.79 | 3.41 | 2.82 |

## Uniform trees (exact formulas)

Leaves evaluated. Worst case = alpha-beta in R10 order on a tree built so that every move is better than the one before it (`UniformTree.worst_case`); the other columns use a tree with random distinct leaves (seed 2026).

| b | d | Minimax = b^d | AB worst case (built tree) | AB reversed-oracle order | AB R10 order (random) | AB best order | Knuth–Moore b^⌈d/2⌉+b^⌊d/2⌋−1 |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 2 | 1 | 2 | 2 | 2 | 2 | 2 | 2 |
| 2 | 2 | 4 | 4 | 4 | 4 | 3 | 3 |
| 2 | 3 | 8 | 8 | 8 | 5 | 5 | 5 |
| 2 | 4 | 16 | 16 | 14 | 14 | 7 | 7 |
| 2 | 5 | 32 | 32 | 31 | 13 | 11 | 11 |
| 2 | 6 | 64 | 64 | 57 | 35 | 15 | 15 |
| 4 | 1 | 4 | 4 | 4 | 4 | 4 | 4 |
| 4 | 2 | 16 | 16 | 16 | 13 | 7 | 7 |
| 4 | 3 | 64 | 64 | 64 | 43 | 19 | 19 |
| 4 | 4 | 256 | 256 | 243 | 110 | 31 | 31 |
| 4 | 5 | 1,024 | 1,024 | 953 | 345 | 79 | 79 |
| 4 | 6 | 4,096 | 4,096 | 3,620 | 1,044 | 127 | 127 |
| 8 | 1 | 8 | 8 | 8 | 8 | 8 | 8 |
| 8 | 2 | 64 | 64 | 64 | 34 | 15 | 15 |
| 8 | 3 | 512 | 512 | 512 | 279 | 71 | 71 |
| 8 | 4 | 4,096 | 4,096 | 3,891 | 1,107 | 127 | 127 |
| 8 | 5 | 32,768 | 32,768 | 29,453 | 4,317 | 575 | 575 |
