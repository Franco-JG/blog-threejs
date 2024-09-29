import { MeshBasicMaterial, BoxGeometry, Mesh } from "three";
import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';

export function Scene1(canvas: HTMLCanvasElement) {
  const scene = createScene()
  const camera = createCamera()
  const renderer = createRenderer(canvas)
  const controls = createOrbitControls(camera, renderer)
    
  const cube = new Mesh(
    new BoxGeometry(),
    new MeshBasicMaterial({
        color: 0xff0000,
    })
  )
  scene.add(cube)
  
  function animate() {

    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update()
  }

  animate();
}
