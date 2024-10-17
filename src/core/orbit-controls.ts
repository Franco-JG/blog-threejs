import { PerspectiveCamera, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { WebGPURenderer } from "three/webgpu";

export function createOrbitControls(camera: PerspectiveCamera, renderer: WebGLRenderer){
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    return controls;
}
export function createOrbitControlsGPU(camera: PerspectiveCamera, renderer: WebGPURenderer){
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    return controls;
}