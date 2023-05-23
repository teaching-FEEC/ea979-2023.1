// Objetos no World Space.

import * as THREE from 'three';

const 	rendSize 	= new THREE.Vector2();

var 	scene,
		renderer,
		camera;

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
	
	renderer.clear();
	renderer.render(scene, camera);
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function buildScene() {
	// Global Axis
	var globalAxis = new THREE.AxesHelper( 1.0 );
	scene.add( globalAxis );

	// Box	
	var box = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );              
	var boxMat = new THREE.MeshBasicMaterial( {color: 0x0000ff,wireframe:true} );
	var cube = new THREE.Mesh( box, boxMat );
	cube.position.set(-0.7, 0.7, 0.0);
 	cube.rotateOnAxis(new THREE.Vector3(0, 1, 1).normalize(), -Math.PI/4); 
	scene.add( cube );	
	
	var cubeAxis = new THREE.AxesHelper( 0.3 );
	cube.add( cubeAxis );
	
	// Sphere
	var sphereGeometry = new THREE.SphereGeometry( 0.2, 10, 10 );                 
	var sphereMat = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe:true} );
	var sphere = new THREE.Mesh( sphereGeometry, sphereMat );
	sphere.position.set(0.0, 0.7, 0.0);
	scene.add( sphere );	
	
	var sphereAxis = new THREE.AxesHelper( 0.3 );
	sphere.add( sphereAxis );
	
	// Ring
	var ringGeometry = new THREE.RingGeometry( 0.2, 0.1, 15, 3 );                 
	var ringMat = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe:true} );
	var ring = new THREE.Mesh( ringGeometry, ringMat );
	ring.position.set(0.7, 0.7, 0.0);
	scene.add( ring );	
	
	var ringAxis = new THREE.AxesHelper( 0.3 );
	ring.add( ringAxis );
	
	// TorusKnot
	var torusKnotGeometry = new THREE.TorusKnotGeometry( 0.2, 0.03, 60, 20, 3, 2 );                 
	var torusKnotMat = new THREE.MeshBasicMaterial( {color: 0x7070aa, wireframe:true} );
	var torusKnot = new THREE.Mesh( torusKnotGeometry, torusKnotMat );
	torusKnot.position.set(0.7, 0.0, 0.0);
	torusKnot.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/4); 
	scene.add( torusKnot );	
	
	var torusKnotAxis = new THREE.AxesHelper( 0.3 );
	torusKnot.add( torusKnotAxis );
	
	// Cilinder
	var cilinderGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.5, 30);                 
	var cilinderMat = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true} );
	var cilinder = new THREE.Mesh( cilinderGeometry, cilinderMat );
	cilinder.position.set(0.0, 0.0, 0.0);
	cilinder.rotateOnAxis(new THREE.Vector3(1, 0, 0).normalize(), -Math.PI/4); 
	scene.add( cilinder );	
	
	var cilinderAxis = new THREE.AxesHelper( 0.3 );
	cilinder.add( cilinderAxis );
	
	// Icosahedron
	var icosahedronGeometry = new THREE.IcosahedronGeometry(0.2);                 
	var icosahedronMat = new THREE.MeshBasicMaterial( {color: 0x00ffff, wireframe:true} );
	var icosahedron = new THREE.Mesh( icosahedronGeometry, icosahedronMat );
	icosahedron.position.set(-0.7, 0.0, 0.0);
	scene.add( icosahedron );	
	
	var icosahedronAxis = new THREE.AxesHelper( 0.3 );
	icosahedron.add( icosahedronAxis );
	
	// Plane
	var planeGeometry = new THREE.PlaneBufferGeometry(0.2, 0.5, 10, 10);                 
	var planeMat = new THREE.MeshBasicMaterial( {color: 0xff00ff, wireframe:true} );
	var plane = new THREE.Mesh( planeGeometry, planeMat );
	plane.position.set( 0.7, -0.7, 0.0);
	plane.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/4); 
	scene.add( plane );	
	
	var planeAxis = new THREE.AxesHelper( 0.3 );
	plane.add( planeAxis );
	
	// Tetrahedron
	var tetrahedronGeometry = new THREE.TetrahedronGeometry(0.2);                 
	var tetrahedronMat = new THREE.MeshBasicMaterial( {color: 0x70aa70, wireframe:true} );
	var tetrahedron = new THREE.Mesh( tetrahedronGeometry, tetrahedronMat );
	tetrahedron.position.set( 0.0, -0.7, 0.0);
	tetrahedron.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/6); 
	scene.add( tetrahedron );	
	
	var tetrahedronAxis = new THREE.AxesHelper( 0.3 );
	tetrahedron.add( tetrahedronAxis );
	
	// Dodecahedron
	var dodecahedronGeometry = new THREE.DodecahedronGeometry(0.2);                 
	var dodecahedronMat = new THREE.MeshBasicMaterial( {color: 0xaa7070, wireframe:true} );
	var dodecahedron = new THREE.Mesh( dodecahedronGeometry, dodecahedronMat );
	dodecahedron.position.set( -0.7, -0.7, 0.0);
	dodecahedron.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/6); 
	scene.add( dodecahedron );	
	
	var dodecahedronAxis = new THREE.AxesHelper( 0.3 );
	dodecahedron.add( dodecahedronAxis );	
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
