// Mapeamento de Texturas 

import * as THREE		from 'three';
import { OrbitControls }	from '../../Assets/scripts/three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } 		from '../../Assets/scripts/three.js/examples/jsm/loaders/GLTFLoader.js';

const   rendSize    = new THREE.Vector2();

var     renderer,
        scene,
        camera,
        cameraControl,
        skin,
        bump;

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = 
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.9;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	camera = new THREE.PerspectiveCamera(45, rendSize.x / rendSize.y, 0.1, 100);

	cameraControl 		= new OrbitControls(camera, renderer.domElement);

	scene.add( new THREE.HemisphereLight( 0xffffff, 0x111111 ) );

	skin			= new THREE.TextureLoader().load("../../Assets/Models/glTF/LeePerrySmith/Map-COL.jpg");

	normal			= new THREE.TextureLoader().load("../../Assets/Models/glTF/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg");

	var objectLoader 	= new GLTFLoader().load("../../Assets/Models/glTF/LeePerrySmith/LeePerrySmith.glb", loadMesh);

	render();
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadMesh(gltf) {

	const material 		= new THREE.MeshPhongMaterial( {	map 		:skin,
									normalMap 	: normal,
									normalMapType 	: THREE.TangentSpaceNormalMap } );	

	var mesh = new THREE.Mesh( gltf.scene.children[ 0 ].geometry, material );

	mesh.name = "face";

	scene.add( mesh );
	
	const box = new THREE.Box3().setFromObject(mesh);
	
	camera.position.x = 0.0;
	camera.position.y = box.max.y / 2.0;
	camera.position.z = box.max.z * 4.0;
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	
	const farPlane = Math.max(	(box.max.x - box.min.x),
								(box.max.y - box.min.y),
								(box.max.z - box.min.z) );
	camera.near = 0.01;
	camera.far = farPlane*10.0;
	camera.updateProjectionMatrix();

	// Global Axis
	var globalAxis = new THREE.AxesHelper(farPlane);
	scene.add( globalAxis );

	cameraControl.update();
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function render() {

	cameraControl.update();

	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
