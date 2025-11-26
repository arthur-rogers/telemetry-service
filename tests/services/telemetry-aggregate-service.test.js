import { TelemetryAggregateService } from '../../src/core/telemetry-service/service/telemetry-aggregate.service';
import { faker } from '@faker-js/faker';
describe('Telemetry rules engine test', () => {
  let service;
  const baseLocation = {
    lat: 41.01224,
    lng: 28.97602,
  };
  const vehicleId = 'VH-2231';

  beforeEach(() => {
    service = new TelemetryAggregateService();
  });

  it('Should set new state when no previous telemetry passed', async () => {
    const telemetry = createInitData({ ...baseLocation }, vehicleId);

    const result = await service.getAggregated(telemetry);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.prevSpeed).toEqual(0);
    expect(result.avgSpeed).toEqual(telemetry.speed);
    expect(result.speedChange).toEqual(telemetry.speed);
    expect(result.prevEngineTemp).toEqual(0);
    expect(result.avgEngineTemp).toEqual(telemetry.engineTemp);
    expect(result.prevFuelLevel).toEqual(0);
    expect(result.fuelLevelChangeRate).toEqual(0);
    expect(result.distanceTraveledMeters).toEqual(0);
    expect(result.maxPossibleDistanceMeters).toEqual(0);
    expect(result.prevTimestamp).toBeNull();
    expect(result.timestampAgeSec).toBe(0);
  });

  it('Should correctly calculate avg values', async () => {
    const initState = service.getAggregated(
      createInitData(baseLocation, vehicleId)
    );
    const firstNextState = generateNextTelemetryAccelerate(initState);
    const curState = service.getAggregated(firstNextState, [
      { ...initState, status: 'VALID' },
    ]);
    console.debug(curState);
    expect(curState).toBeDefined();
    expect(curState.inNewState).toBeFalsy();
    expect(curState.lng).toBeGreaterThan(0);
    expect(curState.speed).toBeGreaterThan(0);
    expect(curState.prevSpeed).toBeGreaterThan(0);
    expect(curState.speedChange).toBeGreaterThan(0);
    expect(curState.engineTemp).toBeGreaterThan(0);
    expect(curState.fuelLevel).toBeGreaterThan(0);
    expect(curState.fuelLevelChangeRate).not.toBe(0);
    expect(curState.distanceTraveledMeters).toBeGreaterThan(0);
    expect(curState.maxPossibleDistanceMeters).toBeGreaterThan(0);
    expect(curState.fuelLevel).toBeGreaterThan(0);
  });
});

function createInitData(initCoordinates, vehicleId) {
  return {
    vehicleId,
    speed: faker.number.int({ min: 1, max: 5 }),
    engineTemp: faker.number.int({ min: 30, max: 40 }),
    fuelLevel: faker.number.float({ min: 20, max: 99 }),
    timestamp: new Date().toISOString(),
    location: initCoordinates,
  };
}

function generateNextTelemetryAccelerate(prev) {
  const [lat, lng] = faker.location.nearbyGPSCoordinate({
    origin: [prev.lat, prev.lng],
    // faker takes integers for km
    radius: 0.1,
    isMetric: true,
  });
  return {
    vehicleId: prev.vehicleId,
    speed: faker.number.int({
      min: prev.speed,
      max: prev.speed + prev.speed * 0.1,
    }),
    engineTemp: faker.number.int({
      min: prev.engineTemp,
      max:
        prev.engineTemp > 100 ? 150 : prev.engineTemp + prev.engineTemp * 0.05,
    }),
    fuelLevel: faker.number.float({
      min: prev.fuelLevel - prev.fuelLevel * 0.01,
      max: prev.fuelLevel,
    }),
    timestamp: new Date(new Date(prev.timestamp).valueOf() + 15000),
    location: { lat, lng },
  };
}
