// Criando uma malha poligonal de um cubo com faces coloridas em Three.js

import * as THREE from 'three';

const 	rendSize 	= new THREE.Vector2();

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

	buildScene();

	requestAnimationFrame(animate);		

};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function animate(time) {

	var cube = scene.getObjectByName("cubo");

	cube.rotation.x = time * 0.00001;
	cube.rotation.y = time * 0.0001;
	cube.rotation.z = time * 0.0005;

	renderer.clear();
	renderer.render(scene, camera);

	requestAnimationFrame(animate);		
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function buildScene() {

	const axis = new THREE.AxesHelper();
	scene.add(axis);

	const positions 	= [];
	const colors 		= [];
	const indices		= [];
	

	positions.push( 0.5,  0.5,  0.5); 	// V0
	colors.push( 1.0,  1.0,  0.0); 		// Vc0

	positions.push(-0.5, -0.5,  0.5); 	// V1 
	colors.push( 0.0,  0.0,  0.0); 		// Vc1

	positions.push( 0.5, -0.5,  0.5); 	// V2 
	colors.push( 1.0,  0.0,  0.0); 		// Vc2

	positions.push(-0.5,  0.5,  0.5); 	// V3 
	colors.push( 0.0,  1.0,  0.0); 		// Vc3

	positions.push( 0.5,  0.5, -0.5); 	// V4 
	colors.push( 1.0,  1.0,  1.0); 		// Vc4

	positions.push(-0.5, -0.5, -0.5); 	// V5 
	colors.push( 0.0,  0.0,  1.0); 		// Vc5

	positions.push( 0.5, -0.5, -0.5); 	// V6 
	colors.push( 1.0,  0.0,  1.0); 		// Vc6

	positions.push(-0.5,  0.5, -0.5); 	// V7 
	colors.push( 0.0,  1.0,  1.0); 		// Vc7

	// Front
	indices.push(1, 2, 0); 
	indices.push(1, 0, 3); 
	// Back
	indices.push(5, 4, 6); 
	indices.push(5, 7, 4); 
	// Top
	indices.push(3, 0, 4); 
	indices.push(3, 4, 7); 
	// Bottom
	indices.push(1, 6, 2); 
	indices.push(1, 5, 6); 
	// Right
	indices.push(2, 6, 4); 
	indices.push(2, 4, 0); 
	// Left
	indices.push(5, 1, 3); 
	indices.push(5, 3, 7);
	                 
	var cubeGeom = new THREE.BufferGeometry(); 

	cubeGeom.setIndex( indices );
	cubeGeom.setAttribute( 'position', 	new THREE.Float32BufferAttribute( positions, 3 ) );
	cubeGeom.setAttribute( 'color', 	new THREE.Float32BufferAttribute( colors, 3 ) );

	const cubeMesh 	= new THREE.Mesh 	(	cubeGeom, 
											new THREE.MeshBasicMaterial(	{	vertexColors 	: 	true, 
																				wireframe 		: 	false 
																			}
																		)
										); 
	cubeMesh.name 	= "cubo";

	scene.add( cubeMesh );
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
