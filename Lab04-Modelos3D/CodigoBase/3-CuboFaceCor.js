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
	const indices		= [];
	const materialIndex = [];
	
	positions.push( 0.5,  0.5,  0.5); 	// V0
	positions.push(-0.5, -0.5,  0.5); 	// V1 
	positions.push( 0.5, -0.5,  0.5); 	// V2 
	positions.push(-0.5,  0.5,  0.5); 	// V3 
	positions.push( 0.5,  0.5, -0.5); 	// V4 
	positions.push(-0.5, -0.5, -0.5); 	// V5 
	positions.push( 0.5, -0.5, -0.5); 	// V6 
	positions.push(-0.5,  0.5, -0.5); 	// V7 

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
	
	var boxMaterials = 	[ 	new THREE.MeshBasicMaterial({color:0x0000FF}), 	// Front Face
							new THREE.MeshBasicMaterial({color:0xFF00FF}), 	// Back Face
							new THREE.MeshBasicMaterial({color:0x00FF00}), 	// Top Face
							new THREE.MeshBasicMaterial({color:0x00FFFF}), 	// Bottom Face
							new THREE.MeshBasicMaterial({color:0xFF0000}),	// Right Face 
							new THREE.MeshBasicMaterial({color:0xFFFF00}) 	// Left Face
						]; 
                 
	var cubeGeom = new THREE.BufferGeometry(); 

	cubeGeom.setIndex( indices );
	cubeGeom.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );

	cubeGeom.clearGroups();
	cubeGeom.addGroup (  0, 6, 0);	// Front
	cubeGeom.addGroup (  6, 6, 1);	// Back
	cubeGeom.addGroup ( 12, 6, 2);	// Top
	cubeGeom.addGroup ( 18, 6, 3);	// Bottom
	cubeGeom.addGroup ( 24, 6, 4);	// Right
	cubeGeom.addGroup ( 30, 6, 5);	// Left

	const cubeMesh 	= new THREE.Mesh(cubeGeom, boxMaterials); 
	cubeMesh.name 	= "cubo";

	scene.add( cubeMesh );
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
