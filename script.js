import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const width = window.innerWidth / 2;
const height = window.innerHeight / 2;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const canvas = document.getElementById("canvas");
let movement = .01;

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
    strafe(cube);
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