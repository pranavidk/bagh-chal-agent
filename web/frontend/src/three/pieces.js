// Procedural figurines. Each is a handful of primitives merged into one geometry, so
// all four tigers share one buffer and all twenty goats share another. Models face +z.
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const DARK = 0.06;

/** Bake a per-vertex shade (number, [r,g,b] or fn(x,y,z)) into a colour attribute. */
function tint(geo, shade) {
  const pos = geo.attributes.position;
  const col = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    let s = typeof shade === "function" ? shade(pos.getX(i), pos.getY(i), pos.getZ(i)) : shade;
    if (typeof s === "number") s = [s, s, s];
    col.set(s, i * 3);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return geo;
}

function part(geo, { p = [0, 0, 0], r = [0, 0, 0], s = [1, 1, 1] } = {}, shade = 1) {
  const m = new THREE.Matrix4().compose(
    new THREE.Vector3(...p),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(...r)),
    new THREE.Vector3(...s),
  );
  geo.applyMatrix4(m);
  return tint(geo, shade);
}

const ball = (w = 28, h = 18) => new THREE.SphereGeometry(1, w, h);
const both = (fn) => [fn(1), fn(-1)];

/** A turned base with a soft bevel, so pieces sit on the board instead of floating. */
function plinth(R, h) {
  const pts = [
    [0, 0], [R * 0.95, 0], [R, 0.012], [R, h * 0.5], [R * 0.955, h * 0.62],
    [R * 0.93, h * 0.8], [R * 0.86, h], [0, h],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(pts, 48);
}

function merge(parts) {
  const geo = mergeGeometries(parts, false);
  parts.forEach((g) => g.dispose());
  geo.computeBoundingSphere();
  return geo;
}

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** A seated guardian tiger in dark bronze; the stripes are a near-black patina. */
export function tigerGeometry() {
  const stripes = (x, y, z) => 1 - 0.9 * smooth(0.38, 0.7, Math.sin(y * 84 + z * 26 + Math.sin(x * 34) * 1.3));
  const ringed = (x, y, z) => 1 - 0.9 * smooth(0.3, 0.7, Math.sin(Math.atan2(z, x) * 15));
  const face = (x, y, z) => (z > 0.15 ? 1 : stripes(x, y * 1.25, z));
  return merge([
    part(plinth(0.285, 0.075), {}, 0.42),
    part(ball(44, 36), { p: [0, 0.215, -0.07], s: [0.185, 0.155, 0.2] }, stripes),                  // haunches
    part(ball(44, 44), { p: [0, 0.35, 0.04], r: [0.22, 0, 0], s: [0.142, 0.215, 0.14] }, stripes),  // chest
    ...both((k) => part(ball(28, 28), { p: [0.145 * k, 0.175, -0.01], s: [0.075, 0.105, 0.13] }, stripes)),
    ...both((k) => part(new THREE.CapsuleGeometry(0.046, 0.2, 8, 16, 24), { p: [0.078 * k, 0.205, 0.135], r: [-0.1, 0, 0] }, stripes)),
    ...both((k) => part(ball(16, 10), { p: [0.078 * k, 0.1, 0.185], s: [0.058, 0.034, 0.078] })),   // paws
    part(ball(36, 28), { p: [0, 0.485, 0.075], s: [0.118, 0.095, 0.11] }, stripes),                 // neck
    part(ball(36, 30), { p: [0, 0.59, 0.1], s: [0.112, 0.096, 0.106] }, face),                      // skull
    ...both((k) => part(ball(16, 10), { p: [0.088 * k, 0.556, 0.095], r: [0, 0, 0.5 * k], s: [0.05, 0.064, 0.05] }, face)), // ruff
    part(ball(18, 12), { p: [0, 0.558, 0.178], s: [0.064, 0.044, 0.052] }),                   // muzzle
    part(ball(10, 8), { p: [0, 0.574, 0.229], s: [0.022, 0.014, 0.012] }, DARK),
    ...both((k) => part(new THREE.SphereGeometry(0.04, 14, 10), { p: [0.08 * k, 0.682, 0.075], r: [-0.15, 0, -0.35 * k], s: [0.9, 1.15, 0.45] })), // ears
    ...both((k) => part(ball(10, 8), { p: [0.046 * k, 0.612, 0.192], r: [0, 0, 0.4 * k], s: [0.019, 0.009, 0.008] }, DARK)),
    part(new THREE.TorusGeometry(0.215, 0.028, 12, 90, 3.3), { p: [0, 0.103, -0.02], r: [Math.PI / 2, 0, 2.25] }, ringed),
    part(ball(12, 8), { p: [0.215 * Math.cos(5.55), 0.103, -0.02 + 0.215 * Math.sin(5.55)], s: [0.032, 0.032, 0.032] }, 0.2),
  ]);
}

/** A resting goat in pale stone, with darker horn. */
export function goatGeometry() {
  const HORN = [0.5, 0.39, 0.27];
  return merge([
    part(plinth(0.19, 0.05), {}, 0.84),
    part(ball(), { p: [0, 0.14, -0.022], s: [0.102, 0.088, 0.152] }),                        // body
    part(new THREE.CapsuleGeometry(0.046, 0.1, 6, 14), { p: [0, 0.222, 0.086], r: [0.5, 0, 0] }), // neck
    part(ball(22, 14), { p: [0, 0.308, 0.14], r: [0.35, 0, 0], s: [0.053, 0.056, 0.08] }),   // head
    part(ball(14, 10), { p: [0, 0.288, 0.2], s: [0.035, 0.032, 0.04] }),
    ...both((k) => part(ball(12, 8), { p: [0.076 * k, 0.312, 0.112], r: [0, 0, -0.5 * k], s: [0.046, 0.014, 0.023] })),
    ...both((k) => part(new THREE.TorusGeometry(0.062, 0.0135, 8, 22, 2.3), { p: [0.03 * k, 0.33, 0.085], r: [0, Math.PI / 2 - 0.3 * k, 0.25] }, HORN)),
    part(new THREE.ConeGeometry(0.016, 0.052, 10), { p: [0, 0.246, 0.203], r: [Math.PI, 0, 0] }),
    part(ball(10, 8), { p: [0, 0.2, -0.165], s: [0.02, 0.03, 0.02] }),
    ...both((k) => part(new THREE.CapsuleGeometry(0.022, 0.07, 4, 10), { p: [0.056 * k, 0.074, 0.112], r: [Math.PI / 2, 0, 0] })),
    ...both((k) => part(ball(8, 6), { p: [0.041 * k, 0.322, 0.184], s: [0.0075, 0.0075, 0.006] }, DARK)),
  ]);
}

export function pieceMaterials() {
  return {
    tiger: new THREE.MeshStandardMaterial({
      color: 0xc58d4c, metalness: 1, roughness: 0.36, vertexColors: true, envMapIntensity: 1.15,
    }),
    goat: new THREE.MeshPhysicalMaterial({
      color: 0xf0e7d3, metalness: 0, roughness: 0.46, clearcoat: 0.35, clearcoatRoughness: 0.55,
      vertexColors: true, envMapIntensity: 0.55,
    }),
  };
}
