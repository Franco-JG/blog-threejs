import './style.css'
import { Scene1 } from './shapes/cube.ts';
import { Scene2 } from './shapes/torus.ts';
import { geometryShaders } from './shapes/geometryShaders.ts';


const article = document.querySelector('article')

export const sizes = {
    width: 640,
    height: 360
}

const canvas = <HTMLCanvasElement> document.querySelector('#scene1')
const canvas2 = <HTMLCanvasElement> document.querySelector('#scene2')
const canvas3 = <HTMLCanvasElement> document.querySelector('#scene3')

Scene1(canvas)
Scene2(canvas2)
geometryShaders(canvas3)

window.addEventListener('resize', () => {
    sizes.width = article?.clientWidth || 640;
    sizes.height = (sizes.width / 16) * 9; // Mantener la relación de aspecto 16:9
    console.log(sizes);
    
});
