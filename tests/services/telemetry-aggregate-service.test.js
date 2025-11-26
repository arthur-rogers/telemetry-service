import { TelemetryAggregateService } from '../../src/core/telemetry-service/service/telemetry-aggregate.service';
import { faker } from '@faker-js/faker';
describe('Telemetry rules engine test', () => {
  let service;
  const baseLocation = {
    lat: 41.01224,
    lng: 28.97602,
  };

  beforeEach(() => {
    service = new TelemetryAggregateService();
  });

  it('Should set new state when no previous telemetry passed', async () => {
    const telemetry = createInitData(baseLocation, 'VH-2231');

    const result = await service.getAggregated(telemetry);
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
    expect(result.timestampAgeSec).toBe(0);
  });

  it('Should correctly calculate avg values', async () => {
    const currentDate = new Date(Date.now() - 20000);
    const location = {
      lat: 41.01224,
      lng: 28.97602,
    };
    const [lat, lng] = faker.location.nearbyGPSCoordinate({
      origin: [location.lat, location.lng],
      // faker takes integers for km
      radius: 0.01,
      isMetric: true,
    });
    console.debug(`new lat: ${lat}, new lng: ${lng}`);
    const newData = {
      vehicleId: 'VH-2231',
      timestamp: currentDate,
      speed: 60,
      engineTemp: 87,
      fuelLevel: 89,
      location,
    };
    const oldData = [
      {
        isNewState: true,
        vehicleId: 'VH-2231',
        speed: 55,
        prevSpeed: 56,
        avgSpeed: 55,
        speedChange: -1,
        engineTemp: 85,
        prevEngineTemp: 85,
        avgEngineTemp: 85,
        fuelLevel: 90,
        prevFuelLevel: 91,
        fuelLevelChangeRate: 0.9,
        distanceTraveledMeters: 70,
        maxPossibleDistanceMeters: 90,
        timestamp: new Date(Date.now() - 5000),
        prevTimestamp: new Date(Date.now() - 10000),
        timestampAgeSec: 5,
        lat,
        lng,
        status: 'VALID',
      },
    ];
    const expectedAvgSpeed = (oldData[0].speed + newData.speed) / 2;
    const expectedAvgEngTemp = (oldData[0].engineTemp + newData.engineTemp) / 2;
    const expectedFuelLevelDelta = Number(
      (
        ((newData.fuelLevel - oldData[0].fuelLevel) / oldData[0].fuelLevel) *
        100
      ).toPrecision(3)
    );
    console.debug(`expectedAvgSpeed: ${expectedAvgSpeed}`);
    const result = await service.getAggregated(newData, oldData);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.prevSpeed).toBe(55);
    expect(result.avgSpeed).toBe(expectedAvgSpeed);
    expect(result.avgEngineTemp).toBe(expectedAvgEngTemp);
    expect(result.fuelLevelChangeRate).toBe(expectedFuelLevelDelta);
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
