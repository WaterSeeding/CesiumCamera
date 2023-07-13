import * as Cesium from "cesium";
import { moonLightTable } from "./_db";
import { setGui } from "./_gui";
import { setParams } from "./_params";
import { getMoonDirection } from "./utils/getMoonDirection";

export interface MoonLightParamsInterface {
  direction: {
    longitude: number;
    latitude: number;
    height?: number;
  };
  color: number[];
  intensity: number;
}

class MoonLight {
  viewer: Cesium.Viewer;
  light: Cesium.DirectionalLight;
  lightInitParams!: MoonLightParamsInterface;

  constructor(
    viewer: Cesium.Viewer,
    gui: dat.GUI,
    directionalLightParams?: MoonLightParamsInterface
  ) {
    this.viewer = viewer;
    this.light = new Cesium.DirectionalLight({
      direction: getMoonDirection(viewer),
    });
    this.viewer.scene.light = this.light;
    setParams(this.light, moonLightTable).then(
      (lightParams: MoonLightParamsInterface) => {
        this.lightInitParams = directionalLightParams || lightParams;
        setGui(
          gui,
          this.lightInitParams,
          this.light,
          (data: MoonLightParamsInterface) => {
            moonLightTable.add(data);
          }
        );
      }
    );
  }

  update(scene: Cesium.Scene) {
    scene.preRender.addEventListener((scene, time) => {
      this.light.direction = getMoonDirection(
        this.viewer,
        scene.light.direction
      );
    });
  }
}

export default MoonLight;
