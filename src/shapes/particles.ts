import * as THREE from 'three';
import WebGPURenderer from "three/src/renderers/webgpu/WebGPURenderer";
import { color, cos, float, mix, range, sin, timerLocal, uniform, uv, vec3, vec4, PI2 } from 'three/tsl';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createCanvas, resizeRendererAndCamera } from '../utils';
import { createCamera } from '../core/camera';
import { createScene } from '../core/scene';
import { createOrbitControls } from '../core/orbit-controls';

export const particles = () => {

  const camera = createCamera()
  camera.position.set( 4, 2, 5 ).multiplyScalar(0.7);

  const scene = createScene()
  scene.background = new THREE.Color( 0x201919 );

  // galaxy

  const material = new THREE.SpriteMaterial( {
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  } );

  const size = uniform( 0.08 );
  material.scaleNode = range( 0, 1 ).mul( size );

  const time = timerLocal();

  const radiusRatio = range( 0, 1 );
  const radius = radiusRatio.pow( 1.5 ).mul( 5 ).toVar();

  const branches = 3;
  const branchAngle = range( 0, branches ).floor().mul( PI2.div( branches ) );
  const angle = branchAngle.add( time.mul( radiusRatio.oneMinus() ) );

  const position = vec3(
    cos( angle ),
    0,
    sin( angle )
  ).mul( radius );

  const randomOffset = range( vec3( - 1 ), vec3( 1 ) ).pow( 3 ).mul( radiusRatio ).add( 0.2 );

  material.positionNode = position.add( randomOffset );

  const colorInside = uniform( color( '#c4c4c4' ) );
  const colorOutside = uniform( color( '#311599' ) );
  const colorFinal = mix( colorInside, colorOutside, radiusRatio.oneMinus().pow( 2 ).oneMinus() );
  const alpha = float( 0.1 ).div( uv().sub( 0.5 ).length() ).sub( 0.2 );
  material.colorNode = vec4( colorFinal, alpha );

  const mesh = new THREE.InstancedMesh( new THREE.PlaneGeometry( 1, 1 ), material, 20000 );
  scene.add( mesh );

  // debug

  // const gui = new GUI();

  // gui.add( size, 'value', 0, 1, 0.001 ).name( 'size' );

  // gui.addColor( { color: colorInside.value.getHex( THREE.SRGBColorSpace ) }, 'color' )
  //   .name( 'colorInside' )
  //   .onChange( function ( value ) {

  //     colorInside.value.set( value );

  //   } );

  // gui.addColor( { color: colorOutside.value.getHex( THREE.SRGBColorSpace ) }, 'color' )
  //   .name( 'colorOutside' )
  //   .onChange( function ( value ) {

  //     colorOutside.value.set( value );

  //   } );

  const data = {
    title: 'Particulas with TSL',
    description: 'WebGPU permite un rendimiento gráfico de alta eficiencia. En este caso, se utiliza para renderizar una simulación de partículas compleja, donde miles de partículas se procesan con alta precisión sin comprometer la velocidad. La ejecución asíncrona, implementada mediante la técnica de bucle de animación, garantiza que cada cuadro se renderice sin bloquear la actualización de la cámara o los controles, lo que permite una experiencia fluida e interactiva. La adaptación del tamaño del render y la cámara se maneja dinámicamente, manteniendo la eficiencia gráfica y asegurando que el rendimiento no se vea afectado, incluso si se redimensiona la ventana. Esto permite que el flujo de renderizado ocurra en paralelo a otras operaciones, clave en aplicaciones que requieren gráficos de alta calidad y respuestas rápidas.'
  }
  // renderer
  const canvas = createCanvas(data)
  const renderer = new WebGPURenderer( { antialias: true, canvas, alpha: true } );
  renderer.setAnimationLoop( animate );

  const controls = createOrbitControls(camera, renderer)
  controls.enableZoom = false;


  async function animate() {
    resizeRendererAndCamera(renderer, camera)
    controls.update();
    renderer.render( scene, camera );

  }
}