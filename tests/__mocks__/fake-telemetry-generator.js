//@ts-check

import { faker } from '@faker-js/faker';
import { TelemetryDTO } from '../../src/core/telemetry-service/dto/TelemetryDto';
import { TelemetryPersistentDTO } from '../../src/core/telemetry-service/dto/TelemetryPersistentDto';

/**
 *
 * @param {{lat: number, lng: number}} initCoordinates
 * @param {string} vehicleId
 * @returns {TelemetryDTO}
 */
export const createInitData = (initCoordinates, vehicleId) => {
  return new TelemetryDTO({
    vehicleId,
    speed: faker.number.int({ min: 1, max: 5 }),
    engineTemp: faker.number.int({ min: 30, max: 40 }),
    fuelLevel: faker.number.float({ min: 20, max: 99 }),
    timestamp: new Date().toISOString(),
    location: initCoordinates,
  });
};

/**
 *
 * @param {TelemetryPersistentDTO} prev
 * @returns {TelemetryDTO}
 */
export const generateNextTelemetryAccelerate = (prev) => {
  const [lat, lng] = faker.location.nearbyGPSCoordinate({
    origin: [prev.lat, prev.lng],
    // faker takes integers for km
    radius: 0.1,
    isMetric: true,
  });
  return new TelemetryDTO({
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
    timestamp: new Date(
      new Date(prev.timestamp).valueOf() + 15000
    ).toISOString(),
    location: { lat, lng },
  });
};

export const generatePreviousRejectedTelemetry = () => {
  return new TelemetryPersistentDTO({
    vehicleId: 'VH-2231',
    lat: 41.01224,
    lng: 28.97602,
    speed: 2,
    engineTemp: 30,
    fuelLevel: 37.544232599473595,
    avgSpeed: 2,
    avgEngineTemp: 30,
    distanceTraveledMeters: 0,
    timestamp: '2025-11-26T19:15:11.284Z',
    status: 'MANUAL_REVIEW',
    effectedBy: ['TIMESTAMP', 'SPEED', 'ENGINE_TEMP', 'FUEL_LEVEL', 'LOCATION'],
  });
};
