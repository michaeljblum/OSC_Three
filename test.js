function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
  
    function makeScene(elem) {
      const scene = new THREE.Scene();
  
      const fov = 45;
      const aspect = 2;  // the canvas default
      const near = 0.1;
      const far = 5;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 1, 2);
      camera.lookAt(0, 0, 0);
  
      {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
      }
  
      return {scene, camera, elem};
    }
  
    function setupScene1() {
      const sceneInfo = makeScene(document.querySelector('#box'));
      const geometry = new THREE.BoxBufferGeometry(.5, .5, .5);
      const material = new THREE.MeshPhongMaterial({color: 'aqua'});
      const mesh = new THREE.Mesh(geometry, material);
      sceneInfo.scene.add(mesh);
      sceneInfo.mesh = mesh;
      return sceneInfo;
    }
  
    function setupScene2() {
      const sceneInfo = makeScene(document.querySelector('#pyramid'));
      const radius = .5;
      const widthSegments = 100;
      const heightSegments = 100;
      const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
      const material = new THREE.MeshPhongMaterial({
        color: 'pink',
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      sceneInfo.scene.add(mesh);
      sceneInfo.mesh = mesh;
      return sceneInfo;
    }

    function setupScene3() {
      const sceneInfo = makeScene(document.querySelector('#obelisk'));

//       let loader = new THREE.GLTFLoader().setPath( 'models/track/' );

//       loader.load( 'model.gltf', function ( gltf ) {
//           const mesh = new THREE.Mesh( gltf.scene )
//           sceneInfo.scene.add(mesh)
//           sceneInfo.mesh = mesh;
//   } );

      const radius = .5;
      const widthSegments = 20;
      const heightSegments = 1;
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
      time *= 0.001;
  
      resizeRendererToDisplaySize(renderer);
  
      renderer.setScissorTest(false);
      renderer.clear(true, true);
      renderer.setScissorTest(true);
  
      sceneInfo1.mesh.rotation.y = time * .1;
      sceneInfo2.mesh.rotation.y = time * .1;
      sceneInfo3.mesh.rotation.y = time * .1;
      sceneInfo4.mesh.rotation.y = time * .4;
  
      rendenerSceneInfo(sceneInfo1);
      rendenerSceneInfo(sceneInfo2);
      rendenerSceneInfo(sceneInfo3);
      rendenerSceneInfo(sceneInfo4);
  
      requestAnimationFrame(render);
    }
  
    requestAnimationFrame(render);
  }
  
  main();