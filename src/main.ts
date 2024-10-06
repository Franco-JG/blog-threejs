import './style.css'
import { cube } from "./shapes/cube.ts";

const section = document.querySelector('section');

export const sizes = {
    width: 0,
    height: 0
}


if (section) {
    // Establece el tamaño inicial basado en el ancho del elemento section
    sizes.width = section.clientWidth;  // 50% del ancho del section
    sizes.height = (sizes.width * 9) / 16;  // Mantén la relación de aspecto 16:9
}

// Función para ajustar el tamaño del canvas y los objetos
function onWindowResize() {
    if (section) {
        sizes.width = section.clientWidth;  // 50% del ancho del section
        sizes.height = (sizes.width * 9) / 16;  // Mantén la relación de aspecto 16:9
    }
}

// Añade el event listener de resize
window.addEventListener('resize', onWindowResize);
onWindowResize();  // Llama para ajustar el tamaño inicial

cube()