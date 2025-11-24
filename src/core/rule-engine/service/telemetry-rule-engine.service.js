//@ts-check
/**
 * @import {IEngineTelemetryData, IRuleEngineExecutionResult} from '../domain/RuleEngineEntity'
 */
import { Engine } from 'json-rules-engine';

/** @class */
export class TelemetryRuleEngine {
  /**
   * @constructor
   * @param {Array<any>} rules
   */
  constructor(rules) {
    this._engine = new Engine();
    for (const rule of rules) {
      this._engine.addRule(rule);
    }
  }

  /**
   * @param {IEngineTelemetryData} data
   * @returns {Promise<IRuleEngineExecutionResult>}
   */
  async runEngine(data) {
    const { events } = await this._engine.run(data);
    if (!events) {
      return {
        result: 'VALID',
      };
    } else {
      const rejected = events.find((event) => event.type === 'REJECTED');
      const manualReview = events.find(
        (event) => event.type === 'MANUAL_REVIEW'
      );
      if (rejected) {
        return {
          result: 'REJECTED',
          reason: rejected.params?.reason,
          effectedBy: rejected.params?.effectedBy,
        };
      }
      return {
        result: 'MANUAL_REVIEW',
        reason: manualReview?.params?.reason,
        effectedBy: manualReview?.params?.effectedBy,
      };
    }
  }
}
