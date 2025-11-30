// @ts-nocheck
import { controller } from '../../../adapters/driving/TelemetryController.js';

const telemetryResult = {
  type: 'object',
  properties: {
    result: { type: 'string' },
    reason: { type: 'string' },
  },
};

/**
 * @type (import('fastify').RouteShorthandOptions
 */
const telemetrySchema = {
  schema: {
    response: {
      200: {
        type: 'Object',
        items: telemetryResult,
      },
    },
    body: {
      type: 'Object',
      properties: {
        vehicleId: { type: 'string' },
        timestamp: { type: 'string' },
        speed: { type: 'number' },
        engineTemp: { type: 'number' },
        fuelLevel: { type: 'number' },
        location: {
          type: 'Object',
          properties: {
            lat: { type: 'number' },
            lng: { type: 'number' },
          },
        },
      },
    },
    headers: {
      type: 'Object',
      properties: {
        'x-session-id': { type: 'string' },
      },
    },
  },
};

export async function telemetryRoutes(fastify, options, done) {
  fastify.post(`/validate-telemetry`, {
    handler: controller.bind(controller),
    schema: telemetrySchema,
  });

  done();
}
