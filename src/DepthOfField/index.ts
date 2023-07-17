import * as Cesium from "cesium";
import { depthOfFieldTable } from "./_db";
import { setGui } from "./_gui";
import { setParams } from "./_params";

export interface DepthOfFieldParamsInterface {
  show: boolean;
  focalDistance: number;
  delta: number;
  sigma: number;
  stepSize: number;
}

class DepthOfField {
  viewer: Cesium.Viewer;
  depthOfField: Cesium.PostProcessStageComposite;
  depthOfFieldInitParams: DepthOfFieldParamsInterface;

  constructor(viewer: Cesium.Viewer, gui: dat.GUI) {
    this.viewer = viewer;
    this.depthOfField = viewer.scene.postProcessStages.add(
      Cesium.PostProcessStageLibrary.createDepthOfFieldStage(),
    ) as Cesium.PostProcessStageComposite;
    setParams(this.depthOfField, depthOfFieldTable).then(
      (depthOfFieldParams: DepthOfFieldParamsInterface) => {
        this.depthOfFieldInitParams = depthOfFieldParams;
        setGui(
          gui,
          this.depthOfFieldInitParams,
          this.depthOfField,
          (depthOfFieldParams: DepthOfFieldParamsInterface) => {
            depthOfFieldTable.add(depthOfFieldParams);
          }
        );
      }
    );
  }
}

export default DepthOfField;
