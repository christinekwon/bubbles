/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';
import MAPPING from "./mapping.png";

// import { Keyboard } from './keyboard.js';


// Initialize core ThreeJS components

const camera = new PerspectiveCamera(70, 20, 1, 50);
// const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(0, 0, -50);
camera.lookAt(new Vector3(0, 0, 0));
// console.log(camera.position);

const scene = new SeedScene(camera);

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};

document.getElementById("start").addEventListener("click", start);
document.getElementById("info").addEventListener("mouseover", showInfo);
document.getElementById("info").addEventListener("mouseout", hideInfo);

function start() {
  var T = require("./timbre.js");
  require("./keyboard.js");
  require("./ndict.js");
  require("./midicps.js");
  var synth, keydict, midicps;
  var table = [0.8, [0, 1500]];

  var env = T("perc", {r:700});
  synth = T("OscGen", {wave:"sin", env:env, mul:0.2}).play();
  keydict = T("ndict.key");
  midicps = T("midicps");

  T("keyboard").on("keydown", function(e) {
    var midi = keydict.at(e.keyCode);
    if (midi) {
      var freq = midicps.at(midi);
      synth.noteOnWithFreq(freq, 100);
    }
  }).on("keyup", function(e) {
    var midi = keydict.at(e.keyCode);
    if (midi) {
      synth.noteOff(midi, 100);
    }
  }).start();

// 	var T = require("./timbre.js");
// 	require("./keyboard.js");
// 	require("./ndict.js");
// 	require("./midicps.js");

//     var mml0, mml1;
//     var env   = T("adsr", {d:3000, s:0, r:600});
//     var synth = T("SynthDef", {mul:0.45, poly:8});

//     synth.def = function(opts) {
//       var op1 = T("sin", {freq:opts.freq*6, fb:0.25, mul:0.4});
//       var op2 = T("sin", {freq:opts.freq, phase:op1, mul:opts.velocity/128});
//       return env.clone().append(op2).on("ended", opts.doneAction).bang();
//     };

//     var master = synth;
//     var mod    = T("sin", {freq:2, add:3200, mul:800, kr:1});
//     master = T("eq", {params:{lf:[800, 0.5, -2], mf:[6400, 0.5, 4]}}, master);
//     master = T("phaser", {freq:mod, Q:2, steps:4}, master);
//     master = T("delay", {time:"BPM60 L16", fb:0.65, mix:0.25}, master);

//     mml0 = "t60 l4 v6 q2 o3";
//     mml0 += "[ [g < b0<d0f+2>> d <a0<c+0f+2>>]8 ";
//     mml0 += "f+ <a0<c+0f+2>>> b<<b0<d0f+2>> e<g0b2> e<b0<d0g2>> d<f0a0<d2>>";
//     mml0 += ">a<<a0<c0e2>> d<g0b0<e2>> d<d0g0b0<e2>> d<c0e0a0<d2>> d<c0f+0a0<d2>>";
//     mml0 += "d<a0<c0f2>> d<a0<c0e2>> d<d0g0b0<e2>> d<c0e0a0<d2>> d<c0f+0a0<d2>>";
//     mml0 += "| e<b0<e0g2>> f+<a0<c+0f+2>>> b<<b0<d0f+2>> e<<c+0e0a2>> e<a0<c+0f+0a2>>";
//     mml0 += "eb0<a0<d>e0b0<d0g>> a0<g2.> d0a0<d2.> ]";
//     mml0 += "e<b0<e0g2>> e<a0<d0f0a2>> e<a0<c0f2>> e<<c0e0a2>> e<a0<c0f0a2>>";
//     mml0 += "eb0<a0<d>e0b0<d0g>> a0<g2.> d0a0<d2.>";

//     mml1 = "t60 v14 l4 o6";
//     mml1 += "[ r2. r2. r2. r2.";
//     mml1 += "rf+a gf+c+ >b<c+d >a2. f+2.& f+2.& f+2.& f+2.< rf+a gf+c+ >b<c+d >a2.<";
//     mml1 += "c+2. f+2. >e2.&e2.&e2.";
//     mml1 += "ab<c ed>b< dc>b< d2.& d2d";
//     mml1 += "efg acd ed>b <d2.& d2d";
//     mml1 += "| g2. f+2.> bab< c+de c+de>";
//     mml1 += "f+2. c0e0a0<c2.> d0f+0a0<d2. ]";
//     mml1 += "g2. f2.> b<cf edc edc>";
//     mml1 += "f2. c0e0a0<c2.> d0f0a0<d2.";

//     T("mml", {mml:[mml0, mml1]}, synth).on("ended", function() {
//       this.stop();
//     }).set({buddies:master}).start();
}

document.getElementById("mapping").src = MAPPING;

function showInfo() {
  document.getElementById("mapping").style.visibility = "visible";
}

function hideInfo() {
  document.getElementById("mapping").style.visibility = "hidden";
}


windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
function handleKeyDown(event) {
    // if (event.key != undefined)
      scene.key = event.key;
    // if (scene.key == 'a') {
    //     var sine1 = T("sin", {freq:440, mul:0.5});
    //     var sine2 = T("sin", {freq:660, mul:0.5});

    //     T("perc", {r:500}, sine1, sine2).on("ended", function() {
    //     this.pause();
    //     }).bang().play();
    // } 

  }
  
  // once key is lifted, set SeedScene key to default value
  function handleKeyUp(event) {
    scene.key = undefined;
  }


  // async function start() {
  //   await new Promise(r => setTimeout(r, 1200));
  //   synth = T("OscGen", {wave:"sin", mul:0.05}).play();

  //     keydict = T("ndict.key");
  //     midicps = T("midicps");
  // }
