//@ts-check
/**
 * @import {ITelemetryEngineData} from '../../domain/RuleEngineEntity'
 * @import {IRuleEngineExecutionResult} from '../../domain/RuleEngineEntity'
 */

/**
 * Abstract class describing RunRules port of RuleEngine
 * @class IRunRulesPort
 * @abstract
 */
export class RunRulesPort {
  /**
   * @abstract
   * @param {ITelemetryEngineData} data
   * @returns {Promise<IRuleEngineExecutionResult>}
   */
  async runRules(data) {
    throw new Error(`Abstract method must be implemented!`);
  }
}
