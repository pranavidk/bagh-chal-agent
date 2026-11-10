// Camera rig: a damped orbit around the board that always keeps the whole set in frame.
import * as THREE from "three";

export const PRESETS = {
  play: { theta: 0, phi: 0.9, zoom: 1 },
  top: { theta: 0, phi: 0.02, zoom: 1 },
  intro: { theta: -0.55, phi: 1.08, zoom: 0.94 },
};

const LIMIT = { theta: 1.35, phiMin: 0.02, phiMax: 1.2, zoomMin: 0.62, zoomMax: 1.7 };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export class CameraRig {
  constructor(camera) {
    this.camera = camera;
    this.cur = { ...PRESETS.intro };
    this.goal = { ...PRESETS.intro };
    this.size = { w: 1, h: 1 };
    this.insets = { top: 0, right: 0, bottom: 0, left: 0 };
    this.bounds = { hx: 4.1, hz: 2.75, y0: -0.6, y1: 0.75 };
    this.target = new THREE.Vector3(0, -0.05, 0);
    this.drift = 0;            // radians of slow sway added on the intro shot
    this.moving = true;
    this._v = new THREE.Vector3();
  }

  setPreset(name, snap = false) {
    this.goal = { ...PRESETS[name] };
    if (snap) this.cur = { ...this.goal };
    this.moving = true;
  }

  orbit(dx, dy) {
    this.goal.theta = clamp(this.goal.theta - dx * 0.006, -LIMIT.theta, LIMIT.theta);
    this.goal.phi = clamp(this.goal.phi - dy * 0.005, LIMIT.phiMin, LIMIT.phiMax);
    this.moving = true;
  }

  zoomBy(factor) {
    this.goal.zoom = clamp(this.goal.zoom * factor, LIMIT.zoomMin, LIMIT.zoomMax);
    this.moving = true;
  }

  setViewport(w, h, insets) {
    this.size = { w, h };
    this.insets = insets;
    this.camera.aspect = w / h;
    const ox = (insets.left - insets.right) / 2;
    const oy = (insets.top - insets.bottom) / 2;
    this.camera.setViewOffset(w, h, -ox, -oy, w, h);
    this.moving = true;
  }

  setBounds(hx, hz) {
    this.bounds.hx = hx;
    this.bounds.hz = hz;
    this.moving = true;
  }

  /** Smallest distance at which every corner of the set's bounding box is inside the safe area. */
  fitDistance(theta, phi) {
    const { w, h } = this.size;
    const sx = Math.max(0.2, (w - this.insets.left - this.insets.right) / w);
    const sy = Math.max(0.2, (h - this.insets.top - this.insets.bottom) / h);
    const tan = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const back = new THREE.Vector3(Math.sin(phi) * Math.sin(theta), Math.cos(phi), Math.sin(phi) * Math.cos(theta));
    const right = new THREE.Vector3(Math.cos(theta), 0, -Math.sin(theta));
    const up = new THREE.Vector3().crossVectors(back, right);
    const { hx, hz, y0, y1 } = this.bounds;
    let d = 1;
    for (const x of [-hx, hx]) for (const y of [y0, y1]) for (const z of [-hz, hz]) {
      const c = this._v.set(x, y - this.target.y, z);
      const along = c.dot(back);
      d = Math.max(d, along + Math.abs(c.dot(right)) / (tan * this.camera.aspect * sx),
        along + Math.abs(c.dot(up)) / (tan * sy));
    }
    return d;
  }

  /** Advance the damping; returns true while the camera is still travelling. */
  update(dt, time, reduced) {
    const k = reduced ? 1 : 1 - Math.exp(-dt * 5.2);
    const c = this.cur;
    const g = this.goal;
    c.theta += (g.theta - c.theta) * k;
    c.phi += (g.phi - c.phi) * k;
    c.zoom += (g.zoom - c.zoom) * k;
    const settled = Math.abs(g.theta - c.theta) + Math.abs(g.phi - c.phi) + Math.abs(g.zoom - c.zoom) < 0.0006;
    const sway = this.drift && !reduced ? Math.sin(time * 0.00021) * this.drift : 0;
    const theta = c.theta + sway;
    const d = this.fitDistance(theta, c.phi) * c.zoom;
    this.camera.position.set(
      this.target.x + d * Math.sin(c.phi) * Math.sin(theta),
      this.target.y + d * Math.cos(c.phi),
      this.target.z + d * Math.sin(c.phi) * Math.cos(theta),
    );
    this.camera.lookAt(this.target);
    this.camera.updateProjectionMatrix();
    const was = this.moving;
    this.moving = !settled || Boolean(sway);
    return was || this.moving;
  }
}
