//@ts-check

import { createInitData } from '../../__mocks__/fake-telemetry-generator';
import { MockTelemetryRepo } from '../../__mocks__/telemetry-repo.mock';
import { GetTelemetryResultPort } from '../../../../src/core/telemetry-service/ports/driving/GetTelemetryResultPort';
import { GetTelemetryResultUseCase } from '../../../../src/core/telemetry-service/usecases/GetTelemetryReulstUseCase';
import { MockRulesRepository } from '../../__mocks__/rules-repo.mock';

describe('Telemetry result use case', () => {
  /** @type {GetTelemetryResultPort} */
  let useCase;

  let telemetryRepo;
  let rulesRepo;

  const baseLocation = {
    lat: 41.01224,
    lng: 28.97602,
  };
  const vehicleId = 'VH-2231';

  beforeAll(() => {
    telemetryRepo = new MockTelemetryRepo();
    rulesRepo = new MockRulesRepository();
    useCase = new GetTelemetryResultUseCase(telemetryRepo, rulesRepo);
  });

  it('should work', async () => {
    const data = createInitData(baseLocation, vehicleId);
    const result = await useCase.getResults(data);
    console.debug(result);
    expect(result).toBeDefined();
  });
});
