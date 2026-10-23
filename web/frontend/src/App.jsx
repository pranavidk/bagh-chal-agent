import React, { useEffect, useMemo, useRef, useState } from "react";
import { ComparePanel, ResultsPage } from "./Compare.jsx";

// Board geometry: points 0-24, index = 5*row + col, drawn on a 600 x 600 slab.
const STEP = 120;
const PAD = 60;
const xy = (i) => [PAD + (i % 5) * STEP, PAD + Math.floor(i / 5) * STEP];

const EMPTY = 0;
const GOAT = 1;
const TIGER = 2;
const WIN = 1000000;
const MAX_DEPTH = { alphabeta: 6, minimax: 5 };

const other = (side) => (side === "GOAT" ? "TIGER" : "GOAT");
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// --- talking to the engine -------------------------------------------------------

async function api(path, body) {
  let res;
  try {
    res = await fetch(path, body === undefined ? {} : {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Can't reach the engine. Start it with: python -m web.server");
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* not JSON */
  }
  if (!res.ok) throw new Error((data && data.error) || `The engine answered ${res.status}.`);
  return data;
}

// "G@12", "G 7-12", "T 0-1", "T 0x6>12" -> {from, over, to}
function parseMove(text) {
  let m = /^G@(\d+)$/.exec(text);
  if (m) return { from: -1, over: -1, to: +m[1] };
  m = /^[GT] (\d+)-(\d+)$/.exec(text);
  if (m) return { from: +m[1], over: -1, to: +m[2] };
  m = /^T (\d+)x(\d+)>(\d+)$/.exec(text);
  if (m) return { from: +m[1], over: +m[2], to: +m[3] };
  return null;
}

function formatScore(score) {
  const n = Number(score);
  const text = n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(n) > WIN / 2) {
    const plies = WIN - Math.abs(n);
    return `${text} (${n > 0 ? "tigers" : "goats"} win in ${plural(plies, "ply", "plies")})`;
  }
  return text;
}

function boardText(board) {
  const ch = board.map((v) => (v === TIGER ? "T" : v === GOAT ? "G" : "."));
  return [0, 1, 2, 3, 4].map((r) => ch.slice(r * 5, r * 5 + 5).join("")).join("/");
}

// --- board ---------------------------------------------------------------------

function Tiger() {
  return (
    <g className="piece tiger">
      <circle r="34" className="tiger-body" />
      {/* Tapered stripes biting in from the rim, like a tiger's coat. */}
      <path className="tiger-stripe"
            d="M-33 -10 L-12 -6 L-32 -1 Z M-30 10 L-14 9 L-27 18 Z M33 -10 L12 -6 L32 -1 Z M30 10 L14 9 L27 18 Z M-8 -33 L0 -18 L8 -33 Z" />
    </g>
  );
}

function Goat({ ghost }) {
  return (
    <g className={`piece goat${ghost ? " ghost" : ""}`}>
      <circle r="29" className="goat-body" />
      <circle r="19" className="goat-ring" />
    </g>
  );
}

function Board({ topo, pos, lastMove, moveCount, selected, hint, humanTurn, showNumbers, onPoint }) {
  const [hover, setHover] = useState(null);
  const legal = pos ? pos.legal : [];
  const placing = humanTurn && pos.to_move === "GOAT" && pos.in_hand > 0;
  const targets = selected === null ? [] : legal.filter((m) => m.from === selected);
  const placeable = new Set(placing ? legal.map((m) => m.to) : []);
  const movable = new Set(humanTurn && !placing ? legal.map((m) => m.from) : []);
  const hintMove = hint ? parseMove(hint.move) : null;

  const label = (i) => {
    const v = pos.board[i];
    const what = v === TIGER ? "tiger" : v === GOAT ? "goat" : "empty";
    return `Point ${i}, ${what}`;
  };

  return (
    <svg className="board" viewBox="0 0 600 600" role="group" aria-label="Bagh-Chal board">
      <rect className="slab" x="6" y="6" width="588" height="588" rx="22" />
      <rect className="slab-inset" x="30" y="30" width="540" height="540" rx="10" />

      {/* Lines come from the engine's own R1 edge list, so the drawing can't disagree with the rules. */}
      <g className="lines">
        {topo.edges.map(([a, b]) => {
          const [x1, y1] = xy(a);
          const [x2, y2] = xy(b);
          return (
            <g key={`${a}-${b}`}>
              <line className="line-light" x1={x1 + 1.5} y1={y1 + 1.5} x2={x2 + 1.5} y2={y2 + 1.5} />
              <line className="line" x1={x1} y1={y1} x2={x2} y2={y2} />
            </g>
          );
        })}
      </g>

      {lastMove && lastMove.from >= 0 && (
        <line className="trail" x1={xy(lastMove.from)[0]} y1={xy(lastMove.from)[1]}
              x2={xy(lastMove.to)[0]} y2={xy(lastMove.to)[1]} />
      )}
      {hintMove && (
        hintMove.from >= 0 ? (
          <line className="hint-line" x1={xy(hintMove.from)[0]} y1={xy(hintMove.from)[1]}
                x2={xy(hintMove.to)[0]} y2={xy(hintMove.to)[1]} />
        ) : null
      )}

      {topo.points.map(({ i }) => {
        const [x, y] = xy(i);
        const v = pos.board[i];
        const isTarget = targets.find((m) => m.to === i);
        const isOverTarget = targets.find((m) => m.over === i);
        const arriving = lastMove && lastMove.to === i;
        const [fx, fy] = arriving && lastMove.from >= 0 ? xy(lastMove.from) : [x, y];
        const interactive = placeable.has(i) || movable.has(i) || Boolean(isTarget);
        return (
          <g key={i} transform={`translate(${x} ${y})`}
             className={`point${interactive ? " interactive" : ""}`}
             role={interactive ? "button" : undefined}
             tabIndex={interactive ? 0 : -1}
             aria-label={label(i)}
             onClick={() => onPoint(i)}
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPoint(i); } }}
             onMouseEnter={() => setHover(i)}
             onMouseLeave={() => setHover((h) => (h === i ? null : h))}>
            <circle className="hit" r="46" />
            <circle className="dot" r={v === EMPTY ? 6 : 0} />
            {lastMove && lastMove.from === i && <circle className="from-mark" r="12" />}
            {hintMove && hintMove.to === i && <circle className="hint-ring" r="40" />}
            {placeable.has(i) && hover !== i && <circle className="place-dot" r="9" />}
            {placeable.has(i) && hover === i && <Goat ghost />}
            {v !== EMPTY && (
              <g key={arriving ? `arrive-${moveCount}` : "still"}
                 className={arriving && lastMove.from >= 0 ? "arrive" : arriving ? "drop" : undefined}
                 style={{ "--dx": `${fx - x}px`, "--dy": `${fy - y}px` }}>
                {v === TIGER ? <Tiger /> : <Goat />}
              </g>
            )}
            {lastMove && lastMove.over === i && v === EMPTY && (
              <g className="taken" aria-hidden="true">
                <circle r="29" />
                <path d="M-11 -11 L11 11 M11 -11 L-11 11" />
              </g>
            )}
            {selected === i && <circle className="selected-ring" r="42" />}
            {isTarget && <circle className={`target${isTarget.kind === "jump" ? " jump" : ""}`} r="15" />}
            {isOverTarget && <circle className="threatened" r="38" />}
            {showNumbers && <text className="index" x="-44" y="-30">{i}</text>}
          </g>
        );
      })}
    </svg>
  );
}

