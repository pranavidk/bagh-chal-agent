import React, { useEffect, useMemo, useRef, useState } from "react";
import { play as playSound, setSoundEnabled, soundEnabled, unlockSound } from "./audio/sound.js";
import { useGame } from "./game/useGame.js";
import { describeMove, parseMove, sideName } from "./notation.js";
import { pieceThumbs } from "./three/thumbs.js";
import Analysis from "./ui/Analysis.jsx";
import Board2D from "./ui/Board2D.jsx";
import Board3D from "./ui/Board3D.jsx";
import { ResultsPage } from "./ui/Compare.jsx";
import { BottomBar, GameOver, Ledger, ReviewBar, TopBar } from "./ui/Hud.jsx";
import Setup from "./ui/Setup.jsx";
import { Tool } from "./ui/controls.jsx";

function useMedia(query) {
  const [on, setOn] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const fn = () => setOn(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, [query]);
  return on;
}

export default function App() {
  const g = useGame();
  const [cameraMode, setCameraMode] = useState("play");
  const [showNumbers, setShowNumbers] = useState(false);
  const [analysis, setAnalysis] = useState(false);
  const [page, setPage] = useState("game");
  const [webgl, setWebgl] = useState(() => !new URLSearchParams(window.location.search).has("flat"));   // ?flat forces the 2D board
  const [sound, setSound] = useState(soundEnabled());
  const [focus, setFocus] = useState(null);
  const [thumbs, setThumbs] = useState(null);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const wide = useMedia("(min-width: 1040px)");

  useEffect(() => {
    const t = setTimeout(() => setThumbs(pieceThumbs()), 60);
    return () => clearTimeout(t);
  }, []);

  // What the board shows: the live game, an earlier move, or a step of the expected line.
  // While the engine is answering, the last position stays up.
  const shown = useMemo(
    () => (g.shownPos ? { pos: g.shownPos, moves: g.shownMoves, start: g.game.start } : null),
    [g.shownPos],
  );
  const kept = useRef(null);
  if (shown) kept.current = shown;
  const board = shown || kept.current;

  // Everything the player can click comes from the engine's legal-move list.
  const ui = useMemo(() => {
    const pos = g.pos;
    const live = g.humanTurn && pos;
    const placing = live && pos.to_move === "GOAT" && pos.in_hand > 0;
    return {
      selected: live ? g.selected : null,
      targets: live && g.selected !== null ? pos.legal.filter((m) => m.from === g.selected).map((m) => ({ to: m.to, over: m.over, kind: m.kind })) : [],
      placeable: placing ? pos.legal.map((m) => m.to) : [],
      movable: live && !placing ? [...new Set(pos.legal.map((m) => m.from))] : [],
      lastMove: g.lastMove,
      hint: g.hintSearch && !g.view ? parseMove(g.hintSearch.move) : null,
    };
  }, [g.pos, g.humanTurn, g.selected, g.lastMove, g.hintSearch, g.view]);

  const over = Boolean(g.pos && g.pos.terminal);
  useEffect(() => { if (over && g.started) playSound("end"); }, [over]);

  // Without the 3D scene there are no landing events, so the flat board clicks on each new move.
  const moveCount = g.game.moves.length;
  useEffect(() => { if (!webgl && moveCount) playSound("step"); }, [moveCount, webgl]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (g.view) g.reviewAt(Infinity);
      else g.setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const click = (fn) => (...args) => { unlockSound(); playSound("button"); return fn(...args); };
  const onPoint = (i) => {
    unlockSound();
    if (g.onPoint(i) === "select") playSound("select");
  };
  const begin = (next) => {
    unlockSound();
    g.begin(next);
    setCameraMode("play");
    window.scrollTo(0, 0);
    playSound("start");
  };
  const toggleSound = () => {
    const on = !sound;
    setSoundEnabled(on);
    setSound(on);
    if (on) playSound("button");
  };

  const status = useMemo(() => {
    const pos = g.pos;
    if (!pos) return ["Waiting for the engine…", ""];
    if (g.view) return [g.view.kind === "line" ? "The line the engine expects. Nothing here has been played." : "Looking back through the game.", "dim"];
    if (pos.terminal) return [pos.result, "over"];
    if (g.auto) return [g.paused ? "Paused." : `${sideName(pos.to_move)} to move. The agent is playing both sides.`, g.paused ? "dim" : ""];
    if (g.thinking && pos.to_move !== g.config.human) return ["The agent is thinking.", "dim"];
    if (pos.to_move !== g.config.human) return ["The agent's turn.", "dim"];
    if (pos.to_move === "GOAT" && pos.in_hand > 0) return ["Your move. Place a goat on any empty point.", ""];
    if (g.selected !== null) return ["Choose where it goes. The marked points are its legal moves.", ""];
    return [pos.to_move === "GOAT" ? "Your move. Pick a goat, then a point beside it." : "Your move. Pick a tiger; jumping a goat captures it.", ""];
  }, [g.pos, g.view, g.auto, g.paused, g.thinking, g.config, g.selected]);

  if (page === "results") return <ResultsPage onBack={() => { setPage("game"); window.scrollTo(0, 0); }} />;

  const playing = g.started;
  const gameOver = playing && over && !g.view && g.settled;
  const insets = !wide ? { top: 4, right: 4, bottom: 4, left: 4 }
    : playing ? { top: 78, right: 356, bottom: gameOver ? 250 : 124, left: analysis ? 452 : 28 }
      : { top: 30, right: 30, bottom: 30, left: 560 };
  const modeLine = g.auto ? `Agent against itself, depth ${g.config.depth}`
    : `You lead the ${g.config.human === "GOAT" ? "goats" : "tigers"}, agent at depth ${g.config.depth}`;
  const hintLine = g.hintSearch && !g.view ? `The search suggests: ${sideName(g.hintSearch.side)} ${describeMove(g.hintSearch.move)}.` : null;

  return (
    <div className={`app ${wide ? "wide" : "narrow"} ${playing ? "playing" : "in-setup"}${analysis && playing ? " with-analysis" : ""}`}>
      <main className="stage">
        {!g.topo ? (
          <div className="stage-note">{g.error || "Setting the board…"}</div>
        ) : webgl ? (
          <Board3D topo={g.topo} shown={board} ui={ui} camera={playing ? cameraMode : "intro"} showNumbers={showNumbers}
                   insets={insets} reduced={reduced} interactive={g.humanTurn} focus={focus} setFocus={setFocus}
                   onPoint={onPoint} onMiss={() => g.setSelected(null)} onSettled={g.setSettled}
                   onEvent={playSound} onFail={() => { setWebgl(false); g.setSettled(true); }} />
        ) : (
          <div className="flat-wrap">
            <Board2D topo={g.topo} shown={board} ui={ui} showNumbers={showNumbers} onPoint={onPoint} />
            <p className="help">This browser can't draw the 3D board, so the game is shown flat. Everything else works the same.</p>
          </div>
        )}
        <div className="vignette" aria-hidden="true" />
      </main>

      {!playing && (
        <Setup config={g.config} thumbs={thumbs} canResume={g.game.moves.length > 0} onBegin={begin}
               onResume={click(() => g.setStarted(true))} onResults={() => setPage("results")} />
      )}

      {playing && (
        <>
          <TopBar modeLine={modeLine} tools={
            <>
              <Tool icon="analysis" label="Analysis" pressed={analysis} onClick={click(() => setAnalysis(!analysis))} />
              {webgl && <Tool icon={cameraMode === "play" ? "top" : "table"} label={cameraMode === "play" ? "Top view" : "Table view"}
                              onClick={click(() => setCameraMode(cameraMode === "play" ? "top" : "play"))} />}
              <Tool icon="numbers" label="Point numbers" pressed={showNumbers} onClick={click(() => setShowNumbers(!showNumbers))} />
              <Tool icon={sound ? "soundOn" : "soundOff"} label="Sound" pressed={sound} onClick={toggleSound} />
              <Tool icon="restart" label="Restart" onClick={click(() => g.reset(g.game.start, g.game.startSide))} disabled={!g.game.moves.length} />
              <button type="button" className="primary" onClick={click(() => g.setStarted(false))}>New game</button>
            </>
          } />

          {analysis && <Analysis g={g} onClose={() => setAnalysis(false)} onResults={() => setPage("results")}
                                 onCopyFail={() => g.setNotice("Copying isn't allowed here; select the command and copy it by hand.")} />}

          <Ledger pos={board ? board.pos : null} config={g.config} auto={g.auto} thinking={g.thinking && !g.hintSearch}
                  moves={g.game.moves} shownMoves={board ? board.moves : []} notes={g.game.notes} viewIndex={g.view && g.view.kind === "review" ? g.view.index : null}
                  onReview={click(g.reviewAt)} />

          {gameOver ? (
            <GameOver pos={g.pos} config={g.config} auto={g.auto} notes={g.game.notes}
                      onAgain={click(() => { g.reset(g.game.start, g.game.startSide); playSound("start"); })}
                      onReview={click(() => g.reviewAt(0))} onSetup={click(() => g.setStarted(false))} />
          ) : (
            <BottomBar status={status[0]} tone={status[1]} notice={g.notice || hintLine} error={g.error}>
              {g.view ? (
                <ReviewBar index={g.view.index} total={g.view.kind === "line" ? g.view.total : g.game.moves.length} kind={g.view.kind}
                           onStep={g.view.kind === "line" ? (n) => g.previewLine(g.view.result, n) : g.reviewAt}
                           onExit={click(() => g.reviewAt(Infinity))} />
              ) : g.auto ? (
                <>
                  <Tool icon={g.paused ? "play" : "pause"} label={g.paused ? "Resume" : "Pause"} onClick={click(() => g.setPaused(!g.paused))} disabled={over} />
                  <Tool icon="prev" label="Step back" onClick={click(() => { g.setPaused(true); g.reviewAt(g.game.moves.length - 1); })} disabled={!g.game.moves.length} />
                </>
              ) : (
                <>
                  <Tool icon="undo" label="Undo" onClick={click(g.undo)} disabled={!g.game.moves.length} />
                  {g.agentStuck
                    ? <Tool icon="play" label="Let the agent move" onClick={click(() => g.search(true))} />
                    : <Tool icon="hint" label="Suggest a move" onClick={click(() => g.search(false))} disabled={!g.humanTurn} />}
                </>
              )}
            </BottomBar>
          )}
        </>
      )}
    </div>
  );
}
