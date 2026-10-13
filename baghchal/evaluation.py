"""Evaluation functions (PRD §6.4).

Authorship: written by Claude Code on 2026-10-13 at Pranav's direction (PRD §10),
including the initial WEIGHTS. Owner from here: Vishal, who reviews it, may
change the weights, and must be able to justify them at the viva.

    EVAL(s) = w1·capt + w2·mob + w3·threat − w4·trapped − w5·conn − w6·hub

One zero-sum score from the tiger's side (tigers are MAX, R9): the first three
features measure tiger progress, the last three goat progress. Because it is a
single number that one side maximises and the other minimises, the search
stays a true minimax and alpha-beta pruning stays sound.

The value stays strictly inside ±100,000 on every reachable state, so no
heuristic value can outrank a real win or loss (±1,000,000). With the weights
below the largest possible magnitude is under 1,000 (see WEIGHTS).

Complexity: one pass over the 4 tigers' candidate moves (≤ 4 × 8), the 56
edges and the 13 even points: O(1), about 100 table lookups.
"""
from __future__ import annotations

from typing import Dict

from .board import DEGREE, EDGES, EMPTY, EVEN, GOAT, POINTS, TIGER_TARGETS
from .state import State

FEATURES = ("capt", "mob", "threat", "trapped", "conn", "hub")

# Initial weights (Claude Code); Vishal reviews these and justifies the final ones.
# Upper bounds of each feature: capt ≤ 5, mob ≤ 32, threat ≤ 20, trapped ≤ 4,
# conn ≤ 56, hub ≤ 72, so |EVAL| ≤ 100·5 + 3·32 + 15·20 = 896 for the tigers and
# ≤ 40·4 + 2·56 + 1·72 = 344 for the goats: far inside the ±100,000 bound.
WEIGHTS: Dict[str, float] = {
    # w1: a capture is permanent and five end the game, so one capture must outweigh
    #     any realistic swing in the positional terms below.
    "capt": 100,
    # w2: each step a tiger has is a way to keep threatening; worth little alone, and
    #     mobility ranges up to ~30, so a small unit weight.
    "mob": 3,
    # w3: a goat that can be jumped right now is often lost next turn, but the goat
    #     side may still defend it, so it is a fraction (~1/7) of a real capture.
    "threat": 15,
    # w4: a trapped tiger is a big step toward the goats' win (four trapped = win),
    #     but it can be freed again, so it is worth less than a capture.
    "trapped": 40,
    # w5: goats standing next to each other block landing points and protect each
    #     other; each link is small but there are many.
    "conn": 2,
    # w6: goats on high-degree even points cut the tigers' diagonal lines; smallest
    #     weight because it overlaps with conn (such goats tend to be connected too).
    "hub": 1,
}

# Even points with their degree, for `hub`: built once from the board tables.
_EVEN_DEGREES = tuple((x, DEGREE[x]) for x in range(POINTS) if EVEN[x])


def features(state: State) -> Dict[str, int]:
    """The six raw feature counts of `state`, keyed by FEATURES (PRD §6.4).

    Features are computed regardless of whose turn it is.

    capt    (favours tigers): k, goats captured
    mob     (favours tigers): number of legal tiger STEP moves, summed over all tigers
    threat  (favours tigers): number of distinct goats that some tiger could jump right now
    trapped (favours goats):  number of tigers with no legal STEP or JUMP
    conn    (favours goats):  number of board edges (R1) whose both endpoints hold goats
    hub     (favours goats):  sum of degree(x) over goats on even-parity points x
    """
    board = state.board

    # mob, threat and trapped all come from one pass over each tiger's candidate
    # moves (TIGER_TARGETS: (to, over) with over = -1 for a step), the same table
    # rules.py uses, so they agree with the real move generator (R7).
    mob = 0
    trapped = 0
    threatened = 0                 # bitmask of goat points: a goat jumpable by two
    for t in state.tigers:         # tigers sets the same bit, so it counts once
        can_move = False
        for to, over in TIGER_TARGETS[t]:
            if board[to] != EMPTY:
                continue           # steps and jumps both need an empty landing point
            if over < 0:
                mob += 1           # a legal STEP
                can_move = True
            elif board[over] == GOAT:
                threatened |= 1 << over   # a legal JUMP over the goat on `over`
                can_move = True
        if not can_move:
            trapped += 1           # no STEP and no JUMP: this tiger is stuck
    threat = bin(threatened).count("1")

    # conn: every R1 edge with a goat on both ends (each edge is listed once).
    conn = 0
    for a, b in EDGES:
        if board[a] == GOAT and board[b] == GOAT:
            conn += 1

    # hub: goats on even points (the ones with diagonals) weighted by degree.
    hub = 0
    for x, degree in _EVEN_DEGREES:
        if board[x] == GOAT:
            hub += degree

    return {"capt": state.goats_captured, "mob": mob, "threat": threat,
            "trapped": trapped, "conn": conn, "hub": hub}


def designed_eval(state: State) -> float:
    """w1·capt + w2·mob + w3·threat − w4·trapped − w5·conn − w6·hub, using WEIGHTS.

    From the tiger's side; |designed_eval(s)| < 100,000 for every reachable s.
    """
    f = features(state)
    w = WEIGHTS
    return (w["capt"] * f["capt"] + w["mob"] * f["mob"] + w["threat"] * f["threat"]
            - w["trapped"] * f["trapped"] - w["conn"] * f["conn"] - w["hub"] * f["hub"])


def baseline_eval(state: State) -> float:
    """The naive baseline for E2: capt only, the number of goats captured (k)."""
    return float(state.goats_captured)
