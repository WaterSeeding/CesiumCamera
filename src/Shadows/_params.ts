import * as Cesium from "cesium";
import { shadowsTableInterface } from "./_db";
import { ShadowsParamsInterface } from "./index";

const defaultParams: ShadowsParamsInterface = {
  softShadows: true,
  size: 100,
};

export const setParams = async (
  shadows: Cesium.ShadowMap,
  shadowsTable: shadowsTableInterface
): Promise<ShadowsParamsInterface> => {
  let res = await shadowsTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue || defaultParams;
};
