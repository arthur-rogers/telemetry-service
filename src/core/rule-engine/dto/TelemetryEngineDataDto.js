//@ts-check
/**
 * @import {ITelemetryEngineData} from "../domain/RuleEngineEntity"
 */

import { DTOError } from '../../errors/DtoError';

/**
 * @implements {ITelemetryEngineData}
 */
export class TelemetryEngineDataDTO {
  /**
   * @param {ITelemetryEngineData} data
   */
  constructor(data) {
    if (typeof data.isNewState === 'boolean') {
      data.isNewState = String(data.isNewState);
    } else if (data.isNewState !== 'true' && data.isNewState !== 'false') {
      throw new DTOError(
        `"isNewState" must be a boolean or a string "true"/"false"`,
        this.constructor.name
      );
    }

    const requiredNumberFields = [
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
    ];

    for (const field of requiredNumberFields) {
      // @ts-ignore
      if (typeof data[field] !== 'number' || Number.isNaN(data[field])) {
        throw new DTOError(
          `"${field}" must be a valid number`,
          this.constructor.name
        );
      }
    }

    if (
      !Number.isFinite(data.timestamp) ||
      !Number.isFinite(data.prevTimestamp)
    ) {
      throw new DTOError(
        'timestamp and prevTimestamp must be finite numbers (ms)',
        this.constructor.name
      );
    }

    this.isNewState = data.isNewState;
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
  }
}
