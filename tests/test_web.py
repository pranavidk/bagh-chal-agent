"""Tests for the web UI's API (web/server.py): it must report exactly what the engine computes."""
from __future__ import annotations

import json
import threading
import urllib.error
import urllib.request

import pytest

from baghchal import rules
from baghchal.state import initial_state
from web.server import (ApiError, api_compare, api_results, api_search, api_state, make_server,
                        topology_json)

TIGER_ORDER = {"board": "TG.../GG.../..TG./...../T...T", "to_move": "TIGER", "in_hand": 12, "captured": 4}


def test_topology_is_the_engines():
    """R1: the UI draws the engine's own 56 edges and degrees."""
    t = topology_json()
    assert len(t["edges"]) == 56 and len(t["points"]) == 25
    assert t["points"][12]["degree"] == 8 and t["points"][12]["even"]


def test_start_state_matches_rules():
    """R3: 21 placements, goat to move."""
    s = api_state({"moves": []})
    assert s["to_move"] == "GOAT" and s["in_hand"] == 20 and len(s["legal"]) == 21
    assert s["legal"][0] == {"text": "G@1", "kind": "place", "from": -1, "over": -1, "to": 1}


def test_replay_applies_moves_in_order():
    s = api_state({"moves": ["G@12", "T 0-1", "G@2"]})
    assert s["board"][12] == 1 and s["board"][1] == 2 and s["board"][2] == 1
    assert s["to_move"] == "TIGER" and s["ply"] == 3 and s["in_hand"] == 18


def test_illegal_move_is_rejected_with_its_number():
    with pytest.raises(ApiError, match="Move 2"):
        api_state({"moves": ["G@12", "T 0-12"]})


def test_custom_start_position_and_in_hand_default():
    s = api_state({"start": {"board": TIGER_ORDER["board"], "to_move": "TIGER", "captured": 4}})
    assert s["in_hand"] == 12 and s["captured"] == 4


def test_bad_custom_position_is_an_api_error():
    with pytest.raises(ApiError):
        api_state({"start": {"board": "T...T/..X../...../...../T...T", "to_move": "GOAT"}})


def test_terminal_state_reports_result():
    """R8.1: the capture of the fifth goat ends the game."""
    s = api_state({"start": TIGER_ORDER, "moves": ["T 0x1>2"]})
    assert s["terminal"] and s["winner"] == "TIGER" and s["legal"] == []
    assert s["result"] == "Tigers captured five goats."


def test_threefold_repetition_draw_survives_replay():
    """R8.4: the server replays history, so repetition is detected across requests."""
    start = {"board": "TGGGT/GGGGG/GG.GG/G...G/TGG.T", "to_move": "GOAT", "in_hand": 0, "captured": 4}
    cycle = ["G 22-23", "T 24-18", "G 23-22", "T 18-24"]
    s = api_state({"start": start, "moves": cycle * 2})
    assert s["terminal"] and s["winner"] is None and "repetition" in s["result"]


def test_search_matches_engine():
    """§6.3 through the API: k = 4 and a capture -> T 0x1>2 with score 1,000,000 - 1."""
    r = api_search({"start": TIGER_ORDER, "moves": [], "depth": 3, "algorithm": "minimax"})
    assert r["move"] == "T 0x1>2" and r["score"] == 1_000_000 - 1
    assert r["pv"][0] == r["move"] and r["nodes"] > 0 and r["side"] == "TIGER"


def test_search_move_is_legal_from_start():
    r = api_search({"moves": [], "depth": 2})
    assert r["move"] in {str(m) for m in rules.legal_moves(initial_state())}


@pytest.mark.parametrize("payload,message", [
    ({"moves": [], "depth": 0}, "between 1 and"),
    ({"moves": [], "depth": 6, "algorithm": "minimax"}, "between 1 and 5"),
    ({"moves": [], "algorithm": "negamax"}, "algorithm"),
    ({"moves": [], "eval": "fancy"}, "eval"),
    ({"start": TIGER_ORDER, "moves": ["T 0x1>2"]}, "game is over"),
])
def test_search_rejects_bad_requests(payload, message):
    with pytest.raises(ApiError, match=message):
        api_search(payload)


