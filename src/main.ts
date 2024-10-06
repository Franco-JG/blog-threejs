import './style.css'
import { cube } from "./shapes/cube.ts";
import { elementsInstances } from './shapes/elementsInstances.ts';
import { geometryShaders } from './shapes/geometryShaders.ts';
import { torus } from './shapes/torus.ts';
import { template } from './shapes/templateScene.ts';

export const sizes = {
    width: 0,
    height: 0
}

export function onWindowResize() {
    const article = document.querySelector('article');
    if (article) {
        sizes.width = article.clientWidth;
        sizes.height = (sizes.width * 9) / 16; //relación de aspecto 16:9
    }
}
window.addEventListener('resize', onWindowResize);
elementsInstances()
geometryShaders()
torus()
cube()
template()
onWindowResize();  // Llama para ajustar el tamaño inicial