// --- panel pieces ----------------------------------------------------------------

function Segmented({ label, value, options, onChange }) {
  return (
    <div className="field">
      <span className="field-label" id={`lbl-${label}`}>{label}</span>
      <div className="segmented" role="radiogroup" aria-labelledby={`lbl-${label}`}>
        {options.map(([v, text]) => (
          <button key={v} type="button" role="radio" aria-checked={value === v}
                  className={value === v ? "on" : ""} onClick={() => onChange(v)}>{text}</button>
        ))}
      </div>
    </div>
  );
}

function CapturedSlots({ captured }) {
  return (
    <div className="captured" aria-label={`${captured} of 5 goats captured`}>
      {[0, 1, 2, 3, 4].map((k) => (
        <svg key={k} viewBox="-34 -34 68 68" className={`slot${k < captured ? " full" : ""}`} aria-hidden="true">
          <circle r="29" />
        </svg>
      ))}
    </div>
  );
}

function SearchReport({ search, title }) {
  if (!search) return null;
  return (
    <section className="report" aria-live="polite">
      <h2>{title}</h2>
      <p className="report-move">{search.move}</p>
      <dl>
        <dt>Score, from the tigers' side</dt><dd>{formatScore(search.score)}</dd>
        <dt>Positions searched</dt><dd>{search.nodes.toLocaleString("en-US")}</dd>
        <dt>Time</dt><dd>{search.time_ms.toLocaleString("en-US", { maximumFractionDigits: 1 })} ms</dd>
        <dt>Search</dt><dd>{search.algorithm === "alphabeta" ? "Alpha-beta" : "Minimax"}, depth {search.depth}, {search.eval} evaluation</dd>
      </dl>
      <h3>Expected line</h3>
      <ol className="pv">{search.pv.map((m, k) => <li key={k}>{m}</li>)}</ol>
    </section>
  );
}

