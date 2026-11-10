import React, { useEffect, useState } from "react";

// Minimax vs alpha-beta in the browser: a live comparison on the position on the
// board (POST /api/compare, experiment E3 on one position), and the committed
// E1/E3 results (GET /api/results, /results/*.png). The engine does all the work;
// this file only lays out what it reports.

const WIN = 1000000;
const MAX_COMPARE_DEPTH = 4;

export const CONFIGS = [
  { key: "minimax", name: "Minimax", note: "visits every position; move order makes no difference", color: "#8f877a" },
  { key: "ab_worst", name: "Alpha-beta, worst order", note: "worst move tried first at every turn: the worst case", color: "#c4573a" },
  { key: "ab_natural", name: "Alpha-beta, rule order", note: "how the agent actually plays (moves by point number)", color: "#c7a25b" },
  { key: "ab_heuristic", name: "Alpha-beta, heuristic order", note: "best-looking move first, by the evaluation", color: "#9db97a" },
  { key: "ab_best", name: "Alpha-beta, best order", note: "best move tried first at every turn: the best case", color: "#f0e7d3" },
];
const BY_KEY = Object.fromEntries(CONFIGS.map((c) => [c.key, c]));

const fmt = (n, digits = 0) => Number(n).toLocaleString("en-US", { maximumFractionDigits: digits });
const pct = (part, whole) => {
  const p = (100 * part) / whole;
  return p >= 10 ? `${fmt(p, 0)}%` : `${fmt(p, 1)}%`;
};
const times = (a, b) => (b > 0 ? `${fmt(a / b, a / b >= 10 ? 0 : 1)}×` : "–");

function scoreText(score) {
  const n = Number(score);
  if (Math.abs(n) > WIN / 2) {
    const plies = WIN - Math.abs(n);
    return `${fmt(n)} (${n > 0 ? "tigers" : "goats"} win in ${plies} ${plies === 1 ? "ply" : "plies"})`;
  }
  return fmt(n, 2);
}

// --- live comparison on the current position ------------------------------------------

