const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-115,115,-50);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

function addStar(){
	const geometry = new THREE.SphereGeometry(0.1,1,1);
	const material = new THREE.MeshStandardMaterial( {color: Math.random() * 0xffffff} );
	const star = new THREE.Mesh( geometry, material );

	const [x,y,z] = Array(3).fill().map(() => THREE.Math.randFloatSpread(150));
	star.position.set(x,y,z-30);
	scene.add(star);
}

Array(400).fill().forEach(addStar);

const earTxt = new THREE.TextureLoader().load('../img/earth.jpg');
const earNor = new THREE.TextureLoader().load('../normal/earthNorm.jpg');
const earthGeo = new THREE.SphereGeometry(10,35,35);
const earthMat = new THREE.MeshStandardMaterial( {map: earTxt, normalMap: earNor} );
const earth = new THREE.Mesh( earthGeo, earthMat);
earth.position.setZ(-20);
scene.add(earth);

function moveCamera() {
	const t = document.body.getBoundingClientRect().top;
	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.rotation.y = t * -0.0002;
  }

  document.body.onscroll = moveCamera;
moveCamera();


function animate(){
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  earth.rotation.x += 0.00003;
earth.rotation.y += 0.0001;
earth.rotation.z -= 0.00003;
}
animate();

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);