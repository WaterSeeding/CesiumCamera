import "./app.css";
import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { viewer } from "./main";
import Camera from "./Camera/index";
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

const camera = new Camera(viewer, gui, {
  position: {
    height: 260,
    longitude: -122.98348,
    latitude: 38.266261,
  },
  headingPitchRoll: {
    heading: 125.167644,
    pitch: -14.192334,
    roll: 0,
  },
});

let modelPosition = Cesium.Cartesian3.fromRadians(
  -2.1463338399937277,
  0.6677959688982861,
  32.18991401746337
);

let defaultModelPosition = getPosition(modelPosition);

createModel(
  viewer,
  "./static/CesiumBalloon.glb",
  Cesium.Cartesian3.fromDegrees(
    defaultModelPosition.longitude,
    defaultModelPosition.latitude,
    defaultModelPosition.height
  )
);
