import React, { useState } from "react";
import { MAX_DEPTH, boardText, describeMove, fmt, formatScore, isWinScore, parseMove, plural, sideName } from "../notation.js";
import { ComparePanel } from "./Compare.jsx";
import { DepthPicker, Icon, Segmented } from "./controls.jsx";

/** Where the score sits between the two sides: 0 = goats winning, 1 = tigers winning. */
function balance(score) {
  if (isWinScore(score)) return score > 0 ? 1 : 0;
  return 0.5 + 0.5 * Math.tanh(score / 150);
}

function EvalGauge({ score }) {
  const b = balance(score);
  return (
    <div className="gauge" role="img" aria-label={`Evaluation ${formatScore(score)}, from the tigers' side`}>
      <div className="gauge-track"><div className="gauge-fill" style={{ width: `${b * 100}%` }} /><i style={{ left: `${b * 100}%` }} /></div>
      <div className="gauge-ends"><span>Tigers</span><span>Goats</span></div>
    </div>
  );
}

/** The agent's score after each of its moves, as a line from the first move to the latest. */
function ScoreTrace({ notes, total }) {
  const pts = Object.entries(notes).map(([k, r]) => [Number(k), balance(r.score)]).sort((a, b) => a[0] - b[0]);
  if (pts.length < 2) return null;
  const W = 320;
  const H = 64;
  const x = (k) => 4 + (k / Math.max(1, total - 1)) * (W - 8);
  const y = (b) => H - 6 - b * (H - 12);
  return (
    <figure className="trace">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Evaluation after each of the agent's moves">
        <line x1="0" x2={W} y1={y(0.5)} y2={y(0.5)} className="trace-mid" />
        <polyline className="trace-line" points={pts.map(([k, b]) => `${x(k).toFixed(1)},${y(b).toFixed(1)}`).join(" ")} />
        <circle className="trace-dot" cx={x(pts[pts.length - 1][0])} cy={y(pts[pts.length - 1][1])} r="3.5" />
      </svg>
      <figcaption>The agent's evaluation over the game. Above the line favours the tigers.</figcaption>
    </figure>
  );
}

function Report({ result, title, view, onPreview }) {
  const stepping = view && view.kind === "line";
  return (
    <section className="report" aria-live="polite">
      <h3>{title}</h3>
      <p className="report-move"><span className={`token small ${result.side.toLowerCase()}`} aria-hidden="true" />{sideName(result.side)} {describeMove(result.move)}</p>
      <EvalGauge score={result.score} />
      <dl className="facts">
        <div><dt>Evaluation</dt><dd>{formatScore(result.score)}</dd></div>
        <div><dt>Positions searched</dt><dd>{fmt(result.nodes)}</dd></div>
        <div><dt>Leaves evaluated</dt><dd>{fmt(result.evals)}</dd></div>
        <div><dt>Search time</dt><dd>{fmt(result.time_ms, 1)} ms</dd></div>
        <div><dt>Algorithm</dt><dd className="word">{result.algorithm === "alphabeta" ? "Alpha-beta" : "Minimax"}</dd></div>
        <div><dt>Depth</dt><dd className="word">{plural(result.depth, "ply", "plies")}</dd></div>
        <div className="wide"><dt>Evaluation function</dt><dd className="word">{result.eval === "designed" ? "Designed, six features" : "Baseline, captures only"}</dd></div>
      </dl>
      <h4>Expected line</h4>
      <ol className="pv">
        {result.pv.map((m, k) => (
          <li key={k}>
            <button type="button" className={stepping && view.index === k + 1 ? "on" : ""} onClick={() => onPreview(result, k + 1)}
                    aria-label={`Show the board after expected move ${k + 1}`}>
              <span className={`token small ${parseMove(m).side.toLowerCase()}`} aria-hidden="true" />{describeMove(m)}
            </button>
          </li>
        ))}
      </ol>
      <p className="help">Select a move to see the board as the engine expects it. The score is from the tigers' side: positive favours tigers.</p>
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
      await onLoad({ board, to_move: toMove, captured: captured === "" ? 0 : Number(captured), in_hand: inHand === "" ? null : Number(inHand) });
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <details className="load">
      <summary>Start from a position you type in</summary>
      <form onSubmit={submit}>
        <label>Board, rows top to bottom
          <textarea rows="5" value={board} spellCheck="false" placeholder={"T...T\n.....\n.....\n.....\nT...T"} onChange={(e) => setBoard(e.target.value)} />
        </label>
        <p className="help">T for tiger, G for goat, . for empty. One row per line, or rows joined with /.</p>
        <div className="row3">
          <label>To move
            <select value={toMove} onChange={(e) => setToMove(e.target.value)}><option value="GOAT">Goats</option><option value="TIGER">Tigers</option></select>
          </label>
          <label>Captured
            <input type="number" min="0" max="5" value={captured} onChange={(e) => setCaptured(e.target.value)} />
          </label>
          <label>In hand
            <input type="number" min="0" max="20" value={inHand} placeholder="auto" onChange={(e) => setInHand(e.target.value)} />
          </label>
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button type="submit" className="primary">Load this position</button>
      </form>
    </details>
  );
}

