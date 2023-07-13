import "./app.css";
import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { viewer } from "./main";
import Camera from "./Camera/index";
import Clock from "./Clock/index";
// import SunLight from './SunLight/index';
import DirectionalLight from "./DirectionalLight/index";
import { createModel } from "./model";
import { getPosition } from "./getPosition";

const gui = new dat.GUI({
  name: "Cesium GUI",
  width: 450,
  autoPlace: true,
  closed: false,
});
gui.domElement.id = "gui";
gui.show();

let modelPosition = Cesium.Cartesian3.fromDegrees(
  114.05104099176157,
  22.509032825095247,
  50
);

let defaultModelPosition = getPosition(modelPosition);
console.log("defaultModelPosition", defaultModelPosition);

createModel(
  viewer,
  "./static/CesiumBalloon.glb",
  Cesium.Cartesian3.fromDegrees(
    defaultModelPosition.longitude,
    defaultModelPosition.latitude,
    defaultModelPosition.height
  )
);

const camera = new Camera(viewer, gui, {
  position: {
    height: 1057,
    longitude: 114.053187,
    latitude: 22.496277,
  },
  headingPitchRoll: {
    heading: 349.179751,
    pitch: -41.391046,
    roll: 0,
  },
});

let clock = new Clock(viewer);
clock.setTime("2023-07-01 08:00:00");

// let sunLight = new SunLight(viewer, gui, {
//   color: [255, 255, 255, 1],
//   intensity: 2,
// });

let directionalLight = new DirectionalLight(viewer, gui);
