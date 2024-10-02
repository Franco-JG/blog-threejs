import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';

export function template(canvas:HTMLCanvasElement){

    const scene = createScene()
    const camera = createCamera()
    const renderer = createRenderer(canvas)
    const controls = createOrbitControls(camera, renderer)


    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update()
      }
      
      animate();
}