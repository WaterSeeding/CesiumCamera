import * as Cesium from "cesium";
import { sunLightTableInterface } from "./_db";
import { SunLightParamsInterface } from "./index";

const defaultParams = {
  color: [255, 255, 255, 1],
  intensity: 2,
};

export const setParams = async (
  light: Cesium.Light,
  sunLightTable: sunLightTableInterface
): Promise<SunLightParamsInterface> => {
  let res = await sunLightTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue || defaultParams;
};
