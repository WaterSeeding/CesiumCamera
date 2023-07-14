import * as Cesium from "cesium";
import { bloomTable } from "./_db";
import { setGui } from "./_gui";
import { setParams } from "./_params";

export interface BloomParamsInterface {
  show: boolean;
  glowOnly: boolean;
  contrast: number;
  brightness: number;
  delta: number;
  sigma: number;
  stepSize: number;
}

class Bloom {
  viewer: Cesium.Viewer;
  bloom: Cesium.PostProcessStageComposite;
  bloomInitParams: BloomParamsInterface;

  constructor(viewer: Cesium.Viewer, gui: dat.GUI) {
    this.viewer = viewer;
    this.bloom = this.viewer.scene.postProcessStages.bloom;
    setParams(this.bloom, bloomTable).then(
      (bloomParams: BloomParamsInterface) => {
        this.bloomInitParams = bloomParams;
        setGui(
          gui,
          this.bloomInitParams,
          this.bloom,
          (bloomParams: BloomParamsInterface) => {
            bloomTable.add(bloomParams);
          }
        );
      }
    );
  }
}

export default Bloom;
