import React, { useState } from "react";
import { EMPTY, TIGER } from "../notation.js";

// The flat board: used when WebGL is not available. Same data, same clicks, no 3D.
const STEP = 120;
const PAD = 60;
const xy = (i) => [PAD + (i % 5) * STEP, PAD + Math.floor(i / 5) * STEP];

function Tiger() {
  return (
    <g className="piece tiger">
      <circle r="34" className="tiger-body" />
      <path className="tiger-stripe"
            d="M-33 -10 L-12 -6 L-32 -1 Z M-30 10 L-14 9 L-27 18 Z M33 -10 L12 -6 L32 -1 Z M30 10 L14 9 L27 18 Z M-8 -33 L0 -18 L8 -33 Z" />
    </g>
  );
}

function Goat({ ghost }) {
  return (
    <g className={`piece goat${ghost ? " ghost" : ""}`}>
      <circle r="27" className="goat-body" />
      <circle r="17" className="goat-ring" />
    </g>
  );
}

export default function Board2D({ topo, shown, ui, showNumbers, onPoint }) {
  const [hover, setHover] = useState(null);
  if (!shown) return null;
  const { pos } = shown;
  const placeable = new Set(ui.placeable);
  const movable = new Set(ui.movable);
  const { lastMove, hint, selected, targets } = ui;
  const what = (i) => (pos.board[i] === TIGER ? "tiger" : pos.board[i] === EMPTY ? "empty" : "goat");

  return (
    <svg className="board2d" viewBox="0 0 600 600" role="group" aria-label="Bagh-Chal board">
      <rect className="slab" x="6" y="6" width="588" height="588" rx="18" />
      <rect className="slab-inset" x="26" y="26" width="548" height="548" rx="8" />
      <g>
        {topo.edges.map(([a, b]) => {
          const [x1, y1] = xy(a);
          const [x2, y2] = xy(b);
          return <line key={`${a}-${b}`} className="line" x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      {lastMove && lastMove.from >= 0 && (
        <line className="trail" x1={xy(lastMove.from)[0]} y1={xy(lastMove.from)[1]} x2={xy(lastMove.to)[0]} y2={xy(lastMove.to)[1]} />
      )}
      {hint && hint.from >= 0 && (
        <line className="hint-line" x1={xy(hint.from)[0]} y1={xy(hint.from)[1]} x2={xy(hint.to)[0]} y2={xy(hint.to)[1]} />
      )}
      {topo.points.map(({ i }) => {
        const [x, y] = xy(i);
        const v = pos.board[i];
        const target = targets.find((m) => m.to === i);
        const threatened = targets.some((m) => m.over === i);
        const active = placeable.has(i) || movable.has(i) || Boolean(target);
        return (
          <g key={i} transform={`translate(${x} ${y})`} className={`point${active ? " interactive" : ""}`}
             role={active ? "button" : undefined} tabIndex={active ? 0 : -1} aria-label={`Point ${i}, ${what(i)}`}
             onClick={() => onPoint(i)}
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPoint(i); } }}
             onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover((h) => (h === i ? null : h))}>
            <circle className="hit" r="48" />
            <circle className="dot" r={v === EMPTY ? 7 : 0} />
            {hint && hint.to === i && <circle className="hint-ring" r="40" />}
            {placeable.has(i) && hover === i && <Goat ghost />}
            {v !== EMPTY && (v === TIGER ? <Tiger /> : <Goat />)}
            {lastMove && lastMove.to === i && <circle className="last-ring" r="40" />}
            {selected === i && <circle className="selected-ring" r="42" />}
            {target && <circle className="target" r="15" />}
            {threatened && <circle className="threatened" r="36" />}
            {showNumbers && <text className="index" x="-44" y="-30">{i}</text>}
          </g>
        );
      })}
    </svg>
  );
}
