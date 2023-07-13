import * as Cesium from "cesium";

const scratchIcrfToFixed = new Cesium.Matrix3();
const scratchMoonPosition = new Cesium.Cartesian3();
const scratchMoonDirection = new Cesium.Cartesian3();

export const getMoonDirection = (
  viewer: Cesium.Viewer,
  result?: any
): Cesium.Cartesian3 => {
  result = Cesium.defined(result) ? result : new Cesium.Cartesian3();
  const icrfToFixed = scratchIcrfToFixed;
  const date = viewer.clock.currentTime;
  if (
    !Cesium.defined(
      Cesium.Transforms.computeIcrfToFixedMatrix(date, icrfToFixed)
    )
  ) {
    Cesium.Transforms.computeTemeToPseudoFixedMatrix(date, icrfToFixed);
  }
  const moonPosition =
    Cesium.Simon1994PlanetaryPositions.computeMoonPositionInEarthInertialFrame(
      date,
      scratchMoonPosition
    );
  Cesium.Matrix3.multiplyByVector(icrfToFixed, moonPosition, moonPosition);
  const moonDirection = Cesium.Cartesian3.normalize(
    moonPosition,
    scratchMoonDirection
  );
  return Cesium.Cartesian3.negate(moonDirection, result);
};
