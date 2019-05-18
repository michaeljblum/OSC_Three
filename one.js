var one = document.getElementById("box");
one.addEventListener('mousemove', onMouseMove, false)

var CANVAS_WIDTH = one.offsetWidth;
var CANVAS_HEIGHT = one.offsetHeight;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000 );

var light = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(light);
var light1 = new THREE.PointLight(0xffffff, .9);
light1.position.z = 50;
scene.add(light1);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
renderer.setPixelRatio(window.devicePixelRatio);
one.appendChild(renderer.domElement)



var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// var cube2 = new THREE.Mesh( geometry, material)

// scene.add(cube2)
// cube2.position.x = 3

camera.position.z = 500;

const domEvents = new THREEx.DomEvents( camera, renderer.domElement)
domEvents.addEventListener( cube, 'mouseover', e => material.wireframe = true )
domEvents.addEventListener( cube, 'mouseout', e => material.wireframe = false )

var controls = new THREE.OrbitControls( camera, renderer.domElement )
controls.minDistance = 1
controls.maxDistance = 1000

var loader = new THREE.GLTFLoader().setPath( 'models/head/' );

loader.load( 'scene.gltf', function ( gltf ) {
scene.add( gltf.scene );
// gltf.position = -4900
} );

// var delta = 0;
function animate() {
    // delta += 0.01;
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    controls.update()


    //the below code makes the camera swivel on all three axes while focusing on the position of a stationary object, in this case that of the cube in order to get the right effect, maybe sure to uncomment the two lines above pertaining to the delta, as well as change camera.position.z to camera.position.x
    // camera.lookAt(cube.position);
    // camera.position.x = Math.sin(delta) * 5;
    // camera.position.z = Math.cos(delta) * 5;
    // camera.position.y = Math.cos(delta) * 5;

}
animate();
function onMouseMove(event) {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (mouseY - camera.position.y) * 0.005;
    camera.lookAt(scene.position)
}