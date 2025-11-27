//@ts-check
/**
 * @import {ITelemetry, ITelemetryAggregated} from '../domain/TelemetryEntity'
 */

import { TelemetryRepositoryPort } from '../ports/driven/TelemetryRepositoryPort';
import { ITelemetryAggregationPort } from '../ports/driving/GetTelemetryAggregationPort';
import { TelemetryAggregateService } from '../service/telemetry-aggregate.service';

/**
 * @class GetTelemetryResultUseCase
 * @implements {ITelemetryAggregationPort}
 * */

export class GetTelemetryResultUseCase extends ITelemetryAggregationPort {
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
      const previousTelemetry =
        await this._reposidory.getPreviousReadingsNotRejected(
          incoming.vehicleId,
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
