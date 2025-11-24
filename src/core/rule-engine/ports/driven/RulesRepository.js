//@ts-check
/**
 * Abstract class describing GetRules port of RuleEngin
 * @interface RulesRepositoryPort
 */

export class RulesRepositoryPort {
  /**
   * @abstract
   * @returns {Promise<Array<Object>>}
   */
  async getRules() {
    throw new Error(`Abstract method must be implemented!`);
  }
}
