// Uma GUI básica utilizando lil-gui

import * as THREE from 'three';

const 	rendSize 	= new THREE.Vector2();

var 	controls, 
		scene,
		camera,
		renderer,
		shaderMat,
		aspectRatio;

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	var maxDim = Math.min(window.innerWidth, window.innerHeight)

	rendSize.x =  
	rendSize.y =  maxDim * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	window.addEventListener ( 'resize', onWindowResize 	);

	scene 	= new THREE.Scene();

	camera = new THREE.OrthographicCamera( -10.0, 10.0, 10.0, -10.0, -10.0, 10.0 );

    geraImagem();

	renderer.clear();
	renderer.render(scene, camera);    
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function geraImagem() {

	shaderMat = new THREE.ShaderMaterial( 	
					{ 	uniforms  		: 	{	uCamPos	: { type 	: "vec3" , 
															value  	: new THREE.Vector3(0.0, 0.0, 10.0) } 
											},
						vertexShader 	: document.getElementById('RayTracing_VS').textContent,
						fragmentShader 	: document.getElementById('RayTracing_FS').textContent,
						wireframe : false,
					} );

	var plane 	= new THREE.Mesh( 	new THREE.PlaneBufferGeometry(20.0, 20.0, 1, 1),
									shaderMat );
	plane.name 	= "imagem";
	plane.position.z = 5.0;
	plane.updateMatrix();
	scene.add( plane );	
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function onWindowResize() {

	var maxDim = Math.min(window.innerWidth, window.innerHeight)

	rendSize.x =  
	rendSize.y =  maxDim * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	renderer.clear();
	renderer.render(scene, camera);
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //

main();
