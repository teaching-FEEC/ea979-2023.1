// Carregando uma malha de triangulos em Three.js

import * as THREE from 'three';

import { OBJLoader } from '../../Assets/scripts/three.js/examples/jsm/loaders/OBJLoader.js';

const 	rendSize = new THREE.Vector2();

var scene, 
	renderer, 
	camera;

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = 
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	
	scene.add( camera );
	
	// Load Mesh
	const loader = new OBJLoader();
	loader.load('../../Assets/Models/OBJ/teapot.obj', loadMesh);

	requestAnimationFrame(animate);
	}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(loadedMesh) {
	var material = new THREE.MeshBasicMaterial(	{	color  		: 0xAA0CCC, 
													wireframe  	: true
												} );

	loadedMesh.children.forEach(function (child) {
		child.material = material;
		});

	loadedMesh.name = "malha";
	scene.add(loadedMesh);

	ajusteCamera();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************
function ajusteCamera() {

	var obj = scene.getObjectByName("malha");

	const helper = new THREE.BoxHelper();
	helper.setFromObject(obj);

	helper.geometry.computeBoundingBox();

	var max = helper.geometry.boundingBox.max;
	var min = helper.geometry.boundingBox.min;

	const maxDim 	= Math.max 	(	(max.x - min.x),
									(max.y - min.y),
									(max.z - min.z) 
								);

	camera.top 		= 
	camera.left		=
	camera.near		= maxDim;

	camera.bottom 	= 
	camera.right	=
	camera.far 		= -maxDim;

	camera.updateProjectionMatrix();

	const axis = new THREE.AxesHelper(maxDim);
	axis.name = "eixos";
	scene.add(axis);
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function animate(time) {

	var obj = scene.getObjectByName("malha");

	if (obj) {
		obj.rotation.x = time * 0.00001;
		obj.rotation.y = time * 0.0001;
		obj.rotation.z = time * 0.0005;
		}

	renderer.clear();
	renderer.render(scene, camera);

	requestAnimationFrame(animate);		
}


/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
