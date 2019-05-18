'use strict';
/* global THREE */
function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
  const sceneElements = [];
  function addScene(elem, fn) {
    sceneElements.push({elem, fn});
  }
  function makeScene(elem) {
    const scene = new THREE.Scene();
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 1, 2);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const controls = new THREE.TrackballControls(camera, elem);
    controls.noZoom = true;
    controls.noPan = true;
    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }
    return {scene, camera, controls};
  }
  const sceneInitFunctionsByName = {
    'box': (elem) => {
      const {scene, camera, controls} = makeScene(elem);

    //   const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    //   const material = new THREE.MeshPhongMaterial({color: 'red'});
    //   const mesh = new THREE.Mesh(geometry, material);
    //   scene.add(mesh);

    var loader = new THREE.GLTFLoader().setPath( 'models/bell_krater/' );

    loader.load( 'scene.gltf', function ( gltf ) {
    scene.add( gltf.scene );
    
    } );
    camera.position.z = 900;

      return (time, rect) => {
        // mesh.rotation.y = time * .1;
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        controls.handleResize();
        controls.update();
        renderer.render(scene, camera);
      };
    },
    'pyramid': (elem) => {
      const {scene, camera, controls} = makeScene(elem);
    //   const radius = .8;
    //   const widthSegments = 4;
    //   const heightSegments = 2;
    //   const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
    //   const material = new THREE.MeshPhongMaterial({
    //     color: 'blue',
    //     flatShading: true,
    //   });
    //   const mesh = new THREE.Mesh(geometry, material);
    //   scene.add(mesh);
    var loader = new THREE.GLTFLoader().setPath( 'models/head/' );

    loader.load( 'scene.gltf', function ( gltf ) {
    scene.add( gltf.scene );
    
    } );
    camera.position.z = 500;

      return (time, rect) => {
        // mesh.rotation.y = time * .1;
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        controls.handleResize();
        controls.update();
        renderer.render(scene, camera);
      };
    },
    'mask': (elem) => {
      const {scene, camera, controls} = makeScene(elem);
    //   const radius = .8;
    //   const widthSegments = 4;
    //   const heightSegments = 2;
    //   const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
    //   const material = new THREE.MeshPhongMaterial({
    //     color: 'blue',
    //     flatShading: true,
    //   });
    //   const mesh = new THREE.Mesh(geometry, material);
    //   scene.add(mesh);
    var loader = new THREE.GLTFLoader().setPath( 'models/wooden_figure/' );

    loader.load( 'scene.gltf', function ( gltf ) {
    scene.add( gltf.scene );
    
    } );
    camera.position.z = 500;

      return (time, rect) => {
        // mesh.rotation.y = time * .1;
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        controls.handleResize();
        controls.update();
        renderer.render(scene, camera);
      };
    },
  };
  document.querySelectorAll('[data-diagram]').forEach((elem) => {
    const sceneName = elem.dataset.diagram;
    const sceneInitFunction = sceneInitFunctionsByName[sceneName];
    const sceneRenderFunction = sceneInitFunction(elem);
    addScene(elem, sceneRenderFunction);
  });
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
  const clearColor = new THREE.Color('#000');
  function render(time) {
    time *= 0.001;
    resizeRendererToDisplaySize(renderer);
    renderer.setScissorTest(false);
    renderer.setClearColor(clearColor, 0);
    renderer.clear(true, true);
    renderer.setScissorTest(true);
    
    for (const {elem, fn} of sceneElements) {
      // get the viewport relative position opf this element
      const rect = elem.getBoundingClientRect();
      const {left, right, top, bottom, width, height} = rect;
      const isOffscreen =
          bottom < 0 ||
          top > renderer.domElement.clientHeight ||
          right < 0 ||
          left > renderer.domElement.clientWidth;
      if (!isOffscreen) {
        const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
        renderer.setScissor(left, positiveYUpBottom, width, height);
        renderer.setViewport(left, positiveYUpBottom, width, height);
        fn(time, rect);
      }
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
main();