function LoadPosition({ onLoad }) {
  const [board, setBoard] = useState("");
  const [toMove, setToMove] = useState("GOAT");
  const [captured, setCaptured] = useState("0");
  const [inHand, setInHand] = useState("");
  const [error, setError] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await onLoad({ board, to_move: toMove, captured: captured === "" ? 0 : Number(captured),
                     in_hand: inHand === "" ? null : Number(inHand) });
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <details className="load">
      <summary>Start from a position</summary>
      <form onSubmit={submit}>
        <label>Board, rows top to bottom
          <textarea rows="5" value={board} spellCheck="false" placeholder={"T...T\n.....\n.....\n.....\nT...T"}
                    onChange={(e) => setBoard(e.target.value)} />
        </label>
        <p className="help">T for tiger, G for goat, . for empty. One row per line, or rows joined with /.</p>
        <div className="row3">
          <label>To move
            <select value={toMove} onChange={(e) => setToMove(e.target.value)}>
              <option value="GOAT">Goats</option><option value="TIGER">Tigers</option>
            </select>
          </label>
          <label>Captured
            <input type="number" min="0" max="5" value={captured} onChange={(e) => setCaptured(e.target.value)} />
          </label>
          <label>In hand
            <input type="number" min="0" max="20" value={inHand} placeholder="auto" onChange={(e) => setInHand(e.target.value)} />
          </label>
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button type="submit" className="primary">Load position</button>
      </form>
    </details>
  );
}

// --- app -------------------------------------------------------------------------

