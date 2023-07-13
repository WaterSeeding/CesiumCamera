import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { MoonLightParamsInterface } from "./index";
import { setGuiSlide } from "./utils/setGuiSlide";
import { downloadJson } from "./utils/downloadJson";

const reviseGui = (
  light: Cesium.DirectionalLight,
  guiParams: MoonLightParamsInterface
) => {
  let c = guiParams.color;
  let color = new Cesium.Color(c[0] / 255, c[1] / 255, c[2] / 255, c[3] / 1);
  light.color = color;
  light.intensity = guiParams.intensity;
  light.direction = Cesium.Cartesian3.fromDegrees(
    guiParams.direction.longitude,
    guiParams.direction.latitude,
    guiParams.direction.height
  );
};

const storeGui = (guiParams: MoonLightParamsInterface, storeCb: Function) => {
  let c = guiParams.color;
  storeCb({
    direction: guiParams.direction,
    intensity: guiParams.intensity,
    color: [c[0], c[1], c[2], c[3]],
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: MoonLightParamsInterface,
  light: Cesium.DirectionalLight,
  storeCb: Function
) => {
  let light_folder = gui.addFolder("moonLight");
  light_folder.close();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(light, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiSlide(
    light_folder,
    guiParams.direction,
    "longitude",
    "longitude",
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      reviseGui(light, guiParams);
    }
  );

  setGuiSlide(
    light_folder,
    guiParams.direction,
    "latitude",
    "latitude",
    {
      min: -360,
      max: 360,
      step: 0.000001,
    },
    () => {
      reviseGui(light, guiParams);
    }
  );

  light_folder.add(guiParams.direction, "height").onChange(() => {
    reviseGui(light, guiParams);
  });

  setGuiSlide(
    light_folder,
    guiParams,
    "intensity",
    "intensity",
    {
      min: 0,
      max: 100.0,
      step: 0.01,
    },
    () => {
      reviseGui(light, guiParams);
    }
  );

  let listen_color = light_folder.addColor(guiParams, "color");
  listen_color.onChange(() => {
    reviseGui(light, guiParams);
  });

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(light, initGuiParams);
      storeGui(initGuiParams, storeCb);
      light_folder.revert(light_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson("sunLighting.json", downloadGuiParams);
    },
  };

  light_folder.add(obj, "ensure").name("确定参数");
  light_folder.add(obj, "reset").name("重置参数");
  light_folder.add(obj, "download").name("下载参数");
};
