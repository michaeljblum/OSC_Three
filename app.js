var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

var light = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(light);
var light1 = new THREE.PointLight(0xffffff, .9);
light1.position.z = 5;
scene.add(light1);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild( renderer.domElement );

// update viewport on resize and keep intended/original aspect ratio
window.addEventListener( 'resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const domEvents = new THREEx.DomEvents( camera, renderer.domElement)
domEvents.addEventListener( cube, 'mouseover', e => material.wireframe = true )
domEvents.addEventListener( cube, 'mouseout', e => material.wireframe = false )

var controls = new THREE.OrbitControls( camera, renderer.domElement )
controls.minDistance = 1
controls.maxDistance = 1000

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

