"""Evaluation functions (PRD §6.4). Feature logic and weights are written by Vishal.

This file is a stub: signatures and contracts only. Per CLAUDE.md and PRD
§6.1/§10, the bodies of features, designed_eval and baseline_eval, and the
WEIGHTS values, are written and justified by a team member, not generated.

    EVAL(s) = w1·capt + w2·mob + w3·threat − w4·trapped − w5·conn − w6·hub

One zero-sum score from the tiger's side (tigers are MAX, R9). It must stay
strictly inside ±100,000 on every reachable state so that no heuristic value
can outrank a real win or loss (±1,000,000).
"""
from __future__ import annotations

from typing import Dict, Optional

from .state import State

FEATURES = ("capt", "mob", "threat", "trapped", "conn", "hub")

# Chosen and justified by Vishal: one comment line per weight explaining the choice.
WEIGHTS: Dict[str, Optional[float]] = {
    "capt": None,      # w1
    "mob": None,       # w2
    "threat": None,    # w3
    "trapped": None,   # w4
    "conn": None,      # w5
    "hub": None,       # w6
}


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
    raise NotImplementedError("features: to be written by Vishal (PRD §6.4)")


def designed_eval(state: State) -> float:
    """w1·capt + w2·mob + w3·threat − w4·trapped − w5·conn − w6·hub, using WEIGHTS.

    From the tiger's side; |designed_eval(s)| < 100,000 for every reachable s.
    """
    raise NotImplementedError("designed_eval: to be written by Vishal (PRD §6.4)")


def baseline_eval(state: State) -> float:
    """The naive baseline for E2: capt only (goats captured)."""
    raise NotImplementedError("baseline_eval: to be written by Vishal (PRD §6.4)")
