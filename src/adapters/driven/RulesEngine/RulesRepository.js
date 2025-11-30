//@ts-check
import { RulesRepositoryPort } from '../../../core/rule-engine/ports/driven/RulesRepository';
import { JsonRuleModel } from '../../../infrastructure/db/mongo/models/JsonRuleModel';

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
