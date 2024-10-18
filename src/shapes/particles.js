import { Color, InstancedMesh, PlaneGeometry, AdditiveBlending } from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { color, cos, float, mix, range, sin, timerLocal, uniform, uv, vec3, vec4, PI2 } from 'three/tsl';
import { createCanvas, resizeRendererAndCamera } from '../utils.ts';
import { createCamera } from '../core/camera.ts';
import { createScene } from '../core/scene.ts';
import { createOrbitControls } from '../core/orbit-controls.ts';
import { WebGPURenderer, SpriteNodeMaterial } from 'three/src/Three.WebGPU.Nodes.js';


export const particles = () => {

  const camera = createCamera()
  camera.position.set( 4, 2, 5 ).multiplyScalar(0.7);

  const scene = createScene()
  scene.background = new Color( 0x201919 );

  // galaxy
  const material = new SpriteNodeMaterial( {
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending
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

  const colorInside = uniform( color( '#ffa575' ) );
  const colorOutside = uniform( color( '#311599' ) );
  const colorFinal = mix( colorInside, colorOutside, radiusRatio.oneMinus().pow( 2 ).oneMinus() );
  const alpha = float( 0.1 ).div( uv().sub( 0.5 ).length() ).sub( 0.2 );
  material.colorNode = vec4( colorFinal, alpha );

  const mesh = new InstancedMesh( new PlaneGeometry( 1, 1 ), material, 20000 );
  scene.add( mesh );

  // debug

  // const gui = new GUI();

  // gui.add( size, 'value', 0, 1, 0.001 ).name( 'size' );

  // gui.addColor( { color: colorInside.value.getHex( THREE.SRGBColorSpace ) }, 'color' )
  // 	.name( 'colorInside' )
  // 	.onChange( function ( value ) {

  // 		colorInside.value.set( value );

  // 	} );

  // gui.addColor( { color: colorOutside.value.getHex( THREE.SRGBColorSpace ) }, 'color' )
  // 	.name( 'colorOutside' )
  // 	.onChange( function ( value ) {

  // 		colorOutside.value.set( value );

  // 	} );

  const data = {
    title: 'Particulas with TSL',
    description: 'Velit velit anim Lorem deserunt cillum reprehenderit qui pariatur. Eu proident culpa commodo proident veniam aliquip sunt. Occaecat sint ex laborum ullamco aliquip.'
  }
  // renderer
  const canvas = createCanvas(data)
  const renderer = new WebGPURenderer( { antialias: true, canvas, alpha: true } );
  renderer.setAnimationLoop( animate );

  const controls = createOrbitControls(camera, renderer)
  controls.enableZoom = false;
  // controls.minDistance = 0.1;
  // controls.maxDistance = 50;

  async function animate() {
    resizeRendererAndCamera(renderer, camera)
    controls.update();
    renderer.render( scene, camera );

  }
}