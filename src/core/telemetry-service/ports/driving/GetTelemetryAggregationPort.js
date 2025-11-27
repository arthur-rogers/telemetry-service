//@ts-check
/**
 * @import {
 *  ITelemetry,
 *  ITelemetryAggregated
 * } from '../../domain/TelemetryEntity'
 */

import { TelemetryRepositoryPort } from '../driven/TelemetryRepositoryPort';

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
   * @returns {Promise<ITelemetryAggregated>}
   */
  async getAggregated(incoming) {
    throw new Error(`Abstract method must be implemented`);
  }
}
