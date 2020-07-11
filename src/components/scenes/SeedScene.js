import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Kid, FloatingKid } from 'objects';
import { BasicLights } from 'lights';
import * as THREE from "three";
import POSX from "./textures/Earth/posx.jpg";
import NEGX from "./textures/Earth/negx.jpg";
import POSY from "./textures/Earth/posy.jpg";
import NEGY from "./textures/Earth/negy.jpg";
import POSZ from "./textures/Earth/posz.jpg";
import NEGZ from "./textures/Earth/negz.jpg";
import WHITE from "./textures/White/white.png";
import CLOUDS from "./textures/Clouds/clouds.jpg";

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructo
        super();

        this.start = true;
        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
            updateFloating: [],
            key: "",
            kidList: {},
        };

        // Set background to a nice color
        // this.background = new Color(0xffffff);

        // this.background = new THREE.CubeTextureLoader()
		// 	.load( [
        //         POSX, NEGX,
        //         POSY, NEGY,
        //         POSZ, NEGZ
        // ] );

        this.background = new THREE.CubeTextureLoader()
        .load( [
            CLOUDS, CLOUDS,
            CLOUDS, CLOUDS,
            CLOUDS, CLOUDS
    ] );

    //     this.background = new THREE.CubeTextureLoader()
    //     .load( [
    //         WHITE, WHITE,
    //         WHITE, WHITE,
    //         WHITE, WHITE
    // ] );  

        // Add meshes to scene
        // const land = new Land();
        const flower = new Flower(this);
        const lights = new BasicLights();

        //pastel

        const redKid = new Kid(this, 4.5, 0, 0, 0.7, 0xff8e88, false);
        const orangeKid = new Kid(this, 3, 0, 0, 0.7, 0xffb347, false);
        const yellowKid = new Kid(this, 1.5, 0, 0, 0.7, 0xffdb58, false);
        const greenKid = new Kid(this, 0, 0, 0, 0.7, 0x77dd77, false);
        const blueKid = new Kid(this, -1.5, 0, 0, 0.7, 0x0da2ff, false);
        const indigoKid = new Kid(this, -3, 0, 0, 0.7, 0x6666ff, false);
        const violetKid = new Kid(this, -4.5, 0, 0, 0.7, 0x9966ff, false);

        //vibrant
        // const redKid = new Kid(this, 4.5, 0, 0, 0.7, 0xff3333, false);
        // const orangeKid = new Kid(this, 3, 0, 0, 0.7, 0xff6600, false);
        // const yellowKid = new Kid(this, 1.5, 0, 0, 0.7, 0xfff200, false);
        // const greenKid = new Kid(this, 0, 0, 0, 0.7, 0x00b300, false);
        // const blueKid = new Kid(this, -1.5, 0, 0, 0.7, 0x2a9df4, false);
        // const indigoKid = new Kid(this, -3, 0, 0, 0.7, 0x6f00ff, false);
        // const violetKid = new Kid(this, -4.5, 0, 0, 0.7, 0x440099, false);
        // const bigKid = new Kid(this, 0, -50, 10, 5, 0x440099, true);
        this.state.kidList = {
            "q": redKid,
            "w": orangeKid,
            "e": yellowKid,
            "r": greenKid,
            "t": blueKid,
            "y": indigoKid, 
            "u": violetKid,
        }
        // this.state.kidList.push(redKid, orangeKid, yellowKid, greenKid, blueKid, indigoKid, violetKid);
        this.add(lights);
        this.add(redKid, orangeKid, yellowKid, greenKid, blueKid, indigoKid, violetKid);
        // this.add(bigKid);

        // var timer = setInterval(this.addKid, 3000, this);

        // Populate GUI
        // this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }


    addKid(scene) {
        const newKid = new FloatingKid(scene);
        scene.add(newKid);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    addToUpdateFloating(object) {
        this.state.updateFloating.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList, kidList, updateFloating } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;
        // console.log(this.key);
        if (this.key != undefined && kidList[this.key] != undefined) {
            kidList[this.key].spin();
            console.log(this.key);
        }
        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
        for (const obj of updateFloating) {
            obj.update(timeStamp);
        }

        if (this.start) {
            this.nextTime = timeStamp;
            this.start=false;
        }
        // console.log(timeStamp);
        // console.log(this.nextTime);
        // if (
        //     timeStamp - this.nextTime < 5 ||
        //     (timeStamp - this.nextTime > -5)
        //   ) {
        //     this.addKid(this);
        //     this.nextTime = timeStamp + 80000;
        //   }
    }
}

export default SeedScene;
