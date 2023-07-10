import * as Cesium from "cesium";

class SunLight {
  static instance: SunLight;
  viewer: Cesium.Viewer;
  light: Cesium.SunLight;
  constructor(viewer: Cesium.Viewer) {
    if (SunLight.instance) {
      return SunLight.instance;
    }
    SunLight.instance = this;

    this.viewer = viewer;
    this.light = new Cesium.SunLight();
  }
}

export default SunLight;
