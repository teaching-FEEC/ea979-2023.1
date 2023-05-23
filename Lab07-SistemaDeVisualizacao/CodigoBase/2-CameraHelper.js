// Controle de camera com GUI.

import * as THREE 	from 'three';
import { GUI } 		from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js'

const 	rendSize 	= new THREE.Vector2();

var scene 			= null;
var renderer		= null;
var cameraPersp		= null;
var cameraOrto		= null;
var cameraHelper 	= null;
var controls		= null;
var winDim;

var gui = new GUI();

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = Math.min(window.innerWidth, window.innerHeight) * 1.6;
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);
	renderer.autoClear = false;

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	cameraPersp = new THREE.PerspectiveCamera();
	cameraPersp.fov 		= 75.0;
	cameraPersp.aspect 		= 1.0;
	cameraPersp.near 		= 10.0;
	cameraPersp.far			= 50.0;
	cameraPersp.position.x	= 0.0;
	cameraPersp.position.y	= 0.0;
	cameraPersp.position.z	= 40.0;

	scene.add( cameraPersp );

	cameraHelper = new THREE.CameraHelper(cameraPersp);
	scene.add( cameraHelper );

	cameraOrto = new THREE.OrthographicCamera(-70.0, 70.0, 70.0, -70.0, -100.0, 100.0);
	cameraOrto.position.x	= 40.0;
	cameraOrto.position.y	= 40.0;
	cameraOrto.position.z	= 40.0;
	cameraOrto.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));

	const globalAxis = new THREE.AxesHelper(20.0);
	scene.add( globalAxis );

	const objGeometry = new THREE.TorusKnotGeometry( 10.0, 3.0, 100, 16 );                 

	const myObj = new THREE.Object3D();
	myObj.add(new THREE.Mesh( objGeometry, new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe:true} ) ) );
	myObj.add(new THREE.Mesh( objGeometry, new THREE.MeshBasicMaterial( {color: 0x0000aa, wireframe:false} ) ) );
	myObj.name = "myObj";
	scene.add( myObj );

	initGUI();

	render();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function render() {

var angleX 	= 0.007;
var angleY	= 0.003;
var angleZ	= 0.001;

	var obj = scene.getObjectByName("myObj");
	obj.rotateX(angleX);
	obj.rotateY(angleY);
	obj.rotateZ(angleZ);

	renderer.clear(true, true);

	renderer.setViewport(0.0, 0.0, rendSize.x / 2.0, rendSize.y );
	cameraPersp.updateProjectionMatrix();
	cameraHelper.visible = false;
	cameraHelper.update();
	renderer.render( scene, cameraPersp );

	renderer.setViewport(rendSize.x / 2.0, 0.0, rendSize.x / 2.0, rendSize.y )
	cameraHelper.visible = true;
	cameraOrto.updateProjectionMatrix();
	cameraHelper.update();
	renderer.render( scene, cameraOrto );
		
	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function initGUI() {

	controls = 	{	fov 	: cameraPersp.fov, 
					near 	: cameraPersp.near,
					far 	: cameraPersp.far,
					camPosX : cameraPersp.position.x,
					camPosY : cameraPersp.position.y,
					camPosZ : cameraPersp.position.z,
				};

	var fCamPersp = gui.addFolder('Perspectiva');
	fCamPersp.add(controls, 'fov', 10.0, 170.0, 1.0).onChange(event => 	{ 	cameraPersp.fov = controls.fov;
																			cameraPersp.updateProjectionMatrix();
																		});

	fCamPersp.add(controls, 'near', 0.1, 100.0, 1.0).onChange(event => 	{	cameraPersp.near = controls.near;
																			cameraPersp.updateProjectionMatrix();
																		});

	fCamPersp.add(controls, 'far', 1.0, 500.0, 10.0).onChange(event => 	{ 	cameraPersp.far = controls.far;
																			cameraPersp.updateProjectionMatrix();
																		});
	fCamPersp.open();

	var fCamPos = gui.addFolder('Camera');
	fCamPos.add( controls, 'camPosX', -40.0, 40.0).onChange(event => 	{  	cameraPersp.position.x = controls.camPosX;
																			cameraPersp.updateProjectionMatrix();
																		});
	fCamPos.add( controls, 'camPosY', -40.0, 40.0).onChange(event => 	{ 	cameraPersp.position.y = controls.camPosY;
																			cameraPersp.updateProjectionMatrix();
																		});
	fCamPos.add( controls, 'camPosZ', -40.0, 40.0).onChange(event => 	{ 	cameraPersp.position.z = controls.camPosZ;
																			cameraPersp.updateProjectionMatrix();
																		});
	fCamPos.open();
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
