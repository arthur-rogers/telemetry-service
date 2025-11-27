//@ts-check
/**
 * @import {ITelemetry, ITelemetryPersistent, ITelemetryAggregated} from '../domain/TelemetryEntity'
 */

/** @interface */
export class ITelemetryAggregateService {
  /**
   *
   * @param {ITelemetry} newData
   * @param {Array<ITelemetryPersistent>} prevReadings
   * @returns {ITelemetryAggregated}
   */
  getAggregated(newData, prevReadings) {
    throw new Error(`Not implemented`);
  }
}
