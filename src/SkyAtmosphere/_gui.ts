import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { SkyAtmosphereParamsInterface } from "./index";
import { setGuiCheckbox } from "./utils/setGuiCheckbox";
import { setGuiSlide } from "./utils/setGuiSlide";
import { downloadJson } from "./utils/downloadJson";

const reviseGui = (
  skyAtmosphere: Cesium.SkyAtmosphere,
  guiParams: SkyAtmosphereParamsInterface
) => {
  skyAtmosphere.show = Boolean(guiParams.showSkyAtmosphere);
  skyAtmosphere.atmosphereLightIntensity = Number(
    guiParams.skyAtmosphereLightIntensity
  );
  skyAtmosphere.atmosphereRayleighCoefficient.x =
    parseFloat(guiParams.skyAtmosphereRayleighCoefficientR + "") * 1e-6;
  skyAtmosphere.atmosphereRayleighCoefficient.y =
    parseFloat(guiParams.skyAtmosphereRayleighCoefficientG + "") * 1e-6;
  skyAtmosphere.atmosphereRayleighCoefficient.z =
    parseFloat(guiParams.skyAtmosphereRayleighCoefficientB + "") * 1e-6;
  skyAtmosphere.atmosphereMieCoefficient = new Cesium.Cartesian3(
    guiParams.skyAtmosphereMieCoefficient,
    guiParams.skyAtmosphereMieCoefficient,
    guiParams.skyAtmosphereMieCoefficient
  );
  skyAtmosphere.atmosphereRayleighScaleHeight = parseFloat(
    guiParams.skyAtmosphereRayleighScaleHeight + ""
  );
  skyAtmosphere.atmosphereMieScaleHeight = parseFloat(
    guiParams.skyAtmosphereMieScaleHeight + ""
  );
  skyAtmosphere.atmosphereMieAnisotropy = parseFloat(
    guiParams.skyAtmosphereMieAnisotropy + ""
  );
  skyAtmosphere.hueShift = parseFloat(guiParams.skyHueShift + "");
  skyAtmosphere.saturationShift = parseFloat(guiParams.skySaturationShift + "");
  skyAtmosphere.brightnessShift = parseFloat(guiParams.skyBrightnessShift + "");
  skyAtmosphere.perFragmentAtmosphere = guiParams.perFragmentAtmosphere;
};

const storeGui = (
  guiParams: SkyAtmosphereParamsInterface,
  storeCb: Function
) => {
  storeCb({
    ...guiParams,
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: SkyAtmosphereParamsInterface,
  skyAtmosphere: Cesium.SkyAtmosphere,
  storeCb: Function
) => {
  let skyAtmosphere_folder = gui.addFolder("skyAtmosphere");
  skyAtmosphere_folder.close();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(skyAtmosphere, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiCheckbox(
    skyAtmosphere_folder,
    guiParams,
    "showSkyAtmosphere",
    "Sky Atmosphere",
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiSlide(
    skyAtmosphere_folder,
    guiParams,
    "skyAtmosphereLightIntensity",
    "Light Intensity",
    {
      min: 0,
      max: 100.0,
      step: 1,
    },
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiSlide(
    skyAtmosphere_folder,
    guiParams,
    "skyAtmosphereRayleighCoefficientR",
    "Rayleigh Coefficient: Red",
    {
      min: 0,
      max: 100.0,
      step: 1,
    },
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiSlide(
    skyAtmosphere_folder,
    guiParams,
    "skyAtmosphereRayleighCoefficientG",
    "Rayleigh Coefficient: Green",
    {
      min: 0,
      max: 100.0,
      step: 1,
    },
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiSlide(
    skyAtmosphere_folder,
    guiParams,
    "skyAtmosphereRayleighCoefficientB",
    "Rayleigh Coefficient: Blue",
    {
      min: 0,
      max: 100.0,
      step: 1,
    },
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiSlide(
    skyAtmosphere_folder,
    guiParams,
    "skyAtmosphereMieCoefficient",
    "Mie Coefficient",
    {
      min: 0,
      max: 100.0,
      step: 1,
    },
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiSlide(
    skyAtmosphere_folder,
    guiParams,
    "skyAtmosphereRayleighScaleHeight",
    "Rayleigh Scale Height",
    {
      min: 0,
      max: 2e4,
      step: 1e2,
    },
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiSlide(
    skyAtmosphere_folder,
    guiParams,
    "skyAtmosphereMieScaleHeight",
    "Mie Scale Height",
    {
      min: 0,
      max: 2e4,
      step: 1e2,
    },
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiSlide(
    skyAtmosphere_folder,
    guiParams,
    "skyAtmosphereMieAnisotropy",
    "Mie Anisotropy",
    {
      min: -1.0,
      max: 1.0,
      step: 0.1,
    },
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiSlide(
    skyAtmosphere_folder,
    guiParams,
    "skyHueShift",
    "Hue Shift",
    {
      min: -1.0,
      max: 1.0,
      step: 0.01,
    },
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiSlide(
    skyAtmosphere_folder,
    guiParams,
    "skySaturationShift",
    "Saturation Shift",
    {
      min: -1.0,
      max: 1.0,
      step: 0.01,
    },
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiSlide(
    skyAtmosphere_folder,
    guiParams,
    "skyBrightnessShift",
    "Brightness Shift",
    {
      min: -1.0,
      max: 1.0,
      step: 0.01,
    },
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  setGuiCheckbox(
    skyAtmosphere_folder,
    guiParams,
    "perFragmentAtmosphere",
    "Per-Fragment",
    () => {
      reviseGui(skyAtmosphere, guiParams);
    }
  );

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(skyAtmosphere, initGuiParams);
      storeGui(initGuiParams, storeCb);
      skyAtmosphere_folder.revert(skyAtmosphere_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson("sunLighting.json", downloadGuiParams);
    },
  };

  skyAtmosphere_folder.add(obj, "ensure").name("确定参数");
  skyAtmosphere_folder.add(obj, "reset").name("重置参数");
  skyAtmosphere_folder.add(obj, "download").name("下载参数");
};
