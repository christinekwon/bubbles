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

const RED = 0xff8e88;
const ORANGE = 0xfeba4f;
const YELLOW = 0xffe983;
const GREEN = 0x77dd77;
const BLUE = 0x0da2ff;
const INDIGO = 0x6666ff;
const VIOLET = 0x9966ff;
const GREY = 0xffffff;

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructo
        super();

        this.start = true;
        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
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

        // Add lights to scene
        const lights = new BasicLights();
        this.add(lights);

        //pastel big
        // const pinkKid = new Kid(this, 5.25, 0, 0, 0.7, 0xffaaee, false);
        // const redKid = new Kid(this, 3.75, 0, 0, 0.7, 0xff8e88, false);
        // const orangeKid = new Kid(this, 2.25, 0, 0, 0.7, 0xffb347, false);
        // const yellowKid = new Kid(this, 0.75, 0, 0, 0.7, 0xffdb58, false);
        // const greenKid = new Kid(this, -0.75, 0, 0, 0.7, 0x77dd77, false);
        // const blueKid = new Kid(this, -2.25, 0, 0, 0.7, 0x0da2ff, false);
        // const indigoKid = new Kid(this, -3.75, 0, 0, 0.7, 0x6666ff, false);
        // const violetKid = new Kid(this, -5.25, 0, 0, 0.7, 0x9966ff, false);

        //vibrant big
        // const redKid = new Kid(this, 4.5, 0, 0, 0.7, 0xff3333, false);
        // const orangeKid = new Kid(this, 3, 0, 0, 0.7, 0xff6600, false);
        // const yellowKid = new Kid(this, 1.5, 0, 0, 0.7, 0xfff200, false);
        // const greenKid = new Kid(this, 0, 0, 0, 0.7, 0x00b300, false);
        // const blueKid = new Kid(this, -1.5, 0, 0, 0.7, 0x2a9df4, false);
        // const indigoKid = new Kid(this, -3, 0, 0, 0.7, 0x6f00ff, false);
        // const violetKid = new Kid(this, -4.5, 0, 0, 0.7, 0x440099, false);
        // const bigKid = new Kid(this, 0, -50, 10, 5, 0x440099, true);

        // keyboard mapping 1 octave, simple
        // this.state.kidList = {
        //     "q": pinkKid,
        //     "w": redKid,
        //     "e": orangeKid,
        //     "r": yellowKid,
        //     "t": greenKid,
        //     "y": blueKid, 
        //     "u": indigoKid,
        //     "i": violetKid,
        // }
        // this.add(pinkKid, redKid, orangeKid, yellowKid, greenKid, blueKid, indigoKid, violetKid);

        const y1 = 0;
        const y2 = 3;
        const z1 = 0;
        const z2 = 1;

        const c2 = new Kid(this, 9.75, y1, z1, 0.7, RED, false);
        const d2 = new Kid(this, 8.25, y1, z1, 0.7, ORANGE, false);
        const e2 = new Kid(this, 6.75, y1, z1, 0.7, YELLOW, false);
        const f2 = new Kid(this, 5.25, y1, z1, 0.7, GREEN, false);
        const g2 = new Kid(this, 3.75, y1, z1, 0.7, BLUE, false);
        const a2 = new Kid(this, 2.25, y1, z1, 0.7, INDIGO, false);
        const b2 = new Kid(this, 0.75, y1, z1, 0.7, VIOLET, false);

        const cs2 = new Kid(this, 9, y2, z2, 0.7, GREY, false);
        const ds2 = new Kid(this, 7.5, y2, z2, 0.7, GREY, false);
        const fs2 = new Kid(this, 4.5, y2, z2, 0.7, GREY, false);
        const gs2 = new Kid(this, 3, y2, z2, 0.7, GREY, false);
        const as2 = new Kid(this, 1.5, y2, z2, 0.7, GREY, false);

        const c3 = new Kid(this, -0.75, y1, z1, 0.7, RED, false);
        const d3 = new Kid(this, -2.25, y1, z1, 0.7, ORANGE, false);
        const e3 = new Kid(this, -3.75, y1, z1, 0.7, YELLOW, false);
        const f3 = new Kid(this, -5.25, y1, z1, 0.7, GREEN, false);
        const g3 = new Kid(this, -6.75, y1, z1, 0.7, BLUE, false);
        const a3 = new Kid(this, -8.25, y1, z1, 0.7, INDIGO, false);
        const b3 = new Kid(this, -9.75, y1, z1, 0.7, VIOLET, false);

        const cs3 = new Kid(this, -1.5, y2, z2, 0.7, GREY, false);
        const ds3 = new Kid(this, -3, y2, z2, 0.7, GREY, false);
        const fs3 = new Kid(this, -6, y2, z2, 0.7, GREY, false);
        const gs3 = new Kid(this, -7.5, y2, z2, 0.7, GREY, false);
        const as3 = new Kid(this, -9, y2, z2, 0.7, GREY, false);



        this.state.kidList = {
            "z": c2,
            "x": d2,
            "c": e2,
            "v": f2,
            "b": g2,
            "n": a2, 
            "m": b2,

            "s": cs2,
            "d": ds2,
            "g": fs2,
            "h": gs2,
            "j": as2,

            "q": c3,
            "w": d3,
            "e": e3,
            "r": f3,
            "t": g3,
            "y": a3,
            "u": b3,

            "2": cs3,
            "3": ds3,
            "5": fs3,
            "6": gs3,
            "7": as3,  
            
            // overlaps
            ",": c3,
            ".": d3,
            "\/": e3,
            "l": cs3,
            ";": ds3,
        }

        this.add(c2, d2, e2, f2, g2, a2, b2);
        this.add(cs2, ds2, fs2, gs2, as2);
        this.add(c3, d3, e3, f3, g3, a3, b3);
        this.add(cs3, ds3, fs3, gs3, as3);

        // add in kids every 3 seconds
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
    }
}

export default SeedScene;
