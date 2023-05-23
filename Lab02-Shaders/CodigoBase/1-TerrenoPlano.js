// Gerando um terreno plano baseado no objeto PlaneGeometru do Three.JS

import * as THREE from 'three';

const 	rendSize 	= new THREE.Vector2();

var 	controls, 
		scene,
		camera,
		renderer;

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = window.innerWidth * 0.8;
	rendSize.y = window.innerHeight * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	// camera = new THREE.OrthographicCamera( -10.0, 10.0, 10.0, -10.0, -1.0, 1.0 );

	camera = new THREE.PerspectiveCamera( 70.0, rendSize.x / rendSize.y, 0.01, 1000.0 );
	camera.position.y = 2.0;
	camera.position.z = 13.0;
	camera.updateProjectionMatrix();

	geraTerreno();

	requestAnimationFrame(anime);

}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************
function anime(time) {

	var obj = scene.getObjectByName("terreno");

	obj.rotateZ(0.001);
	obj.updateMatrix();

	renderer.clear();
	renderer.render(scene, camera);

	requestAnimationFrame(anime);		
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function geraTerreno() {

    const terreno	= new THREE.Mesh 	(	new THREE.PlaneGeometry( 100, 100, 30, 30 ), 
    										new THREE.MeshBasicMaterial(	{	color:0xFFFFFF,
    																			wireframe:true
    																		})
										); 
	terreno.rotateX(-90.0 * Math.PI / 180.0);
    terreno.name 	= "terreno";
	scene.add( terreno );

	var axis = new THREE.AxesHelper(8.0);
    axis.name = "eixos";
	axis.rotateX(-90.0 * Math.PI / 180.0);
	axis.position.y = 0.2;
	axis.updateMatrix();
    terreno.add(axis);
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //

main();
