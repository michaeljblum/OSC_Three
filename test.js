function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
    
  
    function makeScene(elem) {
      const scene = new THREE.Scene();
  
      const fov = 45;
      const aspect = 2;  // the canvas default
      const near = 0.1;
      const far = 1000;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 1, 2);
      camera.lookAt(0, 0, 0);
      
      var controls = new THREE.OrbitControls( camera, renderer.domElement )
      controls.minDistance = 1
      controls.maxDistance = 1000
        
      {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
      }

      return {scene, camera, elem, controls};
    }

    // function loadModels() {

    // }
  
    function setupScene1() {
      const sceneInfo = makeScene(document.querySelector('#box'));
      const geometry = new THREE.BoxBufferGeometry(.25, 3, .25);
      const material = new THREE.MeshPhongMaterial({color: 'orange'});
      const mesh = new THREE.Mesh(geometry, material);
      sceneInfo.scene.add(mesh);
      sceneInfo.mesh = mesh;
      return sceneInfo;
    }
  
    function setupScene2() {
      const sceneInfo = makeScene(document.querySelector('#pyramid'));
      const radius = .6;
      const widthSegments = 100;
      const heightSegments = 100;
      const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
      const material = new THREE.MeshPhongMaterial({
        color: 'purple',
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      sceneInfo.scene.add(mesh);
      sceneInfo.mesh = mesh;
      return sceneInfo;
    }

    function setupScene3() {
      const sceneInfo = makeScene(document.querySelector('#obelisk'));

      var loader = new THREE.GLTFLoader().setPath( 'models/head/' );

loader.load( 'scene.gltf', function ( gltf ) {
sceneInfo.scene.add( gltf.scene );
// gltf.position = -4900
} );


      // const radius = .7;
      // const widthSegments = 50;
      // const heightSegments = 1;
      // const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
      // const material = new THREE.MeshPhongMaterial({
      //   color: 'yellow',
      //   flatShading: true,
      // });
      // const mesh = new THREE.Mesh(geometry, material);
      // sceneInfo.scene.add(mesh);
      // sceneInfo.mesh = mesh;

      return sceneInfo;
    }

    function setupScene4() {
        const sceneInfo = makeScene(document.querySelector('#boat'));
        const radius = .4;
        const widthSegments = 100;
        const heightSegments = 100;
        const geometry = new THREE.BoxBufferGeometry(5.5,.5,.5);
        const material = new THREE.MeshPhongMaterial({
          color: 'red',
          flatShading: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        sceneInfo.scene.add(mesh);
        sceneInfo.mesh = mesh;
        return sceneInfo;
      }
  
    const sceneInfo1 = setupScene1();
    const sceneInfo2 = setupScene2();
    const sceneInfo3 = setupScene3();
    const sceneInfo4 = setupScene4();
  
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
  
    function rendenerSceneInfo(sceneInfo) {
      const {scene, camera, elem} = sceneInfo;
  
      // get the viewport relative position opf this element
      const {left, right, top, bottom, width, height} =
          elem.getBoundingClientRect();
  
      const isOffscreen =
          bottom < 0 ||
          top > renderer.domElement.clientHeight ||
          right < 0 ||
          left > renderer.domElement.clientWidth;
  
      if (isOffscreen) {
        return;
      }
  
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      
  
      const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
      renderer.setScissor(left, positiveYUpBottom, width, height);
      renderer.setViewport(left, positiveYUpBottom, width, height);
  
      renderer.render(scene, camera);
    }
  
    function render(time) {
      controls.update()
      time *= 0.001;
  
      resizeRendererToDisplaySize(renderer);
  
      renderer.setScissorTest(false);
      renderer.clear(true, true);
      renderer.setScissorTest(true);
  
      
      sceneInfo1.mesh.rotation.x = time * .4;
      sceneInfo1.mesh.rotation.y = time * .4;
      sceneInfo2.mesh.rotation.y = time * .1;
      sceneInfo2.mesh.rotation.z = time * .4;
      sceneInfo2.mesh.rotation.x = time * .1;
      // sceneInfo3.mesh.rotation.y = time * .4;
      // sceneInfo3.mesh.rotation.x = time * .4;
      sceneInfo4.mesh.rotation.y = time * .4;
      sceneInfo4.mesh.rotation.x = time * .4;
  
      rendenerSceneInfo(sceneInfo1);
      rendenerSceneInfo(sceneInfo2);
      rendenerSceneInfo(sceneInfo3);
      rendenerSceneInfo(sceneInfo4);
  
      requestAnimationFrame(render);
    }
  
    requestAnimationFrame(render);
    
  }
  
  main();

//   var one = document.getElementById("mask");
// var CANVAS_WIDTH = one.offsetWidth;
// var CANVAS_HEIGHT = one.offsetHeight;

// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000 );

// var light = new THREE.AmbientLight(0xffffff, 0.1);
// scene.add(light);
// var light1 = new THREE.PointLight(0xffffff, .9);
// light1.position.z = 50;
// scene.add(light1);

// var renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
// renderer.setPixelRatio(window.devicePixelRatio);
// one.appendChild(renderer.domElement)



// var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
// var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// // var cube2 = new THREE.Mesh( geometry, material)

// // scene.add(cube2)
// // cube2.position.x = 3

// camera.position.z = 500;

// const domEvents = new THREEx.DomEvents( camera, renderer.domElement)
// domEvents.addEventListener( cube, 'mouseover', e => material.wireframe = true )
// domEvents.addEventListener( cube, 'mouseout', e => material.wireframe = false )

// var controls = new THREE.OrbitControls( camera, renderer.domElement )
// controls.minDistance = 1
// controls.maxDistance = 1000

// var loader = new THREE.GLTFLoader().setPath( 'models/head/' );

// loader.load( 'scene.gltf', function ( gltf ) {
// scene.add( gltf.scene );
// // gltf.position = -4900
// } );

// // var delta = 0;
// function animate() {
//     // delta += 0.01;
// 	requestAnimationFrame( animate );
//     renderer.render( scene, camera );
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     cube.rotation.z += 0.01;

//     controls.update()


//     //the below code makes the camera swivel on all three axes while focusing on the position of a stationary object, in this case that of the cube in order to get the right effect, maybe sure to uncomment the two lines above pertaining to the delta, as well as change camera.position.z to camera.position.x
//     // camera.lookAt(cube.position);
//     // camera.position.x = Math.sin(delta) * 5;
//     // camera.position.z = Math.cos(delta) * 5;
//     // camera.position.y = Math.cos(delta) * 5;

// }
// animate();