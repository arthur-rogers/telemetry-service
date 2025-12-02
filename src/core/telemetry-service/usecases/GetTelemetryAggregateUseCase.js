//@ts-check
/**
 * @import {ITelemetry, ITelemetryAggregated} from '../domain/TelemetryEntity'
 */

import { MissingValidTelemetryError } from '../../errors/TelemetryError.js';
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
   * @returns {Promise<ITelemetryAggregated>}
   */
  async getAggregated(incoming) {
    try {
      const aggregationService = new TelemetryAggregateService();
      const previousTelemetry = incoming.sessionId
        ? await this._reposidory.getPreviousReadingsNotRejected(
            incoming.vehicleId,
            incoming.sessionId,
            50
          )
        : [];
      const aggrated = aggregationService.getAggregated(
        incoming,
        previousTelemetry
      );
      return aggrated;
    } catch (err) {
      if (err instanceof MissingValidTelemetryError) throw err;
      throw new Error(`GetTelemetryResultUseCaseError: ${err}`);
    }
  }
}