def test_http_round_trip():
    """The real server: static index, topology, a state request and a 400 with a message."""
    server = make_server(port=0)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = f"http://127.0.0.1:{server.server_address[1]}"
    try:
        with urllib.request.urlopen(base + "/api/topology") as r:
            assert len(json.load(r)["edges"]) == 56

        def post(path, body):
            req = urllib.request.Request(base + path, data=json.dumps(body).encode(),
                                         headers={"Content-Type": "application/json"})
            return urllib.request.urlopen(req)

        with post("/api/state", {"moves": ["G@12"]}) as r:
            assert json.load(r)["to_move"] == "TIGER"
        with pytest.raises(urllib.error.HTTPError) as info:
            post("/api/state", {"moves": ["G@0"]})
        assert info.value.code == 400 and "not legal" in json.load(info.value)["error"]
        with urllib.request.urlopen(base + "/") as r:
            assert b"<div id=\"root\">" in r.read()
    finally:
        server.shutdown()
        server.server_close()


# --- comparison view (E3 in the browser) ------------------------------------------

def test_compare_runs_every_configuration_on_the_current_position():
    """Minimax and alpha-beta in four move orders, all on the replayed position."""
    r = api_compare({"moves": ["G@12"], "depth": 3})
    configs = [row["config"] for row in r["rows"]]
    assert configs == ["minimax", "ab_worst", "ab_natural", "ab_heuristic", "ab_best"]
    assert r["side"] == "TIGER" and r["depth"] == 3 and r["branching"] == 12   # R3: 12 tiger steps
    assert r["same_score"] and len({row["score"] for row in r["rows"]}) == 1


def test_compare_counts_match_the_plain_engine():
    """minimax and R10-order alpha-beta rows report exactly what /api/search reports."""
    r = {row["config"]: row for row in api_compare({"moves": ["G@12"], "depth": 3})["rows"]}
    for algorithm, config in (("minimax", "minimax"), ("alphabeta", "ab_natural")):
        plain = api_search({"moves": ["G@12"], "depth": 3, "algorithm": algorithm})
        assert r[config]["nodes"] == plain["nodes"] and r[config]["score"] == plain["score"]
    assert r["ab_best"]["nodes"] <= r["ab_natural"]["nodes"] <= r["ab_worst"]["nodes"] <= r["minimax"]["nodes"]


def test_compare_depth_one_is_a_tie():
    """Depth 1: nothing can be pruned, so every configuration expands 1 + moves nodes."""
    r = api_compare({"moves": [], "depth": 1})
    assert {row["nodes"] for row in r["rows"]} == {1 + 21}


@pytest.mark.parametrize("payload,message", [
    ({"moves": [], "depth": 0}, "between 1 and 4"),
    ({"moves": [], "depth": 5}, "between 1 and 4"),
    ({"moves": [], "eval": "fancy"}, "eval"),
    ({"start": TIGER_ORDER, "moves": ["T 0x1>2"]}, "game is over"),
])
def test_compare_rejects_bad_requests(payload, message):
    with pytest.raises(ApiError, match=message):
        api_compare(payload)


def test_results_reports_the_committed_experiments():
    """The results view reads results/*.csv: E1 and E3 summaries, uniform trees, chart names."""
    r = api_results()
    e3 = {(row["phase"], row["depth"], row["config"]): row for row in r["e3"]}
    assert e3[("all", 4, "ab_natural")]["nodes_median"] == 1214
    assert e3[("all", 4, "minimax")]["fraction_of_minimax_nodes"] == 1.0
    assert any(row["algorithm"] == "alphabeta" for row in r["e1"])
    tree = {(row["b"], row["d"], row["tree"], row["config"]): row for row in r["trees"]}
    assert tree[(8, 4, "random", "ab_best")]["leaves"] == tree[(8, 4, "random", "ab_best")]["knuth_moore_leaves"] == 127
    assert "e3_ordering_nodes.png" in r["charts"]


def test_http_serves_compare_and_charts_but_not_other_files():
    server = make_server(port=0)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = f"http://127.0.0.1:{server.server_address[1]}"
    try:
        req = urllib.request.Request(base + "/api/compare", data=json.dumps({"moves": [], "depth": 2}).encode(),
                                     headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as r:
            assert len(json.load(r)["rows"]) == 5
        with urllib.request.urlopen(base + "/api/results") as r:
            assert json.load(r)["e3"]
        with urllib.request.urlopen(base + "/results/e3_ordering_nodes.png") as r:
            assert r.headers["Content-Type"] == "image/png" and r.read(4) == b"\x89PNG"
        for bad in ("/results/e3_raw.csv", "/results/../README.md", "/results/%2e%2e/README.md"):
            with pytest.raises(urllib.error.HTTPError) as info:
                urllib.request.urlopen(base + bad)
            assert info.value.code == 404
    finally:
        server.shutdown()
        server.server_close()
