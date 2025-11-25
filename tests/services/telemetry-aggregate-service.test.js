import { TelemetryAggregateService } from '../../src/core/telemetry-service/service/telemetry-aggregate.service';

describe('Telemetry rules engine test', () => {
  let service;
  beforeEach(() => {
    service = new TelemetryAggregateService();
  });

  it('Should set new state when no previous telemetry passed', async () => {
    const currentDate = new Date(Date.now() - 20000);
    const newData = {
      vehicleId: 'VH-2231',
      timestamp: currentDate,
      speed: 92,
      engineTemp: 87,
      fuelLevel: 61,
      location: {
        lat: 41.01224,
        lng: 28.97602,
      },
    };

    const result = await service.getAggregated(newData);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.prevSpeed).toEqual(0);
    expect(result.avgSpeed).toEqual(0);
    expect(result.speedChange).toEqual(0);
    expect(result.prevEngineTemp).toEqual(0);
    expect(result.avgEngineTemp).toEqual(0);
    expect(result.prevFuelLevel).toEqual(0);
    expect(result.fuelLevelChangeRate).toEqual(0);
    expect(result.distanceTraveledMeters).toEqual(0);
    expect(result.maxPossibleDistanceMeters).toEqual(0);
    expect(result.prevTimestamp).toBeNull();
    expect(result.timestampAgeSec).toEqual(20);
  });
});
