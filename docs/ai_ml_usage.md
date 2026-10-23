# How AI (and ML) is used in this project

*Written by Claude Code on 2026-10-22 at Pranav's direction (PRD §10). The team reviews and owns it.*

**Short answer.** The agent is **classical AI**: a rational agent that decides by **adversarial search** (minimax and alpha-beta pruning) guided by a **hand-designed heuristic evaluation function**. It uses **no machine learning**: nothing is trained, nothing is learned from data, and every number in the evaluation was chosen by reasoning about the game. Separately, an AI tool (Claude Code) was used to **write** much of the code and the report. That is tool use, not part of the agent, and it is declared in report §8.

---

## 1. The agent, in AI terms (PEAS)

| | Bagh-Chal agent |
|---|---|
| **Performance measure** | Win (tigers: capture 5 goats; goats: trap all tigers), prefer faster wins and slower losses (R9 utility `±1,000,000 ∓ d`) |
| **Environment** | 5×5 Bagh-Chal board: two players, turn-based, **fully observable, deterministic, discrete, zero-sum** |
| **Actuators** | The move it plays: `PLACE(x)`, `STEP(x, y)`, `JUMP(x, y, z)` |
| **Sensors** | The full position: board, goats in hand, goats captured, side to move, history |

Because the environment is fully observable, deterministic and two-player zero-sum, the textbook rational decision is the **minimax decision** (Russell & Norvig, Ch. 5). That is why the project is built on search, not on learning.

## 2. Where the "intelligence" comes from

| AI technique | Where | What it does |
|---|---|---|
| **Problem formulation** (state, actions, transition, terminal test, utility) | `baghchal/state.py`, `rules.py`, `game.py`; report §2 | Turns the game into a search problem the algorithms can work on. |
| **Adversarial search: minimax** | `baghchal/search.py: minimax` | Looks `d` moves ahead, assumes the opponent plays its best reply, and backs values up the tree: MAX (tigers) takes the maximum, MIN (goats) the minimum. |
| **Alpha-beta pruning** | `baghchal/search.py: alphabeta` | Gives the same decision as minimax while skipping branches that cannot change it. E1 shows it needs 14% of minimax's nodes at depth 4. E3 shows how this depends on move order (`docs/algorithm_comparison.md`). |
| **Depth-limited search with a cutoff** | both functions, `depth == 0` | The full game tree is far too big to search, so the search stops at depth `d` and estimates the position. |
| **Heuristic evaluation function** (knowledge-based) | `baghchal/evaluation.py` | Estimates who is winning at the cutoff: `EVAL = 100·capt + 3·mob + 15·threat − 40·trapped − 2·conn − 1·hub`. The six features encode human knowledge of the game: captures, tiger mobility and threats for the tigers; trapped tigers, connected goats and goats on the strong hub points for the goats. |
| **Move ordering** (E3) | `baghchal/ordering.py` | A cheap heuristic (the evaluation of each child) puts the most promising moves first, so alpha-beta prunes more. |

The decision is made in exactly one place: `choose_move` calls `minimax` or `alphabeta`, which compare the backed-up values of the legal moves and return the best one. Running `python -m baghchal analyse ...` shows the chosen move, its score, the nodes searched and the principal variation, the line of play the agent expects.

## 3. Why there is no machine learning

- **Nothing is learned.** The six features and their weights (100, 3, 15, 40, 2, 1) were chosen by reasoning about the game; report §3.3 justifies each one. There is no training data, no training loop and no parameter fitted to results. The program plays identically every time (C6), and it does not improve with experience.
- **It wasn't the goal.** The course module (BCSE306L Module 3) is adversarial search. The project's question was how much alpha-beta saves and whether a designed evaluation beats a naive one. ML wasn't needed to answer either.
- **It was ruled out on purpose.** PRD §2 lists neural networks, learned weights and external AI services as non-goals. Constraint C1 requires the search and evaluation to use only the Python standard library ("if I delete every library import, is there still an AI algorithm left?"). matplotlib only draws plots and pytest only runs tests. Neither takes part in decisions.
- **The experiments measure the agent; they don't train it.** E2 plays 100 games to compare two evaluation functions, but the results never feed back into the weights.

## 4. Where ML *could* be added (future work, not done)

| Idea | What would be learned | How |
|---|---|---|
| **Weight tuning by self-play** | The six weights | A round-robin over a few weight sets, keeping the best (PRD §11.2). This is the simplest step from hand-tuning to optimisation. |
| **Temporal-difference learning** | The six weights | Adjust weights so that `EVAL(s)` predicts `EVAL(s')` a few moves later and the final result. This is the classic TD-Gammon and checkers approach (Samuel, Tesauro). |
| **Learned evaluation** | A neural network replacing `EVAL` | Train on self-play positions labelled with game outcomes. AlphaZero does this with Monte Carlo tree search instead of alpha-beta. |
| **Learned move ordering** | Which moves to try first | History or killer heuristics, or a learned policy. This would push alpha-beta toward its best case (E3). |

Any of these would turn the hand-designed evaluation into a learned one while leaving the minimax and alpha-beta search unchanged. The search decides; the evaluation (designed or learned) only scores the leaves.

## 5. Use of AI tools in building the project (declaration)

Separately from the agent's own AI, the team used **Claude Code** (Anthropic's AI coding agent) as a development tool, at Pranav's direction:

- It wrote the game rules, tests, adapter, CLI and benchmarks.
- On 2026-10-13 it also wrote `search.py` and `evaluation.py`, including the initial weights. Shalom owns the search and Vishal owns the evaluation.
- On 2026-10-22 it wrote the report text, the slides and the viva guide.
- On 2026-10-22 it also wrote experiment E3 (`baghchal/ordering.py`, `e3/`), `docs/algorithm_comparison.md` and this document.

Pranav wrote the experiment framework (`experiments/`). The full declaration is report §8, and the change record is PRD §10. Claude Code was used to *build* the agent. It plays no part when the agent runs: the agent makes no calls to any AI service.
