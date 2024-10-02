import './style.css'
import { geometryShaders } from './shapes/geometryShaders'
import { elementsInstances } from './shapes/elementsInstances'


const article = document.querySelector('article')

export const sizes = {
    width: 640,
    height: 360
}

const normales = <HTMLCanvasElement> document.querySelector('#scene1')
const instancias = <HTMLCanvasElement> document.querySelector('#scene2')

geometryShaders(normales)
elementsInstances(instancias)

window.addEventListener('resize', () => {
    sizes.width = article?.clientWidth || 640;
    sizes.height = (sizes.width / 16) * 9; // Mantener la relación de aspecto 16:9
    
});
