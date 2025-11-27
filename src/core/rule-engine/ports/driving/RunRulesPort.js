//@ts-check
/**
 * @import {ITelemetryEngineData} from '../../domain/RuleEngineEntity'
 * @import {RuleEngineResultDTO} from '../../dto/RuleEngineResultDto'
 */

/**
 * Abstract class describing RunRules port of RuleEngine
 * @interface
 */
export class IRunRulesPort {
  /**
   * @abstract
   * @param {ITelemetryEngineData} data
   * @returns {Promise<RuleEngineResultDTO>}
   */
  async runRules(data) {
    throw new Error(`Abstract method must be implemented!`);
  }
}
