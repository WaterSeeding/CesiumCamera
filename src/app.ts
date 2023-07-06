import "./app.css";
import * as dat from "dat.gui";
import { viewer } from "./main";
import Camera from "./Camera/index";

const gui = new dat.GUI({
  name: "Cesium GUI",
  width: 450,
  autoPlace: true,
  closed: false,
});
gui.domElement.id = "gui";
gui.show();

let camera = new Camera(viewer, gui, {
  position: {
    height: 2007.468795771161,
    latitude: 22.508071387268746,
    longitude: 114.0473043657834,
  },
  headingPitchRoll: {
    heading: 359.9999999999997,
    pitch: -89.94558776094708,
    roll: 0,
  },
});
