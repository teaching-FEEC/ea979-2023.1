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

	const ambientLight = new THREE.AmbientLight( 0x020202, 1.0 );
	scene.add( ambientLight );

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
	var material = new THREE.MeshLambertMaterial(	{	color  		: 0xCC0AAA, 
													wireframe  	: false
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
	
	var maxDistance = Math.max( box.max.x, box.max.y, box.max.z );

	camera.position.x = 
	camera.position.y = 
	camera.position.z = maxDistance;

	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));


	camera.far 	= maxDistance*10.0;
	camera.updateProjectionMatrix();

	const axis = new THREE.AxesHelper(maxDistance);
	axis.name = "eixos";
	scene.add(axis);

	const light = new THREE.PointLight( 0xFFFFFF );
	light.position.set( 0.0, maxDistance, maxDistance );
	scene.add(light);
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
