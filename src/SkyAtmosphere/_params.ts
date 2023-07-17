import * as Cesium from "cesium";
import { skyAtmosphereTableInterface } from "./_db";
import { SkyAtmosphereParamsInterface } from "./index";

export const setParams = async (
  skyAtmosphere: Cesium.SkyAtmosphere,
  skyAtmosphereTable: skyAtmosphereTableInterface
): Promise<SkyAtmosphereParamsInterface> => {
  const defaultSkyAtmosphereLightIntensity =
    skyAtmosphere.atmosphereLightIntensity;
  const defaultSkyAtmosphereRayleighCoefficient =
    skyAtmosphere.atmosphereRayleighCoefficient;
  const defaultSkyAtmosphereMieCoefficient =
    skyAtmosphere.atmosphereMieCoefficient;
  const defaultSkyAtmosphereMieAnisotropy =
    skyAtmosphere.atmosphereMieAnisotropy;
  const defaultSkyAtmosphereRayleighScaleHeight =
    skyAtmosphere.atmosphereRayleighScaleHeight;
  const defaultSkyAtmosphereMieScaleHeight =
    skyAtmosphere.atmosphereMieScaleHeight;
  const defaultSkyAtmosphereHueShift = skyAtmosphere.hueShift;
  const defaultSkyAtmosphereSaturationShift = skyAtmosphere.saturationShift;
  const defaultSkyAtmosphereBrightnessShift = skyAtmosphere.brightnessShift;

  let defaultParams = {
    showSkyAtmosphere: true,
    skyAtmosphereLightIntensity: defaultSkyAtmosphereLightIntensity,
    skyAtmosphereRayleighCoefficientR:
      defaultSkyAtmosphereRayleighCoefficient.x / 1e-6,
    skyAtmosphereRayleighCoefficientG:
      defaultSkyAtmosphereRayleighCoefficient.y / 1e-6,
    skyAtmosphereRayleighCoefficientB:
      defaultSkyAtmosphereRayleighCoefficient.z / 1e-6,
    skyAtmosphereMieCoefficient: defaultSkyAtmosphereMieCoefficient.x / 1e-6,
    skyAtmosphereRayleighScaleHeight: defaultSkyAtmosphereRayleighScaleHeight,
    skyAtmosphereMieScaleHeight: defaultSkyAtmosphereMieScaleHeight,
    skyAtmosphereMieAnisotropy: defaultSkyAtmosphereMieAnisotropy,
    skyHueShift: defaultSkyAtmosphereHueShift,
    skySaturationShift: defaultSkyAtmosphereSaturationShift,
    skyBrightnessShift: defaultSkyAtmosphereBrightnessShift,
    perFragmentAtmosphere: false,
    dynamicLighting: true,
    dynamicLightingFromSun: false,
  };

  let res = await skyAtmosphereTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue || defaultParams;
};
