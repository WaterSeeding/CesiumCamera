import * as Cesium from "cesium";
import { ShadowsParamsInterface } from "./index";
import { setGuiCheckbox } from "./utils/setGuiCheckbox";
import { downloadJson } from "./utils/downloadJson";

const reviseGui = (
  shadows: Cesium.ShadowMap,
  guiParams: ShadowsParamsInterface
) => {
  shadows.softShadows = Boolean(guiParams.softShadows);
  shadows.size = Number(guiParams.size);
};

const storeGui = (guiParams: ShadowsParamsInterface, storeCb: Function) => {
  storeCb({
    softShadows: Boolean(guiParams.softShadows),
    size: Number(guiParams.size),
  });
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

  let listen_size = shadows_folder.add(guiParams, "size", {
    "Size: 4096": 4096,
    "Size: 2048": 2048,
    "Size: 1024": 1024,
    "Size: 512": 512,
    "Size: 256": 256,
  });
  listen_size.onChange(() => {
    reviseGui(shadows, guiParams);
  });

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
