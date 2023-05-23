// Mapeamento de Texturas 

import * as THREE 			from 'three';
import { OBJLoader } 		from '../../Assets/scripts/three.js/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls }	from '../../Assets/scripts/three.js/examples/jsm/controls/OrbitControls.js';

const 	rendSize 	= new THREE.Vector2();

var 	renderer,
	 	scene,
	 	camera,
	 	cameraControl;

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = Math.min(window.innerWidth, window.innerHeight) * 1.6;
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

	// Controle de Camera Orbital
	cameraControl 	= new OrbitControls(camera, renderer.domElement);

	var objectLoader = new OBJLoader();
	objectLoader.load("../../Assets/Models/OBJ/AtlasModels/bunny.obj", loadMesh);

	render();
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadMesh(loadedMesh) {
	
	const textureLoader = new THREE.TextureLoader();
	const texture 		= textureLoader.load("../../Assets/Models/OBJ/AtlasModels/textures/bunny-atlas.jpg");
	const material 		= new THREE.MeshBasicMaterial({map:texture});
	
	loadedMesh.children.forEach(function (child) {
		child.material = material;
		});

	scene.add(loadedMesh);
	
	const box = new THREE.Box3().setFromObject(loadedMesh);
	
	camera.position.x = box.max.x*2;
	camera.position.y = box.max.y*2;
	camera.position.z = box.max.z*2;
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	
	const farPlane = Math.max(	(box.max.x - box.min.x),
								(box.max.y - box.min.y),
								(box.max.z - box.min.z) );
	camera.near = 0.1;
	camera.far = farPlane*10.0;
	camera.updateProjectionMatrix();

	// Global Axis
	var globalAxis = new THREE.AxesHelper(farPlane);
	scene.add( globalAxis );

	cameraControl.update();
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function render() {

	cameraControl.update();

	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
