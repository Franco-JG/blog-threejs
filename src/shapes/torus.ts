import { MeshBasicMaterial, Mesh, TorusGeometry } from "three";

import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';
import { createCanvas, resizeRendererAndCamera } from "../utils.ts";

export function torus() {
  const article = {
    title: 'Torus made with ThreeJS',
    description: `Sit enim deserunt ex ut minim et. Ut esse cillum esse labore adipisicing amet pariatur ad. Incididunt dolor nisi sit fugiat fugiat ex proident velit qui aute aliquip culpa consequat. Commodo dolor Lorem veniam consectetur. Proident et cupidatat veniam tempor.`
  }
  
  const canvas = createCanvas(article)

  const scene = createScene()
  const camera = createCamera()
  const renderer = createRenderer(canvas)
  const controls = createOrbitControls(camera, renderer)
  controls.enableZoom =  false

  const torus = new Mesh(
    new TorusGeometry(0.7),
    new MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true
    })
  )
  scene.add(torus)
  function animate() {

    resizeRendererAndCamera(renderer, camera)
    torus.rotation.x += 0.01;
    torus.rotation.y -= 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update()
  }

  animate();
}
