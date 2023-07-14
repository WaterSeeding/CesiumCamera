import * as Cesium from "cesium";
import { BrightnessParamsInterface } from "./index";
import { setGuiCheckbox } from "./utils/setGuiCheckbox";
import { setGuiSlide } from "./utils/setGuiSlide";
import { downloadJson } from "./utils/downloadJson";

const reviseGui = (
  brightness: Cesium.PostProcessStage,
  guiParams: BrightnessParamsInterface
) => {
  brightness.enabled = Boolean(guiParams.enabled);
  brightness.uniforms.brightness = Number(guiParams.uniformsBrightness);
};

const storeGui = (guiParams: BrightnessParamsInterface, storeCb: Function) => {
  storeCb({
    enabled: guiParams.enabled,
    uniformsBrightness: guiParams.uniformsBrightness,
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: BrightnessParamsInterface,
  brightness: Cesium.PostProcessStage,
  storeCb: (data: BrightnessParamsInterface) => void
) => {
  let brightness_folder = gui.addFolder("brightness");
  brightness_folder.close();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(brightness, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiCheckbox(brightness_folder, guiParams, "enabled", "enabled", () => {
    reviseGui(brightness, guiParams);
  });

  setGuiSlide(
    brightness_folder,
    guiParams,
    "uniformsBrightness",
    "density",
    {
      min: 0.0,
      max: 5.0,
      step: 0.01,
    },
    () => {
      reviseGui(brightness, guiParams);
    }
  );

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(brightness, initGuiParams);
      storeGui(initGuiParams, storeCb);
      brightness_folder.revert(brightness_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson("brightness.json", downloadGuiParams);
    },
  };

  brightness_folder.add(obj, "ensure").name("确定参数");
  brightness_folder.add(obj, "reset").name("重置参数");
  brightness_folder.add(obj, "download").name("下载参数");
};
