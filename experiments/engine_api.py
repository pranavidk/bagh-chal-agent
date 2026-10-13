"""
The contract between the experiment framework and the game engine.

The framework never imports the engine directly. Instead, the engine side
(Shalom's search + Vishal's board model and heuristics) provides one small
adapter class with the methods below, and every experiment is run with

    python -m experiments e1 --engine <module>:<ClassName>

The framework treats engine states and moves as opaque objects. It only needs
to (a) build a state from a Position, (b) read a Position back, (c) step a
game forward, and (d) ask for a search with a node counter attached.

NODE COUNTING -- the one line the engine must add
--------------------------------------------------
The framework passes a SearchStats object into search(). The recursive
minimax / alpha-beta function must do

    stats.nodes += 1

as the FIRST statement of every call (including the root call and calls that
immediately return because of a cutoff or terminal test). That is the
"nodes expanded" metric in E1. Counting it anywhere else (e.g. only at
leaves, or only after the cutoff test) makes the minimax vs alpha-beta
comparison unfair, so please keep it at the very top.

If the heuristic is called, the engine may also do `stats.evals += 1`; this
is optional and only used for an extra column.

Timing is done by the framework around the whole search() call with
time.perf_counter(), so the engine must not do its own timing.
"""
from __future__ import annotations

import importlib
from dataclasses import dataclass
from typing import Any, List, Optional

try:  # Protocol is in typing from 3.8; keep the import soft for older Pythons
    from typing import Protocol
except ImportError:  # pragma: no cover
    Protocol = object  # type: ignore

from .position import Position

MINIMAX = "minimax"
ALPHABETA = "alphabeta"
ALGORITHMS = (MINIMAX, ALPHABETA)

DESIGNED = "designed"   # the six-feature EVAL from the proposal
BASELINE = "baseline"   # captured-goat count only
EVALUATORS = (DESIGNED, BASELINE)


class SearchStats:
    """Counters the engine increments during one search() call."""
    __slots__ = ("nodes", "evals")

    def __init__(self) -> None:
        self.nodes = 0
        self.evals = 0


@dataclass
class SearchResult:
    move: Any          # the engine's move object; str(move) is what gets logged
    score: float       # backed-up minimax value at the root, from the TIGER's perspective
    pv: Optional[list] = None   # principal variation, starting with `move` (optional)


class Engine(Protocol):
    """Everything the experiment framework needs from the engine side."""

    # --- conversion ----------------------------------------------------------
    def from_position(self, pos: Position) -> Any:
        """Build a fresh engine state (empty repetition history) from a Position."""

    def to_position(self, state: Any) -> Position:
        """Snapshot an engine state back into a Position."""

    # --- game stepping (used by E2 self-play and the position generator) -----
    def initial_state(self) -> Any:
        """Standard start position."""

    def legal_moves(self, state: Any) -> List[Any]:
        """All legal moves for the side to move, in the engine's fixed order."""

    def apply(self, state: Any, move: Any) -> Any:
        """Return the successor state. Must not mutate `state`."""

    def is_terminal(self, state: Any) -> bool:
        """Win, loss, threefold repetition or move cap."""

    def winner(self, state: Any) -> Optional[str]:
        """'TIGER', 'GOAT', or None for a draw. Only called on terminal states."""

    # --- search -------------------------------------------------------------
    def search(self, state: Any, depth: int, algorithm: str, evaluator: str,
               stats: SearchStats) -> SearchResult:
        """Run a depth-limited search from `state` for the side to move.

        algorithm  : 'minimax' or 'alphabeta'
        evaluator  : 'designed' or 'baseline'
        stats      : increment stats.nodes at the top of every recursive call
        """


def load_engine(spec: str) -> Engine:
    """Load an engine from 'package.module:ClassName' and instantiate it."""
    if ":" not in spec:
        raise ValueError(f"engine spec must look like 'module:ClassName', got {spec!r}")
    module_name, attr = spec.split(":", 1)
    module = importlib.import_module(module_name)
    obj = getattr(module, attr)
    engine = obj() if callable(obj) and not _looks_like_engine(obj) else obj
    missing = [m for m in _REQUIRED if not callable(getattr(engine, m, None))]
    if missing:
        raise TypeError(f"{spec} is missing engine methods: {', '.join(missing)}")
    return engine


_REQUIRED = ("from_position", "to_position", "initial_state", "legal_moves",
             "apply", "is_terminal", "winner", "search")


def _looks_like_engine(obj) -> bool:
    # An already-constructed engine instance (not a class) has bound methods.
    return not isinstance(obj, type) and all(hasattr(obj, m) for m in _REQUIRED)
