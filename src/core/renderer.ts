import { WebGLRenderer, PCFShadowMap } from "three";

export function createRenderer(canvas : HTMLCanvasElement): WebGLRenderer {
	const renderer =  new WebGLRenderer({
			canvas,
			alpha: true,
		})
		
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = PCFShadowMap
	renderer.setSize(canvas.width, canvas.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

	return renderer
}

// export function updateRenderer() {
// 	renderer.setSize(sizes.width, sizes.height)
// 	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// }

// window.addEventListener('resize', () => {
// 	sizes.width = window.innerWidth
// 	sizes.height =  window.innerHeight
// 	updateRenderer()
// })