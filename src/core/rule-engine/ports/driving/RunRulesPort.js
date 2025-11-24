/**
 * Abstract class describing RunRules port of RuleEngin
 * @class RunRulesPort
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
