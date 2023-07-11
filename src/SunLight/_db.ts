import Dexie, { Table } from "dexie";
import { SunLightParamsInterface } from "./index";

export const db = new Dexie("CesiumSunLightDB");

db.version(1).stores({
  sunLight: "++id, intensity, *color",
});

export type sunLightTableInterface = Table<SunLightParamsInterface>;

export const sunLightTable: sunLightTableInterface = db.table("sunLight");
