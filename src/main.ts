import './style.css'
import { templateScene } from './shapes/templateScene.ts';
import { torus } from './shapes/torus.ts';

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

torus()     //Genera el canvas

onWindowResize();  //Ajusta las medidas del canvas