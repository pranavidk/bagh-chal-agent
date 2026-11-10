// Reading and formatting what the engine sends. Display only: nothing here decides legality.

export const EMPTY = 0;
export const GOAT = 1;
export const TIGER = 2;
export const WIN = 1000000;
export const MAX_DEPTH = { alphabeta: 6, minimax: 5 };

export const other = (side) => (side === "GOAT" ? "TIGER" : "GOAT");
export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
export const sideName = (side) => (side === "GOAT" ? "Goats" : "Tigers");
export const fmt = (n, digits = 0) => Number(n).toLocaleString("en-US", { maximumFractionDigits: digits });

// "G@12", "G 7-12", "T 0-1", "T 0x6>12" -> {side, from, over, to}
export function parseMove(text) {
  let m = /^G@(\d+)$/.exec(text);
  if (m) return { side: "GOAT", from: -1, over: -1, to: +m[1] };
  m = /^([GT]) (\d+)-(\d+)$/.exec(text);
  if (m) return { side: m[1] === "G" ? "GOAT" : "TIGER", from: +m[2], over: -1, to: +m[3] };
  m = /^T (\d+)x(\d+)>(\d+)$/.exec(text);
  if (m) return { side: "TIGER", from: +m[1], over: +m[2], to: +m[3] };
  return null;
}

/** The engine's move text in words a player reads at a glance. */
export function describeMove(text) {
  const m = parseMove(text);
  if (!m) return text;
  if (m.from < 0) return `places on ${m.to}`;
  if (m.over >= 0) return `${m.from} takes ${m.over}, lands ${m.to}`;
  return `${m.from} to ${m.to}`;
}

export function isWinScore(score) {
  return Math.abs(Number(score)) > WIN / 2;
}

export function formatScore(score) {
  const n = Number(score);
  if (isWinScore(n)) {
    const plies = WIN - Math.abs(n);
    return `${n > 0 ? "Tigers" : "Goats"} win in ${plural(plies, "ply", "plies")}`;
  }
  return (n > 0 ? "+" : "") + fmt(n, 2);
}

export function boardText(board) {
  const ch = board.map((v) => (v === TIGER ? "T" : v === GOAT ? "G" : "."));
  return [0, 1, 2, 3, 4].map((r) => ch.slice(r * 5, r * 5 + 5).join("")).join("/");
}
