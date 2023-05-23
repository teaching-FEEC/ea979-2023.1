// Mapeamento de Texturas 

import * as THREE       from 'three';
import { OrbitControls }    from '../../Assets/scripts/three.js/examples/jsm/controls/OrbitControls.js';

const   rendSize    = new THREE.Vector2();

var     renderer,
        scene,
        camera,
        cameraControl;

function main() {

    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

    rendSize.x = window.innerWidth*0.8;
    rendSize.y = window.innerHeight*0.8;

    renderer.setSize(rendSize.x, rendSize.y);

    document.body.appendChild(renderer.domElement);

    scene   = new THREE.Scene();

    camera              = new THREE.PerspectiveCamera(45, rendSize.x / rendSize.y, 0.1, 1000);
    camera.position.x   = 25;
    camera.position.y   = 10;
    camera.position.z   = 63;
    camera.lookAt(scene.position);

    cameraControl           = new OrbitControls(camera, renderer.domElement);
    cameraControl.enablePan = false;
    
    // cria Mapeamento de Ambiente
    const path          = "../../Assets/Textures/Cubemaps/Trees/";
    const textCubeMap   =    [  path + "posx.jpg", 
                                path + "negx.jpg",
                                path + "posy.jpg", 
                                path + "negy.jpg",
                                path + "posz.jpg", 
                                path + "negz.jpg"
                            ];

    const textureCube   = new THREE.CubeTextureLoader().load( textCubeMap );
    textureCube.mapping = THREE.CubeReflectionMapping;
    scene.background    = textureCube;

    // cria esfera espelhada
    const mirrorSphereMesh              = new THREE.Mesh(   new THREE.SphereGeometry(15, 60, 60), 
                                                            new THREE.MeshPhongMaterial( { envMap : textureCube } ));
    scene.add(mirrorSphereMesh);

    // Luz ambiente
    var ambientLight    = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.name   = 'ambient';
    scene.add(ambientLight);

    render();
}

function render() {

    cameraControl.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

main();
