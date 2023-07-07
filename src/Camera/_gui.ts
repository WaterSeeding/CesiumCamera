import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { CameraParamsInterface } from "./index";
import Camera from "./index";
import { setGuiSlide } from "./utils/setGuiSlide";

export const setGui = (
  gui: dat.GUI,
  guiParams: CameraParamsInterface,
  camera: Camera
) => {
  let camera_folder = gui.addFolder("Camera");
  camera_folder.open();

  console.log("guiParams", guiParams);

  let initGuiParams = Object.assign({}, guiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiSlide(
    camera_folder,
    guiParams.position,
    "longitude",
    "longitude",
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      camera.setView(guiParams);
    }
  );

  setGuiSlide(
    camera_folder,
    guiParams.position,
    "latitude",
    "latitude",
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      camera.setView(guiParams);
    }
  );

  setGuiSlide(
    camera_folder,
    guiParams.position,
    "height",
    "height",
    {
      min: 0,
      max: 10000000,
      step: 1,
    },
    () => {
      camera.setView(guiParams);
    }
  );

  setGuiSlide(
    camera_folder,
    guiParams.headingPitchRoll,
    "heading",
    "heading",
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      camera.setView(guiParams);
    }
  );

  setGuiSlide(
    camera_folder,
    guiParams.headingPitchRoll,
    "pitch",
    "pitch",
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      camera.setView(guiParams);
    }
  );

  setGuiSlide(
    camera_folder,
    guiParams.headingPitchRoll,
    "roll",
    "roll",
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      camera.setView(guiParams);
    }
  );

  let obj = {
    getInfo: () => {
      let info = camera.getInfo();
    },
    updateInfo: () => {
      let info = camera.getInfo();
      console.log("相机更新", info);
    },
    locationInfo: () => {
      camera.setFly(guiParams, () => {
        console.log("飞行定位");
      });
    },
  };

  camera_folder.add(obj, "getInfo").name("相机参数");
  camera_folder.add(obj, "updateInfo").name("相机更新");
  camera_folder.add(obj, "locationInfo").name("相机定位");
};
