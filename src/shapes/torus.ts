import { MeshBasicMaterial, Mesh, TorusGeometry } from "three";
import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';

export function Scene2(canvas: HTMLCanvasElement) {
  const scene = createScene()
  const camera = createCamera()
  const renderer = createRenderer(canvas)
  const controls = createOrbitControls(camera, renderer)
    
  const torus = new Mesh(
    new TorusGeometry(0.7),
    new MeshBasicMaterial({
        color: 0x00ffff,
    })
  )
  scene.add(torus)
  function animate() {
    torus.rotation.x += 0.05;
    torus.rotation.y -= 0.05;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update()
  }

  animate();
}
