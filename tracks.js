var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

var light = new THREE.AmbientLight(0xffffff, 0.1);
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

function animate() {
    // delta += 0.01;
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();