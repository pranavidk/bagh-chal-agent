"""Tests for baghchal.state: R3 start state, text format, validation, Position conversion."""
from __future__ import annotations

import dataclasses

import pytest

from baghchal.board import EMPTY, GOAT, TIGER
from baghchal.state import (BoardFormatError, State, from_position, from_text,
                            initial_state, parse_board, to_position, to_text, validate)
from experiments.position import Position, initial_position

START = "T...T/...../...../...../T...T"


def test_r3_initial_state():
    """R3: tigers on the corners, rest empty, h = 20, k = 0, goats move first."""
    s = initial_state()
    assert s.board == (TIGER, 0, 0, 0, TIGER) + (0,) * 15 + (TIGER, 0, 0, 0, TIGER)
    assert s.to_move == GOAT
    assert (s.goats_in_hand, s.goats_captured, s.ply) == (20, 0, 0)
    assert s.tigers == (0, 4, 20, 24)
    assert s.reps == 1


def test_parse_slash_lines_and_spaced_forms_agree():
    """Text format: slash-separated, five lines and spaced rows parse to the same board."""
    lines = "T...T\n.....\n..G..\n.....\nT...T"
    spaced = "T . . . T\n. . . . .\n. . G . .\n. . . . .\nT . . . T"
    slash = "T...T/...../..G../...../T...T"
    assert parse_board(slash) == parse_board(lines) == parse_board(spaced)
    assert parse_board(slash)[12] == GOAT


def test_text_round_trip():
    """text -> State -> text is the identity on the canonical slash form."""
    text = "T.G.T/.GG../...../..G../T...T"
    s = from_text(text, "GOAT", 16, 0)
    assert to_text(s) == text


def test_state_position_round_trip():
    """State -> Position -> State gives an equal state with ply 0 (and fresh history)."""
    s = from_text("TG..T/.G.../..G../...../T...T", "TIGER", 16, 1)
    pos = to_position(s)
    assert pos.board == ("TG..T", ".G...", "..G..", ".....", "T...T")
    assert (pos.to_move, pos.goats_in_hand, pos.goats_captured) == ("TIGER", 16, 1)
    pos.validate()
    back = from_position(pos)
    assert back == s
    assert back.ply == 0 and back.reps == 1


def test_from_initial_position_matches_initial_state():
    """R3: the framework's start Position converts to our start state."""
    assert from_position(initial_position()) == initial_state()


def test_equality_ignores_cache_and_history():
    """Equality and hash cover board, to_move, goats_in_hand, goats_captured, ply only."""
    a = from_text(START, "GOAT", 20, 0)
    b = dataclasses.replace(a, reps=2, history=None, moves_cache=())
    assert a == b and hash(a) == hash(b)
    assert a != dataclasses.replace(a, ply=1)


def test_state_is_frozen():
    """State is immutable."""
    s = initial_state()
    with pytest.raises(dataclasses.FrozenInstanceError):
        s.ply = 3  # type: ignore[misc]


def test_tigers_field_matches_board():
    s = from_text("..T../T...T/...../...../....T", "GOAT", 20, 0)
    assert s.tigers == (2, 5, 9, 24)


def test_validate_accepts_good_state():
    assert validate(initial_state()) is not None


MALFORMED = [
    ("", "GOAT", 20, 0),                                       # empty text
    ("T...T/...../...../T...T", "GOAT", 20, 0),                # 4 rows
    ("T...T/....../...../...../T...T", "GOAT", 20, 0),         # row 2 has 6 points
    ("T...T/..../...../...../T...T", "GOAT", 20, 0),           # row 2 has 4 points
    ("T...T/..X../...../...../T...T", "GOAT", 20, 0),          # bad character
    ("T...T/...../...../...../T....", "GOAT", 20, 0),          # 3 tigers
    ("T...T/..G../...../...../T...T", "GOAT", 20, 0),          # 21 goats accounted for
    (START, "HORSE", 20, 0),                                   # bad side to move
    (START, "GOAT", -1, 21),                                   # negative goats in hand
    (None, "GOAT", 20, 0),                                     # not a string
]


@pytest.mark.parametrize("text,side,h,k", MALFORMED)
def test_malformed_input_raises_board_format_error(text, side, h, k):
    """Bad input raises BoardFormatError (a ValueError) with a message, never another exception."""
    with pytest.raises(BoardFormatError) as info:
        from_text(text, side, h, k)
    assert isinstance(info.value, ValueError)
    assert str(info.value)


def test_error_message_names_the_row():
    with pytest.raises(BoardFormatError, match="row 2"):
        from_text("T...T/....../...../...../T...T", "GOAT", 20, 0)


def test_error_message_names_the_count():
    with pytest.raises(BoardFormatError, match="tigers"):
        from_text("T...T/...../...../...../T....", "GOAT", 20, 0)


def test_from_position_rejects_bad_position():
    bad = Position(board=("T...T", ".....", ".....", ".....", "....."),
                   to_move="GOAT", goats_in_hand=20, goats_captured=0)
    with pytest.raises(BoardFormatError):
        from_position(bad)


def test_validate_rejects_inconsistent_tigers_field():
    s = initial_state()
    bad = dataclasses.replace(s, tigers=(0, 4, 20, 23))
    with pytest.raises(BoardFormatError):
        validate(bad)


def test_empty_constant_is_zero():
    assert EMPTY == 0 and GOAT == 1 and TIGER == 2
    assert isinstance(initial_state(), State)
