// Uma GUI básica utilizando lil-gui

import * as THREE from 'three';

import { GUI } from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js';

const 	gui = new GUI();

var 	controls, 
		scene,
		camera,
		renderer;

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	let minDim = Math.min(window.innerWidth, window.innerHeight);

	renderer.setSize(minDim*0.8, minDim*0.8);

	document.getElementById("threejs-canvas").appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	initGUI();

	camera = new THREE.OrthographicCamera( -10.0, 10.0, 10.0, -10.0, -1.0, 1.0 );

    var axis = new THREE.AxesHelper(1.0);
    axis.name = "eixos";
    scene.add(axis);
	
	renderer.clear();
	renderer.render(scene, camera);
};

function initGUI() {

	controls = 	{	drawAxes : true,
					};

	gui.add( controls, 'drawAxes').onChange(onAxes);
	gui.open();
};

function onAxes(checked) {

	scene.getObjectByName("eixos").visible = checked;
	renderer.clear();
	renderer.render(scene, camera);
};

main();
