// Tratamento de eventos no Three.JS

import * as THREE from 'three';

import { GUI } from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js';

const 	gui = new GUI();

var 	controls, 
		scene,
		camera,
		renderer;

var mX, mY, mP, mR;
const rendSize 			= new THREE.Vector2();

const pointer 			= new THREE.Vector2();
const onUpPosition 		= new THREE.Vector2();
const onDownPosition 	= new THREE.Vector2();

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = 
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	window.addEventListener 	( 'resize', 		onWindowResize 	);
	document.addEventListener	( 'pointerdown', 	onPointerDown 	);
	document.addEventListener	( 'pointerup', 		onPointerUp 	);
	document.addEventListener	( 'pointermove', 	onPointerMove 	);

	scene 	= new THREE.Scene();

	initGUI();

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );

    var axis = new THREE.AxesHelper(0.5);
    axis.name = "eixos";

    scene.add(axis);
	
	renderer.clear();
	renderer.render(scene, camera);
};

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function initGUI() {

	controls = 	{	mousePressed 	: false,
					mouseReleased 	: true,
					mousePosX  		: 0,
					mousePosY  		: 0,
					};

	mP = gui.add( controls, 'mousePressed');
	mP.disable(true);

	mR = gui.add( controls, 'mouseReleased');
	mR.disable(true);

	mX = gui.add( controls, 'mousePosX', -1.0, 1.0);
	mX.disable(true);

	mY = gui.add( controls, 'mousePosY', -1.0, 1.0);
	mY.disable(true);
	
	gui.open();
};

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function onWindowResize() {

	let minDim = Math.min(window.innerWidth, window.innerHeight);

	renderer.setSize(minDim*0.8, minDim*0.8);

	renderer.clear();
	renderer.render(scene, camera);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function onPointerDown( event ) {

	onDownPosition.x = event.clientX;
	onDownPosition.y = event.clientY;

	mP.setValue(true);
	mR.setValue(false);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function onPointerUp() {

	onUpPosition.x = event.clientX;
	onUpPosition.y = event.clientY;

	mP.setValue(false);
	mR.setValue(true);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function onPointerMove( event ) {

	if (mP.getValue()) {

		renderer.getSize(rendSize);
		pointer.x 	= 	( event.clientX / rendSize.x  ) * 2 - 1;
		pointer.y 	=  -( event.clientY / rendSize.y ) * 2 + 1;

		mX.setValue(pointer.x);
		mY.setValue(pointer.y);
		}
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //
main();
