// Commposição de Transformações Geométricas.

import * as THREE 				from 'three';
import { GLTFLoader } 			from '../../Assets/scripts/three.js/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } 		from '../../Assets/scripts/three.js/examples/jsm/controls/OrbitControls.js';

var 	scene,
		renderer,
		camera,
		camControl,
		shaderMat;

const 	rendSize 	= new THREE.Vector2();

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = window.innerWidth * 0.8;
	rendSize.y = window.innerHeight * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);
	renderer.autoClear=false;

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 45.0, window.innerWidth/window.innerHeight, 0.01, 50.0);
	camera.position.x = 100.0;
	camera.position.y = 100.0;
	camera.position.z = 100.0;
	scene.add( camera );

	// Load Mesh
	const gltfLoader = new GLTFLoader();
	gltfLoader.load('../../Assets/Models/glTF/the_utah_teapot/scene.gltf', loadMesh); 

	// Controle de Camera Orbital
	camControl = new OrbitControls(camera, renderer.domElement);

	render();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(loadedMesh) {
		
	var mesh = loadedMesh.scene;
	mesh.name = "mesh";

	scene.add(mesh);

	shaderMat = 	new THREE.ShaderMaterial(	{ 	uniforms  		: 	{	uProjAxis: { 	type 	: "i" , 
																							value  	: 0 },
						 
																		},
													vertexShader 	: document.getElementById('viewProjMat-VS').textContent,
													fragmentShader 	: document.getElementById('viewProjMat-FS').textContent,
													wireframe  		: true,
												} );
	setMaterial(mesh);
	
	const box = new THREE.Box3().setFromObject(mesh);
	
	camera.position.x = box.max.x*2;
	camera.position.y = box.max.y*2;
	camera.position.z = box.max.z*2;

	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	
	var farPlane = Math.max(	(box.max.x - box.min.x),
								(box.max.y - box.min.y),
								(box.max.z - box.min.z) );

	var nearPlane = Math.min(	(box.max.x - box.min.x),
								(box.max.y - box.min.y),
								(box.max.z - box.min.z) );

	camera.near = nearPlane*0.08;
	camera.far 	= farPlane*10.0;
	camera.updateProjectionMatrix();

	// Global Axis
	var globalAxis = new THREE.AxesHelper(farPlane);
	scene.add( globalAxis );
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function render() {

	var obj = scene.getObjectByName("mesh");

	renderer.clear();

	if (obj) {
		updateMaterial(obj, 0)
		renderer.render(scene, camera);

		updateMaterial(obj, 1)
		renderer.render(scene, camera);

		updateMaterial(obj, 2)
		renderer.render(scene, camera);

		updateMaterial(obj, 3)
		renderer.render(scene, camera);
		}
	
	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function setMaterial(obj, isLast = true) {

	const lastNdx = obj.children.length - 1;
	obj.material = shaderMat;

	obj.children.forEach((child, ndx) => 	{	const isLast = ndx === lastNdx;
									    		setMaterial(child, isLast);
										  	} );
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function updateMaterial(obj, idMat, isLast = true) {

	obj.material.uniforms.uProjAxis.value = idMat;
	obj.material.uniformsNeedUpdate = true;

	const lastNdx = obj.children.length - 1;

	obj.children.forEach((child, ndx) => 	{	const isLast = ndx === lastNdx;
									    		setMaterial(child, idMat, isLast);
										  	} );
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
