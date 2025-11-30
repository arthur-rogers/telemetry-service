//@ts-check
import { RulesRepositoryPort } from '../../../core/rule-engine/ports/driven/RulesRepository.js';
import { JsonRuleModel } from '../../../infrastructure/db/mongo/models/JsonRuleModel.js';

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
    return JsonRuleModel.find();
  }
}
