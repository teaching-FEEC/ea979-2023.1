// Luz

import * as THREE 			from 'three';
import { OrbitControls } 	from '../../Assets/scripts/three.js/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } 		from '../../Assets/scripts/three.js/examples/jsm/loaders/OBJLoader.js';
import { TeapotGeometry } 	from '../../Assets/scripts/three.js/examples/jsm/geometries/TeapotGeometry.js';
import { GUI } 				from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js'

const   rendSize    	= new THREE.Vector2();

var 	scene 			= null;
var 	renderer		= null;
var 	camera 			= null;
var 	orbitControls	= null;
var 	params			= null;
var 	maxCoord;
var 	materials 		= []; 
var 	lights 			= [];
var 	helperLights 	= [];

const   tMats 			= 	{	BASIC		: 0,
	                           	STANDARD 	: 1,
	                            LAMBERT 	: 2,
	                           	PHONG     	: 3,
	                           	PHYSICAL	: 4,
	                           	TOON		: 5,
	                           	MATCAP      : 6,
	                     	   	DEPTH   	: 7,
	                           	NORMAL 		: 8,
	                        };

const 	tLights			=  	{	L_AMBIENT 		: 0,
								L_DIRECIONAL 	: 1,
								L_POINT  		: 2,
								L_SPOT  		: 3,
							}

var curLight 			= tLights.L_AMBIENT;

