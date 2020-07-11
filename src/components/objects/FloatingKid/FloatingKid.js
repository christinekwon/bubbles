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

class FloatingKid extends Group {
  constructor(parent) {
    // Call parent Group() constructor
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
      bob: true,
      // spin: this.spin.bind(this),
      twirl: 0,
  };
  
    this.name = "floatingkid";

    var kidMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      envMap: parent.background,
      refractionRatio: 0.9,
      specular: 0xffffff,
      shininess: 1000
    });
    kidMaterial.envMap.mapping = THREE.CubeRefractionMapping;

    // Load material and object
    const objloader = new OBJLoader();
    const mtlLoader = new MTLLoader();
    objloader.setMaterials(mtlLoader.parse(MATERIAL)).load(MODEL, obj => {
      obj.translateX(Math.random() * 10 - 10);
      obj.translateY(Math.random() * 10 - 10);
      obj.translateZ(Math.random() * 10 - 10);
      obj.scale.multiplyScalar(0.5);
      obj.rotateX(Math.random() * 3.14);
      obj.rotateY(Math.random() * 3.14);
      obj.children[0].material = kidMaterial;

      obj.matrixAutoUpdate = false;
      obj.updateMatrix();

      this.add(obj);
    });

    parent.addToUpdateList(this);

    // Populate GUI
    // this.state.gui.add(this.state, 'bob');
    // this.state.gui.add(this.state, 'spin');
  }

  update(timeStamp) {
    // if (this.state.bob) {
      var timer = 0.0001 * Date.now();
      // Bob back and forth
      this.position.x += 0.01;
      this.position.y += 0.01;
      this.position.z += 0.01;
    // this.rotateY(-0.02);
    TWEEN.update();
  }
}

export default FloatingKid;
