//@ts-check
/**
 * @import {ITelemetryPersistent} from '../domain/TelemetryEntity'
 */

import { TelemetryRepositoryPort } from '../ports/driven/TelemetryRepositoryPort.js';
import { ISaveTelemetryPort } from '../ports/driving/SaveTelemetryPort.js';

/**
 * @implements {ISaveTelemetryPort}
 */
export class SaveTelemetryUseCase extends ISaveTelemetryPort {
  /**
   *
   * @param {TelemetryRepositoryPort} repo
   */
  constructor(repo) {
    super(repo);
  }

  /**
   * @override
   * @param {ITelemetryPersistent} item
   * @returns {Promise<ITelemetryPersistent>}
   */
  async save(item) {
    try {
      return this._repository.save(item);
    } catch (err) {
      throw new Error(`Failed to save telemetry to db: ${err}`);
    }
  }
}