var clock  				= new THREE.Clock();
var gui 				= new GUI();

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function main() {

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);

    rendSize.x = window.innerWidth*0.7;
    rendSize.y = window.innerHeight*0.7;

    renderer.setSize(rendSize.x, rendSize.y);
    document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(70.0, rendSize.x/rendSize.y, 0.1, 30.0);
	
	orbitControls 	= new OrbitControls(camera, renderer.domElement);

	buildScene();
	initMaterials();
	initLights();
	initGUI();
			
	render();
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function render() {
	var delta = clock.getDelta();
    orbitControls.update(delta);

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function initMaterials() {

    for (let i = tMats.BASIC ; i <= tMats.NORMAL ; i++)
		switch (i) {
			case tMats.BASIC 	: 	materials[i] = new THREE.MeshBasicMaterial(	{ 	color 		: 0x708090 } );
									break;

			case tMats.STANDARD : 	materials[i] = new THREE.MeshStandardMaterial( {	color 		: 0x708090, 
																						flatShading : true 
																		  			} );
									break;

			case tMats.LAMBERT 	: 	materials[i] = new THREE.MeshLambertMaterial( {	color : 0x708090 } );
									break;

			case tMats.PHONG 	: 	materials[i] = new THREE.MeshPhongMaterial( {	color 		: 0x708090,
																					specular 	: 0xFFFF00,
																					reflectivity: 1.0,
																					shininess 	: 500.0 
																				});
									break;

			case tMats.PHYSICAL	: 	materials[i] = new THREE.MeshPhysicalMaterial( 	{	color 				: 0x708090,
																						metalness			: 0.7,
																						roughness			: 0.6,
																						clearcoat 			: 0.5,
																						clearcoatRoughness 	: 0.1
																					} );
									break;

			case tMats.TOON 	: 	materials[i] = new THREE.MeshToonMaterial();	
									break;

			case tMats.DEPTH 	: 	materials[i] = new THREE.MeshDepthMaterial();	
									break;

			case tMats.NORMAL 	: 	materials[i] = new THREE.MeshNormalMaterial();	
									break;
			}

}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function buildScene() {

	const teapot 		= new TeapotGeometry( 15, 18 );
	const mesh 			= new THREE.Mesh( teapot, materials[0] );
	mesh.name 			= "teapot";

	scene.add(mesh);

	var box 			= new THREE.Box3();
	box.setFromObject(mesh);

	// Adjust Camera Position and LookAt	
	maxCoord 			= Math.max(box.max.x,box.max.y,box.max.z);	

	camera.position.x 	= 
	camera.position.y 	= 
	camera.position.z 	= maxCoord;
	camera.far 			= new THREE.Vector3(	maxCoord*5, 
												maxCoord*5, 
												maxCoord*5).length();

	camera.lookAt(new THREE.Vector3(	(box.max.x + box.min.x) / 2.0,
										(box.max.y + box.min.y) / 2.0,
										(box.max.z + box.min.z) / 2.0 ));
	camera.updateProjectionMatrix();

	// Global Axis
	var globalAxis = new THREE.AxesHelper(maxCoord*1.3);
	scene.add( globalAxis );

	// Ground
	var groundMesh = new THREE.Mesh(	new THREE.PlaneBufferGeometry(	maxCoord*200.0, maxCoord*200.0, 50, 50), 
										new THREE.MeshPhongMaterial(	{	color 	: 0x556B2F,
																			side 	: THREE.DoubleSide,
																		} ));

	groundMesh.name 				= "ground";
	groundMesh.rotation.x 			= -Math.PI / 2;
	groundMesh.position.y 			= box.min.y * 1.1;

	scene.add(groundMesh);
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function initLights() {	

    for (let i = tLights.L_AMBIENT ; i <= tLights.L_SPOT ; i++) {
    	console.log(i);
		switch (i) {
			case tLights.L_AMBIENT 		: 	lights[i] = new THREE.AmbientLight( 0xFFFFFF, 1.0 );
											lights[i].name 			= "ambLight";
											lights[i].visible 		= true;
											helperLights[i]			= null;											
											break;

			case tLights.L_DIRECIONAL 	: 	lights[i] = new THREE.DirectionalLight( 0xFFFFFF, 1.0 ); 
											lights[i].name 			= "dirLight";
											lights[i].visible 		= false;
											lights[i].position.set( 0.0, 0.0, maxCoord );

											helperLights[i]			= new THREE.DirectionalLightHelper( lights[i], 4.0 );
											helperLights[i].name 	= "dirLightHlpr";
											helperLights[i].visible	= false;
											break;


			case tLights.L_POINT 	 	: 	lights[i] = new THREE.PointLight( 0xFFFFFF, 1.0 );
											lights[i].name 			= "pntLight";
											lights[i].visible 		= false;
											lights[i].position.set( 0.0, maxCoord*2.0 , 0.0);

											helperLights[i] 		= new THREE.PointLightHelper( lights[i]);
											helperLights[i].name 	= "pntLightHlpr";
											helperLights[i].visible	= false;
											break;

			case tLights.L_SPOT 		: 	lights[i] = new THREE.SpotLight( 0xFFFFFF, 1.0, 0.0, Math.PI/6 );
											lights[i].name 			= "sptLight";
											lights[i].visible 		= false;
											lights[i].position.set(maxCoord, maxCoord, 0.0 );

											helperLights[i] 		= new THREE.SpotLightHelper( lights[i] );
											helperLights[i].name 	= "sptLightHlpr";
											helperLights[i].visible	= false;
											console.log("****");
											break;

			}
		scene.add( lights[i] );
		if (helperLights[i])
			scene.add( helperLights[i] );
		}
}


/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function initGUI() {	
	params = 	{	luzOn		: true,
					tipoLuz		: "Ambiente",
					ShadeAlg	: "Basic"
				};

	gui.add( params, 'luzOn').onChange(function()	{ 	lights[curLight].visible = params.luzOn;
														if (helperLights[curLight])
															helperLights[curLight].visible = params.luzOn;
													});
	gui.add( params, 'tipoLuz', [ 	"Ambiente", 
									"Direcional", 
									"Pontual", 
									"Spot" ] ).onChange(changeLight);

	gui.add( params, 'ShadeAlg', [ 	"Basic",
									"Standard",
									"Lambert",
									"Phong",
									"Physical",
									"Toon",
									"Depth",
									"Normal" ] ).onChange(changeMaterial); 
	gui.open();
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function changeLight() { 

	lights[curLight].visible = false;

	if (helperLights[curLight])
		helperLights[curLight].visible = false;

	switch (params.tipoLuz) {
		case "Ambiente" 	: 	curLight 		= tLights.L_AMBIENT;
								break;

		case "Direcional" 	: 	curLight 		= tLights.L_DIRECIONAL;
								break;

		case "Pontual" 		: 	curLight 		= tLights.L_POINT;
								break;

		case "Spot" 		: 	curLight 		= tLights.L_SPOT;
								break;
		}

	if (params.luzOn) {

		lights[curLight].visible = true;

		if (helperLights[curLight])
			helperLights[curLight].visible = true;
		}
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function changeMaterial() { 

	let obj = scene.getObjectByName("teapot");

	switch (params.ShadeAlg) {
		case "Basic" 	: 	obj.material 				= materials[tMats.BASIC];
							obj.material.flatShading	= true;
							break;

		case "Standard"	: 	obj.material 				= materials[tMats.STANDARD];
							break;

		case "Lambert" 	: 	obj.material 				= materials[tMats.LAMBERT];
							break;

		case "Phong" 	: 	obj.material 				= materials[tMats.PHONG];
							break;

		case "Physical" : 	obj.material 				= materials[tMats.PHYSICAL];
							break;

		case "Toon" 	: 	obj.material 				= materials[tMats.TOON];
							break;

		case "Depth" 	: 	obj.material 				= materials[tMats.DEPTH];
							break;

		case "Normal" 	: 	obj.material 				= materials[tMats.NORMAL];
							break;

		};
};

main();
