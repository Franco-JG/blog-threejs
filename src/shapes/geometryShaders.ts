import { Mesh, DoubleSide, PlaneGeometry, SphereGeometry, MeshToonMaterial } from "three";

import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';
import { createAmbientLight, createDirectionalLight } from "../core/lights.ts";
import { createCanvas, generateNormales, resizeRendererAndCamera } from "../utils.ts";

export function geometryShaders(){
    const article = {
        title: 'Vectores normales',
        description: `Sit enim deserunt ex ut minim et. Ut esse cillum esse labore adipisicing amet pariatur ad. Incididunt dolor nisi sit fugiat fugiat ex proident velit qui aute aliquip culpa consequat. Commodo dolor Lorem veniam consectetur. Proident et cupidatat veniam tempor.`
      }
      
    const canvas = createCanvas(article)

    const scene = createScene()
    const camera = createCamera()
    const renderer = createRenderer(canvas)
    const controls = createOrbitControls(camera, renderer)
    const ambientLight = createAmbientLight()
    const directionalLight = createDirectionalLight()
    controls.enableZoom =  false

    scene.add(ambientLight)
    scene.add(directionalLight)
    camera.position.set(-4.40,4.71,3.89).multiplyScalar(0.4)
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
        resizeRendererAndCamera(renderer, camera)
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
        controls.update()
      }
      animate();
}