//@ts-check
/**
 * @import {FastifyInstance} from 'fastify'
 */
import mongoose from 'mongoose';
import { buildFastify } from '../../src/app';
import { getMongoDBConnectionString } from '../../src/env/environment';
import { sequelize } from '../../src/infrastructure/db/postgresql/config/db';
import { Telemetry } from '../../src/infrastructure/db/postgresql/models/telemetry.model';

describe('Api tests with server running in docker', () => {
  /**@type {FastifyInstance} */
  let fastify;
  const vehicleId = 'test';

  beforeAll(async () => {
    await mongoose.connect(getMongoDBConnectionString());
    await sequelize.authenticate();
    fastify = await buildFastify();
    await fastify.ready();
  });

  afterAll(async () => {
    await Telemetry.destroy({ where: { vehicleId } });
    await fastify.close();
    await mongoose.connection.close();
    await sequelize.close();
  });

  it('Should receive correct response from telemetry endpoing', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/validate-telemetry',
      payload: {
        vehicleId,
        timestamp: new Date().toISOString(),
        speed: 92,
        engineTemp: 87,
        fuelLevel: 61,
        location: {
          lat: 41.01224,
          lng: 28.97602,
        },
      },
    });
    const parsed = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.headers['x-session-id']).toBeDefined();
    expect(response.body).toBeDefined();
    expect(parsed).toHaveProperty('result');
    //@ts-ignore
    expect(parsed['result']).toEqual('VALID');
  });
});
