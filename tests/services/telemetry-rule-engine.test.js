import { TelemetryRuleEngine } from '../../src/core/rule-engine/service/telemetry-rule-engine.service';
import rules from '../../static/rules/rules.json';

describe('Telemetry rules engine test', () => {
  let service;
  beforeEach(() => {
    service = new TelemetryRuleEngine(rules);
  });

  it('Should apply rules', async () => {
    const data = {
      speed: 85,
      prevSpeed: 0,
      avgSpeed: 0,
      speedChange: 0,
      engineTemp: 107,
      prevEngineTemp: 100,
      avgEngineTemp: 102,
      fuelLevel: 65,
      prevFuelLevel: 67.5,
      fuelLevelChangeRate: -3.7,
      distanceTraveledMeters: 1500,
      maxPossibleDistanceMeters: 1600,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 30000,
      timestampAgeSec: 30,
    };
    const result = await service.runEngine(data);
    console.log(result);
    expect(result).toBeDefined();
  });
});
