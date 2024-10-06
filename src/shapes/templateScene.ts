import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';
import { generateArticle } from "../utils.ts";
import { onWindowResize } from "../main.ts";
import { AxesHelper } from "three";

export function template(){

    const article = {
      title: 'Template scene.',
      description: `Sit enim deserunt ex ut minim et. Ut esse cillum esse labore adipisicing amet pariatur ad. Incididunt dolor nisi sit fugiat fugiat ex proident velit qui aute aliquip culpa consequat. Commodo dolor Lorem veniam consectetur. Proident et cupidatat veniam tempor.`
    }
    
    const canvas = generateArticle(article)
    onWindowResize()

    const scene = createScene()
    const camera = createCamera()
    const renderer = createRenderer(canvas)
    const controls = createOrbitControls(camera, renderer)
    controls.enableZoom =  false

    scene.add(new AxesHelper(5))

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update()
      }
      
      animate();
}