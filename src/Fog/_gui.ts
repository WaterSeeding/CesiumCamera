import * as Cesium from "cesium";
import { FogParamsInterface } from "./index";
import { setGuiCheckbox } from "./utils/setGuiCheckbox";
import { setGuiSlide } from "./utils/setGuiSlide";
import { downloadJson } from "./utils/downloadJson";

const reviseGui = (fog: Cesium.Fog, guiParams: FogParamsInterface) => {
  fog.enabled = Boolean(guiParams.show);
  fog.density = Number(guiParams.density);
  fog.minimumBrightness = Number(guiParams.minimumBrightness);
};

const storeGui = (guiParams: FogParamsInterface, storeCb: Function) => {
  storeCb({
    show: Boolean(guiParams.show),
    density: Number(guiParams.density),
    minimumBrightness: Number(guiParams.minimumBrightness),
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: FogParamsInterface,
  fog: Cesium.Fog,
  storeCb?: (data: any) => void
) => {
  let fog_folder = gui.addFolder("fog");
  fog_folder.close();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(fog, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiCheckbox(fog_folder, guiParams, "show", "show", () => {
    reviseGui(fog, guiParams);
  });

  setGuiSlide(
    fog_folder,
    guiParams,
    "density",
    "Fog Density",
    {
      min: 0.5,
      max: 100.0,
      step: 0.1,
    },
    (v: number) => {
      console.log("density", v);
      // reviseGui(fog, guiParams);
    }
  );

  setGuiSlide(
    fog_folder,
    guiParams,
    "minimumBrightness",
    "Fog Min Brightness",
    {
      min: 0,
      max: 100.0,
      step: 0.01,
    },
    (v: number) => {
      // reviseGui(fog, guiParams);
      console.log("minimumBrightness", v);
    }
  );

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(fog, initGuiParams);
      storeGui(initGuiParams, storeCb);
      fog_folder.revert(fog_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson("fog.json", downloadGuiParams);
    },
  };

  fog_folder.add(obj, "ensure").name("确定参数");
  fog_folder.add(obj, "reset").name("重置参数");
  fog_folder.add(obj, "download").name("下载参数");
};
