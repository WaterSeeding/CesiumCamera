import * as Cesium from "cesium";
import { fogTable } from "./_db";
import { setGui } from "./_gui";
import { setParams } from "./_params";

export interface FogParamsInterface {
  show: boolean;
  density: number;
  minimumBrightness: number;
}

class Fog {
  viewer: Cesium.Viewer;
  fog: Cesium.Fog;
  fogInitParams: FogParamsInterface;

  constructor(viewer: Cesium.Viewer, gui: dat.GUI) {
    this.viewer = viewer;
    this.fog = this.viewer.scene.fog;
    setParams(this.fog, fogTable).then((fogParams: FogParamsInterface) => {
      this.fogInitParams = fogParams;
      setGui(
        gui,
        this.fogInitParams,
        this.fog,
        (fogParams: FogParamsInterface) => {
          fogTable.add(fogParams);
        }
      );
    });
  }
}

export default Fog;
