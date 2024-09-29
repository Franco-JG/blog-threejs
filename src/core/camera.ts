//Camera
import { PerspectiveCamera } from "three"

const FOV = 45
export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

export function createCamera(canvas: HTMLCanvasElement): PerspectiveCamera {

  const camera = new PerspectiveCamera(
    FOV,
    canvas.width/canvas.height
  )

  camera.position.z = 3

  return camera;
}
// window.addEventListener('resize', () => {
// 	sizes.width = window.innerWidth
// 	sizes.height =  window.innerHeight
// 	camera.aspect = sizes.width/ sizes.height
// 	camera.updateProjectionMatrix()
// })
