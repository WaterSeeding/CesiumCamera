import * as Cesium from "cesium";
import { brightnessTable } from "./_db";
import { setGui } from "./_gui";
import { setParams } from "./_params";

export interface BrightnessParamsInterface {
  enabled: boolean;
  uniformsBrightness: number;
}

class Brightness {
  viewer: Cesium.Viewer;
  brightness: Cesium.PostProcessStage;
  brightnessInitParams: BrightnessParamsInterface;

  constructor(viewer: Cesium.Viewer, gui: dat.GUI) {
    this.viewer = viewer;
    this.brightness = this.viewer.scene.postProcessStages.add(
      Cesium.PostProcessStageLibrary.createBrightnessStage()
    ) as Cesium.PostProcessStage;

    setParams(this.brightness, brightnessTable).then(
      (brightnessParams: BrightnessParamsInterface) => {
        this.brightnessInitParams = brightnessParams;
        setGui(
          gui,
          this.brightnessInitParams,
          this.brightness,
          (brightnessParams: BrightnessParamsInterface) => {
            brightnessTable.add(brightnessParams);
          }
        );
      }
    );
  }
}

export default Brightness;
