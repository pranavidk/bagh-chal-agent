// Small portraits of the two figurines for the setup screen, rendered once with a
// throwaway renderer so the main scene is untouched.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { goatGeometry, pieceMaterials, tigerGeometry } from "./pieces.js";

export function pieceThumbs(size = 360) {
  let renderer = null;
  try {
    const canvas = document.createElement("canvas");
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(size, size, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    const key = new THREE.DirectionalLight(0xffd7a3, 3.2);
    key.position.set(-2, 3, 2.5);
    const rim = new THREE.DirectionalLight(0x9db4d8, 1.4);
    rim.position.set(2.5, 1.5, -3);
    scene.add(key, rim);
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 20);
    const mats = pieceMaterials();
    const shots = { tiger: [tigerGeometry(), 0.36, 1.9], goat: [goatGeometry(), 0.2, 1.25] };
    const out = {};
    for (const [type, [geo, midY, dist]] of Object.entries(shots)) {
      const mesh = new THREE.Mesh(geo, mats[type]);
      mesh.rotation.y = -0.55;
      scene.add(mesh);
      camera.position.set(0, midY + dist * 0.3, dist);
      camera.lookAt(0, midY, 0);
      renderer.render(scene, camera);
      out[type] = canvas.toDataURL("image/png");
      scene.remove(mesh);
      geo.dispose();
    }
    mats.tiger.dispose();
    mats.goat.dispose();
    env.dispose();
    pmrem.dispose();
    return out;
  } catch {
    return null;
  } finally {
    if (renderer) { renderer.dispose(); renderer.forceContextLoss(); }
  }
}
