import { Group, Scene } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import MODEL from "./Kid.obj";
import MATERIAL from "./Kid.mtl";
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from "three";
import POSX from "./textures/FishPond/posx.jpg";
import NEGX from "./textures/FishPond/negx.jpg";
import POSY from "./textures/FishPond/posy.jpg";
import NEGY from "./textures/FishPond/negy.jpg";
import POSZ from "./textures/FishPond/posz.jpg";
import NEGZ from "./textures/FishPond/negz.jpg";
import WHITE from "./textures/white/white.png";

class Kid extends Group {
  constructor(parent, x, y, z, scale, hexColor, transparent) {
    // Call parent Group() constructor
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
      bob: true,
      spin: this.spin.bind(this),
      twirl: 0,
  };
  
  this.x = x;
  this.y = y;
  this.z = z;

    this.name = "kid";
    

    var kidMaterial = new THREE.MeshPhongMaterial({
      color: hexColor,
      envMap: parent.background,
      refractionRatio: 0.6,
      specular: 0xffffff,
      shininess: 1000
    });
    kidMaterial.envMap.mapping = THREE.CubeRefractionMapping;
    
    // if (!transparent) {
    //   kidMaterial = new THREE.MeshPhongMaterial({
    //     // color: 0x696969,
    //     // color: 0xff3333,
    //     color: hexColor,
    //     // envMap: envMap, // optional environment map
    //     // specular: 0xffe3e0,
    //     specular: 0xffffff,
    //     shininess: 1000
    //   });
    // }
    // else {
    //   var loader = new THREE.CubeTextureLoader();

    //   // var textureCube = loader.load( [
    //   //   POSX, NEGX,
    //   //   POSY, NEGY,
    //   //   POSZ, NEGZ
    //   // ] );

    //   var textureCube = loader.load( [
    //     WHITE, WHITE,
    //     WHITE, WHITE,
    //     WHITE, WHITE
    //   ] );

    //   kidMaterial = new THREE.MeshPhongMaterial({
    //     color: 0xff3333,
    //     envMap: parent.background,
    //     refractionRatio: 0.8
    //   });
    //   kidMaterial.envMap.mapping = THREE.CubeRefractionMapping;
    // }

    // Load material and object
    const objloader = new OBJLoader();
    const mtlLoader = new MTLLoader();
    var pivot;
    objloader.setMaterials(mtlLoader.parse(MATERIAL)).load(MODEL, obj => {
      // obj.translateX(x);
      // obj.translateY(y);
      // obj.translateZ(z);

      obj.position.set(0, -1, 0);
      obj.rotation.set(0, Math.PI, 0);
      obj.scale.multiplyScalar(scale);
      // obj.rotateX(-Math.PI / 6);
      // obj.rotateY(Math.PI);
      obj.children[0].material = kidMaterial;

      pivot = new THREE.Group();
      pivot.position.set( x, y, z );

      obj.matrixAutoUpdate = false;
      obj.updateMatrix();
      
      this.add(obj);
      this.add(pivot);
      
      pivot.add(obj);

      // visualiz pivot
      // var pivotSphereGeo = new THREE.SphereGeometry( 0.1 );
      // var pivotSphere = new THREE.Mesh(pivotSphereGeo);
      // pivotSphere.position.set(pivot.position.x, pivot.position.y, pivot.position.z );
      // parent.add( pivotSphere );
      
      // parent.add( new THREE.AxesHelper() );

      this.pivot = pivot;
      this.obj = obj;
      parent.add(pivot);

    });
    
    parent.addToUpdateList(this);
    

    // Populate GUI
    // this.state.gui.add(this.state, 'bob');
    // this.state.gui.add(this.state, 'spin');
  }

  spin() {
    // Add a simple twirl
    this.state.twirl += 200 + Math.PI;

    // Use timing library for more precice "bounce" animation
    // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
    // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html

    const jumpUp = new TWEEN.Tween(this.pivot.position)
        .to({ y: this.pivot.position.y + 2 }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out);
    const fallDown = new TWEEN.Tween(this.pivot.position)
        .to({ y: this.y }, 1000)
        .easing(TWEEN.Easing.Quadratic.In);

    // Fall down after jumping up
    jumpUp.onComplete(() => fallDown.start());

    // Start animation
    jumpUp.start();
}

  update(timeStamp) {
    // if (this.state.bob) {
      // Bob back and forth
      this.rotation.z = 0.01 * Math.sin(timeStamp / 300);
  //  }
    if (this.state.twirl > 0) {
      // Lazy implementation of twirl
      //80
      this.state.twirl -= Math.PI / 80;
      this.pivot.rotation.x += Math.PI / 80;
      // console.log(this.pivot);
  }
    // this.rotateY(-0.02);
    TWEEN.update();
  }
}

export default Kid;
