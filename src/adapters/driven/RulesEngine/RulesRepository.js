import { RulesRepositoryPort } from '../../../core/rule-engine/ports/driven/RulesRepository';
import rules from '../../../../static/rules/rules.json';

/**
 * @class
 * @implements {RulesRepositoryPort}
 */
export class RulesRepository extends RulesRepositoryPort {
  constructor() {
    super();
  }
  /** @override */
  async getRules() {
    return rules;
  }
}
