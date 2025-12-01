//@ts-check
/**
 * @import {ITelemetryPersistent} from "../../domain/TelemetryEntity"
 */

import { TelemetryRepositoryPort } from '../driven/TelemetryRepositoryPort.js';

/**
 * @interface ISaveTelemetryPort
 */
export class ISaveTelemetryPort {
  /**
   * @constructor
   * @param {TelemetryRepositoryPort} repository
   */
  constructor(repository) {
    this._repository = repository;
  }

  /**
   * @abstract
   * @param {ITelemetryPersistent} item
   * @returns {Promise<ITelemetryPersistent>}
   */
  async save(item) {
    throw new Error(`Not implemented`);
  }
}
