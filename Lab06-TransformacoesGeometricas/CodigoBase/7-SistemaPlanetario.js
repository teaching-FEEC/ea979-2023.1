// Construindo um sistema planetário.

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
	renderer.render(scene, camera);
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

	// Sistema Solar

	// Eixo do Sol
	var sAxis = new THREE.AxesHelper(4.8);

	// Sol
	var sol = new THREE.Mesh 	( 	new THREE.SphereGeometry( 4.0, 20, 20), 
									new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true} ) 
								);
	sol.name = "Sol";
	sol.add(sAxis);
	scene.add(sol);	

	// Eixo da Terra
	var tAxis = new THREE.AxesHelper(1.2);

	// Terra
	var terra = new THREE.Mesh 	( 	new THREE.SphereGeometry( 1.0, 10, 10), 
									new THREE.MeshBasicMaterial( {color: 0x0000ff, wireframe:true} ) 
								);
	terra.name = "Terra";
	terra.add(tAxis);
	scene.add(terra);	

	// Eixo da Lua
	var lAxis = new THREE.AxesHelper(0.6);

	// Lua
	var lua = new THREE.Mesh 	( 	new THREE.SphereGeometry( 0.5, 10, 10 ), 
									new THREE.MeshBasicMaterial( {color: 0xaaaaaa, wireframe:true} ) 
								);
	lua.name = "Lua";	
	lua.add(lAxis);
	scene.add(lua);	
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function animate() {

	let rotTerraLua	= 0.005;	// Rotação da Terra e da Lua ao redor do sol (Z)
	let rotTerra 	= 0.09;		// Rotação da Terra ao redor de seu eixo (Y)
	let rotLua 		= 0.01;		// Rotação da Lua ao redor do seu eixo (Y)

	var obj;

	if (controls.RotTerra) {
		obj = scene.getObjectByName("Terra");

		// Transformações para movimento da Terra aqui
		
		obj.updateMatrix();
		}

	if (controls.RotLua) {
		obj = scene.getObjectByName("Lua");

		// Transformações para movimento da Lua aqui
		
		obj.updateMatrix();
		}


	if (controls.RotTerraLua) {

		// Transformações para movimento do sistema Terra/Lua aqui
		
		}	

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
