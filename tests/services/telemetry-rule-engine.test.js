import { TelemetryRuleEngine } from '../../src/core/rule-engine/service/telemetry-rule-engine.service';
import { TelemetryEngineDataDTO } from '../../src/core/rule-engine/dto/TelemetryEngineDataDto';
import rules from '../../static/rules/rules.json';

describe('Telemetry rules engine test', () => {
  let service;
  beforeEach(() => {
    service = new TelemetryRuleEngine(rules);
  });

  it('Should apply rules', async () => {
    const data = new TelemetryEngineDataDTO({
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
    const result = await service.runEngine(data);
    expect(result).toBeDefined();

    expect(result).toHaveProperty('result');
    expect(result).toHaveProperty('effectedBy');
    expect(Array.isArray(result.effectedBy)).toBeTruthy();
  });

  /*
   * Timestamp Rules
   */

  it('Should reject if timestamp is older than 30 sec', async () => {
    const data = new TelemetryEngineDataDTO({
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
      timestamp: Date.now() - 40000,
      prevTimestamp: Date.now() - 30000,
      timestampAgeSec: 30,
    });
    const result = await service.runEngine(data);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('TIMESTAMP');
  });

  it('Should reject if timestamp value is future time', async () => {
    const futureTimestamp = Date.now() + 400000;
    const timestampAge = Date.now() - futureTimestamp / 1000;
    const data = new TelemetryEngineDataDTO({
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
      timestamp: futureTimestamp,
      prevTimestamp: Date.now() - 30000,
      timestampAgeSec: timestampAge,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('TIMESTAMP');
  });

  it('Should reject timestamp if it comes earlier than previous', async () => {
    const data = new TelemetryEngineDataDTO({
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
      timestamp: Date.now() - 20000,
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 5,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('TIMESTAMP');
  });

  /**
   * Speed rules
   */
  it('Should reject negative speed values', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: true,
      speed: -5,
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
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('SPEED');
  });

  it('Should reject to high (more than 200kmph) speed values', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: true,
      speed: 250,
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
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('SPEED');
  });

  it('Should set MANNUAL_REVIEW for speed spikes', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: String(false),
      speed: 161,
      prevSpeed: 100,
      avgSpeed: 0,
      speedChange: 61,
      engineTemp: 90,
      prevEngineTemp: 100,
      avgEngineTemp: 102,
      fuelLevel: 65,
      prevFuelLevel: 67.5,
      fuelLevelChangeRate: -3.7,
      distanceTraveledMeters: 1500,
      maxPossibleDistanceMeters: 1600,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('MANUAL_REVIEW');
    expect(result.effectedBy).toContain('SPEED');
  });

  /**
   * Engine temperature rules
   */
  it('Should reject when engine temp is too low', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: String(false),
      speed: 0,
      prevSpeed: 0,
      avgSpeed: 0,
      speedChange: 0,
      engineTemp: -25,
      prevEngineTemp: 100,
      avgEngineTemp: 102,
      fuelLevel: 65,
      prevFuelLevel: 67.5,
      fuelLevelChangeRate: -3.7,
      distanceTraveledMeters: 0,
      maxPossibleDistanceMeters: 0,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('ENGINE_TEMP');
  });

  it('Should reject when engine temp is too low', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: String(false),
      speed: 0,
      prevSpeed: 0,
      avgSpeed: 0,
      speedChange: 0,
      engineTemp: 225,
      prevEngineTemp: 100,
      avgEngineTemp: 102,
      fuelLevel: 65,
      prevFuelLevel: 67.5,
      fuelLevelChangeRate: -3.7,
      distanceTraveledMeters: 0,
      maxPossibleDistanceMeters: 0,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('ENGINE_TEMP');
  });

  it('Should set MANUAL_REVIEW when engine temp more than 100', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: String(false),
      speed: 70,
      prevSpeed: 69,
      avgSpeed: 70,
      speedChange: 1,
      engineTemp: 120,
      prevEngineTemp: 100,
      avgEngineTemp: 102,
      fuelLevel: 65,
      prevFuelLevel: 67.5,
      fuelLevelChangeRate: -3.7,
      distanceTraveledMeters: 0,
      maxPossibleDistanceMeters: 0,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('MANUAL_REVIEW');
    expect(result.effectedBy).toContain('ENGINE_TEMP');
  });

  /**
   * Fuel rules
   */
  it('Should reject when fuel less than 0 or more than 100', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: String(false),
      speed: 0,
      prevSpeed: 0,
      avgSpeed: 0,
      speedChange: 0,
      engineTemp: 120,
      prevEngineTemp: 100,
      avgEngineTemp: 102,
      fuelLevel: 70,
      prevFuelLevel: 67.5,
      fuelLevelChangeRate: -3.7,
      distanceTraveledMeters: 0,
      maxPossibleDistanceMeters: 0,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const lowFuelResult = await service.runEngine({ ...data, fuelLevel: -2 });
    const tooHighFuelResult = await service.runEngine({
      ...data,
      fuelLevel: 101,
    });
    expect(lowFuelResult).toBeDefined();
    expect(lowFuelResult.result).toBe('REJECTED');
    expect(lowFuelResult.effectedBy).toContain('FUEL_LEVEL');
    expect(tooHighFuelResult).toBeDefined();
    expect(tooHighFuelResult.result).toBe('REJECTED');
    expect(tooHighFuelResult.effectedBy).toContain('FUEL_LEVEL');
  });

  it('Should set MANUAL_REVIEW for possible fuel leak', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: String(false),
      speed: 62,
      prevSpeed: 57,
      avgSpeed: 60,
      speedChange: 5,
      engineTemp: 90,
      prevEngineTemp: 90,
      avgEngineTemp: 90,
      prevFuelLevel: 67.5,
      fuelLevel: 50,
      fuelLevelChangeRate: -25, // minus 25 percent
      distanceTraveledMeters: 0,
      maxPossibleDistanceMeters: 0,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('MANUAL_REVIEW');
    expect(result.effectedBy).toContain('FUEL_LEVEL');
  });

  it('Should REJECT if fuel level increased by more than 20%', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: String(false),
      speed: 123,
      prevSpeed: 120,
      avgSpeed: 125,
      speedChange: 0,
      engineTemp: 120,
      prevEngineTemp: 100,
      avgEngineTemp: 102,
      prevFuelLevel: 67.5,
      fuelLevel: 50,
      fuelLevelChangeRate: 20,
      distanceTraveledMeters: 50,
      maxPossibleDistanceMeters: 55,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('FUEL_LEVEL');
  });

  /**
   * Location rules
   */
  it('Should reject if location change while vehicle is stationary', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: String(false),
      speed: 0,
      prevSpeed: 0,
      avgSpeed: 0,
      speedChange: 0,
      engineTemp: 120,
      prevEngineTemp: 100,
      avgEngineTemp: 102,
      prevFuelLevel: 67.5,
      fuelLevel: 50,
      fuelLevelChangeRate: -10,
      distanceTraveledMeters: 120,
      maxPossibleDistanceMeters: 0,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('LOCATION');
  });

  it('Should reject if distance traveled exceeds possible value', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: String(false),
      speed: 90,
      prevSpeed: 89,
      avgSpeed: 92,
      speedChange: 0,
      engineTemp: 120,
      prevEngineTemp: 100,
      avgEngineTemp: 102,
      prevFuelLevel: 67.5,
      fuelLevel: 50,
      fuelLevelChangeRate: -10,
      distanceTraveledMeters: 1200,
      maxPossibleDistanceMeters: 50,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('LOCATION');
  });

  /**
   * Vehicle Behavior Rules
   */
  it('Should reject if engine tempmerature rises higher that 90C whicle vehicle is stationary', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: String(false),
      speed: 0,
      prevSpeed: 0,
      avgSpeed: 0,
      speedChange: 0,
      engineTemp: 95,
      prevEngineTemp: 92,
      avgEngineTemp: 90,
      prevFuelLevel: 50,
      fuelLevel: 50,
      fuelLevelChangeRate: 0,
      distanceTraveledMeters: 0,
      maxPossibleDistanceMeters: 0,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('ENGINE_TEMP');
  });

  it('Should reject if fuel level grows while speed is more or equal 120kmph', async () => {
    const data = new TelemetryEngineDataDTO({
      isNewState: String(false),
      speed: 120,
      prevSpeed: 123,
      avgSpeed: 122,
      speedChange: -3,
      engineTemp: 95,
      prevEngineTemp: 92,
      avgEngineTemp: 90,
      prevFuelLevel: 50,
      fuelLevel: 55,
      fuelLevelChangeRate: 10,
      distanceTraveledMeters: 120,
      maxPossibleDistanceMeters: 150,
      timestamp: Date.now(),
      prevTimestamp: Date.now() - 10000,
      timestampAgeSec: 10,
    });
    const result = await service.runEngine(data);
    console.debug(result);
    expect(result).toBeDefined();
    expect(result.result).toBe('REJECTED');
    expect(result.effectedBy).toContain('FUEL_LEVEL');
  });
});
