//@ts-check
/**
 * @import {ITelemetry, TelemetryResult} from '../domain/TelemetryEntity'
 */

import { RulesRepositoryPort } from '../../rule-engine/ports/driven/RulesRepository.js';
import { RunRulesUseCase } from '../../rule-engine/usecases/RunRulesUseCase.js';
import { TelemetryRepositoryPort } from '../ports/driven/TelemetryRepositoryPort.js';
import { GetTelemetryResultPort } from '../ports/driving/GetTelemetryResultPort.js';
import { GetTelemetryAggregateUseCase } from './GetTelemetryAggregateUseCase.js';
import { SaveTelemetryUseCase } from './SaveTelemetryUseCase.js';
import { v4 as uuidv4 } from 'uuid';

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
   * @returns {Promise<TelemetryResult>}
   */
  async getResults(incoming) {
    try {
      const sessionId = incoming.sessionId || uuidv4();
      const aggregateUseCase = new GetTelemetryAggregateUseCase(this._repo);
      const runRuleUseCase = new RunRulesUseCase(this._rulesRepo);
      const saveUseCase = new SaveTelemetryUseCase(this._repo);
      const aggregated = await aggregateUseCase.getAggregated(incoming);
      //TODO: probably better create a maper
      const result = await runRuleUseCase.runRules({
        ...aggregated,
        timestamp: new Date(aggregated.timestamp).valueOf(),
        prevTimestamp: new Date(aggregated.prevTimestamp).valueOf(),
      });
      await saveUseCase.save({
        ...aggregated,
        effectedBy: result.effectedBy,
        reason: result.reason,
        status: result.result,
        sessionId,
      });
      return { ...result, sessionId };
    } catch (err) {
      throw new Error(`Telemetry processing error, ${err}`);
    }
  }
}
