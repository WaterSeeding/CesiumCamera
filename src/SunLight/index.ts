import * as Cesium from "cesium";
import { sunLightTable } from "./_db";
import { setGui } from "./_gui";
import { setParams } from "./_params";

export interface SunLightParamsInterface {
  intensity: number;
  color: number[];
}

class SunLight {
  static instance: SunLight;
  viewer: Cesium.Viewer;
  light: Cesium.SunLight;
  lightInitParams!: SunLightParamsInterface;

  constructor(
    viewer: Cesium.Viewer,
    gui: dat.GUI,
    sunLightParams?: SunLightParamsInterface
  ) {
    if (SunLight.instance) {
      return SunLight.instance;
    }
    SunLight.instance = this;

    this.viewer = viewer;
    this.light = new Cesium.SunLight();
    viewer.scene.light = this.light;

    setParams(this.light, sunLightTable).then(
      (lightParams: SunLightParamsInterface) => {
        this.lightInitParams = sunLightParams || lightParams;

        setGui(
          gui,
          this.lightInitParams,
          this.light,
          (data: SunLightParamsInterface) => {
            sunLightTable.add(data);
          }
        );
      }
    );
  }
}

export default SunLight;
