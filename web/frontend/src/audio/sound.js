// Small synthesised sounds (Web Audio). No files, no music, and nothing plays
// until the first click or key press, when the browser allows audio to start.

let ctx = null;
let master = null;
let enabled = true;

try {
  enabled = localStorage.getItem("baghchal.sound") !== "off";
} catch { /* storage blocked */ }

function context() {
  if (!enabled) return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    try {
      ctx = new AC();
    } catch {
      return null;
    }
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx.state === "running" || ctx.state === "suspended" ? ctx : null;
}

/** Call from a user gesture so later sounds (the agent's moves) are allowed to play. */
export function unlockSound() {
  context();
}

export function soundEnabled() {
  return enabled;
}

export function setSoundEnabled(on) {
  enabled = on;
  try { localStorage.setItem("baghchal.sound", on ? "on" : "off"); } catch { /* storage blocked */ }
  if (on) context();
}

function tone(ac, { type = "sine", from, to = from, at = 0, dur, gain }) {
  const t = ac.currentTime + at;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  if (to !== from) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function knock(ac, { at = 0, dur = 0.07, gain = 0.3, freq = 1400, q = 1.2 }) {
  const t = ac.currentTime + at;
  const len = Math.ceil(ac.sampleRate * dur);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  const src = ac.createBufferSource();
  src.buffer = buf;
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = freq;
  f.Q.value = q;
  const g = ac.createGain();
  g.gain.value = gain;
  src.connect(f).connect(g).connect(master);
  src.start(t);
}

const SOUNDS = {
  // a fingertip on a piece
  select: (ac) => { knock(ac, { dur: 0.03, gain: 0.16, freq: 2600, q: 2 }); },
  // stone or bronze set down on wood
  place: (ac) => { knock(ac, { gain: 0.34, freq: 1500 }); tone(ac, { from: 210, to: 120, dur: 0.11, gain: 0.3 }); },
  step: (ac) => { knock(ac, { gain: 0.3, freq: 1100 }); tone(ac, { from: 170, to: 95, dur: 0.12, gain: 0.34 }); },
  capture: (ac) => {
    knock(ac, { gain: 0.42, freq: 800, dur: 0.09 });
    tone(ac, { from: 130, to: 62, dur: 0.22, gain: 0.46 });
    tone(ac, { type: "triangle", from: 1180, at: 0.02, dur: 0.5, gain: 0.05 });
  },
  button: (ac) => { knock(ac, { dur: 0.025, gain: 0.1, freq: 3200, q: 3 }); },
  // a singing-bowl pair for the start, and a longer one for the end
  start: (ac) => {
    tone(ac, { from: 392, dur: 1.3, gain: 0.1 });
    tone(ac, { from: 587.3, at: 0.14, dur: 1.5, gain: 0.08 });
    tone(ac, { from: 1176, at: 0.14, dur: 0.9, gain: 0.02 });
  },
  end: (ac) => {
    tone(ac, { from: 293.7, dur: 2.2, gain: 0.1 });
    tone(ac, { from: 440, at: 0.22, dur: 2.2, gain: 0.08 });
    tone(ac, { from: 587.3, at: 0.44, dur: 2.4, gain: 0.07 });
  },
};

export function play(name) {
  const ac = context();
  if (!ac || !SOUNDS[name]) return;
  try {
    SOUNDS[name](ac);
  } catch { /* a failed sound must never break the game */ }
}
