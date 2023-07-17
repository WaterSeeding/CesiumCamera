import * as Cesium from "cesium";
import { skyAtmosphereTable } from "./_db";
import { setGui } from "./_gui";
import { setParams } from "./_params";

export interface SkyAtmosphereParamsInterface {
  showSkyAtmosphere: boolean;
  skyAtmosphereLightIntensity: number;
  skyAtmosphereRayleighCoefficientR: number;
  skyAtmosphereRayleighCoefficientG: number;
  skyAtmosphereRayleighCoefficientB: number;
  skyAtmosphereMieCoefficient: number;
  skyAtmosphereRayleighScaleHeight: number;
  skyAtmosphereMieScaleHeight: number;
  skyAtmosphereMieAnisotropy: number;
  skyHueShift: number;
  skySaturationShift: number;
  skyBrightnessShift: number;
  perFragmentAtmosphere: boolean;
  dynamicLighting: boolean;
  dynamicLightingFromSun: boolean;
}

class SkyAtmosphere {
  viewer: Cesium.Viewer;
  skyAtmosphere: Cesium.SkyAtmosphere;
  skyAtmosphereInitParams!: SkyAtmosphereParamsInterface;

  constructor(
    viewer: Cesium.Viewer,
    gui: dat.GUI,
    skyAtmosphereParams?: SkyAtmosphereParamsInterface
  ) {
    this.viewer = viewer;
    this.skyAtmosphere = viewer.scene.skyAtmosphere;
    setParams(this.skyAtmosphere, skyAtmosphereTable).then(
      (skyAtmosphereParams: SkyAtmosphereParamsInterface) => {
        this.skyAtmosphereInitParams =
          skyAtmosphereParams || skyAtmosphereParams;
        setGui(
          gui,
          this.skyAtmosphereInitParams,
          this.skyAtmosphere,
          (data: SkyAtmosphereParamsInterface) => {
            skyAtmosphereTable.add(data);
          }
        );
      }
    );
  }
}

export default SkyAtmosphere;
