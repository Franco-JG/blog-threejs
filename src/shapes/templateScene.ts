import * as THREE from 'three'

import { createCanvas, resizeRendererAndCamera } from '../utils.ts';
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createScene } from '../core/scene.ts';

export const templateScene = () => {

	const data = {
		title: 'Wireframe cube (template)',
		description: `Sit enim deserunt ex ut minim et. Ut esse cillum esse labore adipisicing amet pariatur ad. Incididunt dolor nisi sit fugiat fugiat ex proident velit qui aute aliquip culpa consequat. Commodo dolor Lorem veniam consectetur. Proident et cupidatat veniam tempor.`
	}
	const canvas = createCanvas(data)
	const renderer = createRenderer(canvas)
	const camera = createCamera();
	const scene = createScene()

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
  )
  scene.add(cube)

	function animate() {

		resizeRendererAndCamera(renderer, camera)

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

		renderer.render( scene, camera );
		requestAnimationFrame( animate );
	}

  animate()

}