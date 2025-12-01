//@ts-check
/**
 * @import {ITelemetryPersistent} from '../../../src/core/telemetry-service/domain/TelemetryEntity'
 */
import { TelemetryRepositoryPort } from '../../../src/core/telemetry-service/ports/driven/TelemetryRepositoryPort';

/**
 * @implements {TelemetryRepositoryPort}
 */
export class MockTelemetryRepo extends TelemetryRepositoryPort {
  constructor() {
    super();
    /**
     * @type {Array<ITelemetryPersistent>}
     */
    this._data = [];
  }

  /**
   * @override
   * @param {string} vehicleId
   * @param {string} sessionId
   * @param {number} amount
   * @returns {Promise<Array<ITelemetryPersistent>>}
   */
  async getPreviousReadings(vehicleId, sessionId, amount) {
    return this._data
      .filter((item) => item.vehicleId === vehicleId)
      .sort(
        (a, b) =>
          new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf()
      )
      .slice(amount);
  }

  /**
   * @override
   * @param {string} vehicleId
   * @param {string} sessionId
   * @param {number} amount
   * @returns {Promise<Array<ITelemetryPersistent>>}
   */
  async getPreviousReadingsNotRejected(vehicleId, sessionId, amount) {
    return this._data
      .filter(
        (item) => item.vehicleId === vehicleId && item.status !== 'REJECTED'
      )
      .sort(
        (a, b) =>
          new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf()
      )
      .slice(amount);
  }

  /**
   *
   * @param {ITelemetryPersistent} telemetry
   * @returns {Promise<ITelemetryPersistent>}
   */
  async save(telemetry) {
    this._data.push(telemetry);
    return telemetry;
  }
}
