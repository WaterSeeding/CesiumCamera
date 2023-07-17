import * as Cesium from "cesium";
import { depthOfFieldTableInterface } from "./_db";
import { DepthOfFieldParamsInterface } from "./index";

const defaultParams: DepthOfFieldParamsInterface = {
  show: false,
  focalDistance: 145.09,
  delta: 1,
  sigma: 3.8,
  stepSize: 2.5,
};

export const setParams = async (
  depthOfField: Cesium.PostProcessStageComposite,
  depthOfFieldTable: depthOfFieldTableInterface
): Promise<DepthOfFieldParamsInterface> => {
  let res = await depthOfFieldTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue || defaultParams;
};
