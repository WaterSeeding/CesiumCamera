import Dexie, { Table } from "dexie";
import { SkyAtmosphereParamsInterface } from "./index";

export const db = new Dexie("CesiumSkyAtmosphereDB");

db.version(1).stores({
  skyAtmosphere: "++id, show",
});

export type skyAtmosphereTableInterface = Table<SkyAtmosphereParamsInterface>;

export const skyAtmosphereTable: skyAtmosphereTableInterface =
  db.table("skyAtmosphere");
