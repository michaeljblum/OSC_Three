var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 20
camera.position.y = 5
camera.position.x = -5


var light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

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

var loader = new THREE.GLTFLoader().setPath( 'models/track/' );

loader.load( 'model.gltf', function ( gltf ) {
scene.add( gltf.scene );
} );

var controls = new THREE.OrbitControls( camera, renderer.domElement )
controls.minDistance = 1
controls.maxDistance = 1000

function animate() {
    // delta += 0.01;
	requestAnimationFrame( animate );
    renderer.render( scene, camera );

    controls.update()
}
animate();