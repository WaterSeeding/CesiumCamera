import * as Cesium from "cesium";
import { fogTableInterface } from "./_db";
import { FogParamsInterface } from "./index";

const defaultParams: FogParamsInterface = {
  show: true,
  density: 2,
  minimumBrightness: 100,
};

export const setParams = async (
  fog: Cesium.Fog,
  fogTable: fogTableInterface
): Promise<FogParamsInterface> => {
  let res = await fogTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue || defaultParams;
};
