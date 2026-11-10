// Procedural canvas textures: walnut, the engraved brass playing field, felt.
// Nothing is downloaded; every surface is drawn once at start-up.
import * as THREE from "three";

export const TOP = 5.1;        // side of the inlaid top panel, in world units (1 unit = one cell)

export function makeRng(seed) {
  let s = seed >>> 0;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

function canvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

/** Long wavering strokes over a flat base: reads as straight-grained hardwood. */
function paintWood(ctx, w, h, { base, dark, light, seed, strokes = 1500 }) {
  const rnd = makeRng(seed);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  // broad slow bands first, then fine grain
  for (let i = 0; i < 26; i++) {
    const y = rnd() * h;
    const g = ctx.createLinearGradient(0, y - 60, 0, y + 60);
    const tone = rnd() < 0.5 ? dark : light;
    g.addColorStop(0, "transparent");
    g.addColorStop(0.5, tone);
    g.addColorStop(1, "transparent");
    ctx.globalAlpha = 0.1 + rnd() * 0.12;
    ctx.fillStyle = g;
    ctx.fillRect(0, y - 60, w, 120);
  }
  for (let i = 0; i < strokes; i++) {
    const y0 = rnd() * h;
    const amp = 1.5 + rnd() * 9;
    const f = ((0.4 + rnd() * 1.8) * Math.PI * 2) / w;
    const ph = rnd() * 7;
    ctx.globalAlpha = 0.04 + rnd() * 0.13;
    ctx.strokeStyle = rnd() < 0.62 ? dark : light;
    ctx.lineWidth = 0.5 + rnd() * 2.2;
    ctx.beginPath();
    for (let x = -8; x <= w + 8; x += 16) {
      const y = y0 + Math.sin(x * f + ph) * amp + Math.sin(x * f * 3.1 + ph * 2) * amp * 0.25;
      if (x < 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // pores
  ctx.fillStyle = dark;
  for (let i = 0; i < strokes * 2; i++) {
    ctx.globalAlpha = 0.08 + rnd() * 0.18;
    ctx.fillRect(rnd() * w, rnd() * h, 2 + rnd() * 10, 1);
  }
  ctx.globalAlpha = 1;
}

function finish(tex, srgb, aniso) {
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = aniso;
  tex.needsUpdate = true;
  return tex;
}

export function woodTexture({ size = 1024, repeat = 1, aniso = 4, ...opts }) {
  const c = canvas(size, size);
  paintWood(c.getContext("2d"), size, size, opts);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  return finish(tex, true, aniso);
}

export function feltTexture({ size = 512, aniso = 4 }) {
  const c = canvas(size, size);
  const ctx = c.getContext("2d");
  const rnd = makeRng(77);
  ctx.fillStyle = "#293222";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 26000; i++) {
    ctx.globalAlpha = 0.05 + rnd() * 0.1;
    ctx.fillStyle = rnd() < 0.5 ? "#161c10" : "#58663f";
    const a = rnd() * Math.PI;
    const x = rnd() * size;
    const y = rnd() * size;
    ctx.fillRect(x, y, 1 + Math.abs(Math.cos(a)) * 3, 1 + Math.abs(Math.sin(a)) * 3);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 5);
  return finish(tex, true, aniso);
}

/**
 * The playing field. Every line is one of the engine's own R1 edges (GET /api/topology),
 * so the engraving cannot disagree with the rules. Returns a colour map and a matching
 * roughness/metalness map (G = roughness, B = metalness) so the inlay behaves as brass.
 */
export function boardTextures(topology, { size = 2048, showNumbers = false, aniso = 8 } = {}) {
  const px = size / TOP;
  const at = (i) => [((i % 5) - 2 + TOP / 2) * px, (Math.floor(i / 5) - 2 + TOP / 2) * px];

  const color = canvas(size, size);
  const orm = canvas(size, size);
  const c = color.getContext("2d");
  const o = orm.getContext("2d");

  paintWood(c, size, size, { base: "#472a19", dark: "#1c0e07", light: "#7d4f2c", seed: 11, strokes: 2600 });
  // a darker, slightly more polished field inside the border
  const inset = (TOP / 2 - 2.36) * px;
  c.fillStyle = "rgba(12, 6, 3, 0.28)";
  c.fillRect(inset, inset, size - 2 * inset, size - 2 * inset);

  o.fillStyle = "rgb(0,150,0)";                 // bare wood: rough, not metal
  o.fillRect(0, 0, size, size);
  o.fillStyle = "rgb(0,120,0)";
  o.fillRect(inset, inset, size - 2 * inset, size - 2 * inset);

  const BRASS = "#b58d48";
  const METAL = "rgb(0,74,255)";
  const stroke = (ctx, style, width, draw, dx = 0, dy = 0) => {
    ctx.save();
    ctx.translate(dx, dy);
    ctx.strokeStyle = style;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.beginPath();
    draw(ctx);
    ctx.stroke();
    ctx.restore();
  };
  const inlay = (width, draw) => {
    stroke(c, "rgba(10,5,2,0.7)", width * px * 1.55, draw, 1.5, 2.5);     // the cut groove
    stroke(c, BRASS, width * px, draw);
    stroke(c, "rgba(255,236,180,0.4)", width * px * 0.22, draw, -1, -1.5); // a worn highlight
    stroke(o, METAL, width * px, draw);
  };

  // frame
  const edge = 0.05 * px;
  inlay(0.06, (ctx) => ctx.rect(edge, edge, size - 2 * edge, size - 2 * edge));
  inlay(0.018, (ctx) => ctx.rect(inset, inset, size - 2 * inset, size - 2 * inset));

  // the 56 connections
  for (const [a, b] of topology.edges) {
    const [x1, y1] = at(a);
    const [x2, y2] = at(b);
    inlay(0.042, (ctx) => { ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); });
  }

  // the 25 points: a brass stud in a turned recess; the five 8-way hubs get a second ring
  for (const p of topology.points) {
    const [x, y] = at(p.i);
    const r = (p.degree === 8 ? 0.125 : 0.1) * px;
    c.fillStyle = "rgba(8,4,2,0.75)";
    c.beginPath(); c.arc(x + 1.5, y + 2.5, r * 1.16, 0, 7); c.fill();
    const g = c.createRadialGradient(x - r * 0.3, y - r * 0.4, r * 0.1, x, y, r);
    g.addColorStop(0, "#e3c27c");
    g.addColorStop(1, "#a9853f");
    c.fillStyle = g;
    c.beginPath(); c.arc(x, y, r, 0, 7); c.fill();
    c.fillStyle = "rgba(30,16,6,0.85)";
    c.beginPath(); c.arc(x, y, r * 0.3, 0, 7); c.fill();
    o.fillStyle = METAL;
    o.beginPath(); o.arc(x, y, r, 0, 7); o.fill();
    if (p.degree === 8) inlay(0.014, (ctx) => { ctx.moveTo(x + 0.2 * px, y); ctx.arc(x, y, 0.2 * px, 0, 7); });
  }

  if (showNumbers) {
    c.font = `500 ${Math.round(0.15 * px)}px "Alegreya Sans", "Gill Sans", sans-serif`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    for (const p of topology.points) {
      const [x, y] = at(p.i);
      c.fillStyle = "rgba(10,5,2,0.8)";
      // 22 degrees off the horizontal: no line leaves a point at that angle
      c.fillText(String(p.i), x - 0.33 * px + 1.5, y - 0.14 * px + 2);
      c.fillStyle = "#e0c488";
      c.fillText(String(p.i), x - 0.33 * px, y - 0.14 * px);
    }
  }

  return {
    map: finish(new THREE.CanvasTexture(color), true, aniso),
    orm: finish(new THREE.CanvasTexture(orm), false, aniso),
  };
}
