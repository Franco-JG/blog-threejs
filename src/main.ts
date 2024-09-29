import './style.css'
import { Scene1 } from './shapes/cube.ts';
import { Scene2 } from './shapes/torus.ts';

const canvas = <HTMLCanvasElement> document.querySelector('#scene1')
Scene1(canvas)
const canvas2 = <HTMLCanvasElement> document.querySelector('#scene2')
Scene2(canvas2)