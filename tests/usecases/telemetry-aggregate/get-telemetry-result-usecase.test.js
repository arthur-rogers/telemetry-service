//@ts-check

import { RulesRepository } from '../../../src/adapters/driven/RulesEngine/RulesRepository';
import { RunRulesUseCase } from '../../../src/core/rule-engine/usecases/RunRulesUseCase';
import { GetTelemetryResultPort } from '../../../src/core/telemetry-service/ports/driving/GetTelemetryResultPort';
import { GetTelemetryAggregateUseCase } from '../../../src/core/telemetry-service/usecases/GetTelemetryAggregateUseCase';
import { GetTelemetryResultUseCase } from '../../../src/core/telemetry-service/usecases/GetTelemetryReulstUseCase';
import { createInitData } from '../../__mocks__/fake-telemetry-generator';
import { MockTelemetryRepo } from '../../__mocks__/telemetry-repo.mock';

describe('Telemetry result use case', () => {
  /** @type {GetTelemetryResultPort} */
  let useCase;
  let rulesUseCase;
  let aggregateUseCase;
  let telemetryRepo;
  let rulesRepo;

  const baseLocation = {
    lat: 41.01224,
    lng: 28.97602,
  };
  const vehicleId = 'VH-2231';

  beforeAll(() => {
    telemetryRepo = new MockTelemetryRepo();
    rulesRepo = new RulesRepository();
    rulesUseCase = new RunRulesUseCase(rulesRepo);
    aggregateUseCase = new GetTelemetryAggregateUseCase(telemetryRepo);
    useCase = new GetTelemetryResultUseCase(
      telemetryRepo,
      rulesUseCase,
      aggregateUseCase
    );
  });

  it('should work', async () => {
    const data = createInitData(baseLocation, vehicleId);
    const result = await useCase.getResults(data);
    console.debug(result);
    expect(result).toBeDefined();
  });
});
