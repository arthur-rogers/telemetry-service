// @ts-check
/**
 * @import {RouteShorthandOptions, RouteHandler, FastifyRequest, FastifyReply} from 'fastify'
 */
import { controller } from '../../../adapters/driving/TelemetryController.js';

const telemetryResult = {
  type: 'object',
  properties: {
    result: { type: 'string' },
    reason: { type: 'string' },
  },
};

/**
 * @type {RouteShorthandOptions}
 */
const telemetrySchema = {
  schema: {
    response: {
      200: telemetryResult,
    },
    body: {
      type: 'object',
      properties: {
        vehicleId: { type: 'string' },
        timestamp: { type: 'string' },
        speed: { type: 'number' },
        engineTemp: { type: 'number' },
        fuelLevel: { type: 'number' },
        location: {
          type: 'object',
          properties: {
            lat: { type: 'number' },
            lng: { type: 'number' },
          },
        },
      },
    },
    headers: {
      type: 'object',
      properties: {
        'x-session-id': { type: 'string' },
      },
    },
  },
};

// @ts-ignore
export async function telemetryRoutes(fastify, options) {
  fastify.post(
    `/validate-telemetry`,
    telemetrySchema,
    /** @type {RouteHandler} */
    /**
     *
     * @param {FastifyRequest} req
     * @param {FastifyReply} reply
     */
    async (req, reply) => {
      console.log(`request: ${req}`);
      //@ts-ignore
      const result = await controller.getResult({
        // @ts-ignore
        ...req.body,
        sessionId: req.headers['x-session-id'],
      });
      reply.header('x-session-id', result.headers.XSessionId).send(result.body);
    }
  );
}
