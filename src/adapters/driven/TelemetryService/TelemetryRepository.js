//@ts-check
/**
 * @import {ITelemetryPersistent} from '../../../core/telemetry-service/domain/TelemetryEntity'
 */
import { TelemetryRepositoryPort } from '../../../core/telemetry-service/ports/driven/TelemetryRepositoryPort';

//TODO: this is enough to test logic but add implementation later

/**
 * @class TelemetryRepository
 * @implements {TelemetryRepositoryPort}
 */
export class TelemetryRepository extends TelemetryRepositoryPort {
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
   * @param {number} amount
   * @returns {Promise<Array<ITelemetryPersistent>>}
   */
  async getPreviousReadings(vehicleId, amount) {
    return (
      this._data
        .filter((item) => item.vehicleId === vehicleId)
        //@ts-ignore
        //TODO: fix later
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(amount)
    );
  }

  /**
   * @override
   * @param {ITelemetryPersistent} entity
   */
  async save(entity) {
    this._data.push(entity);
  }
}
