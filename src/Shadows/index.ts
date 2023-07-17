import * as Cesium from "cesium";
import { shadowsTable } from "./_db";
import { setGui } from "./_gui";
import { setParams } from "./_params";

export interface ShadowsParamsInterface {
  softShadows: boolean;
  size: number;
}

class Shadows {
  viewer: Cesium.Viewer;
  shadows: Cesium.ShadowMap;
  shadowsInitParams: ShadowsParamsInterface;

  constructor(viewer: Cesium.Viewer, gui: dat.GUI) {
    this.viewer = viewer;
    this.shadows = this.viewer.shadowMap;
    setParams(this.shadows, shadowsTable).then(
      (shadowsParams: ShadowsParamsInterface) => {
        this.shadowsInitParams = shadowsParams;
        setGui(
          gui,
          this.shadowsInitParams,
          this.shadows,
          (shadowsParams: ShadowsParamsInterface) => {
            shadowsTable.add(shadowsParams);
          }
        );
      }
    );
  }
}

export default Shadows;
