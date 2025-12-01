//@ts-check
/**
 * @import {ITelemetryPersistent} from '../../../core/telemetry-service/domain/TelemetryEntity'
 */
import { Op } from 'sequelize';
import { TelemetryRepositoryPort } from '../../../core/telemetry-service/ports/driven/TelemetryRepositoryPort.js';
import { Telemetry } from '../../../infrastructure/db/postgresql/models/telemetry.model.js';
import { TelemetryPersistentDTO } from '../../../core/telemetry-service/dto/TelemetryPersistentDto.js';

/**
 * @class TelemetryRepository
 * @implements {TelemetryRepositoryPort}
 */
export class TelemetryRepository extends TelemetryRepositoryPort {
  constructor() {
    super();
  }
  /**
   * @override
   * @param {string} vehicleId
   * @param {string} sessionId
   * @param {number} amount
   * @returns {Promise<Array<ITelemetryPersistent>>}
   */
  async getPreviousReadings(vehicleId, sessionId, amount) {
    const result = await Telemetry.findAll({
      where: { vehicleId, sessionId },
      order: [['timestamp', 'DESC']],
      limit: amount,
    });
    return result.map((item) => new TelemetryPersistentDTO(item.toJSON()));
  }

  /**
   * @param {string} vehicleId
   * @param {string} sessionId
   * @param {number} amount
   * @returns {Promise<Array<ITelemetryPersistent>>}
   */
  async getPreviousReadingsNotRejected(vehicleId, sessionId, amount) {
    const result = await Telemetry.findAll({
      where: { vehicleId, sessionId, status: { [Op.notILike]: 'REJECTED' } },
      order: [['timestamp', 'DESC']],
      limit: amount,
    });
    return result.map((item) => new TelemetryPersistentDTO(item.toJSON()));
  }

  /**
   * @override
   * @param {ITelemetryPersistent} entity
   */
  async save(entity) {
    return (await Telemetry.create(entity)).toJSON();
  }
}
