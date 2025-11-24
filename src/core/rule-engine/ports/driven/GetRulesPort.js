/**
 * Abstract class describing GetRules port of RuleEngin
 * @class RunRulesPort
 */

export class GetRulesPort {
  /**
   * @abstract
   * @param {Object} data
   * @returns {Promise<Array<Object>>}
   */
  async getRules(data) {
    throw new Error(`Abstract method must be implemented!`);
  }
}
