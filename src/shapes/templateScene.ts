import * as THREE from 'three'

import { createCanvas, resizeRendererAndCamera } from '../utils.ts';
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createScene } from '../core/scene.ts';

export const templateScene = () => {

	const data = {
		title: 'Duis velit ea ipsum magna pariatur et cupidatat in ipsum ipsum laboris.',
		description: `
			Commodo nulla sunt eiusmod adipisicing. Consequat nulla officia ut exercitation voluptate. Quis pariatur esse voluptate consequat eu reprehenderit et mollit aute et. Et anim mollit qui mollit est ut enim est. Minim eu occaecat sit ad et consequat cupidatat. Cupidatat voluptate magna ipsum anim amet fugiat labore id proident ipsum duis proident consequat. Labore velit nostrud nulla dolor proident sunt quis ut ipsum sit irure ut occaecat.
			Ea ut nisi mollit quis. Aliquip cupidatat irure nisi quis consectetur esse magna occaecat qui culpa quis incididunt. Officia commodo in dolore pariatur ex proident sit adipisicing dolore nostrud occaecat id quis nostrud. Reprehenderit aliquip id proident qui ipsum pariatur nulla. Sunt proident qui dolore nisi ex cupidatat veniam cupidatat magna reprehenderit. Do irure duis pariatur aliqua in ullamco irure anim nisi minim voluptate sit incididunt ea.
		`}
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