export default function Analysis({ g, onClose, onResults, onCopyFail }) {
  const { config, setConfig, pos, game, view } = g;
  const [copied, setCopied] = useState(false);
  const cli = pos
    ? `python -m baghchal analyse --board "${boardText(pos.board)}" --to-move ${pos.to_move} --in-hand ${pos.in_hand} --captured ${pos.captured} --depth ${config.depth} --algorithm ${config.algorithm} --eval ${config.eval}`
    : "";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cli);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      onCopyFail();
    }
  };
  const canAnalyse = pos && !pos.terminal && !g.thinking && !view;

  return (
    <aside className="analysis" aria-label="Analysis">
      <header className="analysis-head">
        <h2>Analysis</h2>
        <button type="button" className="tool quiet" onClick={onClose} aria-label="Close analysis"><Icon name="close" /></button>
      </header>

      <div className="analysis-body">
        <section>
          <button type="button" className="primary wide" onClick={() => g.search(false)} disabled={!canAnalyse}>
            {g.thinking ? "Searching…" : "Analyse this position"}
          </button>
          <p className="help">Runs the search for the side to move and marks its best move on the board in green, without playing it.</p>
        </section>

        {g.hintSearch && <Report result={g.hintSearch} title="Best move in this position" view={view} onPreview={g.previewLine} />}
        {g.agentSearch && <Report result={g.agentSearch} title="The agent's last move" view={view} onPreview={g.previewLine} />}
        {!g.hintSearch && !g.agentSearch && <p className="empty">No search yet. The agent's numbers appear here after its first move.</p>}
        <ScoreTrace notes={game.notes} total={game.moves.length} />

        <section className="settings">
          <h3>Engine</h3>
          <Segmented label="Algorithm" value={config.algorithm} options={[["alphabeta", "Alpha-beta"], ["minimax", "Minimax"]]}
                     onChange={(v) => setConfig({ ...config, algorithm: v, depth: Math.min(config.depth, MAX_DEPTH[v]) })} />
          <Segmented label="Evaluation" value={config.eval} options={[["designed", "Designed"], ["baseline", "Captures only"]]}
                     onChange={(v) => setConfig({ ...config, eval: v })} />
          <div className="field">
            <span className="field-label" id="depth-label">Search depth</span>
            <DepthPicker value={config.depth} max={MAX_DEPTH[config.algorithm]} onChange={(d) => setConfig({ ...config, depth: d })} />
          </div>
        </section>

        <ComparePanel game={game} pos={view ? null : pos} defaultDepth={config.depth} evaluation={config.eval} onShowResults={onResults} />

        <section className="cli">
          <h3>Check this position in the terminal</h3>
          <code>{cli}</code>
          <button type="button" onClick={copy} disabled={!pos}>{copied ? "Copied" : "Copy command"}</button>
          <p className="help">The terminal starts with an empty repetition history, so a draw by repetition can differ.</p>
        </section>

        <LoadPosition onLoad={g.loadPosition} />
      </div>
    </aside>
  );
}
