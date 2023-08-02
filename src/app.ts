import "./app.css";
import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { viewer } from "./main";
import Camera from "./Camera/index";
import { getPosition } from "./getPosition";

const gui = new dat.GUI({
  name: "Cesium GUI",
  width: 450,
  autoPlace: true,
  closed: false,
});
gui.domElement.id = "gui";
gui.show();

const camera = new Camera(
  viewer,
  gui,
  {
    position: {
      height: 14241,
      longitude: 113.998402,
      latitude: 22.356397,
    },
    headingPitchRoll: {
      heading: 14,
      pitch: -45,
      roll: 0,
    },
  },
  false
);
