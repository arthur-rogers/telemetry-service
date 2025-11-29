//@ts-check
/**
 * @import {ITelemetryAggregated} from "../domain/TelemetryEntity"
 */

import { DTOError } from '../../errors/DtoError';

/**
 * @implements {ITelemetryAggregated}
 */
export class TelemetryAggregatedDTO {
  /**
   * @param {ITelemetryAggregated} data
   */
  constructor(data) {
    const requiredFields = [
      'isNewState',
      'vehicleId',
      'speed',
      'prevSpeed',
      'avgSpeed',
      'speedChange',
      'engineTemp',
      'prevEngineTemp',
      'avgEngineTemp',
      'fuelLevel',
      'prevFuelLevel',
      'fuelLevelChangeRate',
      'distanceTraveledMeters',
      'maxPossibleDistanceMeters',
      'timestamp',
      'prevTimestamp',
      'timestampAgeSec',
      'lat',
      'lng',
    ];

    for (const field of requiredFields) {
      // @ts-ignore
      if (data[field] === undefined || data[field] === null) {
        throw new DTOError(
          `missing required field "${field}"`,
          'TelemetryAggregatedDTO'
        );
      }
    }

    this.isNewState = data.isNewState;
    this.vehicleId = data.vehicleId;
    this.speed = data.speed;
    this.prevSpeed = data.prevSpeed;
    this.avgSpeed = data.avgSpeed;
    this.speedChange = data.speedChange;
    this.engineTemp = data.engineTemp;
    this.prevEngineTemp = data.prevEngineTemp;
    this.avgEngineTemp = data.avgEngineTemp;
    this.fuelLevel = data.fuelLevel;
    this.prevFuelLevel = data.prevFuelLevel;
    this.fuelLevelChangeRate = data.fuelLevelChangeRate;
    this.distanceTraveledMeters = data.distanceTraveledMeters;
    this.maxPossibleDistanceMeters = data.maxPossibleDistanceMeters;
    this.timestamp = data.timestamp;
    this.prevTimestamp = data.prevTimestamp;
    this.timestampAgeSec = data.timestampAgeSec;
    this.lng = data.lng;
    this.lat = data.lat;
  }
}
