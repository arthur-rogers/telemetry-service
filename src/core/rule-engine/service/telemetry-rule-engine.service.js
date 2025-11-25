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
    if (events.length) {
      const rejected = events.filter((event) => event.type === 'REJECTED');
      const manualReview = events.filter(
        (event) => event.type === 'MANUAL_REVIEW'
      );
      if (rejected.length) {
        return {
          result: 'REJECTED',
          reason: rejected[0].params?.reason,
          // @ts-ignore
          effectedBy: rejected.map((item) => item.params.effectedBy),
        };
      }
      if (manualReview.length) {
        return {
          result: 'MANUAL_REVIEW',
          reason: manualReview[0].params?.reason,
          // @ts-ignore
          effectedBy: manualReview.map((item) => item.params.effectedBy),
        };
      }
    }
    return {
      result: 'VALID',
    };
  }
}
