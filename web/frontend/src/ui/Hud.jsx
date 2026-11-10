import React, { useEffect, useRef } from "react";
import { GOAT, describeMove, fmt, formatScore, parseMove, plural, sideName } from "../notation.js";
import { Icon, Pips, Tool } from "./controls.jsx";

export function TopBar({ modeLine, tools }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="deva" lang="ne" aria-hidden="true">बाघ चाल</span>
        <span className="brand-name">Bagh-Chal</span>
        <span className="brand-mode">{modeLine}</span>
      </div>
      <nav className="tools" aria-label="Game controls">{tools}</nav>
    </header>
  );
}

function SideRow({ side, who, active, thinking }) {
  return (
    <li className={`side-row ${side.toLowerCase()}${active ? " active" : ""}`}>
      <span className="token" aria-hidden="true" />
      <span className="side-row-name">{sideName(side)}</span>
      <span className="side-row-who">
        {who}
        {thinking && <span className="thinking" role="status" aria-label="The agent is thinking"><i /><i /><i /></span>}
      </span>
    </li>
  );
}

/** The side panel: whose turn, the counts, the last move and the move list. */
export function Ledger({ pos, config, auto, thinking, moves, shownMoves, notes, viewIndex, onReview }) {
  const list = useRef(null);
  useEffect(() => {
    const el = list.current;
    if (el && viewIndex === null) el.scrollTop = el.scrollHeight;
  }, [moves.length, viewIndex]);
  if (!pos) return <aside className="ledger"><p className="help">Connecting to the engine…</p></aside>;

  const who = (side) => (auto ? "Agent" : side === config.human ? "You" : "Agent");
  const onBoard = pos.board.filter((v) => v === GOAT).length;
  const last = shownMoves.length ? shownMoves[shownMoves.length - 1] : null;
  const lastSide = last ? parseMove(last).side : null;
  const shownCount = viewIndex === null ? moves.length : viewIndex;

  return (
    <aside className="ledger" aria-label="Game status">
      <ul className="sides">
        {["GOAT", "TIGER"].map((side) => (
          <SideRow key={side} side={side} who={who(side)} active={!pos.terminal && pos.to_move === side}
                   thinking={thinking && pos.to_move === side && who(side) === "Agent"} />
        ))}
      </ul>

      <dl className="counts">
        <div><dt>Goats to place</dt><dd>{pos.in_hand}</dd></div>
        <div><dt>Goats on board</dt><dd>{onBoard}</dd></div>
        <div><dt>Tigers</dt><dd>4</dd></div>
        <div className="wide"><dt>Captured</dt><dd><Pips filled={pos.captured} label={`${pos.captured} of 5 goats captured`} /><span className="of">{pos.captured} of 5</span></dd></div>
        <div><dt>Phase</dt><dd className="word">{pos.in_hand > 0 ? "Placement" : "Movement"}</dd></div>
        <div><dt>Move</dt><dd>{pos.ply}</dd></div>
      </dl>

      <p className="last-move">
        {last ? <>Last move: <strong>{sideName(lastSide)}</strong> {lastSide === "GOAT" && parseMove(last).from < 0 ? describeMove(last).replace("places", "placed") : describeMove(last)}</> : `No moves yet. ${sideName(pos.to_move)} move first.`}
      </p>

      <div className="moves" ref={list}>
        <ol>
          {moves.map((m, k) => {
            const side = parseMove(m).side;
            return (
              <li key={k} className={k + 1 === shownCount ? "current" : k + 1 > shownCount ? "future" : ""}>
                <button type="button" onClick={() => onReview(k + 1)} aria-label={`Show the board after move ${k + 1}`}>
                  <span className="n">{k + 1}</span>
                  <span className={`token small ${side.toLowerCase()}`} aria-hidden="true" />
                  <span className="mv">{describeMove(m)}</span>
                  {notes[k] && <span className="sc">{formatScore(notes[k].score)}</span>}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}

/** The strip under the board: what to do now, and the actions that fit the moment. */
export function BottomBar({ status, tone, notice, error, children }) {
  return (
    <footer className="bottombar">
      <div className="status" aria-live="polite">
        <p className={`status-line ${tone || ""}`}>{status}</p>
        {notice && <p className="notice">{notice}</p>}
        {error && <p className="error" role="alert">{error}</p>}
      </div>
      <div className="actions">{children}</div>
    </footer>
  );
}

export function ReviewBar({ index, total, kind, onStep, onExit }) {
  return (
    <div className="review">
      <button type="button" className="tool quiet" onClick={() => onStep(0)} disabled={index <= 0} aria-label="First position"><Icon name="first" /></button>
      <button type="button" className="tool quiet" onClick={() => onStep(index - 1)} disabled={index <= 0} aria-label="Previous move"><Icon name="prev" /></button>
      <input type="range" min="0" max={total} value={index} onChange={(e) => onStep(Number(e.target.value))}
             aria-label={kind === "line" ? "Position in the expected line" : "Position in the game"} />
      <button type="button" className="tool quiet" onClick={() => onStep(index + 1)} disabled={index >= total} aria-label="Next move"><Icon name="next" /></button>
      <span className="review-count">{kind === "line" ? `Expected move ${index} of ${total}` : `Move ${index} of ${total}`}</span>
      <button type="button" className="primary" onClick={onExit}>Back to the game</button>
    </div>
  );
}

export function GameOver({ pos, config, auto, notes, onAgain, onReview, onSetup }) {
  const searches = Object.values(notes);
  const nodes = searches.reduce((a, r) => a + r.nodes, 0);
  const ms = searches.reduce((a, r) => a + r.time_ms, 0);
  const title = pos.winner === null ? "A draw" : `${sideName(pos.winner)} win`;
  const yours = auto ? "" : pos.winner === null ? "Neither side broke through." : pos.winner === config.human ? "The game is yours." : "The agent takes this one.";
  return (
    <section className="gameover" role="dialog" aria-labelledby="over-title">
      <div className="over-head">
        <h2 id="over-title">{title}</h2>
        <p className="over-reason">{pos.result} {yours}</p>
      </div>
      <dl className="over-stats">
        <div><dt>Moves played</dt><dd>{pos.ply}</dd></div>
        <div><dt>Goats captured</dt><dd>{pos.captured}</dd></div>
        <div><dt>Goats left on the board</dt><dd>{pos.board.filter((v) => v === GOAT).length}</dd></div>
        <div><dt>Positions the agent searched</dt><dd>{fmt(nodes)}</dd></div>
        <div><dt>Agent's thinking time</dt><dd>{ms < 1000 ? `${fmt(ms)} ms` : `${fmt(ms / 1000, 1)} s`}</dd></div>
        <div><dt>Search depth</dt><dd>{plural(config.depth, "ply", "plies")}</dd></div>
      </dl>
      <div className="over-actions">
        <button type="button" className="primary big" onClick={onAgain}>Play again</button>
        <button type="button" className="ghost" onClick={onReview}>Review the game</button>
        <button type="button" className="ghost" onClick={onSetup}>Change sides or depth</button>
      </div>
    </section>
  );
}
