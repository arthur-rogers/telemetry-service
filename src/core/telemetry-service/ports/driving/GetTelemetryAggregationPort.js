//@ts-check
/**
 * @import {
 *  ITelemetry,
 *  ITelemetryAggregated
 * } from '../../domain/TelemetryEntity'
 */

import { TelemetryRepositoryPort } from '../driven/TelemetryRepositoryPort.js';

/**
 * @interface ITelemetryAggregationPort
 */
export class ITelemetryAggregationPort {
  /**
   *
   * @param {TelemetryRepositoryPort} repository
   */
  constructor(repository) {
    /**@readonly */
    this._reposidory = repository;
  }
  /**
   * @abstract
   * @param {ITelemetry} incoming
   * @param {string} sessionId
   * @returns {Promise<ITelemetryAggregated>}
   */
  async getAggregated(incoming, sessionId) {
    throw new Error(`Abstract method must be implemented`);
  }
}
