//@ts-check
/**
 * @import {ITelemetryEngineData} from "../domain/RuleEngineEntity"
 */

import { RuleEngineResultDTO } from '../dto/RuleEngineResultDto';

/**@interface ITelemetryRuleEngine */
export class ITelemetryRuleEngine {
  /**
   * @param {import("../domain/RuleEngineEntity").ITelemetryEngineData} data
   * @returns {Promise<RuleEngineResultDTO>}
   */
  async runEngine(data) {
    throw new Error(`Not implemented`);
  }
}
