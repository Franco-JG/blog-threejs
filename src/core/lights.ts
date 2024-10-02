import { AmbientLight, DirectionalLight } from "three"
//Lights
export function createAmbientLight(){
    const ambientLight = new AmbientLight(0xffffff, 0.5)

    return ambientLight
}
export function createDirectionalLight(){
    const directionalLight = new DirectionalLight('#ffffff',2)

    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.set(1024,1024)
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.normalBias = 0.05
    directionalLight.position.set(-2, 10,0)

    return directionalLight
}