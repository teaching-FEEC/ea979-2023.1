// Mapeamento de Texturas 

import * as THREE           from 'three';
import { OrbitControls }    from '../../Assets/scripts/three.js/examples/jsm/controls/OrbitControls.js';
import { GUI }              from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js'


const   rendSize    = new THREE.Vector2();

var     renderer,
        scene,
        camera,
        cameraControl,
        params;

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function main() {

    var clock = new THREE.Clock();

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
    document.body.appendChild(renderer.domElement);

    camera                  = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x       = 25;
    camera.position.y       = 10;
    camera.position.z       = 63;
    camera.lookAt(scene.position);

    cameraControl           = new OrbitControls(camera, renderer.domElement);
    cameraControl.enablePan = false;

    loadTextures();
    
    // Luz ambiente
    var ambientLight    = new THREE.AmbientLight(0x111111);
    ambientLight.name   = 'ambient';
    scene.add(ambientLight);

    // Luz do sol
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set( 3, 3, 3 ).normalize();
    directionalLight.name = 'directional';
    scene.add(directionalLight);

    render();
}

function loadTextures() {

    // cria Mapeamento de Ambiente
    const path          = "../../Assets/Textures/Cubemaps/Space/blue/";
    const textCubeMap   =    [  path + "bkg1_right.png", 
                                path + "bkg1_left.png",
                                path + "bkg1_top.png", 
                                path + "bkg1_bot.png",
                                path + "bkg1_front.png", 
                                path + "bkg1_back.png"
                            ];

    const textureCube       = new THREE.CubeTextureLoader().load( textCubeMap );
    scene.background        = textureCube;

    const earthTexture      = new THREE.TextureLoader().load(   "../../Assets/Textures/solarSystem/2k-images/2k_earth_daymap.jpg", 
                                                                loadedPlanet);
    const cloudTexture      = new THREE.TextureLoader().load(   "../../Assets/Textures/solarSystem/2k-images/earthcloudmapspec.jpg", 
                                                                loadedCloud);
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadedPlanet(texture) {

    const earthMesh         = new THREE.Mesh (  new THREE.SphereGeometry(15, 60, 60),
                                                new THREE.MeshPhongMaterial( { map: texture})
                                                );
    earthMesh.name = "planetMesh";
    scene.add(earthMesh);

}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadedCloud(texture) {

    const cloudMesh         = new THREE.Mesh(   new THREE.SphereGeometry(15.2, 60, 60),
                                                new THREE.MeshPhongMaterial( { map          :   texture,
                                                                               transparent  :   true,
                                                                               opacity      :   0.8,
                                                                               blending     :   THREE.AdditiveBlending 
                                                                            } )
                                                );
    cloudMesh.name = "cloudMesh";
    scene.add(cloudMesh);
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function render() {

    cameraControl.update();

    var earthMesh   = scene.getObjectByName("planetMesh");
    var cloudMesh   = scene.getObjectByName("cloudMesh");

    if (earthMesh)
	   earthMesh.rotation.y+=0.0002;

    if (cloudMesh)
	   cloudMesh.rotation.y+=0.0006;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
