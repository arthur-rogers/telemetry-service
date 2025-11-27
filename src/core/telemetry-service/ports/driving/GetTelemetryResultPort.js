//@ts-check
/**
 * @import {ITelemetry} from '../../domain/TelemetryEntity'
 */

import { RuleEngineResultDTO } from '../../../rule-engine/dto/RuleEngineResultDto';
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
   * @param {IRunRulesPort} rulesUseCase
   * @param {ITelemetryAggregationPort} aggregationUseCase
   */
  constructor(repo, rulesUseCase, aggregationUseCase) {
    /** @readonly */
    this._repo = repo;

    /** @readonly */
    this._rulesUseCase = rulesUseCase;

    /** @readonly */
    this._aggregationUseCase = aggregationUseCase;
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
