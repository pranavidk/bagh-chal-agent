"""Tests for the experiment framework, run against the FakeEngine test double."""
import json
import random

import pytest

from experiments import analysis
from experiments.__main__ import main
from experiments.conformance import check_engine
from experiments.e1 import run_e1, score_mismatches
from experiments.e2 import run_e2
from experiments.generate_positions import generate
from experiments.position import (GOAT, MOVEMENT, PLACEMENT, TIGER, Position, PositionError,
                                  initial_position, load_positions, save_positions)
from tests.fake_engine import FakeEngine


# ---- positions --------------------------------------------------------------

def test_initial_position_is_valid():
    p = initial_position().validate()
    assert p.phase == PLACEMENT and p.to_move == GOAT and p.goats_on_board == 0


@pytest.mark.parametrize("change, message", [
    (dict(board=("T...T", ".....", ".....", ".....", "T....")), "4 tigers"),
    (dict(goats_in_hand=19), "must be 20"),
    (dict(to_move="WOLF"), "TIGER or GOAT"),
    (dict(board=("T...T", "....", ".....", ".....", "T...T")), "5 points"),
    (dict(board=("T...T", "..X..", ".....", ".....", "T...T")), "invalid characters"),
])
def test_validation_catches_errors(change, message):
    from dataclasses import replace
    with pytest.raises(PositionError, match=message):
        replace(initial_position(), **change).validate()


def test_round_trip_and_duplicate_detection(tmp_path):
    a = Position(("T.G.T", ".....", ".....", ".....", "T...T"), TIGER, 19, 0, id="P01")
    b = Position(("T...T", ".G...", ".....", ".....", "T...T"), TIGER, 19, 0, id="P02")
    f = tmp_path / "pos.json"
    save_positions(f, [a, b])
    loaded = load_positions(f)
    assert [p.key() for p in loaded] == [a.key(), b.key()]

    data = json.loads(f.read_text())
    data["positions"][1]["board"] = list(a.board)
    f.write_text(json.dumps(data))
    with pytest.raises(PositionError, match="duplicates"):
        load_positions(f)


def test_phase_in_file_must_match_goats_in_hand(tmp_path):
    f = tmp_path / "pos.json"
    d = initial_position().to_dict()
    d["phase"] = MOVEMENT
    f.write_text(json.dumps({"positions": [d]}))
    with pytest.raises(PositionError, match="phase"):
        load_positions(f)


# ---- analysis maths ---------------------------------------------------------

def test_effective_branching_factor_inverts_a_uniform_tree():
    for b, d in [(15, 2), (15, 4), (3.5, 3), (1.0, 5)]:
        n = sum(b ** i for i in range(d + 1))
        assert analysis.effective_branching_factor(n, d) == pytest.approx(b, rel=1e-6)


def test_wilson_interval_known_value():
    lo, hi = analysis.wilson_interval(30, 50)
    assert lo == pytest.approx(0.4618, abs=1e-3) and hi == pytest.approx(0.7239, abs=1e-3)


# ---- generator --------------------------------------------------------------

def _suite():
    return generate(FakeEngine(), seed=11, per_phase=15, games=40)


def test_generator_is_deterministic_and_balanced():
    s1, meta = _suite()
    s2, _ = _suite()
    assert [p.key() for p in s1] == [p.key() for p in s2]
    assert len(s1) == 30 and len({p.key() for p in s1}) == 30
    assert sum(p.phase == PLACEMENT for p in s1) == 15
    assert sum(p.phase == MOVEMENT for p in s1) == 15
    assert [p.id for p in s1[:2]] == ["P01", "P02"] and s1[15].id == "M01"
    for phase in (PLACEMENT, MOVEMENT):
        goats = sum(p.phase == phase and p.to_move == GOAT for p in s1)
        assert 7 <= goats <= 8
    assert meta["seed"] == 11


# ---- E1 ---------------------------------------------------------------------

