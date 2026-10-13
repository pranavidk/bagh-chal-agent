"""Tests for the demo CLI, python -m baghchal (PRD §6.6)."""
from __future__ import annotations

import io

import pytest

from baghchal.__main__ import main
from baghchal.notation import IllegalMoveError, parse_move
from baghchal.state import from_text, initial_state

START = "T...T/...../...../...../T...T"
TIGER_ORDER = "TG.../GG.../..TG./...../T...T"
MOVEMENT = "TGGGT/GGGGG/GG.GG/G...G/TGG.T"
TRAPPED = "TTGG./TTGG./GGG../GG.G./....."


def run(capsys, *argv):
    code = main(list(argv))
    out, err = capsys.readouterr()
    return code, out, err


# --- rules -------------------------------------------------------------------

def test_rules_prints_indices_and_degrees(capsys):
    """§6.6 rules: board with point indices and each point's degree (R1)."""
    code, out, _ = run(capsys, "rules")
    assert code == 0
    assert "24" in out and "56 edges" in out and "80 jump" in out
    assert "8" in out


# --- analyse -----------------------------------------------------------------

def test_analyse_start_position(capsys):
    """§6.6 analyse: board, side, move, score, nodes, time and a numbered PV."""
    code, out, _ = run(capsys, "analyse", "--board", START, "--to-move", "GOAT",
                       "--in-hand", "20", "--captured", "0", "--depth", "2")
    assert code == 0
    for label in ("Side to move", "Move", "Score", "Nodes expanded", "Time", "Principal variation"):
        assert label in out
    assert "  1. G@" in out and "  2. T " in out


def test_analyse_mid_game_tiger_takes_fifth_goat(capsys):
    """§6.6 analyse on a typed mid-game position: tiger with k = 4 wins by T 0x1>2 (R9, R11)."""
    code, out, _ = run(capsys, "analyse", "--board", TIGER_ORDER, "--to-move", "TIGER",
                       "--in-hand", "12", "--captured", "4", "--depth", "3")
    assert code == 0
    assert "T 0x1>2" in out and "999,999" in out


def test_analyse_movement_phase_from_file(capsys, tmp_path):
    """§6.6 analyse --file: five-row text file, movement phase, minimax."""
    f = tmp_path / "pos.txt"
    f.write_text(MOVEMENT.replace("/", "\n") + "\n")
    code, out, _ = run(capsys, "analyse", "--file", str(f), "--to-move", "GOAT",
                       "--captured", "4", "--depth", "2", "--algorithm", "minimax")
    assert code == 0
    assert "Move" in out and "G " in out


def test_analyse_terminal_position_reports_result(capsys):
    """R8: a finished position reports the result instead of searching."""
    code, out, _ = run(capsys, "analyse", "--board", TRAPPED, "--to-move", "TIGER",
                       "--in-hand", "10", "--captured", "0")
    assert code == 0
    assert "Game over" in out and "goats win" in out


MALFORMED = [
    ["analyse", "--board", "T...T/..X../...../...../T...T", "--to-move", "GOAT"],      # bad char
    ["analyse", "--board", "T...T/..../...../...../T...T", "--to-move", "GOAT"],       # short row
    ["analyse", "--board", "T...T/...../...../...../T....", "--to-move", "GOAT"],      # 3 tigers
    ["analyse", "--board", START, "--to-move", "HORSE"],                                # bad side
    ["analyse", "--board", START, "--to-move", "GOAT", "--in-hand", "abc"],             # not a number
    ["analyse", "--board", START, "--to-move", "GOAT", "--depth", "0"],                 # bad depth
    ["analyse", "--to-move", "GOAT"],                                                   # no board
    ["analyse", "--file", "/no/such/file.txt", "--to-move", "GOAT"],                    # missing file
    ["analyse", "--board", START, "--to-move", "GOAT", "--in-hand", "19"],              # count mismatch
]


@pytest.mark.parametrize("argv", MALFORMED)
def test_malformed_input_gives_one_line_error(capsys, argv):
    """§6.6: bad input prints a one-line error and exits 1, never a traceback."""
    code, out, err = run(capsys, *argv)
    assert code == 1
    lines = [line for line in err.splitlines() if line.strip()]
    assert len(lines) == 1 and lines[0].startswith("error:")
    assert "Traceback" not in out + err


def test_in_hand_defaults_from_board_and_captured(capsys):
    """--in-hand may be omitted: it is 20 - goats on board - captured."""
    code, out, _ = run(capsys, "analyse", "--board", TRAPPED, "--to-move", "TIGER")
    assert code == 0 and "Goats in hand : 10" in out


# --- play --------------------------------------------------------------------

def test_play_rejects_illegal_moves_with_reasons(capsys, monkeypatch):
    """§6.6 play: illegal input is rejected with a reason; quitting exits cleanly."""
    monkeypatch.setattr("sys.stdin", io.StringIO("0\n7-12\nhello\n25\nquit\n"))
    code = main(["play", "--human", "GOAT", "--depth", "1"])
    out, _ = capsys.readouterr()
    assert code == 0
    assert "Point 0 is occupied" in out
    assert "still in hand" in out
    assert "Could not read 'hello'" in out
    assert "off the board" in out


# --- move notation -----------------------------------------------------------

def test_parse_move_accepts_all_notations():
    s = initial_state()
    assert str(parse_move(s, "12")) == "G@12"
    assert str(parse_move(s, "G@12")) == "G@12"
    t = from_text(TIGER_ORDER, "TIGER", 16, 0)
    assert str(parse_move(t, "0-2")) == "T 0x1>2"
    assert str(parse_move(t, "T 0x1>2")) == "T 0x1>2"
    assert str(parse_move(t, "12 7")) == "T 12-7"
    m = from_text(MOVEMENT, "GOAT", 0, 4)
    assert str(parse_move(m, "G 22-23")) == "G 22-23"


@pytest.mark.parametrize("state_args,text,reason", [
    ((START, "TIGER", 20, 0), "12", "Tigers can't place"),
    ((MOVEMENT, "GOAT", 0, 4), "12", "All goats are placed"),
    ((MOVEMENT, "GOAT", 0, 4), "21-23", "Goats only step"),
    ((MOVEMENT, "GOAT", 0, 4), "12-17", "Point 12 has no goat"),
    ((TIGER_ORDER, "TIGER", 16, 0), "20-22", "only jump over a goat"),
    ((TIGER_ORDER, "TIGER", 16, 0), "12-3", "not one step or one jump"),
    ((TIGER_ORDER, "TIGER", 16, 0), "0-1", "Point 1 is occupied"),
])
def test_parse_move_reasons(state_args, text, reason):
    """R5–R7: each kind of illegal move gets a specific reason."""
    with pytest.raises(IllegalMoveError, match=reason):
        parse_move(from_text(*state_args), text)
