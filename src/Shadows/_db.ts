import Dexie, { Table } from "dexie";
import { ShadowsParamsInterface } from "./index";

export const db = new Dexie("CesiumShadowsDB");

db.version(1).stores({
  shadows: "++id, softShadows, size",
});

export type shadowsTableInterface = Table<ShadowsParamsInterface>;

export const shadowsTable: shadowsTableInterface = db.table("shadows");
