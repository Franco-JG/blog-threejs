//Camera
import { PerspectiveCamera } from "three"
import { sizes } from "../main"

const FOV = 45

export function createCamera(): PerspectiveCamera {

  const camera = new PerspectiveCamera(
    FOV,
    sizes.width/sizes.height
  )
  camera.position.z = 4

  return camera;
}

