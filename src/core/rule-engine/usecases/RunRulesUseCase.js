//@ts-check
/**
 * @import {ITelemetryEngineData} from "../domain/RuleEngineEntity"
 */
import { RuleResults } from '../domain/RuleEngineEntity';
import { RulesRepositoryPort } from '../ports/driven/RulesRepository';
import { IRunRulesPort } from '../ports/driving/RunRulesPort';
import { TelemetryRuleEngine } from '../service/telemetry-rule-engine.service';

/**
 * @class RunRulesUseCase
 * @implements {IRunRulesPort}
 */
export class RunRulesUseCase extends IRunRulesPort {
  /**
   *
   * @param {RulesRepositoryPort} rulesRepo
   */
  constructor(rulesRepo) {
    super();
    this._repository = rulesRepo;
  }

  /**
   * @override
   * @param {ITelemetryEngineData} data
   */
  async runRules(data) {
    try {
      const rules = await this._repository.getRules();
      const engine = new TelemetryRuleEngine(rules);
      return await engine.runEngine(data);
    } catch (err) {
      throw new Error(String(err));
    }
  }
}
