"""
Position format for the experiment suite.

A Position is a complete, engine-independent snapshot of a Bagh-Chal game:
where every piece is, whose turn it is, how many goats are still in hand and
how many have been captured. It is the unit the whole experiment framework
works with -- test positions are stored as Positions, and the engine adapter
converts them to and from its own internal state.

Board coordinates are (row, col) with (0, 0) at the top-left. Each row is a
5-character string using:
    'T'  tiger
    'G'  goat
    '.'  empty point

Repetition history is NOT part of a Position: every test position starts with
an empty history. This is stated in the report as a known simplification.
"""
from __future__ import annotations

import json
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import List, Sequence

TIGER = "TIGER"
GOAT = "GOAT"
SIDES = (TIGER, GOAT)

PLACEMENT = "placement"
MOVEMENT = "movement"

SIZE = 5
NUM_TIGERS = 4
NUM_GOATS = 20
GOATS_TO_WIN = 5  # tigers win on the 5th capture


class PositionError(ValueError):
    """Raised when a position violates the piece-count or format rules."""


@dataclass(frozen=True)
class Position:
    board: tuple            # 5 strings of length 5, e.g. ("T...T", ".....", ...)
    to_move: str            # TIGER or GOAT
    goats_in_hand: int
    goats_captured: int
    id: str = ""
    note: str = ""

    # ---- derived properties -------------------------------------------------
    @property
    def phase(self) -> str:
        """Placement while any goat is still in hand, movement afterwards."""
        return PLACEMENT if self.goats_in_hand > 0 else MOVEMENT

    @property
    def goats_on_board(self) -> int:
        return sum(row.count("G") for row in self.board)

    @property
    def tigers_on_board(self) -> int:
        return sum(row.count("T") for row in self.board)

    def key(self) -> str:
        """Canonical string used to detect duplicate positions."""
        return "/".join(self.board) + f"|{self.to_move}|{self.goats_in_hand}|{self.goats_captured}"

    # ---- validation ---------------------------------------------------------
    def validate(self) -> "Position":
        """Check format and piece conservation. Returns self so it can be chained.

        This catches typos in hand-edited position files and adapter bugs that
        lose or duplicate pieces. It cannot prove a position is *reachable*
        from the start of a game; positions produced by generate_positions.py
        are reachable by construction because they come from real play.
        """
        where = f"position {self.id!r}: " if self.id else ""
        if len(self.board) != SIZE:
            raise PositionError(f"{where}board must have {SIZE} rows, got {len(self.board)}")
        for r, row in enumerate(self.board):
            if len(row) != SIZE:
                raise PositionError(f"{where}row {r} must have {SIZE} points, got {row!r}")
            bad = set(row) - set("TG.")
            if bad:
                raise PositionError(f"{where}row {r} has invalid characters {sorted(bad)}")
        if self.to_move not in SIDES:
            raise PositionError(f"{where}to_move must be TIGER or GOAT, got {self.to_move!r}")
        if self.tigers_on_board != NUM_TIGERS:
            raise PositionError(f"{where}expected {NUM_TIGERS} tigers, found {self.tigers_on_board}")
        if not 0 <= self.goats_in_hand <= NUM_GOATS:
            raise PositionError(f"{where}goats_in_hand out of range: {self.goats_in_hand}")
        if not 0 <= self.goats_captured <= GOATS_TO_WIN:
            raise PositionError(f"{where}goats_captured out of range: {self.goats_captured}")
        total = self.goats_on_board + self.goats_in_hand + self.goats_captured
        if total != NUM_GOATS:
            raise PositionError(
                f"{where}goats on board ({self.goats_on_board}) + in hand ({self.goats_in_hand}) "
                f"+ captured ({self.goats_captured}) = {total}, must be {NUM_GOATS}"
            )
        return self

    # ---- text I/O -----------------------------------------------------------
    def pretty(self) -> str:
        """Human-readable board, the same layout as the proposal's Input section."""
        info = [
            f"Side to move  : {self.to_move}",
            f"Goats in hand : {self.goats_in_hand}",
            f"Goats captured: {self.goats_captured}",
            f"Phase         : {self.phase}",
            "",
        ]
        rows = [" ".join(row) for row in self.board]
        return "\n".join(f"{rows[i]:<12}{info[i]}" for i in range(SIZE))

    def to_dict(self) -> dict:
        d = asdict(self)
        d["board"] = list(self.board)
        d["phase"] = self.phase  # written for readability; recomputed on load
        return d

    @classmethod
    def from_dict(cls, d: dict) -> "Position":
        board = d["board"]
        if isinstance(board, str):
            board = board.split("/")
        board = tuple(row.replace(" ", "") for row in board)
        pos = cls(
            board=board,
            to_move=str(d["to_move"]).upper(),
            goats_in_hand=int(d["goats_in_hand"]),
            goats_captured=int(d["goats_captured"]),
            id=str(d.get("id", "")),
            note=str(d.get("note", "")),
        )
        if "phase" in d and d["phase"] != pos.phase:
            raise PositionError(
                f"position {pos.id!r}: file says phase={d['phase']!r} but goats_in_hand="
                f"{pos.goats_in_hand} means {pos.phase!r}"
            )
        return pos.validate()


def initial_position() -> Position:
    """Standard start: tigers on the four corners, 20 goats in hand, goats move first."""
    return Position(
        board=("T...T", ".....", ".....", ".....", "T...T"),
        to_move=GOAT,
        goats_in_hand=NUM_GOATS,
        goats_captured=0,
        id="START",
    )


# ---- position files ---------------------------------------------------------

def load_positions(path) -> List[Position]:
    """Load and validate a positions file. Rejects duplicate ids and duplicate boards."""
    data = json.loads(Path(path).read_text())
    items = data["positions"] if isinstance(data, dict) else data
    positions = [Position.from_dict(d) for d in items]
    seen_ids, seen_keys = set(), set()
    for p in positions:
        if p.id in seen_ids:
            raise PositionError(f"duplicate position id {p.id!r}")
        if p.key() in seen_keys:
            raise PositionError(f"position {p.id!r} duplicates an earlier position")
        seen_ids.add(p.id)
        seen_keys.add(p.key())
    return positions


def save_positions(path, positions: Sequence[Position], meta: dict = None) -> None:
    for p in positions:
        p.validate()
    payload = {"meta": meta or {}, "positions": [p.to_dict() for p in positions]}
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    Path(path).write_text(json.dumps(payload, indent=2) + "\n")
