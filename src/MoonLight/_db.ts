import Dexie, { Table } from "dexie";
import { MoonLightParamsInterface } from "./index";

export const db = new Dexie("CesiumMoonLightDB");

db.version(1).stores({
  moonlighting: "++id, intensity, *color, *direction",
});

export type moonLightTableInterface = Table<MoonLightParamsInterface>;

export const moonLightTable: moonLightTableInterface = db.table("moonlighting");
