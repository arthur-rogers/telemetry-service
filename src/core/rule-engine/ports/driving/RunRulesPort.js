//@ts-check
/**
 * @import {IEngineTelemetryData} from '../../domain/RuleEngineEntity'
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
   * @param {IEngineTelemetryData} data
   * @returns {Promise<IRuleEngineExecutionResult>}
   */
  async runRules(data) {
    throw new Error(`Abstract method must be implemented!`);
  }
}
