//@ts-check
import { RulesRepositoryPort } from '../../../src/core/rule-engine/ports/driven/RulesRepository';
import { TelemetryRules } from '../../../static/rules/rules';

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
    return TelemetryRules;
  }
}
