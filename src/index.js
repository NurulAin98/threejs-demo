// A THREE.js Environment is made up of 5 things:
// - Renderer (what the user sees)
// - Scene (the data)
// - Camera (the perspective)
// - Meshes (objects in the 3D world)
// - Lights

const THREE = require("three");

function createRenderer() {
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#16161d");
  let output = document.querySelector("#output");
  output.appendChild(renderer.domElement);
  return renderer;
}

function createScene() {
    return new THREE.Scene();
}

function createCamera() {
    let camera = new THREE.PerspectiveCamera(
        45, // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near value
        1000, // Far value
    );
    camera.position.set(-30, 40, 30); // x, y, z
    camera.lookAt(0, 0, 0);
    return camera;
}

function createAxesHelper() {
    let axesHelper = new THREE.AxesHelper(40);
    return axesHelper;
}

function createCube() {
    // Geometry - The actual shape/skeleton of the object
    let geometry = new THREE.BoxGeometry(4, 4, 4);
    // Material - the colour/how it interacts with light
    let material = new THREE.MeshLambertMaterial({
        color: "tomato",
    });
    // Create a mesh by combining the geometry and the material
    let mesh = new THREE.Mesh(geometry, material)
    // Retun it so we can add it to the scene
    return mesh;
}

function createSphere() {
    let geometry = new THREE.SphereGeometry(4, 30, 30);
    let material = new THREE.MeshLambertMaterial({
        color:"dodgerblue",
    });
    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function createLight() {
    let light = new THREE.PointLight("white", 1);
    return light;
}

function createLightHelper() {
    let helper = new THREE.PointLightHelper(light);
    return helper;
}

let renderer = createRenderer();
let scene = createScene();
let camera = createCamera();
let axesHelper = createAxesHelper();
let cube = createCube();
let sphere = createSphere();
let light = createLight();
let lightHelper = createLightHelper(light);

light.position.x = 10;
light.position.y = 10;
light.position.z = 10;

sphere.position.x = 20;

scene.add(axesHelper);
scene.add(cube, sphere, light, lightHelper);

renderer.render(scene, camera);

function animate() {
    light.position.x += 0.1
    //cube.position.x += 0.1;
    //cube.rotation.x += 0.1
    // Muck around with the axes
    // Increment and decrement the x, y, z
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

