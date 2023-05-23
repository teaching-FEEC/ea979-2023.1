// Instancias de objetos.

import * as THREE from 'three';
import { GUI } 		from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js'

const 	rendSize 	= new THREE.Vector2();

var 	gui 		= new GUI();

var 	scene,
		renderer,
		camera,
		controls;

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

	camera = new THREE.OrthographicCamera( -12.0, 12.0, 12.0, -12.0, -12.0, 12.0 );
	scene.add( camera );

	initGUI();

	buildScene();

	renderer.clear();
	requestAnimationFrame(animate);
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function initGUI() {

	controls = 	{	RotLua 		: true,
					RotTerra 	: true,
					RotTerraLua : true,
					};

	gui.add( controls, 'RotLua');
	gui.add( controls, 'RotTerra');
	gui.add( controls, 'RotTerraLua');
	gui.open();
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function buildScene() {

	// Sistema Solar: Sol, Terra e Lua
	// 3 instancias de esferas 

	var sistemaSolar 		= new THREE.InstancedMesh( 	new THREE.SphereGeometry( 1.0, 10, 10), 
														new THREE.MeshBasicMaterial( {wireframe:false} ), 
														3 );
	sistemaSolar.name = "SistemaSolar";

	scene.add(sistemaSolar);

	const instanceColors 	= [ 0xffff00, 0x0000FF, 0xaaaaaa ];

	for (let i = 0 ; i < 3 ; i++) 
		sistemaSolar.setColorAt ( i, new THREE.Color(instanceColors[i]));
	
	// Sol
	var transfMat = new THREE.Matrix4().makeScale(4.0, 4.0, 4.0);
	sistemaSolar.setMatrixAt( 0, transfMat );

	// Terra
	transfMat.identity();
	transfMat.multiply(new THREE.Matrix4().makeScale(1.0, 1.0, 1.0));
	transfMat.multiply(new THREE.Matrix4().makeTranslation(7.0, 0.0, 0.0));
	sistemaSolar.setMatrixAt( 1, transfMat );

	// Lua
	transfMat.identity();
	transfMat.multiply(new THREE.Matrix4().makeScale(0.5, 0.5, 0.5));
	transfMat.multiply(new THREE.Matrix4().makeTranslation(18.0, 0.0, 0.0));
	sistemaSolar.setMatrixAt( 2, transfMat );

	sistemaSolar.needsUpdate = true;
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function animate(time) {

	let rotTerraLua	= 0.0005 * time;		// Rotação da Terra e da Lua ao redor do sol (Z)
	let rotTerra 	= 0.001  * time;		// Rotação da Terra ao redor de seu eixo (Y)
	let rotLua 		= 0.005  * time;		// Rotação da Lua ao redor do seu eixo (Y)

var obj = scene.getObjectByName("SistemaSolar");

	// Terra
	if (controls.RotTerra) {

		// Transformações para o movimento da Terra aqui
		
		}
		
	// Lua
	if (controls.RotLua) {

		// Transformações para o movimento da Lua aqui
		
		}

	// Como controlar o sistema Terra/Lua ?

	obj.instanceMatrix.needsUpdate = true;

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
