//@ts-check
/**
 * @import {ITelemetryEngineData} from "../domain/RuleEngineEntity"
 */
import { RulesRepositoryPort } from '../ports/driven/RulesRepository.js';
import { IRunRulesPort } from '../ports/driving/RunRulesPort.js';
import { TelemetryRuleEngine } from '../service/telemetry-rule-engine.service.js';

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
