//@ts-check
/**
 * @import {ITelemetry, ITelemetryAggregated} from '../domain/TelemetryEntity'
 */

import { TelemetryRepositoryPort } from '../ports/driven/TelemetryRepositoryPort.js';
import { ITelemetryAggregationPort } from '../ports/driving/GetTelemetryAggregationPort.js';
import { TelemetryAggregateService } from '../service/telemetry-aggregate.service.js';

/**
 * @class GetTelemetryResultUseCase
 * @implements {ITelemetryAggregationPort}
 * */

export class GetTelemetryAggregateUseCase extends ITelemetryAggregationPort {
  /**
   *
   * @param {TelemetryRepositoryPort} repository
   */
  constructor(repository) {
    super(repository);
  }

  /**
   * @override
   * @param {ITelemetry} incoming
   * @param {string} sessionId
   * @returns {Promise<ITelemetryAggregated>}
   */
  async getAggregated(incoming, sessionId) {
    try {
      const aggregationService = new TelemetryAggregateService();
      const previousTelemetry =
        await this._reposidory.getPreviousReadingsNotRejected(
          incoming.vehicleId,
          sessionId,
          50
        );
      const aggrated = aggregationService.getAggregated(
        incoming,
        previousTelemetry
      );
      return aggrated;
    } catch (err) {
      throw new Error(`GetTelemetryResultUseCaseError: ${err}`);
    }
  }
}
