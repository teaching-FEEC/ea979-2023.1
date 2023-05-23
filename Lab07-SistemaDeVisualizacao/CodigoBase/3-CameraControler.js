// Controle de camera com GUI.

import * as THREE 			from 'three';
import { OBJLoader } 		from '../../Assets/scripts/three.js/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls }	from '../../Assets/scripts/three.js/examples/jsm/controls/OrbitControls.js';

var 	scene,
		renderer,
		camera,
		camControl;

const 	rendSize 		= new THREE.Vector2();

const 	clock 			= new THREE.Clock();


/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = window.innerWidth * 0.8;
	rendSize.y = window.innerHeight * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45.0, window.innerWidth/window.innerHeight, 0.01, 500.0);

	// Load Mesh
	const loader = new OBJLoader();
	loader.load('../../Assets/Models/OBJ/bunny.obj', loadMesh);

	// Controle de Camera Orbital
	camControl = new OrbitControls(camera, renderer.domElement);

	render();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(loadedMesh) {
	var material = new THREE.MeshBasicMaterial(	{	color  		: 0xCC0AAA, 
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

	const box = new THREE.Box3().setFromObject(obj);
	
	camera.position.x = (box.max.x + box.min.x) / 2.0;
	camera.position.y = (box.max.y + box.min.y) / 2.0;
	camera.position.z = (box.max.z + box.min.z) / 2.0;

	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));

	var farPlane = Math.max( box.max.x, box.max.y, box.max.z );

	camera.far 	= farPlane*10.0;
	camera.updateProjectionMatrix();

	const axis = new THREE.AxesHelper(farPlane);
	axis.name = "eixos";
	scene.add(axis);
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function render() {

	camControl.update( clock.getDelta() );

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
