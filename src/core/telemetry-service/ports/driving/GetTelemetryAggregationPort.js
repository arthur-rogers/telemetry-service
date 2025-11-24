//@ts-check
/**
 * @import {ITelemetry, ITelemetryPersistent, ITelemetryAggregated} from '../../domain/TelemetryEntity'
 */

/**
 * @interface TelemetryAggregationPort
 */
export class TelemetryAggregationPort {
  /**
   * @abstract
   * @param {ITelemetry} incoming
   * @param {Array<ITelemetryPersistent>} [previous]
   * @returns {Promise<ITelemetryAggregated>}
   */
  async getAggregated(incoming, previous) {
    throw new Error(`Abstract method must be implemented`);
  }
}
