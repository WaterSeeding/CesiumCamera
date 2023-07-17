import Dexie, { Table } from "dexie";
import { FogParamsInterface } from "./index";

export const db = new Dexie("CesiumFogDB");

db.version(1).stores({
  fog: "++id, show, density, minimumBrightness",
});

export type fogTableInterface = Table<FogParamsInterface>;

export const fogTable: fogTableInterface = db.table("fog");
