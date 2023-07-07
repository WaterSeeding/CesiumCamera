import Dexie, { Table } from "dexie";
import { CameraParamsInterface } from "./index";

export const db = new Dexie("cesiumCameraParams");

db.version(1).stores({
  camera: "++id, *direction, *position, *headingPitchRoll",
});

export type cameraTableInterface = Table<CameraParamsInterface>;

export const cameraTable: cameraTableInterface = db.table("camera");
