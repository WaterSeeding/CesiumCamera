import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { SunLightParamsInterface } from "./index";
import { setGuiSlide } from "./utils/setGuiSlide";
import { downloadJson } from "./utils/downloadJson";

const reviseGui = (
  sunLight: Cesium.SunLight,
  guiParams: SunLightParamsInterface
) => {
  let c = guiParams.color;
  let color = new Cesium.Color(c[0] / 255, c[1] / 255, c[2] / 255, c[3] / 1);
  sunLight.color = color;
  sunLight.intensity = guiParams.intensity;
};

const storeGui = (guiParams: SunLightParamsInterface, storeCb: Function) => {
  let c = guiParams.color;
  storeCb({
    intensity: guiParams.intensity,
    color: [c[0], c[1], c[2], c[3]],
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: SunLightParamsInterface,
  sunLight: Cesium.SunLight,
  storeCb: Function
) => {
  let sunLight_folder = gui.addFolder("sunLight");
  sunLight_folder.close();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(sunLight, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiSlide(
    sunLight_folder,
    guiParams,
    "intensity",
    "intensity",
    {
      min: 0,
      max: 100.0,
      step: 0.01,
    },
    () => {
      reviseGui(sunLight, guiParams);
    }
  );

  let listen_color = sunLight_folder.addColor(guiParams, "color");
  listen_color.onChange(() => {
    reviseGui(sunLight, guiParams);
  });

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(sunLight, initGuiParams);
      storeGui(initGuiParams, storeCb);
      sunLight_folder.revert(sunLight_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson("sunLighting.json", downloadGuiParams);
    },
  };

  sunLight_folder.add(obj, "ensure").name("确定参数");
  sunLight_folder.add(obj, "reset").name("重置参数");
  sunLight_folder.add(obj, "download").name("下载参数");
};
