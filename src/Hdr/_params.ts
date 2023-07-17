import * as Cesium from "cesium";
import { hdrTableInterface } from "./_db";
import { HdrParamsInterface } from "./index";

const defaultParams: HdrParamsInterface = {
  highDynamicRange: true,
};

export const setParams = async (
  hdr: Cesium.Scene,
  hdrTable: hdrTableInterface
): Promise<HdrParamsInterface> => {
  let res = await hdrTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue || defaultParams;
};
