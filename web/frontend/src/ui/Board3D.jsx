import React, { useEffect, useRef, useState } from "react";
import { BoardScene } from "../three/scene.js";
import { parseMove } from "../notation.js";

const WHAT = ["empty", "goat", "tiger"];

/**
 * React wrapper around the 3D scene. It hands the scene the engine's position and the
 * current legal options, and reports clicks back as engine point indices.
 */
export default function Board3D({ topo, shown, ui, camera, showNumbers, insets, reduced, interactive,
                                  onPoint, onMiss, onSettled, onEvent, onFail, focus, setFocus }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const scene = useRef(null);
  const prev = useRef(null);
  const [ready, setReady] = useState(false);
  const cb = useRef({});
  cb.current = { onPoint, onMiss, onSettled, onEvent, onFail };
  const insetsRef = useRef(insets);
  insetsRef.current = insets;

  useEffect(() => {
    let s;
    try {
      s = new BoardScene(canvas.current, topo, {
        onPoint: (i) => cb.current.onPoint(i),
        onMiss: () => cb.current.onMiss(),
        onSettled: (v) => cb.current.onSettled(v),
        onEvent: (name) => cb.current.onEvent(name),
        onLost: () => cb.current.onFail(),
        onReady: () => setReady(true),
      });
    } catch {
      cb.current.onFail();
      return undefined;
    }
    scene.current = s;
    const fit = () => {
      const r = wrap.current.getBoundingClientRect();
      s.resize(Math.round(r.width), Math.round(r.height), insetsRef.current);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap.current);
    s.fit = fit;
    return () => {
      ro.disconnect();
      s.dispose();
      scene.current = null;
      prev.current = null;
    };
  }, [topo]);

  useEffect(() => { if (scene.current) scene.current.fit(); }, [insets.top, insets.right, insets.bottom, insets.left]);
  useEffect(() => { if (scene.current) scene.current.setReducedMotion(reduced); }, [reduced]);
  useEffect(() => { if (scene.current) scene.current.setCamera(camera); }, [camera]);
  useEffect(() => { if (scene.current) scene.current.setShowNumbers(showNumbers); }, [showNumbers]);

  // A position that follows the last one by exactly one move is animated as that move;
  // anything else (undo, new game, review) just glides the pieces to where they belong.
  useEffect(() => {
    if (!scene.current || !shown) return;
    const { pos, moves, start } = shown;
    const p = prev.current;
    const follows = p && p.start === start && moves.length === p.moves.length + 1 && p.moves.every((m, i) => m === moves[i]);
    scene.current.setPosition(
      { board: pos.board, inHand: pos.in_hand, captured: pos.captured },
      { move: follows ? parseMove(moves[moves.length - 1]) : null },
    );
    prev.current = { start, moves };
  }, [shown]);

  useEffect(() => {
    if (scene.current) scene.current.setInteraction({ ...ui, focus });
  }, [ui, focus]);

  const board = shown ? shown.pos.board : null;
  const move = (i, e) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -5, ArrowDown: 5 }[e.key];
    if (!step) return;
    const col = i % 5;
    if ((step === -1 && col === 0) || (step === 1 && col === 4)) return;
    const next = i + step;
    if (next < 0 || next > 24) return;
    e.preventDefault();
    wrap.current.querySelector(`[data-point="${next}"]`).focus();
  };

  return (
    <div className={`board3d${ready ? " ready" : ""}`} ref={wrap}>
      <canvas ref={canvas} aria-hidden="true" />
      {/* The same 25 points for keyboards and screen readers; arrow keys walk the grid. */}
      <div className="point-grid" role="grid" aria-label="Bagh-Chal board, 5 by 5 points">
        {board && [0, 1, 2, 3, 4].map((r) => (
          <div role="row" key={r}>
            {[0, 1, 2, 3, 4].map((c) => {
              const i = r * 5 + c;
              return (
                <button key={i} type="button" role="gridcell" data-point={i} tabIndex={i === (focus ?? 12) ? 0 : -1}
                        aria-label={`Point ${i}, ${WHAT[board[i]]}${ui.selected === i ? ", selected" : ""}${ui.targets.some((t) => t.to === i) ? ", legal destination" : ""}`}
                        disabled={!interactive}
                        onFocus={() => setFocus(i)} onBlur={() => setFocus(null)}
                        onKeyDown={(e) => move(i, e)} onClick={() => onPoint(i)} />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
