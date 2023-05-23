// Criando uma imagem com Fragment Shader

import * as THREE from 'three';

import { GUI } from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js';

const 	gui = new GUI();

const 	rendSize 	= new THREE.Vector2();

var 	controls, 
		scene,
		camera,
		renderer,
		shaderMat;

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

	window.addEventListener ( 'resize', onWindowResize 	);

	scene 	= new THREE.Scene();

	camera = new THREE.OrthographicCamera( -10.0, 10.0, 10.0, -10.0, -1.0, 1.0 );

	initGUI();

    geraImagem();

	renderer.clear();
	renderer.render(scene, camera);    
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function geraImagem() {

	shaderMat = new THREE.ShaderMaterial( 	
					{ 	uniforms  		: 	{	uRaio  	: { type 	: "f" , 
															value  	: 5.0 } 
											},
						vertexShader 	: document.getElementById('vertShader').textContent,
						fragmentShader 	: document.getElementById('fragShader').textContent,
						wireframe  		: false,
					} );

	var plane 			= new THREE.Mesh( 	new THREE.PlaneBufferGeometry(20.0, 20.0, 10, 10),
											shaderMat );
	plane.name = "imagem";
	scene.add( plane );	
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function initGUI() {

	controls = 	{	Raio 	: 5.0,
				};

	gui.add( controls, 'Raio', 1.0, 10.0).onChange(mudaRaio);

	gui.open();
};

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function mudaRaio() {

	var obj = scene.getObjectByName("imagem")
	obj.material.uniforms.uRaio.value = controls.Raio;
	obj.material.uniformsNeedUpdate = true;

	renderer.clear();
	renderer.render(scene, camera);    
};

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function onWindowResize() {

	rendSize.x = window.innerWidth * 0.8;
	rendSize.y = window.innerHeight * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	camera.aspect = rendSize.x / rendSize.y;
	camera.updateProjectionMatrix();

	renderer.clear();
	renderer.render(scene, camera);
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //

main();
