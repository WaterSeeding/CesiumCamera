import * as Cesium from "cesium";
import { DepthOfFieldParamsInterface } from "./index";
import { setGuiCheckbox } from "./utils/setGuiCheckbox";
import { setGuiSlide } from "./utils/setGuiSlide";
import { downloadJson } from "./utils/downloadJson";

const reviseGui = (
  depthOfField: Cesium.PostProcessStageComposite,
  guiParams: DepthOfFieldParamsInterface
) => {
  depthOfField.enabled = Boolean(guiParams.show);
  depthOfField.uniforms.focalDistance = Number(guiParams.focalDistance);
  depthOfField.uniforms.delta = Number(guiParams.delta);
  depthOfField.uniforms.sigma = Number(guiParams.sigma);
  depthOfField.uniforms.stepSize = Number(guiParams.stepSize);
};

const storeGui = (
  guiParams: DepthOfFieldParamsInterface,
  storeCb: Function
) => {
  storeCb({
    show: Boolean(guiParams.show),
    focalDistance: Number(guiParams.focalDistance),
    delta: Number(guiParams.delta),
    sigma: Number(guiParams.sigma),
    stepSize: Number(guiParams.stepSize),
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: DepthOfFieldParamsInterface,
  depthOfField: Cesium.PostProcessStageComposite,
  storeCb?: (data: any) => void
) => {
  let depthOfField_folder = gui.addFolder("depthOfField");
  depthOfField_folder.close();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(depthOfField, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiCheckbox(depthOfField_folder, guiParams, "show", "show", () => {
    reviseGui(depthOfField, guiParams);
  });

  setGuiSlide(
    depthOfField_folder,
    guiParams,
    "focalDistance",
    "focalDistance",
    {
      min: -255.0,
      max: 255.0,
      step: 0.01,
    },
    () => {
      reviseGui(depthOfField, guiParams);
    }
  );

  setGuiSlide(
    depthOfField_folder,
    guiParams,
    "delta",
    "delta",
    {
      min: 1,
      max: 5,
      step: 0.01,
    },
    () => {
      reviseGui(depthOfField, guiParams);
    }
  );

  setGuiSlide(
    depthOfField_folder,
    guiParams,
    "sigma",
    "sigma",
    {
      min: 1,
      max: 10,
      step: 0.01,
    },
    () => {
      reviseGui(depthOfField, guiParams);
    }
  );

  setGuiSlide(
    depthOfField_folder,
    guiParams,
    "sigma",
    "sigma",
    {
      min: 1,
      max: 10,
      step: 0.01,
    },
    () => {
      reviseGui(depthOfField, guiParams);
    }
  );

  setGuiSlide(
    depthOfField_folder,
    guiParams,
    "stepSize",
    "stepSize",
    {
      min: 0,
      max: 7,
      step: 0.01,
    },
    () => {
      reviseGui(depthOfField, guiParams);
    }
  );

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(depthOfField, initGuiParams);
      storeGui(initGuiParams, storeCb);
      depthOfField_folder.revert(depthOfField_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson("depthOfField.json", downloadGuiParams);
    },
  };

  depthOfField_folder.add(obj, "ensure").name("确定参数");
  depthOfField_folder.add(obj, "reset").name("重置参数");
  depthOfField_folder.add(obj, "download").name("下载参数");
};