function Bars({ rows }) {
  const mm = rows.find((r) => r.config === "minimax");
  return (
    <ul className="bars" aria-label="Positions searched by each configuration">
      {rows.map((r) => {
        const c = BY_KEY[r.config];
        const share = r.nodes / mm.nodes;
        return (
          <li key={r.config} title={`${c.name}: ${fmt(r.nodes)} positions, ${fmt(r.time_ms, 1)} ms. ${c.note}.`}>
            <div className="bar-head">
              <span className="bar-name"><i style={{ background: c.color }} aria-hidden="true" />{c.name}</span>
              <span className="bar-num">{fmt(r.nodes)}{r.config !== "minimax" && <em> {pct(r.nodes, mm.nodes)}</em>}</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${Math.max(share * 100, 0.6)}%`, background: c.color }} />
            </div>
            <div className="bar-foot">
              <span>{c.note}</span>
              <span>{r.oracle ? <span className="muted-time">{fmt(r.time_ms, 1)} ms incl. oracle</span> : `${fmt(r.time_ms, 1)} ms`}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function verdict(r) {
  const row = Object.fromEntries(r.rows.map((x) => [x.config, x]));
  const mm = row.minimax, worst = row.ab_worst, rule = row.ab_natural, heur = row.ab_heuristic, best = row.ab_best;
  const lines = [];
  lines.push(r.same_score
    ? ["Same answer", `All five searches give this position the same score, ${scoreText(mm.score)}. Alpha-beta never changes the result, only the work.`]
    : ["Scores differ", "The searches disagree on the score. That should never happen; please report this position."]);
  if (r.depth === 1) {
    lines.push(["Depth 1: a tie", `With one level there is nothing to prune: every search looks at all ${r.branching} moves (${mm.nodes} positions). Try depth 2 or more.`]);
    return { winner: "A tie at depth 1", lines };
  }
  lines.push(["Worst case", `With the worst move first, alpha-beta still searched ${pct(worst.nodes, mm.nodes)} of minimax's positions (${fmt(worst.nodes)} of ${fmt(mm.nodes)}). It can't prune when each new move is better than the last, so it is no better than minimax: O(b^d).`]);
  lines.push(["Best case", `With the best move first, only ${pct(best.nodes, mm.nodes)} (${fmt(best.nodes)}). The effective branching factor fell from ${fmt(mm.ebf, 1)} to ${fmt(best.ebf, 1)}; the theoretical best is about √b ≈ ${fmt(Math.sqrt(mm.ebf), 1)}, i.e. O(b^(d/2)).`]);
  lines.push(["What the agent does", `In rule order (how the agent plays) alpha-beta searched ${pct(rule.nodes, mm.nodes)} and ran ${times(mm.time_ms, rule.time_ms)} faster than minimax. A cheap heuristic order gets ${pct(heur.nodes, mm.nodes)}.`]);
  lines.push(["When minimax is better", "Only if you need the exact score of every move (alpha-beta gives bounds for the moves it prunes), or the simplest code. It never searches fewer positions."]);
  return { winner: `Alpha-beta wins here: ${times(mm.nodes, rule.nodes)} fewer positions in rule order, up to ${times(mm.nodes, best.nodes)} with the best order, same answer.`, lines };
}

export function ComparePanel({ game, pos, defaultDepth, evaluation, onShowResults }) {
  const [depth, setDepth] = useState(Math.min(defaultDepth, 3));
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const key = `${game.id}:${game.moves.length}`;

  useEffect(() => { setResult(null); setError(null); }, [key]);   // a new position needs a new run

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/compare", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: game.start, moves: game.moves, depth, eval: evaluation }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `The engine answered ${res.status}.`);
      setResult({ ...data, key });
    } catch (e) {
      setError(e.message === "Failed to fetch" ? "Can't reach the engine. Start it with: python -m web.server" : e.message);
    } finally {
      setBusy(false);
    }
  };

  const shown = result && result.key === key ? result : null;
  const v = shown && verdict(shown);
  return (
    <section className="compare">
      <h3>Minimax vs alpha-beta on this position</h3>
      <p className="help">Runs minimax and alpha-beta with four move orders on the board as it is now, and counts the positions each one searches.</p>
      <div className="compare-controls">
        <label htmlFor="cmp-depth" className="field-label">Depth</label>
        <select id="cmp-depth" value={depth} onChange={(e) => setDepth(Number(e.target.value))}>
          {[1, 2, 3, 4].map((d) => <option key={d} value={d}>{d} {d === 1 ? "ply" : "plies"}</option>)}
        </select>
        <button type="button" className="primary" onClick={run} disabled={busy || !pos || pos.terminal}>
          {busy ? "Comparing…" : "Compare"}
        </button>
      </div>
      {pos && pos.terminal && <p className="help">The game is over; start a new game or undo to compare.</p>}
      {busy && depth === MAX_COMPARE_DEPTH && <p className="help">Depth 4 takes about a second: minimax and the worst order search tens of thousands of positions.</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {shown && (
        <div aria-live="polite">
          <p className="compare-meta">{shown.side === "GOAT" ? "Goats" : "Tigers"} to move, {shown.branching} legal moves, depth {shown.depth}, {shown.eval} evaluation</p>
          <Bars rows={shown.rows} />
          <p className="winner">{v.winner}</p>
          <dl className="verdict">
            {v.lines.map(([h, t]) => (<React.Fragment key={h}><dt>{h}</dt><dd>{t}</dd></React.Fragment>))}
          </dl>
          <p className="help">The best and worst orders are measuring tools: they first find each move's true value with a separate search that isn't counted, so only their position counts mean anything.</p>
        </div>
      )}
      <button type="button" className="text-link" onClick={onShowResults}>See the full experiment results (30 positions)</button>
    </section>
  );
}

// --- committed experiment results ----------------------------------------------------

function Chart({ name, alt, caption }) {
  return (
    <figure className="chart">
      <img src={`/results/${name}`} alt={alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function E1Table({ e1 }) {
  const get = (phase, depth, algo) => e1.find((r) => r.phase === phase && r.depth === depth && r.algorithm === algo);
  const rows = [];
  for (const phase of ["placement", "movement", "all"])
    for (const depth of [2, 3, 4]) {
      const mm = get(phase, depth, "minimax"), ab = get(phase, depth, "alphabeta");
      if (mm && ab) rows.push({ phase, depth, mm, ab });
    }
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Phase</th><th>Depth</th><th>Minimax positions</th><th>Alpha-beta positions</th><th>Alpha-beta share</th><th>Minimax ms</th><th>Alpha-beta ms</th></tr></thead>
        <tbody>
          {rows.map(({ phase, depth, mm, ab }) => (
            <tr key={`${phase}${depth}`}>
              <td>{phase[0].toUpperCase() + phase.slice(1)}</td><td>{depth}</td>
              <td>{fmt(mm.nodes_median)}</td><td>{fmt(ab.nodes_median)}</td>
              <td>{fmt(ab.fraction_of_minimax_nodes * 100, 1)}%</td>
              <td>{fmt(mm.time_ms_median, 1)}</td><td>{fmt(ab.time_ms_median, 1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function E3Table({ e3, depth }) {
  const get = (phase, config) => e3.find((r) => r.phase === phase && r.depth === depth && r.config === config);
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Phase</th>{CONFIGS.map((c) => <th key={c.key}>{c.name}</th>)}</tr></thead>
        <tbody>
          {["placement", "movement", "all"].map((phase) => (
            <tr key={phase}>
              <td>{phase[0].toUpperCase() + phase.slice(1)}</td>
              {CONFIGS.map((c) => {
                const r = get(phase, c.key);
                return <td key={c.key}>{r ? <>{fmt(r.nodes_median)}{c.key !== "minimax" && <em> ({fmt(r.fraction_of_minimax_nodes * 100, 1)}%)</em>}</> : "–"}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TreeTable({ trees, b }) {
  const ds = [...new Set(trees.filter((r) => r.b === b).map((r) => r.d))].filter((d) => d >= 2).sort((x, y) => x - y);
  const cell = (d, tree, config, col = "leaves") => {
    const r = trees.find((x) => x.b === b && x.d === d && x.tree === tree && x.config === config);
    return r ? fmt(r[col]) : "–";
  };
  const rows = [
    ["Minimax = b^d (also alpha-beta's worst case)", (d) => cell(d, "random", "minimax", "minimax_leaves")],
    ["Alpha-beta, measured, tree built for the worst case", (d) => cell(d, "worst_case", "ab_natural")],
    ["Alpha-beta, measured, random tree, fixed order", (d) => cell(d, "random", "ab_natural")],
    ["Alpha-beta, measured, best order", (d) => cell(d, "random", "ab_best")],
    ["Formula b^⌈d/2⌉ + b^⌊d/2⌋ − 1 (best case)", (d) => cell(d, "random", "minimax", "knuth_moore_leaves")],
  ];
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Leaves evaluated, b = {b}</th>{ds.map((d) => <th key={d}>d = {d}</th>)}</tr></thead>
        <tbody>{rows.map(([label, f]) => <tr key={label}><td>{label}</td>{ds.map((d) => <td key={d}>{f(d)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const WHEN = [
  ["Deep search", "Alpha-beta, by more each ply", "A cutoff removes a whole subtree, and deeper trees have bigger subtrees. Rule order: 54% → 35% → 14% of minimax's positions from depth 2 to 4."],
  ["Many moves per position (placement)", "Alpha-beta, by most", "Each cutoff skips all the remaining sibling moves, so more siblings means more saved: 8.4% in placement vs 18.6% in movement at depth 4."],
  ["Good move order", "Alpha-beta, dramatically", "Best move first gives the best case, about b^(d/2): 2.5% of minimax's positions at depth 4. A cheap heuristic order gets 4.8%."],
  ["Worst move order", "A tie", "Every move is better than the last, so the bounds never tighten in time: alpha-beta does minimax's work (exactly b^d on the worst-case tree)."],
  ["Depth 1", "A tie", "There is only one level; every move has to be looked at."],
  ["Exact score of every move needed", "Minimax", "Alpha-beta only proves that pruned moves are worse; minimax scores each one exactly."],
  ["Simplest code, debugging, teaching", "Minimax", "No alpha/beta bookkeeping. We use it as the reference that alpha-beta is tested against."],
];

export function ResultsPage({ onBack }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("/api/results").then((r) => r.json()).then(setData)
      .catch(() => setError("Can't reach the engine. Start it with: python -m web.server"));
  }, []);
  const has = (name) => data && data.charts.includes(name);

  return (
    <div className="results">
      <header className="results-head">
        <button type="button" className="text-link" onClick={onBack}>Back to the board</button>
        <h1>Minimax vs alpha-beta</h1>
        <p className="subtitle">The comparison, alpha-beta's best and worst case, and which algorithm wins when. Numbers are medians over the 30 fixed test positions (15 placement, 15 movement) with the designed evaluation; rebuild them with <code>python -m experiments e1</code> and <code>python -m e3</code>.</p>
      </header>
      {error && <p className="error" role="alert">{error}</p>}
      {!data && !error && <p className="help">Loading the results…</p>}

      {data && (
        <>
          <section>
            <h2>1. The comparison (E1)</h2>
            <p>Both algorithms return the <strong>same score on all 90 position/depth pairs</strong>. Alpha-beta gets there by skipping moves that can't change the decision, so it searches far fewer positions, and the saving grows with depth.</p>
            {has("e1_nodes_vs_depth.png") && <Chart name="e1_nodes_vs_depth.png" alt="Nodes expanded against depth for minimax and alpha-beta, placement and movement phases" caption="Positions searched per move against depth, log scale. The slope is the effective branching factor; alpha-beta's is lower." />}
            <E1Table e1={data.e1} />
            {has("e1_time_vs_depth.png") && <Chart name="e1_time_vs_depth.png" alt="Time per move against depth for minimax and alpha-beta" caption="Time per move follows the position count: at depth 4 alpha-beta takes about 16% of minimax's time." />}
          </section>

          <section>
            <h2>2. Best case and worst case (E3)</h2>
            <div className="cards">
              <div className="card"><h3>Minimax</h3><p>Always visits every position: <strong>O(b^d)</strong>. Move order makes no difference, so it has no best or worst case.</p></div>
              <div className="card worst"><h3>Alpha-beta, worst case</h3><p>The worst move is tried first at every turn. Each new move is better than the last, so nothing can be cut: <strong>O(b^d)</strong>, the same as minimax.</p></div>
              <div className="card best"><h3>Alpha-beta, best case</h3><p>The best move is tried first. One reply refutes each alternative: exactly <strong>b^⌈d/2⌉ + b^⌊d/2⌋ − 1</strong> leaves, O(b^(d/2)), so it can search twice as deep for the same work.</p></div>
            </div>
            <p>We measured both by changing only the order in which moves are tried (<code>baghchal/ordering.py</code>); the search code is the agent's own. Best and worst order use an oracle that knows each move's true value, so they show the limits rather than a faster agent.</p>
            {has("e3_ordering_nodes.png") && <Chart name="e3_ordering_nodes.png" alt="Median nodes against depth for minimax and alpha-beta in worst, rule and best order" caption="Same positions, same code, only the move order changes. Worst order sits on top of minimax; best order is the floor." />}
            {has("e3_ratio_d4.png") && <Chart name="e3_ratio_d4.png" alt="Alpha-beta nodes as a percentage of minimax at depth 4 for each ordering" caption="Depth 4: how much of minimax's tree alpha-beta searches under each order." />}
            <E3Table e3={data.e3} depth={4} />
            <p className="help">Median positions searched at depth 4; in brackets, the median share of minimax's positions.</p>
            {has("e3_trees.png") && <Chart name="e3_trees.png" alt="Measured leaf counts on uniform trees against the b^d and Knuth-Moore formulas" caption="On uniform trees the textbook formulas hold exactly: measured points land on the lines." />}
            <TreeTable trees={data.trees} b={8} />
          </section>

          <section>
            <h2>3. Which algorithm does better, and why</h2>
            <p><strong>Alpha-beta never searches more positions than minimax and always gives the same answer.</strong> How much better it does depends on the situation:</p>
            <div className="table-wrap">
              <table className="when">
                <thead><tr><th>Situation</th><th>Better</th><th>Why</th></tr></thead>
                <tbody>{WHEN.map(([s, w, y]) => <tr key={s}><td>{s}</td><td><strong>{w}</strong></td><td>{y}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>4. How AI is used here (and why there's no ML)</h2>
            <p>The agent is classical AI: a rational agent that decides by <strong>adversarial search</strong> (minimax and alpha-beta, depth-limited) and scores the positions where the search stops with a <strong>hand-designed evaluation</strong> of six features (captures, tiger mobility and threats; trapped tigers, connected goats, goats on hub points). Nothing is learned: there is no training data and the weights were chosen by reasoning, so the agent plays the same way every time. ML could later tune the weights by self-play or replace the evaluation with a learned one, with the same search. Claude Code was used as a tool to write the code and report; that is declared in the report (§8). More: <code>docs/ai_ml_usage.md</code>.</p>
          </section>
        </>
      )}
    </div>
  );
}
