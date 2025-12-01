//@ts-check
/**
 * @import {ITelemetryPersistent} from '../../domain/TelemetryEntity'
 */

/**
 * @inteface TelemetryRepositoryPort
 */
export class TelemetryRepositoryPort {
  /**
   * @abstract
   * @param {string} vehicleId
   * @param {string} sessionId
   * @param {number} amount
   * @returns {Promise<Array<ITelemetryPersistent>>}
   */
  async getPreviousReadings(vehicleId, sessionId, amount) {
    throw new Error(`Abstract method must be implemented`);
  }

  /**
   * @abstract
   * @param {string} vehicleId
   * @param {string} sessionId
   * @param {number} amount
   * @returns {Promise<Array<ITelemetryPersistent>>}
   */
  async getPreviousReadingsNotRejected(vehicleId, sessionId, amount) {
    throw new Error(`Abstract method must be implemented`);
  }

  /**
   * @abstract
   * @param {ITelemetryPersistent} telemetry
   * @returns {Promise<ITelemetryPersistent>}
   */
  async save(telemetry) {
    throw new Error(`Abstract method must be implemented`);
  }
}
