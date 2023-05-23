// Controle de camera.

import * as THREE 	from 'three';
import { GUI } 		from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js'

const 	rendSize 	= new THREE.Vector2();

var 	scene,
		renderer,
		cameraPersp,
		cameraParal,
		camera,
		controls;
		var dz = 0.004;	

var gui = new GUI();

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = 
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	cameraPersp = new THREE.PerspectiveCamera( 65.0, rendSize.x / rendSize.y, 0.1, 100.0 );
	scene.add( cameraPersp );

	cameraParal = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, -1.5, 1.5 );
	scene.add( cameraParal );

	camera = cameraPersp;

	initGUI();

	var globalAxis = new THREE.AxesHelper(2.0);
	scene.add( globalAxis );

	var obj = new THREE.Mesh 	( 	new THREE.SphereGeometry(1.0, 20, 20), 
									new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe:true} ) 
								);
	obj.name = "esfera";
	scene.add( obj );
		
	requestAnimationFrame(render);
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function initGUI() {

	controls = 	{	Projection 	: 'Perspective', 
					Translate 	: false,
					Pitch 		: false,
					Yaw  		: false,
					Roll 		: false,
					Reset 		: function() 	{ 	camera.position.x = 
													camera.position.y = 
													camera.position.z = 0.0;
													camera.rotation.copy(new THREE.Euler( 0.0, 0.0, 0.0 ));
												},
					};

	gui.add( controls, 'Projection', [ 'Perspective', 'Parallel' ] ).onChange(event =>  { 	if (controls.Projection == 'Perspective') 
																								camera = cameraPersp;
																						  	else
																								camera = cameraParal;
																						});
	gui.add( controls, 'Translate');
	gui.add( controls, 'Pitch');
	gui.add( controls, 'Yaw');
	gui.add( controls, 'Roll');
	gui.add( controls, 'Reset');
	gui.open();
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function render() {

	var pitch 	= 0.009,
		yaw 	= 0.007,
		roll	= 0.006;

	if (controls.Translate) {
		if (camera.position.z >= 0.9) 
			dz = -0.004;
		else
			if (camera.position.z <= -0.9)
				dz = 0.004;

		camera.position.z += dz;
		}

	if (controls.Pitch) {
		camera.rotateX(pitch);
		}

	if (controls.Yaw) {
		camera.rotateY(yaw);
		}

	if (controls.Roll) {
		camera.rotateZ(roll);
		}

	camera.updateProjectionMatrix();

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
