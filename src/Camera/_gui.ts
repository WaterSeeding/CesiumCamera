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

  let initGuiParams = Object.assign({}, guiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiSlide(
    camera_folder,
    guiParams.position,
    "longitude",
    "longitude",
    {
      min: -180,
      max: 180,
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
      min: -180,
      max: 180,
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

  let obj = {
    getInfo: () => {
      let info = camera.getInfo();
    },
    updateInfo: () => {
      let info = camera.getInfo();
      console.log("相机更新", info);
    },
  };

  camera_folder.add(obj, "getInfo").name("相机参数");
  camera_folder.add(obj, "updateInfo").name("相机更新");
};