export default function App() {
  const [topo, setTopo] = useState(null);
  const [config, setConfig] = useState({ human: "GOAT", depth: 3, algorithm: "alphabeta", eval: "designed" });
  const [game, setGame] = useState({ id: 0, start: null, startSide: "GOAT", moves: [], notes: {} });
  const [pos, setPos] = useState(null);
  const [selected, setSelected] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [lastSearch, setLastSearch] = useState(null);
  const [hint, setHint] = useState(null);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [showNumbers, setShowNumbers] = useState(false);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState("play");

  const gameRef = useRef(game);
  const configRef = useRef(config);
  const searchSeq = useRef(0);
  const aiKey = useRef(null);
  gameRef.current = game;
  configRef.current = config;

  const keyOf = (g) => `${g.id}:${g.moves.length}`;
  const current = pos && pos.key === keyOf(game);
  const humanTurn = Boolean(current && !pos.terminal && pos.to_move === config.human && !thinking);

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

  async function search(forAgent) {
    const g = gameRef.current;
    const c = configRef.current;
    const key = keyOf(g);
    const seq = ++searchSeq.current;
    setThinking(true);
    setError(null);
    try {
      const r = await api("/api/search", { start: g.start, moves: g.moves, depth: c.depth,
                                           algorithm: c.algorithm, eval: c.eval });
      if (keyOf(gameRef.current) !== key) return;     // the game changed while searching
      if (forAgent) {
        setLastSearch(r);
        setHint(null);
        setGame((cur) => ({ ...cur, moves: [...cur.moves, r.move],
                            notes: { ...cur.notes, [cur.moves.length]: r } }));
      } else {
        setHint(r);
      }
    } catch (e) {
      if (keyOf(gameRef.current) === key) setError(e.message);
    } finally {
      if (searchSeq.current === seq) setThinking(false);
    }
  }

  // The agent moves whenever it is its turn on a fresh position.
  useEffect(() => {
    if (!current || pos.terminal || pos.to_move === config.human || thinking) return;
    const key = pos.key;
    if (aiKey.current === key) return;
    aiKey.current = key;
    search(true);
  }, [pos, config.human, thinking]);

  function play(text) {
    setSelected(null);
    setHint(null);
    setNotice(null);
    setGame((g) => ({ ...g, moves: [...g.moves, text] }));
  }

  function onPoint(i) {
    if (!humanTurn) return;
    setNotice(null);
    if (pos.to_move === "GOAT" && pos.in_hand > 0) {
      const m = pos.legal.find((x) => x.kind === "place" && x.to === i);
      if (m) play(m.text);
      return;
    }
    if (selected !== null) {
      const m = pos.legal.find((x) => x.from === selected && x.to === i);
      if (m) return play(m.text);
    }
    const mine = pos.to_move === "GOAT" ? GOAT : TIGER;
    if (pos.board[i] === mine) {
      if (pos.legal.some((x) => x.from === i)) setSelected(i === selected ? null : i);
      else {
        setSelected(null);
        setNotice(`The ${mine === GOAT ? "goat" : "tiger"} on point ${i} has no legal move.`);
      }
    } else {
      setSelected(null);
    }
  }

  function reset(start = null, startSide = "GOAT") {
    searchSeq.current++;
    aiKey.current = null;
    setThinking(false);
    setSelected(null);
    setHint(null);
    setLastSearch(null);
    setError(null);
    setNotice(null);
    setGame((g) => ({ id: g.id + 1, start, startSide, moves: [], notes: {} }));
  }

  function undo() {
    searchSeq.current++;
    aiKey.current = null;
    setThinking(false);
    setSelected(null);
    setHint(null);
    setNotice(null);
    setError(null);
    const g = gameRef.current;
    const moves = [...g.moves];
    const mover = (k) => (k % 2 === 0 ? g.startSide : other(g.startSide));
    while (moves.length && mover(moves.length - 1) !== config.human) moves.pop();  // agent replies
    if (moves.length) moves.pop();                                                // your last move
    const notes = Object.fromEntries(Object.entries(g.notes).filter(([k]) => Number(k) < moves.length));
    const lastAgent = Object.keys(notes).map(Number).sort((a, b) => b - a)[0];
    setLastSearch(lastAgent === undefined ? null : notes[lastAgent]);
    setGame({ ...g, id: g.id + 1, moves, notes });
  }

  const agentStuck = Boolean(current && !pos.terminal && pos.to_move !== config.human && !thinking);

  async function loadPosition(start) {
    const data = await api("/api/state", { start, moves: [] });    // throws with the engine's message
    reset(start, data.to_move);
  }

  const lastMove = game.moves.length && current ? parseMove(game.moves[game.moves.length - 1]) : null;

  const status = useMemo(() => {
    if (!pos) return "Connecting to the engine…";
    if (pos.terminal) {
      const outcome = pos.winner === null ? "It's a draw." : pos.winner === config.human ? "You win." : "The agent wins.";
      return `${pos.result} ${outcome}`;
    }
    if (thinking) return `The agent is thinking at depth ${config.depth}…`;
    if (pos.to_move !== config.human) return "The agent's turn.";
    if (pos.to_move === "GOAT" && pos.in_hand > 0)
      return `Your turn: place a goat. ${plural(pos.in_hand, "goat", "goats")} left to place.`;
    if (selected !== null) return "Choose where it goes.";
    return pos.to_move === "GOAT" ? "Your turn: move a goat." : "Your turn: move a tiger. Jumping over a goat captures it.";
  }, [pos, thinking, config, selected]);

  const cliCommand = pos
    ? `python -m baghchal analyse --board "${boardText(pos.board)}" --to-move ${pos.to_move} ` +
      `--in-hand ${pos.in_hand} --captured ${pos.captured} --depth ${config.depth} ` +
      `--algorithm ${config.algorithm} --eval ${config.eval}`
    : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cliCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setNotice("Copying isn't allowed here; select the command and copy it by hand.");
    }
  };

  const showView = (v) => { setView(v); window.scrollTo(0, 0); };
  if (view === "results") return <ResultsPage onBack={() => showView("play")} />;

  return (
    <div className="app">
      <main className="stage">
        {topo && pos ? (
          <Board topo={topo} pos={pos} lastMove={lastMove} moveCount={game.moves.length}
                 selected={selected} hint={hint} humanTurn={humanTurn} showNumbers={showNumbers}
                 onPoint={onPoint} />
        ) : (
          <div className="board-placeholder">{error || "Loading the board…"}</div>
        )}
      </main>

      <aside className="panel">
        <header>
          <h1>Bagh-Chal</h1>
          <p className="subtitle">Four tigers, twenty goats. Play against the minimax agent.</p>
          <button type="button" className="link" onClick={() => showView("results")}>Minimax vs alpha-beta: results, best and worst case →</button>
        </header>

        <section className="status" aria-live="polite">
          <p className={`status-line${pos && pos.terminal ? " over" : ""}`}>{status}</p>
          {notice && <p className="notice">{notice}</p>}
          {error && <p className="error" role="alert">{error}</p>}
          {pos && (
            <div className="counts">
              <div>
                <span className="count-label">Goats captured</span>
                <CapturedSlots captured={pos.captured} />
              </div>
              <div>
                <span className="count-label">In hand</span>
                <span className="count-value">{pos.in_hand}</span>
              </div>
              <div>
                <span className="count-label">Move</span>
                <span className="count-value">{pos.ply}</span>
              </div>
            </div>
          )}
          <div className="actions">
            <button type="button" className="primary" onClick={() => reset()}>New game</button>
            <button type="button" onClick={undo} disabled={!game.moves.length}>Undo</button>
            {agentStuck && error ? (
              <button type="button" onClick={() => search(true)}>Let the agent move</button>
            ) : (
              <button type="button" onClick={() => search(false)} disabled={!humanTurn}>Suggest a move</button>
            )}
          </div>
        </section>

        <section className="settings">
          <Segmented label="You play" value={config.human}
                     options={[["GOAT", "Goats"], ["TIGER", "Tigers"]]}
                     onChange={(v) => { setSelected(null); setHint(null); setConfig({ ...config, human: v }); }} />
          <Segmented label="Algorithm" value={config.algorithm}
                     options={[["alphabeta", "Alpha-beta"], ["minimax", "Minimax"]]}
                     onChange={(v) => setConfig({ ...config, algorithm: v, depth: Math.min(config.depth, MAX_DEPTH[v]) })} />
          <Segmented label="Evaluation" value={config.eval}
                     options={[["designed", "Designed"], ["baseline", "Captures only"]]}
                     onChange={(v) => setConfig({ ...config, eval: v })} />
          <div className="field">
            <label className="field-label" htmlFor="depth">Search depth</label>
            <div className="depth">
              <input id="depth" type="range" min="1" max={MAX_DEPTH[config.algorithm]} value={config.depth}
                     onChange={(e) => setConfig({ ...config, depth: Number(e.target.value) })} />
              <output htmlFor="depth">{plural(config.depth, "ply", "plies")}</output>
            </div>
          </div>
          <label className="check">
            <input type="checkbox" checked={showNumbers} onChange={(e) => setShowNumbers(e.target.checked)} />
            Show point numbers
          </label>
        </section>

        <SearchReport search={hint} title="Suggested move for you" />
        <SearchReport search={lastSearch} title="The agent's last move" />

        <ComparePanel game={game} pos={current ? pos : null} defaultDepth={config.depth}
                      evaluation={config.eval} onShowResults={() => showView("results")} />

        <section className="log">
          <h2>Moves</h2>
          {game.moves.length === 0 ? (
            <p className="empty">No moves yet. {config.human === "GOAT" ? "Goats move first: place a goat." : "Goats move first; the agent opens."}</p>
          ) : (
            <ol>
              {game.moves.map((m, k) => (
                <li key={k} className={game.notes[k] ? "agent" : "you"}>
                  <span className="who">{game.notes[k] ? "Agent" : "You"}</span>
                  <span className="mv">{m}</span>
                  {game.notes[k] && <span className="sc">{formatScore(game.notes[k].score)}</span>}
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="cli">
          <h2>Check this position in the terminal</h2>
          <code>{cliCommand}</code>
          <button type="button" onClick={copy} disabled={!pos}>{copied ? "Copied" : "Copy command"}</button>
          <p className="help">The terminal starts with an empty repetition history, so a draw by repetition can differ.</p>
        </section>

        <LoadPosition onLoad={loadPosition} />
      </aside>
    </div>
  );
}
