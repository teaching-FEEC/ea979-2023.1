// Controle de camera com GUI.

import * as THREE 			from 'three';
import { GLTFLoader } 		from '../../Assets/scripts/three.js/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls }	from '../../Assets/scripts/three.js/examples/jsm/controls/OrbitControls.js';
import { GUI } 				from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js'



const 	rendSize 	= new THREE.Vector2();

var 	gui = new GUI();

var 	scene,
		renderer, 
		camera, 
		mesh,
		orbitControls,
		clock,
		controls;

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function main() {
	
	clock = new THREE.Clock();
	
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = Math.min(window.innerWidth, window.innerHeight) * 1.6;
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 	45.0, 
											rendSize.x/rendSize.y, 
											0.01, 
											200.0 );

	// Controle de Camera Orbital
	orbitControls = new OrbitControls(camera, renderer.domElement);
	orbitControls.autoRotate = false;
	
	const gltfLoader = new GLTFLoader();
	gltfLoader.load('../../Assets/Models/glTF/city/scene.gltf', loadMesh);

	initGUI();
	
	render();
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadMesh(loadedMesh) {
		
	const root = loadedMesh.scene;
	root.name = "city";
	scene.add(root);
	setMaterial(root);
	
	const helper = new THREE.BoxHelper();
	helper.setFromObject(root);

	helper.geometry.computeBoundingBox();

	const max = helper.geometry.boundingBox.max;
	const min = helper.geometry.boundingBox.min;
	
	camera.position.x = max.x;
	camera.position.y = max.y;
	camera.position.z = max.z;
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));

	var farPlane = Math.max(	(max.x - min.x),
								(max.y - min.y),
								(max.z - min.z) );

	camera.far 	= farPlane*10.0;
	camera.updateProjectionMatrix();

	orbitControls.update();
	
	//Add point light Source
	var pointLight1 = new THREE.PointLight(new THREE.Color(1.0, 1.0, 1.0));
	pointLight1.distance = 0.0;
	pointLight1.position.set(	max.x*1.2, 
								max.y*1.2, 
								max.z*1.2);
	scene.add(pointLight1);
	
	// Global Axis
	var globalAxis = new THREE.AxesHelper	( Math.max(	(max.x - min.x),
														(max.y - min.y),
														(max.z - min.z)
				  									  )
											);
	scene.add( globalAxis );
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function initGUI() {
	
	controls = 	{	guiZBuffer	: true,
					guiCulling	: "FrontFace",
				};

	gui.add( controls, 'guiZBuffer').onChange(event => 	{ updateMaterial(scene.getObjectByName("city")); } );
	gui.add( controls, 'guiCulling', [ 	"FrontFace", 
										"BackFace", 
										"DoubleSide" ] ).onChange(event => { updateMaterial(scene.getObjectByName("city")); } );
	gui.open();
		
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function render() {
	var delta = clock.getDelta();
    orbitControls.update(delta);

	renderer.render(scene, camera);
	requestAnimationFrame(render);
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function setMaterial(obj, isLast = true) {
	const lastNdx = obj.children.length - 1;

	switch (obj.name) {
		case 'mesh_0' 	: 	obj.material = new THREE.MeshPhongMaterial({ color : 0xff0000 });
							break;
		case 'mesh_1' 	: 	obj.material = new THREE.MeshPhongMaterial({ color : 0x00ff00 });
							break;
		case 'mesh_2' 	: 	obj.material = new THREE.MeshPhongMaterial({ color : 0x0000ff });
							break;
		default			: 	obj.material = new THREE.MeshPhongMaterial({ color : 0xffffff });
							break;
		}

	obj.children.forEach((child, ndx) => 	{	const isLast = ndx === lastNdx;
									    		setMaterial(child, isLast);
										  	} );
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function updateMaterial(obj, isLast = true) {
	const lastNdx = obj.children.length - 1;

	if (obj.type == 'Mesh') {

		obj.material.depthTest = controls.guiZBuffer;;

		switch( controls.guiCulling ) {
			case "FrontFace"	: 	obj.material.side = THREE.FrontSide; 
									break;
			case "BackFace"		: 	obj.material.side = THREE.BackSide; 
									break;
			case "DoubleSide"	: 	obj.material.side = THREE.DoubleSide; 
									break;
			}
		}
	obj.children.forEach((child, ndx) => 	{	const isLast = ndx === lastNdx;
									    		updateMaterial(child, isLast);
										  	} );
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
