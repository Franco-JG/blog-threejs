// src/types/custom-three.d.ts

import { SpriteMaterial } from 'three';

// Extiende la interfaz de SpriteMaterial para incluir scaleNode
declare module 'three' {
  interface SpriteMaterial {
    scaleNode?: any;       // Añadir las propiedades necesarias
    positionNode?: any;    // Añadir positionNode
    colorNode?: any;
  }
}