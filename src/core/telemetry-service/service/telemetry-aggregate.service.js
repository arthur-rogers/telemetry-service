//@ts-check
/**
 * @import {ITelemetry, ITelemetryPersistent, ITelemetryAggregated} from '../domain/TelemetryEntity'
 */

/** @class TelemetryAggregateService */
export class TelemetryAggregateService {
  /**
   *
   * @param {ITelemetry} newData
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @returns {ITelemetryAggregated}
   */
  getAggregated(newData, prevReadings) {
    // get all previous records where result is not REJECTED
    // getLatestValidRecord (including MANUAL_REVIEW)
    const previousValidTimestamp = this._getPrevTimestamp(prevReadings);
    return {
      vehicleId: newData.vehicleId,
      lat: newData.location.lat,
      lng: newData.location.lng,
      speed: newData.speed,
      prevSpeed: this._getPreviousSpeed(prevReadings),
      avgSpeed: this._getAvgSpeed(prevReadings, newData),
      speedChange: 0,
      engineTemp: newData.engineTemp,
      prevEngineTemp: this._getPrevEngineTemp(prevReadings),
      avgEngineTemp: this._getAvgEngineTemp(prevReadings, newData),
      fuelLevel: newData.fuelLevel,
      prevFuelLevel: this._getPrevFuelLevel(prevReadings),
      fuelLevelChangeRate: this._getPrevFuelLevelDelta(prevReadings),
      distanceTraveledMeters: this._getDistanceTraveledMeters(
        newData,
        prevReadings
      ),
      maxPossibleDistanceMeters: this._getMaxPossibleDistanceMeters(
        newData,
        prevReadings
      ),
      timestamp: new Date(newData.timestamp).valueOf(),
      prevTimestamp: previousValidTimestamp,
      timestampAgeSec:
        new Date(newData.timestamp).valueOf() -
        new Date(newData.timestamp).valueOf(),
    };
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @param {ITelemetry} newData
   * @returns {number}
   */
  _getAvgSpeed(prevReadings, newData) {
    // if some results are with MANUAL_REVIEW status find only those where `effectedBy` does not contain `SPEED`
    // calculate avg speed based on filtered records and current reading
    return 0;
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @returns {number}
   */
  _getPreviousSpeed(prevReadings) {
    // find latest where status is either 'VALID` or MANUAL_REVIEW but not effected by speed
    // return speed from the found item
    return 0;
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @param {ITelemetry} newData
   * @returns {number}
   */
  _getAvgEngineTemp(prevReadings, newData) {
    return 0;
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @returns {number}
   */
  _getPrevEngineTemp(prevReadings) {
    // only if valid or manual review due to reasons other than engine temp
    return 0;
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @returns {number}
   */
  _getPrevFuelLevel(prevReadings) {
    // only if valid or manual review due to reasons other than fuel level
    return 0;
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @returns {number}
   */
  _getPrevFuelLevelDelta(prevReadings) {
    // only if valid or manual review due to reasons other than fuel level
    // value should be calculated in percents
    return 0;
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @param {ITelemetry} newData
   * @returns {number}
   */
  _getDistanceTraveledMeters(newData, prevReadings) {
    // get records where speed and timestamp are not in MANUAL_REVIEW status
    // using difference in coordinates calculate traveled distance
    return 0;
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @param {ITelemetry} newData
   * @returns {number}
   */
  _getMaxPossibleDistanceMeters(newData, prevReadings) {
    // get records where speed and timestamp are not in MANUAL_REVIEW status
    // using difference in coordinates calculate max possible traveled distance
    return 0;
  }

  /**
   * @private
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @returns {number}
   */
  _getPrevTimestamp(prevReadings) {
    // get records where timestamp is not in MANUAL_REVIEW status
    return 0;
  }
}
