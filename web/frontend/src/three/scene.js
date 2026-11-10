// The 3D table: board, pieces, markers, lighting, picking and move animation.
//
// This layer draws what it is told. It never decides whether a move is legal and
// it is not the game state: setPosition() receives the engine's position and the
// scene reconciles its pieces to it, so the two can never drift apart.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { CameraRig } from "./rig.js";
import { goatGeometry, pieceMaterials, tigerGeometry } from "./pieces.js";
import { TOP, boardTextures, feltTexture, woodTexture } from "./textures.js";

const GOAT = 1;
const TIGER = 2;
const SLAB = 5.46;            // side of the wooden slab
const THICK = 0.3;            // slab thickness before the bevel
const BEVEL = 0.05;
const FOOT = 0.07;
const TABLE_Y = -(THICK + 2 * BEVEL + FOOT);
const MARK_Y = 0.007;
const AMBER = 0xe8a94c;
const IVORY = 0xf0e7d3;
const RUST = 0xc4573a;

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const pointXZ = (i) => [(i % 5) - 2, Math.floor(i / 5) - 2];

function roundedRect(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function flatRing(inner, outer, segments = 48) {
  const g = new THREE.RingGeometry(inner, outer, segments);
  g.rotateX(-Math.PI / 2);
  return g;
}

function blobTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, "rgba(0,0,0,0.85)");
  g.addColorStop(0.55, "rgba(0,0,0,0.35)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export class BoardScene {
  /**
   * @param canvas   the <canvas> to draw on
   * @param topology the engine's GET /api/topology answer (points and R1 edges)
   * @param handlers onPoint(i), onMiss(), onSettled(bool), onEvent(name), onLost()
   */
  constructor(canvas, topology, handlers = {}) {
    this.canvas = canvas;
    this.topology = topology;
    this.on = handlers;
    this.reduced = false;
    this.disposed = false;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    this.renderer = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    const scene = new THREE.Scene();
    this.scene = scene;
    scene.background = new THREE.Color(0x0b0908);
    scene.fog = new THREE.Fog(0x0b0908, 13, 30);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    this.env = pmrem.fromScene(room, 0.04).texture;
    scene.environment = this.env;
    scene.environmentIntensity = 0.42;
    room.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    pmrem.dispose();

    this.camera = new THREE.PerspectiveCamera(32, 1, 0.5, 80);
    this.rig = new CameraRig(this.camera);
    this.rig.drift = 0.16;

    this.buildLights();
    this.buildTable();
    this.buildBoard(false);
    this.buildPieces();
    this.buildMarkers();

    this.ui = { selected: null, targets: [], placeable: new Set(), movable: new Set(), lastMove: null, hint: null, focus: null };
    this.board = new Array(25).fill(0);
    this.queue = [];
    this.busyUntil = 0;
    this.settled = true;
    this.first = true;
    this.hover = null;
    this.portrait = false;
    this.raycaster = new THREE.Raycaster();
    this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.pointers = new Map();
    this.drag = null;
    this.orbitEnabled = false;
    this.last = performance.now();
    this.dirty = true;

    this.bind();
    this.frame = this.frame.bind(this);
    this.raf = requestAnimationFrame(this.frame);
  }

  // ---- construction -------------------------------------------------------------

  buildLights() {
    // One warm lamp above and to the left throws the pool of light and the only shadows.
    const key = new THREE.SpotLight(0xffd7a3, 520, 30, 0.5, 0.85, 1.6);
    key.position.set(-5.2, 9.5, 4.2);
    key.target.position.set(0.2, 0, 0);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 4;
    key.shadow.camera.far = 22;
    key.shadow.bias = -0.00025;
    key.shadow.normalBias = 0.02;
    key.shadow.radius = 5;
    this.scene.add(key, key.target);
    this.scene.add(new THREE.HemisphereLight(0x8f99ad, 0x2b1b10, 0.5));
    const rim = new THREE.DirectionalLight(0x9db4d8, 0.55);     // cool window light from behind
    rim.position.set(5, 4, -7);
    this.scene.add(rim);
  }

  buildTable() {
    const tableTex = woodTexture({ base: "#1a110c", dark: "#070403", light: "#332116", seed: 5, repeat: 7, aniso: this.aniso });
    const table = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 70).rotateX(-Math.PI / 2),
      new THREE.MeshStandardMaterial({ map: tableTex, roughness: 0.62, metalness: 0, envMapIntensity: 0.5 }),
    );
    table.position.y = TABLE_Y;
    table.receiveShadow = true;
    this.scene.add(table);

    const felt = new THREE.Mesh(
      new THREE.ShapeGeometry(roundedRect(9.5, 6.5, 0.18), 6).rotateX(-Math.PI / 2),
      new THREE.MeshStandardMaterial({ map: feltTexture({ aniso: this.aniso }), roughness: 1, metalness: 0, envMapIntensity: 0.1 }),
    );
    felt.position.y = TABLE_Y + 0.006;
    felt.receiveShadow = true;
    this.felt = felt;
    this.scene.add(felt);
  }

  buildBoard(showNumbers) {
    if (this.boardGroup) {
      // only the engraved top changes when the point numbers are toggled
      const old = this.topMesh.material;
      const tex = boardTextures(this.topology, { showNumbers, aniso: this.aniso });
      old.map.dispose();
      old.roughnessMap.dispose();
      old.map = tex.map;
      old.roughnessMap = old.metalnessMap = tex.orm;
      old.needsUpdate = true;
      this.dirty = true;
      return;
    }
    const group = new THREE.Group();
    const sideTex = woodTexture({ base: "#352014", dark: "#150b06", light: "#644025", seed: 23, repeat: 0.35, aniso: this.aniso });
    const wood = new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.5, metalness: 0, envMapIntensity: 0.7 });
    const slabGeo = new THREE.ExtrudeGeometry(roundedRect(SLAB - 2 * BEVEL, SLAB - 2 * BEVEL, 0.12), {
      depth: THICK, bevelEnabled: true, bevelThickness: BEVEL, bevelSize: BEVEL, bevelSegments: 5, curveSegments: 10,
    });
    slabGeo.rotateX(-Math.PI / 2);
    slabGeo.translate(0, -(THICK + BEVEL), 0);
    const slab = new THREE.Mesh(slabGeo, wood);
    slab.castShadow = slab.receiveShadow = true;
    group.add(slab);

    const tex = boardTextures(this.topology, { showNumbers, aniso: this.aniso });
    const top = new THREE.Mesh(
      new THREE.PlaneGeometry(TOP, TOP).rotateX(-Math.PI / 2),
      new THREE.MeshStandardMaterial({ map: tex.map, roughnessMap: tex.orm, metalnessMap: tex.orm, roughness: 1, metalness: 1, envMapIntensity: 0.7 }),
    );
    top.position.y = 0.002;
    top.receiveShadow = true;
    this.topMesh = top;
    group.add(top);

    const brass = new THREE.MeshStandardMaterial({ color: 0xb8924c, metalness: 1, roughness: 0.38 });
    const footGeo = new THREE.CylinderGeometry(0.2, 0.24, FOOT + 0.02, 28);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(footGeo, brass);
      foot.position.set(sx * (SLAB / 2 - 0.42), TABLE_Y + FOOT / 2, sz * (SLAB / 2 - 0.42));
      foot.castShadow = true;
      group.add(foot);
    }
    this.boardGroup = group;
    this.scene.add(group);
  }

  buildPieces() {
    this.geo = { tiger: tigerGeometry(), goat: goatGeometry() };
    this.mat = pieceMaterials();
    this.blobTex = blobTexture();
    const blobGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    this.blobGeo = blobGeo;
    this.pieces = [];
    const make = (type, id) => {
      const mesh = new THREE.Mesh(this.geo[type], this.mat[type]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.visible = false;
      const blob = new THREE.Mesh(blobGeo, new THREE.MeshBasicMaterial({
        map: this.blobTex, transparent: true, depthWrite: false, opacity: 0.6,
      }));
      const size = type === "tiger" ? 0.86 : 0.58;
      blob.scale.set(size, 1, size);
      blob.visible = false;
      blob.renderOrder = 1;
      this.scene.add(mesh, blob);
      const jitter = ((id * 2654435761) >>> 0) / 4294967296 - 0.5;
      const piece = {
        id, type, mesh, blob, where: { kind: "hidden", idx: 0 }, base: new THREE.Vector3(),
        tw: null, raise: 0, raiseGoal: 0, yaw: jitter * 0.9, yawGoal: jitter * 0.9, jitter,
      };
      mesh.userData.piece = piece;
      this.pieces.push(piece);
      return piece;
    };
    this.tigers = [0, 1, 2, 3].map((i) => make("tiger", i));
    this.goats = Array.from({ length: 20 }, (_, i) => make("goat", 10 + i));
  }

  buildMarkers() {
    const basic = (color, opacity) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
    const add = (geo, mat, order = 2) => {
      const m = new THREE.Mesh(geo, mat);
      m.visible = false;
      m.renderOrder = order;
      m.position.y = MARK_Y;
      this.scene.add(m);
      return m;
    };
    this.mk = {};
    this.mk.targetMat = basic(AMBER, 0.9);
    this.mk.targetGeo = flatRing(0.2, 0.262);
    this.mk.dotGeo = new THREE.CircleGeometry(0.085, 28).rotateX(-Math.PI / 2);
    this.mk.targets = Array.from({ length: 25 }, (_, i) => {
      const [x, z] = pointXZ(i);
      const ring = add(this.mk.targetGeo, this.mk.targetMat);
      const dot = add(this.mk.dotGeo, this.mk.targetMat);
      ring.position.set(x, MARK_Y, z);
      dot.position.set(x, MARK_Y, z);
      return { ring, dot };
    });
    this.mk.threatMat = basic(RUST, 0.9);
    this.mk.threatGeo = flatRing(0.25, 0.3);
    this.mk.threats = [0, 1, 2, 3, 4, 5, 6, 7].map(() => add(this.mk.threatGeo, this.mk.threatMat));
    this.mk.selected = add(flatRing(0.33, 0.375), basic(AMBER, 0.95));
    this.mk.from = add(flatRing(0.12, 0.15), basic(IVORY, 0.42));
    this.mk.to = add(flatRing(0.33, 0.352), basic(IVORY, 0.36));
    this.mk.focus = add(flatRing(0.41, 0.44), basic(IVORY, 0.9));
    this.mk.hintRing = add(flatRing(0.3, 0.36), basic(0x9db97a, 0.95));
    // the hint arrow: a unit strip along +x that is scaled and turned to span two points
    const arrow = new THREE.Group();
    const moss = basic(0x9db97a, 0.9);
    const shaft = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.07).rotateX(-Math.PI / 2).translate(0.5, 0, 0), moss);
    const headShape = new THREE.Shape();
    headShape.moveTo(0, 0); headShape.lineTo(-0.26, 0.13); headShape.lineTo(-0.26, -0.13); headShape.closePath();
    const head = new THREE.Mesh(new THREE.ShapeGeometry(headShape).rotateX(-Math.PI / 2), moss);
    arrow.add(shaft, head);
    arrow.visible = false;
    arrow.position.y = MARK_Y + 0.002;
    shaft.renderOrder = head.renderOrder = 3;
    this.mk.arrow = { group: arrow, shaft, head };
    this.scene.add(arrow);
    // a ghost goat under the pointer during placement
    const ghost = new THREE.Mesh(this.geo.goat, new THREE.MeshStandardMaterial({
      color: IVORY, transparent: true, opacity: 0.42, roughness: 0.6, depthWrite: false,
    }));
    ghost.visible = false;
    this.mk.ghost = ghost;
    this.scene.add(ghost);
    // landing ripples
    this.mk.rippleGeo = flatRing(0.9, 1, 56);
    this.mk.ripples = [0, 1, 2].map(() => {
      const m = add(this.mk.rippleGeo, basic(IVORY, 0), 2);
      m.userData.t0 = -1;
      return m;
    });
  }

  // ---- where things sit ---------------------------------------------------------

  spot(where) {
    const matY = TABLE_Y + 0.008;
    if (where.kind === "board") {
      const [x, z] = pointXZ(where.idx);
      return new THREE.Vector3(x, 0.002, z);
    }
    if (where.kind === "captured") {
      const a = (where.idx - 2) * 0.56;
      return this.portrait ? new THREE.Vector3(a, matY, 3.3) : new THREE.Vector3(3.32, matY, a);
    }
    // the goats still in hand wait in two ranks beside the board
    const row = Math.floor(where.idx / 2);
    const a = (row - 4.5) * 0.5;
    const b = 3.25 + (where.idx % 2) * 0.5;
    return this.portrait ? new THREE.Vector3(a, matY, -b) : new THREE.Vector3(-b, matY, a);
  }

  pieceAt(idx) {
    return this.pieces.find((p) => p.where.kind === "board" && p.where.idx === idx) || null;
  }

  // ---- position sync ------------------------------------------------------------

  /**
   * Show the engine's position. `move` ({from, over, to}) is the move that led here, if the
   * position follows the previous one by exactly that move; it only chooses the animation.
   */
  setPosition(target, { move = null, animate = true } = {}) {
    const job = { target, move, animate: animate && !this.reduced && !this.first };
    this.first = false;
    this.board = target.board;
    this.queue.push(job);
    if (this.queue.length > 3) this.queue = [{ ...this.queue[this.queue.length - 1], move: null }];
    if (this.settled) {
      this.settled = false;
      if (this.on.onSettled) this.on.onSettled(false);
    }
    this.refreshMarkers();
  }

  runJob(job, now) {
    let end = now;
    if (job.move) end = this.playMove(job.move, job.target, job.animate, now);
    end = Math.max(end, this.reconcile(job.target, job.animate, now));
    this.busyUntil = end;
    this.dirty = true;
  }

  emit(name) {
    if (this.on.onEvent) this.on.onEvent(name);
  }

  playMove(move, target, animate, now) {
    const { from, over, to } = move;
    if (this.pieceAt(to)) return now;                      // the scene is out of step; reconcile will fix it
    if (from < 0) {
      const waiting = this.goats.filter((g) => g.where.kind === "reserve").sort((a, b) => b.where.idx - a.where.idx)[0];
      if (!waiting || target.board[to] !== GOAT) return now;
      waiting.where = { kind: "board", idx: to };
      return this.send(waiting, { animate, now, dur: 640, lift: 0.95, land: "place" });
    }
    const piece = this.pieceAt(from);
    if (!piece || target.board[to] !== (piece.type === "tiger" ? TIGER : GOAT)) return now;
    const [fx, fz] = pointXZ(from);
    const [tx, tz] = pointXZ(to);
    if (piece.type === "tiger") piece.yawGoal = Math.atan2(tx - fx, tz - fz);
    piece.where = { kind: "board", idx: to };
    if (over < 0) return this.send(piece, { animate, now, dur: 400, lift: 0.2, land: "step" });
    const end = this.send(piece, { animate, now, dur: 560, lift: 0.78, land: "capture" });
    const goat = this.pieceAt(over);
    if (goat && goat.type === "goat") {
      const taken = this.goats.filter((g) => g.where.kind === "captured").length;
      goat.where = { kind: "captured", idx: taken };
      return Math.max(end, this.send(goat, { animate, now, delay: 330, dur: 700, lift: 0.9 }));
    }
    return end;
  }

  /** Put every piece where the engine's position says it is. Returns when the last one arrives. */
  reconcile(target, animate, now) {
    let end = now;
    let n = 0;
    const move = (piece, where) => {
      if (piece.where.kind === where.kind && piece.where.idx === where.idx) return;
      const wasHidden = piece.where.kind === "hidden";
      piece.where = where;
      if (where.kind === "hidden") { piece.tw = null; return; }
      if (wasHidden) {
        piece.base.copy(this.spot(where));
        if (piece.type === "tiger") {                      // a tiger entering the board faces the centre
          const c = this.spot(where);
          piece.yaw = piece.yawGoal = c.x || c.z ? Math.atan2(-c.x, -c.z) : 0;
        }
      }
      end = Math.max(end, this.send(piece, { animate: animate && !wasHidden, now, delay: n++ * 22, dur: 520, lift: 0.55 }));
    };

    // tigers
    const tigerPoints = [];
    const goatPoints = [];
    target.board.forEach((v, i) => { if (v === TIGER) tigerPoints.push(i); else if (v === GOAT) goatPoints.push(i); });
    const settle = (pieces, points) => {
      const open = points.filter((i) => !pieces.some((p) => p.where.kind === "board" && p.where.idx === i));
      const loose = pieces.filter((p) => !(p.where.kind === "board" && points.includes(p.where.idx)));
      return { open, loose };
    };
    const t = settle(this.tigers, tigerPoints);
    t.open.forEach((i) => { const p = t.loose.shift(); if (p) move(p, { kind: "board", idx: i }); });
    t.loose.forEach((p) => move(p, { kind: "hidden", idx: 0 }));

    // goats: fill the board first, then the captured row, then the reserve
    const g = settle(this.goats, goatPoints);
    const rank = (order) => (a, b) => order.indexOf(a.where.kind) - order.indexOf(b.where.kind) || a.where.idx - b.where.idx;
    const dist = (p, i) => { const [x, z] = pointXZ(i); return Math.hypot(p.base.x - x, p.base.z - z); };
    for (const i of g.open) {
      const onBoard = g.loose.filter((p) => p.where.kind === "board").sort((a, b) => dist(a, i) - dist(b, i))[0];
      const capturedExtra = g.loose.filter((p) => p.where.kind === "captured").length > target.captured
        ? g.loose.filter((p) => p.where.kind === "captured").sort((a, b) => b.where.idx - a.where.idx)[0] : null;
      const reserve = g.loose.filter((p) => p.where.kind === "reserve").sort((a, b) => b.where.idx - a.where.idx)[0];
      const p = onBoard || capturedExtra || reserve || g.loose[0];
      if (!p) break;
      g.loose.splice(g.loose.indexOf(p), 1);
      move(p, { kind: "board", idx: i });
    }
    const captured = g.loose.slice().sort(rank(["captured", "board", "hidden", "reserve"])).slice(0, target.captured);
    const rest = g.loose.filter((p) => !captured.includes(p));
    const reserve = rest.slice().sort(rank(["reserve", "board", "captured", "hidden"])).slice(0, target.inHand);
    captured.forEach((p, k) => move(p, { kind: "captured", idx: k }));
    reserve.forEach((p, k) => move(p, { kind: "reserve", idx: k }));
    rest.filter((p) => !reserve.includes(p)).forEach((p) => move(p, { kind: "hidden", idx: 0 }));
    return end;
  }

  /** Start a piece travelling to its `where`; returns the arrival time. */
  send(piece, { animate, now, delay = 0, dur, lift, land = null }) {
    const dest = this.spot(piece.where);
    const done = () => {
      if (!land) return;
      this.emit(land);
      if (piece.where.kind === "board") this.ripple(dest, land === "capture" ? 1.25 : piece.type === "tiger" ? 1 : 0.72);
    };
    if (!animate) {
      piece.base.copy(dest);
      piece.tw = null;
      done();
      return now;
    }
    piece.tw = { p0: piece.base.clone(), p1: dest, lift, t0: now + delay, dur, done };
    return now + delay + dur;
  }

  ripple(pos, size) {
    if (this.reduced) return;
    const r = this.mk.ripples.find((m) => m.userData.t0 < 0) || this.mk.ripples[0];
    r.position.set(pos.x, MARK_Y, pos.z);
    r.userData.t0 = performance.now();
    r.userData.size = size * 0.62;
    r.visible = true;
  }

  // ---- interaction state --------------------------------------------------------

  /** What the player may do right now. All of it comes from the engine's legal-move list. */
  setInteraction(ui) {
    this.ui = {
      selected: ui.selected ?? null,
      targets: ui.targets || [],
      placeable: new Set(ui.placeable || []),
      movable: new Set(ui.movable || []),
      lastMove: ui.lastMove || null,
      hint: ui.hint || null,
      focus: ui.focus ?? null,
    };
    this.refreshMarkers();
  }

  refreshMarkers() {
    const { selected, targets, lastMove, hint, focus } = this.ui;
    const mk = this.mk;
    mk.targets.forEach((t) => { t.ring.visible = false; t.dot.visible = false; });
    mk.threats.forEach((m) => { m.visible = false; });
    let k = 0;
    for (const t of targets) {
      mk.targets[t.to].ring.visible = true;
      mk.targets[t.to].dot.visible = true;
      if (t.over >= 0 && k < mk.threats.length) {
        const [x, z] = pointXZ(t.over);
        mk.threats[k].position.set(x, MARK_Y, z);
        mk.threats[k++].visible = true;
      }
    }
    const place = (mesh, idx) => {
      mesh.visible = idx !== null && idx !== undefined && idx >= 0;
      if (mesh.visible) { const [x, z] = pointXZ(idx); mesh.position.set(x, mesh.position.y, z); }
    };
    place(mk.selected, selected);
    place(mk.from, lastMove ? lastMove.from : null);
    place(mk.to, lastMove ? lastMove.to : null);
    place(mk.focus, focus);
    place(mk.hintRing, hint ? hint.to : null);
    mk.arrow.group.visible = Boolean(hint && hint.from >= 0);
    if (mk.arrow.group.visible) {
      const [fx, fz] = pointXZ(hint.from);
      const [tx, tz] = pointXZ(hint.to);
      const len = Math.hypot(tx - fx, tz - fz);
      mk.arrow.group.position.set(fx, MARK_Y + 0.002, fz);
      mk.arrow.group.rotation.y = -Math.atan2(tz - fz, tx - fx);
      mk.arrow.shaft.scale.x = len - 0.56;
      mk.arrow.head.position.x = len - 0.3;
    }
    for (const p of this.pieces) {
      const on = p.where.kind === "board";
      p.raiseGoal = on && p.where.idx === selected ? 0.17 : on && p.where.idx === this.hover && this.ui.movable.has(p.where.idx) ? 0.05 : 0;
    }
    this.refreshHover();
    this.dirty = true;
  }

  refreshHover() {
    const h = this.hover;
    const { placeable, movable, targets } = this.ui;
    const active = h !== null && (placeable.has(h) || movable.has(h) || targets.some((t) => t.to === h));
    this.canvas.style.cursor = active ? "pointer" : this.drag && this.drag.moved ? "grabbing" : "";
    const ghost = this.mk.ghost;
    ghost.visible = h !== null && placeable.has(h) && this.board[h] === 0;
    if (ghost.visible) { const [x, z] = pointXZ(h); ghost.position.set(x, 0.002, z); }
  }

  // ---- input --------------------------------------------------------------------

  bind() {
    const c = this.canvas;
    this.handlers = {
      pointerdown: (e) => this.onDown(e),
      pointermove: (e) => this.onMove(e),
      pointerup: (e) => this.onUp(e),
      pointercancel: (e) => this.onCancel(e),
      pointerleave: () => this.setHover(null),
      wheel: (e) => {
        if (!this.orbitEnabled) return;
        e.preventDefault();
        this.rig.zoomBy(Math.exp(e.deltaY * 0.0012));
      },
      webglcontextlost: (e) => { e.preventDefault(); if (this.on.onLost) this.on.onLost(); },
    };
    for (const [name, fn] of Object.entries(this.handlers)) c.addEventListener(name, fn, { passive: false });
    this.onVisibility = () => { this.last = performance.now(); this.dirty = true; };
    document.addEventListener("visibilitychange", this.onVisibility);
  }

  /** Engine point index under the pointer: a piece's own point if the ray hits it, else the nearest point. */
  pick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const meshes = this.pieces.filter((p) => p.where.kind === "board" && p.mesh.visible).map((p) => p.mesh);
    const hit = this.raycaster.intersectObjects(meshes, false)[0];
    if (hit) return hit.object.userData.piece.where.idx;
    const at = this.raycaster.ray.intersectPlane(this.plane, new THREE.Vector3());
    if (!at) return null;
    const col = Math.round(at.x + 2);
    const row = Math.round(at.z + 2);
    if (col < 0 || col > 4 || row < 0 || row > 4) return null;
    return Math.hypot(at.x - (col - 2), at.z - (row - 2)) <= 0.5 ? row * 5 + col : null;
  }

  setHover(idx) {
    if (idx === this.hover) return;
    this.hover = idx;
    this.refreshMarkers();
  }

  onDown(e) {
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { this.canvas.setPointerCapture(e.pointerId); } catch { /* not capturable */ }
    if (this.pointers.size === 1) this.drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY, moved: false };
    else if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      this.pinch = Math.hypot(a.x - b.x, a.y - b.y);
      if (this.drag) this.drag.moved = true;      // a second finger means this is not a tap
    }
  }

  onMove(e) {
    const p = this.pointers.get(e.pointerId);
    if (p) { p.x = e.clientX; p.y = e.clientY; }
    if (this.pointers.size === 2 && this.orbitEnabled) {
      const [a, b] = [...this.pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (this.pinch) this.rig.zoomBy(this.pinch / d);
      this.pinch = d;
      return;
    }
    const d = this.drag;
    if (d && d.id === e.pointerId) {
      if (!d.moved && Math.hypot(e.clientX - d.x0, e.clientY - d.y0) > 7) d.moved = true;
      if (d.moved && this.orbitEnabled) {
        this.rig.orbit(e.clientX - d.x, e.clientY - d.y);
        this.canvas.style.cursor = "grabbing";
      }
      d.x = e.clientX;
      d.y = e.clientY;
      if (d.moved) return;
    }
    if (e.pointerType !== "touch") this.setHover(this.pick(e));
  }

  onUp(e) {
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinch = 0;
    const d = this.drag;
    if (!d || d.id !== e.pointerId) return;
    this.drag = null;
    if (d.moved) { this.refreshHover(); return; }
    const idx = this.pick(e);
    if (idx === null) { if (this.on.onMiss) this.on.onMiss(); } else if (this.on.onPoint) this.on.onPoint(idx);
  }

  onCancel(e) {
    this.pointers.delete(e.pointerId);
    this.drag = null;
    this.pinch = 0;
  }

  // ---- view ---------------------------------------------------------------------

  setCamera(name, snap = false) {
    this.rig.drift = name === "intro" ? 0.16 : 0;
    this.orbitEnabled = name !== "intro";
    this.rig.setPreset(name, snap || this.reduced);
  }

  setReducedMotion(on) {
    this.reduced = on;
  }

  setShowNumbers(on) {
    this.buildBoard(on);
  }

  resize(w, h, insets) {
    if (!w || !h) return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(w, h, false);
    const portrait = (w - insets.left - insets.right) / (h - insets.top - insets.bottom) < 0.92;
    if (portrait !== this.portrait) {
      this.portrait = portrait;
      this.felt.rotation.y = portrait ? Math.PI / 2 : 0;
      for (const p of this.pieces) if (p.where.kind !== "board" && p.where.kind !== "hidden") { p.base.copy(this.spot(p.where)); p.tw = null; }
    }
    this.rig.setBounds(portrait ? 2.8 : 4.15, portrait ? 4.15 : 2.8);
    this.rig.setViewport(w, h, insets);
    this.dirty = true;
  }

  // ---- frame --------------------------------------------------------------------

  frame(now) {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.frame);
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;

    if (now >= this.busyUntil) {
      if (this.queue.length) this.runJob(this.queue.shift(), now);
      else if (!this.settled) {
        this.settled = true;
        if (this.on.onSettled) this.on.onSettled(true);
      }
    }

    let active = this.dirty || !this.settled;
    this.dirty = false;
    if (this.rig.update(dt, now, this.reduced)) active = true;

    const k = this.reduced ? 1 : 1 - Math.exp(-dt * 16);
    for (const p of this.pieces) {
      let lift = 0;
      if (p.tw) {
        const t = (now - p.tw.t0) / p.tw.dur;
        if (t >= 1) {
          p.base.copy(p.tw.p1);
          const done = p.tw.done;
          p.tw = null;
          done();
        } else if (t > 0) {
          const e = ease(t);
          p.base.lerpVectors(p.tw.p0, p.tw.p1, e);
          lift = p.tw.lift * 4 * e * (1 - e);
        }
        active = true;
      }
      if (Math.abs(p.raiseGoal - p.raise) > 0.0005) { p.raise += (p.raiseGoal - p.raise) * k; active = true; }
      let dy = p.yawGoal - p.yaw;
      dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      if (Math.abs(dy) > 0.002) { p.yaw += dy * k * 0.6; active = true; }
      const shown = p.where.kind !== "hidden";
      p.mesh.visible = shown;
      p.blob.visible = shown;
      if (!shown) continue;
      const up = lift + p.raise;
      p.mesh.position.set(p.base.x, p.base.y + up, p.base.z);
      p.mesh.rotation.y = p.yaw;
      // the contact shadow stays on whatever surface is underneath
      const overBoard = Math.abs(p.base.x) < SLAB / 2 && Math.abs(p.base.z) < SLAB / 2;
      p.blob.position.set(p.base.x, (overBoard ? 0.002 : TABLE_Y + 0.008) + 0.004, p.base.z);
      p.blob.material.opacity = 0.62 / (1 + up * 5);
    }

    // markers breathe a little so they read as "available", not as decoration
    const marks = this.ui.targets.length || this.ui.hint;
    if (marks && !this.reduced) {
      const pulse = 0.5 + 0.5 * Math.sin(now * 0.004);
      this.mk.targetMat.opacity = 0.62 + 0.3 * pulse;
      this.mk.threatMat.opacity = 0.62 + 0.3 * pulse;
      active = true;
    }
    for (const r of this.mk.ripples) {
      if (r.userData.t0 < 0) continue;
      const t = (now - r.userData.t0) / 520;
      if (t >= 1) { r.visible = false; r.userData.t0 = -1; continue; }
      const s = r.userData.size * (0.45 + 0.75 * (1 - Math.pow(1 - t, 3)));
      r.scale.set(s, 1, s);
      r.material.opacity = 0.34 * (1 - t);
      active = true;
    }

    if (active && !document.hidden) {
      this.renderer.render(this.scene, this.camera);
      if (!this.shown) {
        this.shown = true;
        if (this.on.onReady) this.on.onReady();
      }
    }
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    for (const [name, fn] of Object.entries(this.handlers)) this.canvas.removeEventListener(name, fn);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.canvas.style.cursor = "";
    const seen = new Set();
    this.scene.traverse((o) => {
      if (o.geometry && !seen.has(o.geometry)) { seen.add(o.geometry); o.geometry.dispose(); }
      const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      for (const m of mats) {
        if (seen.has(m)) continue;
        seen.add(m);
        for (const key of ["map", "roughnessMap", "metalnessMap"]) if (m[key] && !seen.has(m[key])) { seen.add(m[key]); m[key].dispose(); }
        m.dispose();
      }
    });
    this.env.dispose();
    this.renderer.dispose();
  }
}
