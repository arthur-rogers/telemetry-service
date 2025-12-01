//@ts-check
/**
 * @import {ITelemetry} from "../domain/TelemetryEntity"
 */

import { DTOError } from '../../errors/DtoError.js';

/**
 * @implements {ITelemetry}
 */
export class TelemetryDTO {
  /**
   * @param {ITelemetry} data
   */
  constructor(data) {
    const requiredFields = [
      'vehicleId',
      'timestamp',
      'speed',
      'engineTemp',
      'fuelLevel',
      'location',
    ];

    for (const field of requiredFields) {
      // @ts-ignore
      if (data[field] === undefined || data[field] === null) {
        throw new DTOError(
          `missing required field "${field}"`,
          this.constructor.name
        );
      }
    }

    if (
      typeof data.location.lat !== 'number' ||
      typeof data.location.lng !== 'number'
    ) {
      throw new DTOError(
        `location must have numeric lat and lng`,
        this.constructor.name
      );
    }

    if (
      typeof data.timestamp !== 'string' ||
      isNaN(new Date(data.timestamp).getTime())
    ) {
      throw new DTOError(
        `timestamp must be a valid ISO date string. received: ${data.timestamp}`,
        this.constructor.name
      );
    }
    this.vehicleId = data.vehicleId;
    this.timestamp = data.timestamp;
    this.speed = data.speed;
    this.engineTemp = data.engineTemp;
    this.fuelLevel = data.fuelLevel;
    this.location = data.location;
    this.sessionId = data.sessionId;
  }
}
