//@ts-check
/**
 * @import {ITelemetry} from '../../domain/TelemetryEntity'
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
   * @param {string} sessionId
   * @returns {Promise<RuleEngineResultDTO>}
   */
  async getResults(incomingTelemetry, sessionId) {
    throw new Error(`Not implemented!`);
  }
}