def test_e1_rows_and_correctness_check(tmp_path, capsys):
    suite, _ = _suite()
    rows = run_e1(FakeEngine(), suite[:4], depths=[2, 3], out_csv=tmp_path / "e1.csv",
                  repeats=2, log=lambda *_: None)
    assert len(rows) == 4 * 2 * 2
    assert score_mismatches(rows) == []
    summary = analysis.summarise_e1(analysis.read_csv(tmp_path / "e1.csv"))
    ab = [s for s in summary if s["algorithm"] == "alphabeta"]
    assert all(float(s["fraction_of_minimax_nodes"]) < 1 for s in ab)

    run_e1(FakeEngine(bad_ab=True), suite[:2], depths=[2], out_csv=tmp_path / "bad.csv",
           repeats=1, log=lambda *_: None)
    assert "ROOT SCORE MISMATCH" in capsys.readouterr().err


def test_e1_rejects_nondeterministic_node_counts(tmp_path):
    suite, _ = _suite()
    with pytest.raises(RuntimeError, match="not deterministic"):
        run_e1(FakeEngine(nondeterministic=True), suite[:1], depths=[2],
               out_csv=tmp_path / "e1.csv", repeats=2, log=lambda *_: None)


# ---- E2 ---------------------------------------------------------------------

def test_e2_paired_openings_and_summary(tmp_path):
    rows = run_e2(FakeEngine(), games_per_side=6, depth=2, opening_plies=4, seed=5,
                  out_csv=tmp_path / "e2.csv", log=lambda *_: None)
    assert len(rows) == 12
    tiger = [r for r in rows if r["designed_side"] == TIGER]
    goat = [r for r in rows if r["designed_side"] == GOAT]
    assert [r["opening"] for r in tiger] == [r["opening"] for r in goat]   # paired design
    assert len({r["opening"] for r in tiger}) > 1                          # games differ
    summary = analysis.summarise_e2(analysis.read_csv(tmp_path / "e2.csv"))
    assert [s["designed_side"] for s in summary] == [TIGER, GOAT]
    for s in summary:
        assert s["wins"] + s["draws"] + s["losses"] == 6


def test_e2_move_cap_counts_as_draw(tmp_path):
    rows = run_e2(FakeEngine(), games_per_side=2, depth=1, max_plies=3,
                  out_csv=tmp_path / "e2.csv", log=lambda *_: None)
    assert all(r["capped"] and r["result"] == "D" for r in rows)


# ---- conformance ------------------------------------------------------------

def test_check_engine_passes_good_engine():
    assert check_engine(FakeEngine(), log=lambda *_: None)


@pytest.mark.parametrize("flag", ["mutate", "bad_ab", "nondeterministic"])
def test_check_engine_catches_bugs(flag):
    assert not check_engine(FakeEngine(**{flag: True}), log=lambda *_: None)


# ---- CLI end to end ---------------------------------------------------------

def test_cli_end_to_end(tmp_path, capsys):
    eng = "tests.fake_engine:FakeEngine"
    pos, out = str(tmp_path / "positions.json"), str(tmp_path / "results")
    main(["generate", "--engine", eng, "--out", pos, "--games", "40", "--seed", "3"])
    main(["validate", pos])
    main(["e1", "--engine", eng, "--positions", pos, "--depths", "2,3", "--repeats", "1", "--out", out])
    main(["e2", "--engine", eng, "--games", "4", "--depth", "2", "--out", out])
    for name in ["e1_raw.csv", "e1_summary.csv", "e1_nodes_vs_depth.png", "e1_time_vs_depth.png",
                 "e2_raw.csv", "e2_summary.csv", "e2_results.png", "tables.md"]:
        assert (tmp_path / "results" / name).exists(), name
    with pytest.raises(SystemExit):     # the suite is fixed: no silent overwrite
        main(["generate", "--engine", eng, "--out", pos])
