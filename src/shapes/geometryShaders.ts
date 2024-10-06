import { Mesh, DoubleSide, PlaneGeometry, SphereGeometry, MeshToonMaterial } from "three";
import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';
import { createAmbientLight, createDirectionalLight } from "../core/lights.ts";
import { generateNormales } from "../utils.ts";

export function geometryShaders(canvas:HTMLCanvasElement){

    const scene = createScene()
    const camera = createCamera()
    const renderer = createRenderer(canvas)
    const controls = createOrbitControls(camera, renderer)
    const ambientLight = createAmbientLight()
    const directionalLight = createDirectionalLight()

    scene.add(ambientLight)
    scene.add(directionalLight)
    camera.position.set(-4.40,4.71,3.89)
    controls.enableZoom = false

    const sphereGeometry = new SphereGeometry(1, 32, 32);
    const sphereMaterial = new MeshToonMaterial({ color: 0xfcf914, wireframe: false });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const normalsGroup = generateNormales(sphereGeometry)
    scene.add(normalsGroup);

    const plane = new Mesh(
        new PlaneGeometry(20,20),
        new MeshToonMaterial({
            color: 0x858585,
            side: DoubleSide
        })
    ).rotateX(Math.PI/180 * -90)
    plane.position.y = -2
    plane.receiveShadow = true
    scene.add(plane)

    

    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
        controls.update()
      }
      animate();
}