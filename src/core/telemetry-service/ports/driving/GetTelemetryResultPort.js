//@ts-check
/**
 * @import {ITelemetry, TelemetryResult} from '../../domain/TelemetryEntity'
 */

import { RuleEngineResultDTO } from '../../../rule-engine/dto/RuleEngineResultDto.js';
import { RulesRepositoryPort } from '../../../rule-engine/ports/driven/RulesRepository.js';
import { TelemetryRepositoryPort } from '../driven/TelemetryRepositoryPort.js';

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
   * @returns {Promise<TelemetryResult>}
   */
  async getResults(incomingTelemetry) {
    throw new Error(`Not implemented!`);
  }
}
