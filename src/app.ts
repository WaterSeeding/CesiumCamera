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
    height: 50000,
    longitude: 113.976006,
    latitude: 22.475603,
  },
  headingPitchRoll: {
    heading: 360,
    pitch: -89.897722,
    roll: 0,
  },
});
