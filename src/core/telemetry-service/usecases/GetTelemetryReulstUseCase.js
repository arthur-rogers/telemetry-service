//@ts-check
/**
 * @import {ITelemetry} from '../domain/TelemetryEntity'
 */

import { RuleEngineResultDTO } from '../../rule-engine/dto/RuleEngineResultDto';
import { IRunRulesPort } from '../../rule-engine/ports/driving/RunRulesPort';
import { TelemetryRepositoryPort } from '../ports/driven/TelemetryRepositoryPort';
import { ITelemetryAggregationPort } from '../ports/driving/GetTelemetryAggregationPort';
import { GetTelemetryResultPort } from '../ports/driving/GetTelemetryResultPort';

/**
 * @implements {GetTelemetryResultPort}
 */
export class GetTelemetryResultUseCase extends GetTelemetryResultPort {
  /**
   *
   * @param {TelemetryRepositoryPort} repo
   *  @param {IRunRulesPort} rulesUseCase
   * @param {ITelemetryAggregationPort} aggregationUseCase
   */
  constructor(repo, rulesUseCase, aggregationUseCase) {
    super(repo, rulesUseCase, aggregationUseCase);
  }

  /**
   * @override
   * @param {ITelemetry} incoming
   * @returns {Promise<RuleEngineResultDTO>}
   */
  async getResults(incoming) {
    try {
      const aggregated = await this._aggregationUseCase.getAggregated(incoming);
      //TODO: probably better create a maper
      const result = await this._rulesUseCase.runRules({
        ...aggregated,
        timestamp: new Date(aggregated.timestamp).valueOf(),
        prevTimestamp: new Date(aggregated.prevTimestamp).valueOf(),
      });
      return result;
    } catch (err) {
      throw new Error(`Telemetry processing error, ${err}`);
    }
  }
}
