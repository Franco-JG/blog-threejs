import './style.css'
import { geometryShaders } from './shapes/geometryShaders'


const article = document.querySelector('article')

export const sizes = {
    width: 640,
    height: 360
}

const canvas = <HTMLCanvasElement> document.querySelector('#scene1')
geometryShaders(canvas)

window.addEventListener('resize', () => {
    sizes.width = article?.clientWidth || 640;
    sizes.height = (sizes.width / 16) * 9; // Mantener la relación de aspecto 16:9
    
});
