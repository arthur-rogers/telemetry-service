//@ts-check
/**
 * @import {ITelemetry} from '../domain/TelemetryEntity'
 */

import { RuleEngineResultDTO } from '../../rule-engine/dto/RuleEngineResultDto';
import { RulesRepositoryPort } from '../../rule-engine/ports/driven/RulesRepository';
import { RunRulesUseCase } from '../../rule-engine/usecases/RunRulesUseCase';
import { TelemetryRepositoryPort } from '../ports/driven/TelemetryRepositoryPort';
import { GetTelemetryResultPort } from '../ports/driving/GetTelemetryResultPort';
import { GetTelemetryAggregateUseCase } from './GetTelemetryAggregateUseCase';

/**
 * @implements {GetTelemetryResultPort}
 */
export class GetTelemetryResultUseCase extends GetTelemetryResultPort {
  /**
   *
   * @param {TelemetryRepositoryPort} repo
   *  @param {RulesRepositoryPort} rulesRepo
   */
  constructor(repo, rulesRepo) {
    super(repo, rulesRepo);
  }

  /**
   * @override
   * @param {ITelemetry} incoming
   * @returns {Promise<RuleEngineResultDTO>}
   */
  async getResults(incoming) {
    try {
      const aggregateUseCase = new GetTelemetryAggregateUseCase(this._repo);
      const runRuleUseCase = new RunRulesUseCase(this._rulesRepo);
      const aggregated = await aggregateUseCase.getAggregated(incoming);
      //TODO: probably better create a maper
      const result = await runRuleUseCase.runRules({
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
