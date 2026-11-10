// Front-end game state. The browser keeps only the start position and the list of moves;
// the Python engine replays them and answers with the position, the legal moves and the
// result. Nothing here knows the rules: a click becomes a move only if the engine listed it.
import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../api.js";
import { GOAT, TIGER, other, parseMove } from "../notation.js";

const keyOf = (g) => `${g.id}:${g.moves.length}`;
const NEW_GAME = { id: 0, start: null, startSide: "GOAT", moves: [], notes: {} };

export function useGame() {
  const [topo, setTopo] = useState(null);
  const [config, setConfig] = useState({ mode: "human", human: "GOAT", depth: 3, algorithm: "alphabeta", eval: "designed" });
  const [started, setStarted] = useState(false);
  const [game, setGame] = useState(NEW_GAME);
  const [pos, setPos] = useState(null);
  const [selected, setSelected] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [lastSearch, setLastSearch] = useState(null);
  const [hint, setHint] = useState(null);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [paused, setPaused] = useState(false);
  const [settled, setSettled] = useState(true);       // the board has finished animating
  const [view, setView] = useState(null);             // {kind: "review"|"line", moves, index} or null for the live game
  const [viewPos, setViewPos] = useState(null);

  const gameRef = useRef(game);
  const configRef = useRef(config);
  const searchSeq = useRef(0);
  const viewSeq = useRef(0);
  const aiKey = useRef(null);
  gameRef.current = game;
  configRef.current = config;

  const auto = config.mode === "auto";
  const current = Boolean(pos && pos.key === keyOf(game));
  const agentToMove = current && !pos.terminal && (auto || pos.to_move !== config.human);
  const humanTurn = Boolean(started && current && !pos.terminal && !auto && pos.to_move === config.human && !thinking && !view);

  useEffect(() => {
    api("/api/topology").then(setTopo).catch((e) => setError(e.message));
  }, []);

  // Every change to the move list is replayed by the engine, which returns the new position.
  useEffect(() => {
    const key = keyOf(game);
    api("/api/state", { start: game.start, moves: game.moves })
      .then((data) => { if (keyOf(gameRef.current) === key) setPos({ ...data, key }); })
      .catch((e) => setError(e.message));
  }, [game]);

  // Looking at an earlier move or at the engine's expected line: the engine replays that too.
  useEffect(() => {
    if (!view) { setViewPos(null); return undefined; }
    let live = true;
    api("/api/state", { start: gameRef.current.start, moves: view.moves })
      .then((data) => { if (live) setViewPos({ ...data, key: `view:${view.id}` }); })
      .catch((e) => { if (live) { setError(e.message); setView(null); } });
    return () => { live = false; };
  }, [view]);

  async function search(forAgent) {
    const g = gameRef.current;
    const c = configRef.current;
    const key = keyOf(g);
    const seq = ++searchSeq.current;
    setThinking(true);
    setError(null);
    try {
      const r = await api("/api/search", { start: g.start, moves: g.moves, depth: c.depth, algorithm: c.algorithm, eval: c.eval });
      if (keyOf(gameRef.current) !== key) return;     // the game changed while searching
      if (forAgent) {
        setLastSearch(r);
        setHint(null);
        setGame((cur) => ({ ...cur, moves: [...cur.moves, r.move], notes: { ...cur.notes, [cur.moves.length]: r } }));
      } else {
        setHint(r);
      }
    } catch (e) {
      if (keyOf(gameRef.current) === key) setError(e.message);
    } finally {
      if (searchSeq.current === seq) setThinking(false);
    }
  }

  // The agent moves whenever it is its turn on a fresh position. When it plays both
  // sides it waits for the pieces to land, so the board never falls behind the game.
  useEffect(() => {
    if (!started || !agentToMove || thinking) return;
    if (auto && (paused || !settled || view)) return;
    if (aiKey.current === pos.key) return;
    aiKey.current = pos.key;
    search(true);
  }, [pos, started, config.human, config.mode, thinking, paused, settled, view]);

  function clearTurn() {
    setSelected(null);
    setHint(null);
    setNotice(null);
  }

  function play(text) {
    clearTurn();
    setGame((g) => ({ ...g, moves: [...g.moves, text] }));
  }

  /** A click on point i. Returns "select", "move" or null so the caller can play a sound. */
  function onPoint(i) {
    if (!humanTurn) return null;
    setNotice(null);
    if (pos.to_move === "GOAT" && pos.in_hand > 0) {
      const m = pos.legal.find((x) => x.kind === "place" && x.to === i);
      if (m) { play(m.text); return "move"; }
      setNotice(pos.board[i] ? `Point ${i} is taken. Place the goat on an empty point.` : null);
      return null;
    }
    if (selected !== null) {
      const m = pos.legal.find((x) => x.from === selected && x.to === i);
      if (m) { play(m.text); return "move"; }
    }
    const mine = pos.to_move === "GOAT" ? GOAT : TIGER;
    if (pos.board[i] === mine) {
      if (pos.legal.some((x) => x.from === i)) {
        setSelected(i === selected ? null : i);
        return "select";
      }
      setSelected(null);
      setNotice(`The ${mine === GOAT ? "goat" : "tiger"} on point ${i} has no legal move.`);
      return null;
    }
    if (selected !== null) setNotice("That piece can't go there. The marked points are its legal moves.");
    setSelected(null);
    return null;
  }

  function stopSearch() {
    searchSeq.current++;
    aiKey.current = null;
    setThinking(false);
  }

  function reset(start = null, startSide = "GOAT") {
    stopSearch();
    clearTurn();
    setLastSearch(null);
    setError(null);
    setView(null);
    setPaused(false);
    setGame((g) => ({ id: g.id + 1, start, startSide, moves: [], notes: {} }));
  }

  /** Begin a game from the setup screen. */
  function begin(next) {
    setConfig((c) => ({ ...c, ...next }));
    reset();
    setStarted(true);
  }

  function undo() {
    stopSearch();
    clearTurn();
    setError(null);
    setView(null);
    const g = gameRef.current;
    const moves = [...g.moves];
    const mover = (k) => (k % 2 === 0 ? g.startSide : other(g.startSide));
    while (moves.length && mover(moves.length - 1) !== configRef.current.human) moves.pop();   // the agent's replies
    if (moves.length) moves.pop();                                                             // your last move
    const notes = Object.fromEntries(Object.entries(g.notes).filter(([k]) => Number(k) < moves.length));
    const lastAgent = Object.keys(notes).map(Number).sort((a, b) => b - a)[0];
    setLastSearch(lastAgent === undefined ? null : notes[lastAgent]);
    setGame({ ...g, id: g.id + 1, moves, notes });
  }

  async function loadPosition(start) {
    const data = await api("/api/state", { start, moves: [] });    // throws with the engine's message
    reset(start, data.to_move);
    setStarted(true);
  }

  /** Look at the game after `count` moves; the full count returns to the live board. */
  function reviewAt(count) {
    const g = gameRef.current;
    const n = Math.max(0, Math.min(g.moves.length, count));
    setSelected(null);
    if (n === g.moves.length) setView(null);
    else setView({ id: ++viewSeq.current, kind: "review", moves: g.moves.slice(0, n), index: n });
  }

  /** Step through a search's expected line, `count` moves in, from the position it was searched on. */
  function previewLine(result, count) {
    if (!result || !count) { setView(null); return; }
    const g = gameRef.current;
    const base = g.moves.slice(0, result.at);
    setSelected(null);
    setView({ id: ++viewSeq.current, kind: "line", moves: [...base, ...result.pv.slice(0, count)], index: count, total: result.pv.length, result });
  }

  // Remember which position each search was run on, so its line can be replayed later.
  const stamp = (r, at) => (r ? { ...r, at } : null);
  const agentSearch = useMemo(() => {
    if (!lastSearch) return null;
    const at = Object.entries(game.notes).find(([, v]) => v === lastSearch);
    return stamp(lastSearch, at ? Number(at[0]) : Math.max(0, game.moves.length - 1));
  }, [lastSearch, game]);
  const hintSearch = useMemo(() => stamp(hint, game.moves.length), [hint, game.moves.length]);

  const shownPos = view ? (viewPos && viewPos.key === `view:${view.id}` ? viewPos : null) : current ? pos : null;
  const shownMoves = view ? view.moves : game.moves;
  const lastMove = shownPos && shownMoves.length ? parseMove(shownMoves[shownMoves.length - 1]) : null;

  return {
    topo, config, setConfig, started, setStarted, game, pos: current ? pos : null, selected, setSelected,
    thinking, agentSearch, hintSearch, error, notice, setNotice, paused, setPaused, settled, setSettled,
    view, shownPos, shownMoves, lastMove, humanTurn, auto,
    agentStuck: Boolean(started && agentToMove && !thinking && error),
    onPoint, play, search, reset, begin, undo, loadPosition, reviewAt, previewLine,
    clearHint: () => setHint(null),
  };
}
