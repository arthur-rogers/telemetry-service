//@ts-check
import { RulesRepositoryPort } from '../../../src/core/rule-engine/ports/driven/RulesRepository';
import rules from '../../../static/rules/rules.json';

/**
 * @class
 * @implements {RulesRepositoryPort}
 */
export class MockRulesRepository extends RulesRepositoryPort {
  constructor() {
    super();
  }
  /** @override */
  async getRules() {
    return rules;
  }
}
