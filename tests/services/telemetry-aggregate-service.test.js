//@ts-check
import { MissingValidTelemetryError } from '../../src/core/errors/TelemetryError';
import { TelemetryPersistentDTO } from '../../src/core/telemetry-service/dto/TelemetryPersistentDto';
import { ITelemetryAggregateService } from '../../src/core/telemetry-service/interface/ITelemetryAggregateService';
import { TelemetryAggregateService } from '../../src/core/telemetry-service/service/telemetry-aggregate.service';
import {
  createInitData,
  generateNextTelemetryAccelerate,
  generatePreviousRejectedTelemetry,
} from '../__mocks__/fake-telemetry-generator';

describe('Telemetry rules engine test', () => {
  /** @type {ITelemetryAggregateService} */
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
  });

  it('Should correctly calculate avg values', async () => {
    const initState = service.getAggregated(
      createInitData(baseLocation, vehicleId)
    );
    const firstNextState = generateNextTelemetryAccelerate(
      new TelemetryPersistentDTO({
        ...initState,
        status: 'VALID',
      })
    );
    const curState = service.getAggregated(firstNextState, [
      { ...initState, status: 'VALID' },
    ]);
    console.debug(curState);
    expect(curState).toBeDefined();
    expect(curState.isNewState).toBeFalsy();
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

  it('Should throw error if all previous records for any param are with REJECTED status', async () => {
    const state = createInitData(baseLocation, vehicleId);
    const prevRecords = generatePreviousRejectedTelemetry();
    expect(() => service.getAggregated(state, [prevRecords])).toThrow(
      MissingValidTelemetryError
    );
  });
});
