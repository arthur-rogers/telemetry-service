//@ts-check

import { TelemetryPersistentDTO } from '../../../src/core/telemetry-service/dto/TelemetryPersistentDto';
import { TelemetryRepositoryPort } from '../../../src/core/telemetry-service/ports/driven/TelemetryRepositoryPort';
import { ITelemetryAggregationPort } from '../../../src/core/telemetry-service/ports/driving/GetTelemetryAggregationPort';
import { GetTelemetryAggregateUseCase } from '../../../src/core/telemetry-service/usecases/GetTelemetryAggregateUseCase';
import { createInitData } from '../../__mocks__/fake-telemetry-generator';
import { MockTelemetryRepo } from '../../__mocks__/telemetry-repo.mock';
import { jest } from '@jest/globals';

describe('Telemetry aggregate use case', () => {
  /** @type {ITelemetryAggregationPort} */
  let useCase;
  /** @type {TelemetryRepositoryPort} */
  let repo;
  const baseLocation = {
    lat: 41.01224,
    lng: 28.97602,
  };
  const vehicleId = 'VH-2231';
  beforeAll(() => {
    repo = new MockTelemetryRepo();
    jest.spyOn(repo, 'getPreviousReadingsNotRejected');
    useCase = new GetTelemetryAggregateUseCase(repo);
  });

  it('should correctly aggregate incoming telemetry', async () => {
    const data = createInitData(baseLocation, vehicleId);
    const result = await useCase.getAggregated(data);
    console.debug(result);
    expect(repo.getPreviousReadingsNotRejected).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(() => result instanceof TelemetryPersistentDTO).toBeTruthy();
  });
});
