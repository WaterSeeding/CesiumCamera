import Dexie, { Table } from "dexie";
import { BrightnessParamsInterface } from "./index";

export const db = new Dexie("CesiumBrightnessDB");

db.version(1).stores({
  brightness: "++id, enabled, uniformsBrightness",
});

export type brightnessTableInterface = Table<BrightnessParamsInterface>;

export const brightnessTable: brightnessTableInterface = db.table("brightness");
