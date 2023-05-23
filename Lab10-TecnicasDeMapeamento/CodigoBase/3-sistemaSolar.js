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

var     planetaMat      = [];

const   planetas =      {   MERCURIO    : 0,
                            VENUS       : 1,
                            TERRA       : 2,
                            MARTE       : 3,
                            JUPITER     : 4,
                            SATURNO     : 5,
                            URANO       : 6,
                            NETUNO      : 7,
                            SOL         : 8,
                            LUA         : 9,
                        }

var textPath = "../../Assets/Textures/solarSystem/2k-images/";

var texturas    =   [   "2k_mercury.jpg",
                        "2k_venus_surface.jpg",
                        "2k_earth_daymap.jpg",
                        "2k_mars.jpg",
                        "2k_jupiter.jpg",
                        "2k_saturn.jpg",
                        "2k_neptune.jpg",
                        "2k_uranus.jpg",
                        "2k_sun.jpg",
                        "2k_moon.jpg"
                    ];

var ringsText,
    ringsMat;

var gui             = new GUI();

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

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 40;
    camera.lookAt(scene.position);
    cameraControl = new OrbitControls(camera, renderer.domElement);

    createPlanetsMaterial();
    initGUI();

    // cria esfera dos planetas
    let malhaPlaneta        = new THREE.Mesh(   new THREE.SphereGeometry(15, 60, 60), 
                                                planetaMat[planetas.MERCURIO]
                                            );
    malhaPlaneta.name   = "planeta";
    scene.add(malhaPlaneta);

    let ringsGeom = new THREE.RingGeometry( 25, 35, 60 );
    var pos = ringsGeom.attributes.position;
    var v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++){
        v3.fromBufferAttribute(pos, i);
        ringsGeom.attributes.uv.setXY(i, v3.length() < 26 ? 0 : 1, 1);
        }

    let rings = new THREE.Mesh  ( ringsGeom, ringsMat );
    rings.name = "rings";
    rings.visible = false;
    rings.rotateX(Math.PI / 2.0);

    malhaPlaneta.add(rings);

    // Luz ambiente
    var ambientLight    = new THREE.AmbientLight(0x111111);
    ambientLight.name   = 'ambient';
    scene.add(ambientLight);

    // Luz do sol
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set( 3.0, 3.0, 0.0 ).normalize();
    directionalLight.name = 'directional';
    scene.add(directionalLight);

    render();
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function createPlanetsMaterial() {

    var planetasTexturas = [];
    
    var textureLoader   = new THREE.TextureLoader();
    textureLoader.path = textPath;

    for (var i = planetas.MERCURIO ; i <= planetas.LUA ; i++)
        planetasTexturas[i] = textureLoader.load(texturas[i]);

    for (i = planetas.MERCURIO ; i <= planetas.LUA ; i++)
        planetaMat[i]   = new THREE.MeshPhongMaterial( { map : planetasTexturas[i]});

    ringsText   = textureLoader.load("2k_saturn_ring_alpha.png");
    ringsMat    = new THREE.MeshPhongMaterial( {    map         : ringsText, 
                                                    transparent : true,
                                                    side        : THREE.DoubleSide });
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function render() {

    cameraControl.update();

    let p = scene.getObjectByName("planeta");

	p.rotation.y+=0.0005;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function initGUI() {    
    params =    {   planeta : "Mercurio"
                };

    gui.add( params, 'planeta', [   "Mercurio", 
                                    "Venus", 
                                    "Terra", 
                                    "Marte",
                                    "Jupiter",
                                    "Saturno",
                                    "Netuno",
                                    "Urano",
                                    "Lua", 
                                    "Sol" ] ).onChange(mudaPlaneta);
    gui.open();
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function mudaPlaneta() {
    let obj     = scene.getObjectByName("planeta");
    scene.getObjectByName("rings").visible = false;

    switch (params.planeta) {
        case "Mercurio" :   obj.material = planetaMat[planetas.MERCURIO];
                            break;

        case "Venus"    :   obj.material = planetaMat[planetas.VENUS];
                            break;

        case "Terra"    :   obj.material = planetaMat[planetas.TERRA];
                            break;

        case "Marte"    :   obj.material = planetaMat[planetas.MARTE];
                            break;

        case "Jupiter"  :   obj.material = planetaMat[planetas.JUPITER];
                            break;

        case "Saturno"  :   obj.material = planetaMat[planetas.SATURNO];
                            scene.getObjectByName("rings").visible = true;
                            break;

        case "Urano"    :   obj.material = planetaMat[planetas.URANO];
                            break;

        case "Netuno"   :   obj.material = planetaMat[planetas.NETUNO];
                            break;

        case "Sol"      :   obj.material = planetaMat[planetas.SOL];
                            break;

        case "Lua"      :   obj.material = planetaMat[planetas.LUA];
                            break;
        };
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();
