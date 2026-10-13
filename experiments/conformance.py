"""
check-engine: contract tests for the engine adapter.

Run this the first time Shalom's and Vishal's code is plugged in, and again
after any change to the engine. It catches the integration bugs that would
otherwise silently corrupt E1/E2 numbers:

  - Position <-> state conversion loses or moves pieces
  - apply() mutates the state it was given
  - search() returns an illegal move
  - the node counter is never incremented, or not at the top of the call
  - the search is non-deterministic (node counts differ run to run)
  - alpha-beta returns a different root VALUE from minimax (a pruning bug)
"""
from __future__ import annotations

import random
from typing import List, Optional, Sequence

from .engine_api import ALGORITHMS, ALPHABETA, DESIGNED, EVALUATORS, MINIMAX, Engine, SearchStats
from .position import Position, initial_position


class Report:
    def __init__(self, log=print):
        self.log = log
        self.failures = 0
        self.warnings = 0

    def ok(self, msg):
        self.log(f"  PASS  {msg}")

    def fail(self, msg):
        self.failures += 1
        self.log(f"  FAIL  {msg}")

    def warn(self, msg):
        self.warnings += 1
        self.log(f"  WARN  {msg}")


def _same(a: Position, b: Position) -> bool:
    return (a.board, a.to_move, a.goats_in_hand, a.goats_captured) == \
           (b.board, b.to_move, b.goats_in_hand, b.goats_captured)


def _sample_positions(engine: Engine, n: int = 12, seed: int = 7) -> List[Position]:
    """A few positions from short random games, used when no positions file exists yet."""
    rng, out = random.Random(seed), []
    for _ in range(n):
        state = engine.initial_state()
        for _ in range(rng.randint(2, 40)):
            moves = engine.legal_moves(state)
            if engine.is_terminal(state) or not moves:
                break
            state = engine.apply(state, rng.choice(moves))
        if not engine.is_terminal(state) and engine.legal_moves(state):
            out.append(engine.to_position(state))
    return out


def check_engine(engine: Engine, positions: Optional[Sequence[Position]] = None,
                 depth: int = 2, log=print) -> bool:
    rep = Report(log)

    log("Start position")
    start = engine.to_position(engine.initial_state())
    if _same(start, initial_position()):
        rep.ok("initial_state() matches the standard start (4 corner tigers, 20 in hand, goat to move)")
    else:
        rep.fail("initial_state() differs from the standard start:\n" + start.pretty())

    if not positions:
        positions = _sample_positions(engine)
        log(f"\nNo positions file given -- using {len(positions)} positions from random play")
    log(f"\nConversion and stepping on {len(positions)} positions")
    bad_round = [p.id or p.key() for p in positions
                 if not _same(engine.to_position(engine.from_position(p)), p)]
    if bad_round:
        rep.fail(f"from_position -> to_position changes {len(bad_round)} position(s): {bad_round[:5]}")
    else:
        rep.ok("from_position -> to_position round-trips every position exactly")

    mutated, invalid = [], []
    for p in positions:
        s = engine.from_position(p)
        for m in engine.legal_moves(s)[:5]:
            child = engine.to_position(engine.apply(s, m))
            if not _same(engine.to_position(s), p):
                mutated.append(p.id)
                break
            try:
                child.validate()
            except ValueError as e:
                invalid.append(f"{p.id} after {m}: {e}")
    rep.fail(f"apply() mutates its input state: {mutated[:5]}") if mutated else \
        rep.ok("apply() leaves the input state unchanged")
    rep.fail("apply() produced invalid positions: " + "; ".join(invalid[:3])) if invalid else \
        rep.ok("every successor keeps 4 tigers and 20 goats accounted for")

    log(f"\nSearch (depth {depth})")
    probe = list(positions)[:10]
    for p in probe:
        moves = [str(m) for m in engine.legal_moves(engine.from_position(p))]
        results = {}
        for algo in ALGORITHMS:
            nodes = []
            for _ in range(2):
                st = SearchStats()
                res = engine.search(engine.from_position(p), depth, algo, DESIGNED, st)
                nodes.append(st.nodes)
            results[algo] = (res, nodes)
            tag = f"{p.id or '?'} {algo}"
            if nodes[0] <= 0:
                rep.fail(f"{tag}: stats.nodes stayed 0 -- add `stats.nodes += 1` at the top of the search")
            elif nodes[0] != nodes[1]:
                rep.fail(f"{tag}: node count differs between identical runs {nodes} (non-deterministic)")
            if str(res.move) not in moves:
                rep.fail(f"{tag}: returned move {res.move} is not in legal_moves()")
        mm, ab = results[MINIMAX], results[ALPHABETA]
        if abs(float(mm[0].score) - float(ab[0].score)) > 1e-9:
            rep.fail(f"{p.id}: root score minimax={mm[0].score} vs alphabeta={ab[0].score} -- pruning bug")
        if ab[1][0] > mm[1][0]:
            rep.fail(f"{p.id}: alpha-beta expanded more nodes ({ab[1][0]}) than minimax ({mm[1][0]})")
    if rep.failures == 0:
        rep.ok(f"on {len(probe)} positions: legal moves, deterministic node counts, "
               "alpha-beta root score equals minimax, alpha-beta nodes <= minimax nodes")

    # Where is the counter? With `stats.nodes += 1` at the top of every call,
    # a depth-1 minimax search expands the root plus one node per legal move.
    p = probe[0] if probe else None
    if p is not None:
        st = SearchStats()
        engine.search(engine.from_position(p), 1, MINIMAX, DESIGNED, st)
        expected = 1 + len(engine.legal_moves(engine.from_position(p)))
        if st.nodes == expected:
            rep.ok(f"depth-1 minimax expands 1 + {expected - 1} nodes: counter is at the top of the call")
        else:
            rep.warn(f"depth-1 minimax counted {st.nodes} nodes, expected {expected} (root + one per "
                     "legal move). The counter may not be the first statement of the recursion.")

    for ev in EVALUATORS:
        try:
            engine.search(engine.from_position(p or initial_position()), 1, ALPHABETA, ev, SearchStats())
            rep.ok(f"evaluator '{ev}' is available")
        except Exception as e:  # noqa: BLE001 - report any engine error as a failure
            rep.fail(f"evaluator '{ev}' raised {type(e).__name__}: {e}")

    log(f"\n{rep.failures} failure(s), {rep.warnings} warning(s)")
    return rep.failures == 0
