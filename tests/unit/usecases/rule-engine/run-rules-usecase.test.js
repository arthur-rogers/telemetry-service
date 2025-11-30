//@ts-check
import { IRunRulesPort } from '../../../../src/core/rule-engine/ports/driving/RunRulesPort';
import { RunRulesUseCase } from '../../../../src/core/rule-engine/usecases/RunRulesUseCase';
import { MockRulesRepository } from '../../__mocks__/rules-repo.mock';

describe('RunRules usecase test', () => {
  /**@type {IRunRulesPort} */
  let useCase;
  beforeEach(async () => {
    const repo = new MockRulesRepository();
    useCase = new RunRulesUseCase(repo);
  });
  it('Should return result with correct structure', async () => {
    const res = await useCase.runRules({
      isNewState: true,
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
    });

    expect(res).toBeDefined();
    expect(res).toHaveProperty('result');
  });
});
