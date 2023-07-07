import * as Cesium from "cesium";
import { cameraTableInterface } from "./_db";
import { CameraParamsInterface } from "./index";

export const setParams = async (
  camera: Cesium.Camera,
  cameraTable: cameraTableInterface
): Promise<CameraParamsInterface | undefined> => {
  let res = await cameraTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue;
};
