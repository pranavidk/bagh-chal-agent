import React, { useState } from "react";
import { DepthPicker } from "./controls.jsx";

const SIDES = [
  { key: "GOAT", mode: "human", art: "goat", name: "Lead the goats",
    text: "Twenty goats, placed one at a time. Crowd the board until no tiger can move. You open." },
  { key: "TIGER", mode: "human", art: "tiger", name: "Hunt as the tigers",
    text: "Four tigers from the corners. Jump a goat to take it; five captures win the game." },
  { key: "WATCH", mode: "auto", art: "both", name: "Watch the agent play itself",
    text: "The search plays both sides at the depth you choose. Pause or step back at any time." },
];

const DEPTH_NOTE = [
  "", "Looks one move ahead. Quick, and easy to trap.", "Looks two moves ahead. Answers instantly.",
  "Looks three moves ahead. A fair opponent.", "Looks four moves ahead. About a second a move.",
  "Looks five moves ahead. Several seconds a move.", "Looks six moves ahead. Slow and stubborn.",
];

export default function Setup({ config, thumbs, canResume, onBegin, onResume, onResults }) {
  const [choice, setChoice] = useState(config.mode === "auto" ? "WATCH" : config.human);
  const [depth, setDepth] = useState(Math.min(config.depth, 6));
  const side = SIDES.find((s) => s.key === choice);

  return (
    <section className="setup" aria-labelledby="setup-title">
      <header className="setup-head">
        <p className="deva" lang="ne" aria-hidden="true">बाघ चाल</p>
        <h1 id="setup-title">Bagh-Chal</h1>
        <p className="lede">The tiger game of Nepal: four tigers hunt, twenty goats close ranks. You play against a minimax search with alpha-beta pruning.</p>
      </header>

      <div className="side-list" role="radiogroup" aria-label="Choose how to play">
        {SIDES.map((s) => (
          <button key={s.key} type="button" role="radio" aria-checked={choice === s.key}
                  className={`side${choice === s.key ? " on" : ""}`} onClick={() => setChoice(s.key)}>
            <span className={`side-art ${s.art}`} aria-hidden="true">
              {thumbs && s.art !== "both" && <img src={thumbs[s.art]} alt="" />}
              {thumbs && s.art === "both" && <><img src={thumbs.tiger} alt="" /><img src={thumbs.goat} alt="" /></>}
            </span>
            <span className="side-copy">
              <span className="side-name">{s.name}</span>
              <span className="side-text">{s.text}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="setup-depth">
        <span className="field-label" id="setup-depth-label">How far the agent looks ahead</span>
        <DepthPicker id="setup-depth" value={depth} max={6} onChange={setDepth} />
        <p className="help">{DEPTH_NOTE[depth]}</p>
      </div>

      <div className="setup-actions">
        <button type="button" className="primary big"
                onClick={() => onBegin({ mode: side.mode, human: side.mode === "auto" ? config.human : side.key, depth, algorithm: "alphabeta" })}>
          {side.mode === "auto" ? "Start the game" : "Begin the game"}
        </button>
        {canResume && <button type="button" className="ghost" onClick={onResume}>Back to the game in progress</button>}
        <button type="button" className="text-link" onClick={onResults}>Experiment results</button>
      </div>
    </section>
  );
}
