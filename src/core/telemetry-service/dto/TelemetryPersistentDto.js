//@ts-check
/**
 * @import {ITelemetryPersistent} from "../domain/TelemetryEntity"
 */

import { DTOError } from '../../errors/DtoError.js';

/**
 * @implements {ITelemetryPersistent}
 */
export class TelemetryPersistentDTO {
  /**
   * @param {ITelemetryPersistent} data
   */
  constructor(data) {
    const requiredFields = [
      'vehicleId',
      'timestamp',
      'speed',
      'engineTemp',
      'fuelLevel',
      'lat',
      'lng',
      'avgSpeed',
      'avgEngineTemp',
      'distanceTraveledMeters',
      'status',
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

    const numericFields = [
      'speed',
      'engineTemp',
      'fuelLevel',
      'lat',
      'lng',
      'avgSpeed',
      'avgEngineTemp',
      'distanceTraveledMeters',
    ];

    numericFields.forEach((field) => {
      // @ts-ignore
      if (typeof data[field] !== 'number') {
        throw new DTOError(
          `"${field}" must be a number`,
          this.constructor.name
        );
      }
    });

    const validStatuses = ['VALID', 'REJECTED', 'MANUAL_REVIEW'];
    if (!validStatuses.includes(data.status)) {
      throw new DTOError(
        `status must be one of ${validStatuses.join(', ')}`,
        this.constructor.name
      );
    }

    if (
      typeof data.timestamp !== 'string' ||
      isNaN(new Date(data.timestamp).getTime())
    ) {
      console.debug(`typeof timestamp: ${typeof data.timestamp}`);
      throw new DTOError(
        `timestamp must be a valid ISO date string. received: ${data.timestamp}`,
        this.constructor.name
      );
    }

    if (data.effectedBy && !Array.isArray(data.effectedBy)) {
      throw new DTOError(
        'effectedBy must be an array of strings if provided',
        this.constructor.name
      );
    }
    if (data.reason && typeof data.reason !== 'string') {
      throw new DTOError(
        'reason must be a string if provided',
        this.constructor.name
      );
    }

    this.vehicleId = data.vehicleId;
    this.timestamp = data.timestamp;
    this.speed = data.speed;
    this.engineTemp = data.engineTemp;
    this.fuelLevel = data.fuelLevel;
    this.lat = data.lat;
    this.lng = data.lng;
    this.avgSpeed = data.avgSpeed;
    this.avgEngineTemp = data.avgEngineTemp;
    this.distanceTraveledMeters = data.distanceTraveledMeters;
    this.status = data.status;
    this.effectedBy = data.effectedBy;
    this.reason = data.reason;
    this.sessionId = data.sessionId;
  }
}
