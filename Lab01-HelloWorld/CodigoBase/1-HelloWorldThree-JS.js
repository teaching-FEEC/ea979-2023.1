// Hello World em Three.js

import * as THREE from 'three';

function main() {

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.getElementById("threejs-canvas").appendChild(renderer.domElement);
	document.getElementById("output-text").innerHTML += " (<i>release " + THREE.REVISION + "</i>)";	

	var scene 	= new THREE.Scene();
	var camera 	= new THREE.Camera();

	renderer.render(scene, camera);
};

main()
