import * as Cesium from "cesium";
import { brightnessTableInterface } from "./_db";
import { BrightnessParamsInterface } from "./index";

const defaultParams: BrightnessParamsInterface = {
  enabled: true,
  uniformsBrightness: 1.15,
};

export const setParams = async (
  brightness: Cesium.PostProcessStage,
  brightnessTable: brightnessTableInterface
): Promise<BrightnessParamsInterface> => {
  let defaultBrightnessEnabled = brightness.enabled;
  let defaultBrightnessUniformsBrightness = brightness.uniforms.brightness;
  defaultParams.enabled = defaultBrightnessEnabled;
  defaultParams.uniformsBrightness = defaultBrightnessUniformsBrightness;

  let res = await brightnessTable.toArray();
  let latestResValue = res[res.length - 1];

  return latestResValue || defaultParams;
};
