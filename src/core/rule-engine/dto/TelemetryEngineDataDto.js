//@ts-check
/**
 * @import {ITelemetryEngineData} from "../domain/RuleEngineEntity"
 */

import { DTOError } from '../../errors/DtoError';

/**
 * @class TelemetryEngineDataDTO
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

    /** @type {(keyof ITelemetryEngineData)[]} */
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

    Object.assign(this, data);
  }
}
