// Scene setups
var SW = window.innerWidth, SH = window.innerHeight;
var scene = new THREE.Scene();  // scene
var camera, renderer;           // camera, render


// Variable declarations
var loader;                                  // Declare texture loader
var texture1, texture2, texture3, texture4;   // Declare textures
var ice_mat, cone_mat;                       // Declare mesh materials 
var sphere, cone;                            // Declare objects


var material = new THREE.ShaderMaterial( {
  vertexShader: document.getElementById( 'vertexShader' ).textContent,
  fragmentShader: document.getElementById( 'fragmentShader' ).textContent
});


// Call functions
loadTextures();   // Load textures
init();           // Initialize scene and declare objects
render();         // Render scene


// Intialize scene
function init() {

  // SET camera
  camera = new THREE.PerspectiveCamera(60, SW / SH, 0.1, 1000);
  camera.position.z = 5;


  // SET renderer
  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(SW, SH);
  document.body.appendChild(renderer.domElement);


  // ADD lights to scene
  var ambient = new THREE.AmbientLight(0xffffff);
  var spot = new THREE.SpotLight( 0xffffff, 1);
  var point = new THREE.DirectionalLight( 0xD3D3D3 );
  //spot.position.set( 0, 0, 0 );
  //scene.add( spot );
  scene.add( ambient );
  scene.add( point );

  // Try to make icecream look more specular
  // import project code for phong? glsl

  // Melting: have sphere shrink inwards
  // Have UV mapping move downwards with icecream?

  // DEFINE mesh materials
  icemat = new THREE.MeshPhongMaterial({      // Ice cream material
      map: texture1,
      color: 0xe8e4c9,
      transparent: false,
      bumpMap: texture1,
      bumpScale: 0.15,
      displacementMap: texture2,
      displacementScale: 0.01
    });
  cone_mat = new THREE.MeshPhongMaterial({    // Cone material
      map: texture3,
      color: 0xe1c699,
      transparent: false,
      bumpMap: texture3,
      bumpScale: 0.5
    });


  // DEFINE meshes

  // Scoop mesh
  var sphere_geometry = new THREE.SphereGeometry(0.1, 128, 128);
  var material = new THREE.MeshNormalMaterial();
  sphere = new THREE.Mesh(sphere_geometry, icemat);
  sphere.position.y = 1;
  sphere.castShadow = true;

  // Cone mesh
  var cone_geo = new THREE.ConeGeometry(0.7, 2.5, 10);
  cone = new THREE.Mesh(cone_geo, cone_mat);
  cone.scale.y = -1;
  cone.position.y = -.75;
  cone.geometry.computeVertexNormals(true);
  cone.castShadow = true;


  // Add the new objects to the scene
  scene.add(cone);
  scene.add(sphere);

}


// Helper function: loads textures
function loadTextures() {

  loader = new THREE.TextureLoader();
    loader.crossOrigin = "";

  // var texture1 = loader.load('https://dairystore.unl.edu/images/IceCreamswatch/120508_Strawberry_Cheesecake_007.jpg');
  texture1 = loader.load('https://1.bp.blogspot.com/-wDFbkfBw0A4/U1MtNZRxNCI/AAAAAAAAcYI/0Psjl14hlVU/s1600/haagen-daz-green-tea-ice-cream-03.JPG');
  texture2 = loader.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25NP9-fIGRiZQlVpOasRPML3wOTtB6Rm0hTelEHr9EtyaOGSNHQ');
  texture3 = loader.load("https://st.depositphotos.com/1003495/1932/i/950/depositphotos_19328199-stock-photo-wafer-texture.jpg");
    texture3.wrapS = THREE.RepeatWrapping;
    texture3.wrapT = THREE.RepeatWrapping;
  texture4 = loader.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGVtyLH5YjAK0MDfe-esJbRY0Rev2Oe6aOGSo7XPhcZaOiyRVbIQ');

}

// Helper: Distorts vertices of the sphere mesh overtime
function update() {

  var time = performance.now() * 0.0009;    // Time interval
  var k = 2;                                // # of distortion sites

  // Iterate through every vertex
  for (var i = 0; i < sphere.geometry.vertices.length; i++) {
    var p = sphere.geometry.vertices[i];
    p.normalize();

    // distort top portion of sphere s.t. it goes inward, along the normal
    // check if you can retrieve mesh normals

    // technical work
    // - own custonm glsl shaders
    // - marching cubes
    // - UI to change settings - more like a demo
    //change the texture mapping


    // Rescale
    p.multiplyScalar(0.95 + -1 * 0.005 * noise.perlin3(k*p.x, k*p.y + time, k*p.z));
    
    // Deform sphere by "melting" sphere from top-down; reposition vertex
    if (p.y > -0.75) {
      p.y -= 2 * 1/i;
    }

    // if (i <= sphere.geometry.vertices.length/2) {
    //   p.x -= 0.000000001 * i;
    // } else {
    //   p.x += 0.000000001 * i;
    // }
  }

  sphere.geometry.verticesNeedUpdate = true;
  sphere.geometry.computeVertexNormals();
  sphere.geometry.normalsNeedUpdate = true;

}


// Loop + render
function render() {

  update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  
}