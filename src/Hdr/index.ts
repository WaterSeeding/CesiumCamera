import * as Cesium from "cesium";
import { hdrTable } from "./_db";
import { setGui } from "./_gui";
import { setParams } from "./_params";

export interface HdrParamsInterface {
  highDynamicRange: boolean;
}

class Hdr {
  viewer: Cesium.Viewer;
  hdr: Cesium.Scene;
  hdrInitParams: HdrParamsInterface;

  constructor(viewer: Cesium.Viewer, gui: dat.GUI) {
    this.viewer = viewer;
    this.hdr = this.viewer.scene;
    setParams(this.hdr, hdrTable).then(
      (hdrParams: HdrParamsInterface) => {
        this.hdrInitParams = hdrParams;
        setGui(
          gui,
          this.hdrInitParams,
          this.hdr,
          (hdrParams: HdrParamsInterface) => {
            hdrTable.add(hdrParams);
          }
        );
      }
    );
  }
}

export default Hdr;
