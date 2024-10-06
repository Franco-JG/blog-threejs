import { BoxGeometry, DirectionalLightHelper, DoubleSide, InstancedMesh, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PlaneGeometry } from "three";

import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';
import { createAmbientLight, createDirectionalLight } from "../core/lights.ts";
import { generateArticle } from "../utils.ts";
import { onWindowResize } from "../main.ts";

export function elementsInstances(){

    const article = {
      title: 'Crear instancias de un objeto',
      description: `Sit enim deserunt ex ut minim et. Ut esse cillum esse labore adipisicing amet pariatur ad. Incididunt dolor nisi sit fugiat fugiat ex proident velit qui aute aliquip culpa consequat. Commodo dolor Lorem veniam consectetur. Proident et cupidatat veniam tempor.`
    }
    
    const canvas = generateArticle(article)
    onWindowResize()

    const scene = createScene()
    const camera = createCamera()
    const renderer = createRenderer(canvas)
    const controls = createOrbitControls(camera, renderer)
    const directionalLight = createDirectionalLight()
    const ambientLight =  createAmbientLight()
    controls.enableZoom =  false

    camera.position.set(1,2,1)
    controls.target.set(0,1,0)
    
    scene.add(directionalLight)
    scene.add(ambientLight)
    scene.add(new DirectionalLightHelper(directionalLight))


    // const cubeGeometry = new BoxGeometry(0.2,0.2,0.2)
    const cubeGeometry = new BoxGeometry(0.1,0.1,0.1)
    const cubeMaterial = new MeshStandardMaterial({color: 0x00ff00, wireframe: false})

    const plane = new Mesh(
      new PlaneGeometry(20,20),
      new MeshBasicMaterial({
        color: 0x858585,
        side: DoubleSide
      })
    ).rotateX(Math.PI/180 * -90)
    
    // Tamaño del grid
    const gridSize = 2
    const spacing = 0.2 // Espaciado entre cubos

    // Crear el InstancedMesh
    const count = gridSize * gridSize // Total de cubos
    const mesh = new InstancedMesh(cubeGeometry, cubeMaterial, count)
    scene.add(mesh)

    // Fijar la posición Y de los cubos
    const y = 1

    // Dummy object para las transformaciones
    const dummy = new Object3D()

    let index = 0
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Posicionar cada cubo en una cuadrícula en X y Z, con Y constante
        const x = (i - gridSize / 2) * spacing
        const z = (j - gridSize / 2) * spacing

        dummy.position.set(x, y, z)
        dummy.updateMatrix()

        // Aplicar la transformación a cada instancia
        mesh.setMatrixAt(index, dummy.matrix)
        index++
      }
    }

    scene.add(plane)

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update()
      }
      
      animate();
}