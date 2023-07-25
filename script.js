import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const width = window.innerWidth / 2;
const height = window.innerHeight / 2;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const canvas = document.getElementById("canvas");
let movement = .01;

let keyMap = new Map();
let keys = [87, 68, 83, 65];
for (let num of keys) {
    keyMap.set(num, false);
}

renderer.setSize(width, height);
canvas.appendChild(renderer.domElement);

const cube = generateCube(1,1,1, 0x00FFF2);
const platform = generateCube(9,1,4, 0x808080);
scene.add(cube);
scene.add(platform);
platform.position.y -= 2;
cube.position.y -= 1;

camera.position.set(0,1,6);
camera.lookAt(new THREE.Vector3(0,0,0));

scene.background = new THREE.Color(0xFFFFFF);

function animate() {
    requestAnimationFrame(animate);

    if (keyMap[65]) {
        console.log("move forwad");
        cube.position.x -= 0.1;
    } else if(keyMap[68]) {
        cube.position.x += 0.1;
    } else if (keyMap[87]) {
        cube.position.z -= 0.1;
    } else if (keyMap[83]) {
        cube.position.z += 0.1;
    }

    renderer.render(scene, camera);
}

function strafe(object) {
    if (object.position.x < -4) {
        movement = .01;
    }
    if (object.position.x > 4) {
        movement = -.01;
    }
    console.log(movement);
    object.position.x += movement;
}

function generateCube(width, height, depth, color) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({color: color});
    return new THREE.Mesh(geometry, material);
}

animate();

$(document).on("keydown", function(e) {
    keyMap[e.keyCode] = true;
});

$(document).on("keyup", function(e) {
    keyMap[e.keyCode] = false;
});