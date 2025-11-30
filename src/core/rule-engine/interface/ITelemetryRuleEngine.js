//@ts-check
/**
 * @import {ITelemetryEngineData} from "../domain/RuleEngineEntity"
 */

import { RuleEngineResultDTO } from '../dto/RuleEngineResultDto.js';

/**@interface ITelemetryRuleEngine */
export class ITelemetryRuleEngine {
  /**
   * @param {ITelemetryEngineData} data
   * @returns {Promise<RuleEngineResultDTO>}
   */
  async runEngine(data) {
    throw new Error(`Not implemented`);
  }
}
