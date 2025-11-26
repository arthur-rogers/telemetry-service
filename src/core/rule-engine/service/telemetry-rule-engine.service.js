//@ts-check
/**
 * @import {ITelemetryEngineData, IRuleEngineExecutionResult} from '../domain/RuleEngineEntity'
 */
import { Engine } from 'json-rules-engine';
import { RuleEngineResultDTO } from '../dto/RuleEngineResultDto';

/**
 * @typedef {{type: string, params: {reason: string, effectedBy: string[]}}} EngineEvent
 */

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
   * @param {ITelemetryEngineData} data
   * @returns {Promise<RuleEngineResultDTO>}
   */
  async runEngine(data) {
    const { events } = await this._engine.run(data);

    if (!events.length) {
      return this._validResult();
    }

    // @ts-ignore
    const rejected = this._filterEvents(events, 'REJECTED');
    if (rejected.length) {
      return this._rejectedResult(rejected);
    }

    // @ts-ignore
    const manualReview = this._filterEvents(events, 'MANUAL_REVIEW');
    if (manualReview.length) {
      return this._manualReviewResult(manualReview);
    }

    return this._validResult();
  }

  /**
   * @private
   * @param {EngineEvent[]} events
   * @param {string} type
   * @returns {EngineEvent[]}
   */
  _filterEvents(events, type) {
    return events.filter((event) => event.type === type);
  }

  /**
   * @private
   * @param {EngineEvent[]} events
   * @returns {RuleEngineResultDTO}
   */
  _rejectedResult(events) {
    return new RuleEngineResultDTO({
      result: 'REJECTED',
      reason: events[0].params?.reason,
      effectedBy: events.flatMap((event) => event.params?.effectedBy || []),
    });
  }

  /**
   * @private
   * @param {EngineEvent[]} events
   * @returns {RuleEngineResultDTO}
   */
  _manualReviewResult(events) {
    return new RuleEngineResultDTO({
      result: 'MANUAL_REVIEW',
      reason: events[0].params?.reason,
      effectedBy: events.flatMap((event) => event.params?.effectedBy || []),
    });
  }

  /**
   * @private
   * @returns {RuleEngineResultDTO}
   */
  _validResult() {
    return new RuleEngineResultDTO({ result: 'VALID' });
  }
}
