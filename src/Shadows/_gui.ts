import * as Cesium from "cesium";
import { ShadowsParamsInterface } from "./index";
import { setGuiCheckbox } from "./utils/setGuiCheckbox";
import { setGuiSlide } from "./utils/setGuiSlide";
import { downloadJson } from "./utils/downloadJson";

const reviseGui = (
  shadows: Cesium.ShadowMap,
  guiParams: ShadowsParamsInterface
) => {};

const storeGui = (guiParams: ShadowsParamsInterface, storeCb: Function) => {
  storeCb({});
};

export const setGui = (
  gui: dat.GUI,
  guiParams: ShadowsParamsInterface,
  shadows: Cesium.ShadowMap,
  storeCb?: (data: any) => void
) => {
  let shadows_folder = gui.addFolder("shadows");
  shadows_folder.close();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(shadows, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiCheckbox(
    shadows_folder,
    guiParams,
    "softShadows",
    "softShadows",
    () => {
      reviseGui(shadows, guiParams);
    }
  );

  setGuiSlide(
    shadows_folder,
    guiParams,
    "maximumDistance",
    "maximumDistance",
    {
      min: 0.5,
      max: 100.0,
      step: 0.1,
    },
    (v: number) => {
      console.log("density", v);
    }
  );

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(shadows, initGuiParams);
      storeGui(initGuiParams, storeCb);
      shadows_folder.revert(shadows_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson("shadows.json", downloadGuiParams);
    },
  };

  shadows_folder.add(obj, "ensure").name("确定参数");
  shadows_folder.add(obj, "reset").name("重置参数");
  shadows_folder.add(obj, "download").name("下载参数");
};
