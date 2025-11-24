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
   * @param {number} amount
   * @returns {Promise<Array<ITelemetryPersistent>>}
   */
  async getPreviousReadings(vehicleId, amount) {
    throw new Error(`Abstract method must be implemented`);
  }

  /**
   * @abstract
   * @param {string} vehicleId
   * @param {number} amount
   * @returns {Promise<Array<ITelemetryPersistent>>}
   */
  async getPreviousReadingsNotRejected(vehicleId, amount) {
    throw new Error(`Abstract method must be implemented`);
  }

  /**
   * @abstract
   * @param {ITelemetryPersistent} telemetry
   */
  async save(telemetry) {
    throw new Error(`Abstract method must be implemented`);
  }
}
