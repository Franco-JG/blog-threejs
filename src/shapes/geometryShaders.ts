import { MeshBasicMaterial, SphereGeometry, Mesh, LineBasicMaterial, Vector3, BufferGeometry, Line, Group } from "three";
import { createScene } from "../core/scene.ts";
import { createCamera } from '../core/camera.ts';
import { createRenderer } from '../core/renderer.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';

export function geometryShaders(canvas:HTMLCanvasElement) {
    const scene = createScene()
    const camera = createCamera()
    const renderer = createRenderer(canvas)
    const controls = createOrbitControls(camera, renderer)
    
    // Crear la geometría de la esfera
    const sphereGeometry = new SphereGeometry(1, 32, 32);
    sphereGeometry.computeVertexNormals();

    // Crear el material para la esfera
    const sphereMaterial = new MeshBasicMaterial({ color: 0x0077ff, wireframe: false });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);


    const normalLength = 0.5; // Longitud de las normales

  // Crear un grupo para las líneas de normales
  const normalsGroup = new Group();
  const normalsMaterial = new LineBasicMaterial({ color: 0xff0000 }); // Color de las normales

  // Obtener las posiciones y normales
  const positions = sphereGeometry.attributes.position.array;
  const normals = sphereGeometry.attributes.normal.array;

  for (let i = 0; i < positions.length; i += 3) {
      // Obtener la posición del vértice
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Obtener la normal
      const nx = normals[i];
      const ny = normals[i + 1];
      const nz = normals[i + 2];

      // Crear un punto inicial (vértice)
      const start = new Vector3(x, y, z);
      
      // Crear un punto final (normal)
      const end = new Vector3(x + nx * normalLength, y + ny * normalLength, z + nz * normalLength);

      // Crear la geometría de la línea
      const normalGeometry = new BufferGeometry().setFromPoints([start, end]);

      // Crear la línea y añadirla al grupo
      const line = new Line(normalGeometry, normalsMaterial);
      normalsGroup.add(line);
    }
    
    // Añadir el grupo de normales a la escena
    scene.add(normalsGroup);

    
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update()
      }
      
      animate();
    }
