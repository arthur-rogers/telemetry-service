//@ts-check
/**
 * @import {ITelemetry, ITelemetryPersistent, ITelemetryAggregated} from '../domain/TelemetryEntity'
 */

/** @class TelemetryAggregateService */
import haversineDistance from 'haversine-distance';
export class TelemetryAggregateService {
  /**
   *
   * @param {ITelemetry} newData
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @returns {ITelemetryAggregated}
   */
  getAggregated(newData, prevReadings) {
    const { vehicleId, location, speed, engineTemp, fuelLevel, timestamp } =
      newData;
    const isNewState = prevReadings && prevReadings.length ? false : true;
    const prevAndAvg = !isNewState
      ? this._getPreviousAndAverage(prevReadings, newData)
      : null;
    return {
      isNewState,
      vehicleId: vehicleId,
      lat: location.lat,
      lng: location.lng,
      speed: speed,
      prevSpeed: prevAndAvg?.prevSpeed || 0,
      avgSpeed: prevAndAvg?.avgSpeed || speed,
      speedChange: prevAndAvg?.speedChange || speed,
      engineTemp: engineTemp,
      prevEngineTemp: prevAndAvg?.prevEngineTemp || 0,
      avgEngineTemp: prevAndAvg?.avgEngineTemp || engineTemp,
      fuelLevel: fuelLevel,
      prevFuelLevel: prevAndAvg?.prevFuelLevel || 0,
      fuelLevelChangeRate: prevAndAvg?.fuelLevelChangeRate || 0,
      distanceTraveledMeters: prevAndAvg?.distanceTraveledMeters || 0,
      maxPossibleDistanceMeters: prevAndAvg?.maxPossibleDistanceMeters || 0,
      timestamp: timestamp,
      prevTimestamp: prevAndAvg?.prevTimestamp || null,
      timestampAgeSec: this._msToSec(
        Date.now().valueOf() - new Date(timestamp).valueOf(),
        5
      ),
    };
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @param {ITelemetry} newData
   * @returns {{
   * prevSpeed: number,
   * avgSpeed: number,
   * speedChange: number,
   * prevEngineTemp: number,
   * avgEngineTemp: number,
   * prevFuelLevel: number,
   * fuelLevelChangeRate: number,
   * distanceTraveledMeters: number,
   * maxPossibleDistanceMeters: number,
   * prevTimestamp: string
   * timestampAgeSec: number
   * }}
   */
  _getPreviousAndAverage(prevReadings, newData) {
    const { prevSpeed, avgSpeed, speedChange } = this._getSpeedData(
      prevReadings,
      newData
    );

    const { prevEngineTemp, avgEngineTemp } = this._getEngineData(
      prevReadings,
      newData
    );

    const { prevFuelLevel, fuelLevelChangeRate } = this._getFuelData(
      prevReadings,
      newData
    );
    const { prevTimestamp, timestampAgeSec } = this._getTimestampData(
      prevReadings,
      newData
    );
    const timePassed = Math.abs(
      new Date(newData.timestamp).valueOf() - new Date(prevTimestamp).valueOf()
    );
    const { distanceTraveledMeters, maxPossibleDistanceMeters } =
      this._getDistanceData(prevReadings, newData, avgSpeed, timePassed);
    return {
      prevSpeed,
      avgSpeed,
      speedChange,
      prevEngineTemp,
      avgEngineTemp,
      prevFuelLevel,
      fuelLevelChangeRate,
      prevTimestamp,
      timestampAgeSec,
      distanceTraveledMeters,
      maxPossibleDistanceMeters,
    };
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings,
   * @param {ITelemetry} newData
   * @returns {{prevSpeed: number, avgSpeed: number, speedChange: number}}
   */
  _getSpeedData(prevReadings, newData) {
    const validReadings = this._getValidReadingsByType(prevReadings, 'SPEED');
    const speedChange = validReadings.length
      ? newData.speed - validReadings[0].speed
      : 0;
    const avgSpeed = this._getAverage(
      [...validReadings, newData].map((r) => r.speed)
    );

    return {
      avgSpeed,
      speedChange,
      prevSpeed: validReadings[0].speed,
    };
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings,
   * @param {ITelemetry} newData
   * @returns {{prevEngineTemp: number, avgEngineTemp: number}}
   */
  _getEngineData(prevReadings, newData) {
    const validReadings = this._getValidReadingsByType(
      prevReadings,
      'ENGINE_TEMP'
    );

    const avgEngineTemp = this._getAverage(
      [...validReadings, newData].map((r) => r.engineTemp)
    );
    return {
      prevEngineTemp: validReadings[0].engineTemp,
      avgEngineTemp,
    };
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings,
   * @param {ITelemetry} newData
   * @returns {{prevFuelLevel: number, fuelLevelChangeRate: number}}
   */
  _getFuelData(prevReadings, newData) {
    const validReadings = this._getValidReadingsByType(
      prevReadings,
      'FUEL_LEVEL'
    );

    const prevFuelLevel = validReadings[0].fuelLevel;
    const fuelLevelChangeRate =
      Math.round(
        ((newData.fuelLevel - prevFuelLevel) / prevFuelLevel) * 10000
      ) / 100;
    return {
      prevFuelLevel,
      fuelLevelChangeRate,
    };
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings,
   * @param {ITelemetry} newData
   * @param {number} avgSpeed
   * @param {number} timePassed,
   * @returns {{distanceTraveledMeters: number, maxPossibleDistanceMeters: number}}
   */
  _getDistanceData(prevReadings, newData, avgSpeed, timePassed) {
    const validReadings = this._getValidReadingsByType(
      prevReadings,
      'LOCATION'
    );

    const { lat, lng } = newData.location;
    const { lat: prevLat, lng: prevLng } = validReadings[0];
    const distanceTraveledMeters = Number(
      haversineDistance(
        { latitude: lat, longitude: lng },
        { latitude: prevLat, longitude: prevLng }
      ).toPrecision(3)
    );
    const millisecToHours = this._msToHour(timePassed, 15);
    const maxPossibleDistanceMeters = Number(
      (avgSpeed * 1000 * millisecToHours).toPrecision(3)
    );

    return {
      distanceTraveledMeters,
      maxPossibleDistanceMeters,
    };
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings,
   * @param {ITelemetry} newData
   * @returns {{prevTimestamp: string, timestampAgeSec: number}}
   */
  _getTimestampData(prevReadings, newData) {
    const validReadings = this._getValidReadingsByType(
      prevReadings,
      'TIMESTAMP'
    );
    const prevTimestamp = validReadings[0].timestamp;
    const timestampAgeSec = this._msToSec(
      new Date().valueOf() - new Date(newData.timestamp).valueOf(),
      5
    );

    return {
      prevTimestamp,
      timestampAgeSec,
    };
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings,
   * @param {string} type
   * @returns {Array<ITelemetryPersistent>}
   */
  _getValidReadingsByType(prevReadings, type) {
    return prevReadings
      .filter(
        (r) =>
          r.status === 'VALID' ||
          (r.status === 'MANUAL_REVIEW' && !r.effectedBy?.includes(type))
      )
      .sort(
        (a, b) =>
          new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf()
      );
  }

  /**
   * @private
   * @param {Array<number>} arr
   * @returns {number}
   */
  _getAverage(arr) {
    return arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
  }

  /**
   * @private
   * @param {number} ms
   * @param {number} precision
   */
  _msToSec(ms, precision) {
    return Number((ms / 1000).toPrecision(precision));
  }

  /**
   * @private
   * @param {number} ms
   * @param {number} precision
   */
  _msToHour(ms, precision) {
    const msPerHour = 1000 * 60 * 60 * 24;
    return Number((ms / msPerHour).toPrecision(precision));
  }
}
