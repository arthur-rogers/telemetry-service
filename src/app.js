//@ts-check
/**
 * @import {FastifySwaggerUiOptions} from '@fastify/swagger-ui'
 * @import {SwaggerOptions} from '@fastify/swagger'
 * @import {FastifyInstance} from 'fastify'
 */
import Fastify from 'fastify';
import { telemetryRoutes } from './infrastructure/api/routes/telemetry.route.js';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

export const buildFastify = async () => {
  /**@type {FastifyInstance} */
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(
    swagger,
    /**@type {SwaggerOptions} */ ({
      swagger: {
        info: { title: 'My API', version: '1.0.0' },
      },
      exposeRoute: true,
    })
  );

  await fastify.register(
    swaggerUI,
    /**@type {FastifySwaggerUiOptions} */ ({
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      swagger: {
        url: '/documentation/json',
      },
    })
  );
  fastify.register(telemetryRoutes);
  return fastify;
};
