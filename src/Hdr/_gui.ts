import * as Cesium from "cesium";
import { HdrParamsInterface } from "./index";
import { setGuiCheckbox } from "./utils/setGuiCheckbox";
import { downloadJson } from "./utils/downloadJson";

const reviseGui = (hdr: Cesium.Scene, guiParams: HdrParamsInterface) => {
  hdr.highDynamicRange = Boolean(guiParams.highDynamicRange);
};

const storeGui = (guiParams: HdrParamsInterface, storeCb: Function) => {
  storeCb({
    highDynamicRange: Boolean(guiParams.highDynamicRange),
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: HdrParamsInterface,
  hdr: Cesium.Scene,
  storeCb?: (data: any) => void
) => {
  let hdr_folder = gui.addFolder("hdr");
  hdr_folder.close();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(hdr, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiCheckbox(
    hdr_folder,
    guiParams,
    "highDynamicRange",
    "hdr",
    (newValue: any) => {
      hdr.highDynamicRange = newValue;
    }
  );

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(hdr, initGuiParams);
      storeGui(initGuiParams, storeCb);
      hdr_folder.revert(hdr_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson("hdr.json", downloadGuiParams);
    },
  };

  hdr_folder.add(obj, "ensure").name("确定参数");
  hdr_folder.add(obj, "reset").name("重置参数");
  hdr_folder.add(obj, "download").name("下载参数");
};
