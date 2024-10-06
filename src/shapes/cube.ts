import { MeshBasicMaterial, BoxGeometry, Mesh } from "three";
import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';
import { generateArticle } from "../utils.ts";


export function cube() {

  const article = {
    title: 'Cube made with ThreeJS',
    description: `Sit enim deserunt ex ut minim et. Ut esse cillum esse labore adipisicing amet pariatur ad. Incididunt dolor nisi sit fugiat fugiat ex proident velit qui aute aliquip culpa consequat. Commodo dolor Lorem veniam consectetur. Proident et cupidatat veniam tempor.`
  }
  
  const canvas = generateArticle(article)

  const scene = createScene()
  const camera = createCamera()
  const renderer = createRenderer(canvas)
  const controls = createOrbitControls(camera, renderer)
  controls.enableZoom =  false
    
  const cube = new Mesh(
    new BoxGeometry(),
    new MeshBasicMaterial({
        color: 0xff0000,
    })
  )
  scene.add(cube)
  
  //! -----------------------


  function animate() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update()
  }

  animate();
}
