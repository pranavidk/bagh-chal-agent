"""Tests for the web UI's API (web/server.py): it must report exactly what the engine computes."""
from __future__ import annotations

import json
import threading
import urllib.error
import urllib.request

import pytest

from baghchal import rules
from baghchal.state import initial_state
from web.server import ApiError, api_search, api_state, make_server, topology_json

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
