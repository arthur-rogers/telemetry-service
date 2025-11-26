//@ts-check
/**
 * @import {ITelemetryAggregated} from "../domain/TelemetryEntity"
 */

import { DTOError } from '../../errors/DtoError';

/**
 * @class TelemetryAggregatedDTO
 */
export class TelemetryAggregatedDTO {
  /**
   * @param {ITelemetryAggregated} data
   */
  constructor(data) {
    /** @type {(keyof ITelemetryAggregated)[]} */
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
      if (data[field] === undefined || data[field] === null) {
        throw new DTOError(
          `missing required field "${field}"`,
          'TelemetryAggregatedDTO'
        );
      }
    }
    Object.assign(this, data);
  }
}
