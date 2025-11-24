import { Engine } from 'json-rules-engine';

export class TelemetryRuleEngine {
  /**
   * @constructor
   * @param {Array<Object>} rules
   */
  constructor(rules) {
    this._engine = new Engine();
    for (const rule of rules) {
      this._engine.addRule(rule);
    }
  }

  /**
   *
   * @param {IEngineTelemetryData} data
   * @returns {Promise<Object>}
   */
  async runEngine(data) {
    return this._engine.run(data);
  }
}
