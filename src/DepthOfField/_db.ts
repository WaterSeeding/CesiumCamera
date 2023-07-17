import Dexie, { Table } from "dexie";
import { DepthOfFieldParamsInterface } from "./index";

export const db = new Dexie("CesiumDepthOfFieldDB");

db.version(1).stores({
  depthOfField: "++id, show, focalDistance, delta, sigma, stepSize",
});

export type depthOfFieldTableInterface = Table<DepthOfFieldParamsInterface>;

export const depthOfFieldTable: depthOfFieldTableInterface = db.table("depthOfField");
