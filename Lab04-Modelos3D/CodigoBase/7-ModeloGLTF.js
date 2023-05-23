// Carregando uma malha de triangulos em Three.js

import * as THREE from 'three';
import { GLTFLoader } 	from '../../Assets/scripts/three.js/examples/jsm/loaders/GLTFLoader.js';

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
	const gltfLoader = new GLTFLoader();
	gltfLoader.load('../../Assets/Models/glTF/tie/scene.gltf', loadMesh);

	render();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(mesh) {

	var root = mesh.scene;

	root.name = "malha";

	scene.add(root);

	setMaterial(root);

	const axis = new THREE.AxesHelper();
	axis.name = "eixos";
	scene.add(axis);

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

function render() {

	var obj = scene.getObjectByName("malha");

	if (obj)
		requestAnimationFrame(animate);		
	else 
		requestAnimationFrame(render);	
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function animate(time) {

	var obj = scene.getObjectByName("malha");

	obj.rotation.y = time * 0.001;

	renderer.render(scene, camera);

	requestAnimationFrame(animate);		
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function setMaterial(obj, isLast = true) {

	const lastNdx = obj.children.length - 1;

	obj.material = new THREE.MeshBasicMaterial(	{ 	color : 0x08FFAA,
													wireframe:  true 
												} );

	obj.children.forEach((child, ndx) => 	{	const isLast = ndx === lastNdx;
									    		setMaterial(child, isLast);
										  	} );
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
