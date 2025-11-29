//@ts-check
/**
 * @import {ITelemetry} from '../../domain/TelemetryEntity'
 */

import { RuleEngineResultDTO } from '../../../rule-engine/dto/RuleEngineResultDto';
import { RulesRepositoryPort } from '../../../rule-engine/ports/driven/RulesRepository';
import { IRunRulesPort } from '../../../rule-engine/ports/driving/RunRulesPort';
import { TelemetryRepositoryPort } from '../driven/TelemetryRepositoryPort';
import { ITelemetryAggregationPort } from './GetTelemetryAggregationPort';

/**
 * @interface GetTelemetryResultPort
 */
export class GetTelemetryResultPort {
  /**
   *
   * @param {TelemetryRepositoryPort} repo
   * @param {RulesRepositoryPort} rulesRepo
   */
  constructor(repo, rulesRepo) {
    /** @readonly */
    this._repo = repo;

    /** @readonly */
    this._rulesRepo = rulesRepo;
  }

  /**
   * @abstract
   * @param {ITelemetry} incomingTelemetry
   * @returns {Promise<RuleEngineResultDTO>}
   */
  async getResults(incomingTelemetry) {
    throw new Error(`Not implemented!`);
  }
}
