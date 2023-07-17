import Dexie, { Table } from "dexie";
import { HdrParamsInterface } from "./index";

export const db = new Dexie("CesiumHdrDB");

db.version(1).stores({
  hdr: "++id, highDynamicRange",
});

export type hdrTableInterface = Table<HdrParamsInterface>;

export const hdrTable: hdrTableInterface = db.table("hdr");
