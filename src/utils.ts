import * as THREE from "three";
import { ArticleInfo } from "./interfaces/articleInfo.interface.ts";
import { WebGPURenderer } from "three/webgpu";

export function resizeRendererAndCamera(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera){
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = canvas.clientWidth/canvas.clientHeight
    camera.updateProjectionMatrix()
  }
}

export function resizeRendererAndCameraGPU(renderer: WebGPURenderer, camera: THREE.PerspectiveCamera){
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = canvas.clientWidth/canvas.clientHeight
    camera.updateProjectionMatrix()
  }
}

export function createCanvas({ title, description }: ArticleInfo) {
  const section = <HTMLElement> document.querySelector('section')
	
  const article = document.createElement('article')
  const canvas = document.createElement('canvas')

  const titleElement = document.createElement('h2')
  const descriptionElement = document.createElement('p') 

  titleElement.innerHTML = title;
  descriptionElement.innerText = description;

  article.append(titleElement, canvas, descriptionElement)
  section.appendChild(article)

  return canvas;
}

export function generateNormales(geometry: THREE.SphereGeometry){
  const normalsGroup = new THREE.Group();
  const normalsMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
  // Obtener las posiciones y normales
  const positions = geometry.attributes.position.array;
  const normals = geometry.attributes.normal.array;

  const normalLength = 0.3; // Longitud de las normales

  for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      const start = new THREE.Vector3(x, y, z);

      const nx = normals[i];
      const ny = normals[i + 1];
      const nz = normals[i + 2];

      const end = new THREE.Vector3(x + nx * normalLength, y + ny * normalLength, z + nz * normalLength);

      const normalGeometry = new THREE.BufferGeometry().setFromPoints([start, end]);

      const line = new THREE.Line(normalGeometry, normalsMaterial);
      normalsGroup.add(line);
  }
  return normalsGroup;
}