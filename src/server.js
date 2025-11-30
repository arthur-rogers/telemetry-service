//@ts-nocheck
import Fastify from 'fastify';
import { telemetryRoutes } from './infrastructure/api/routes/telemetry.route.js';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
const fastify = Fastify({
  logger: true,
});

await fastify.register(swagger, {
  swagger: {
    info: { title: 'My API', version: '1.0.0' },
  },
  exposeRoute: true,
});

// Register Swagger UI
await fastify.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  swagger: {
    url: '/documentation/json',
  },
});
fastify.register(telemetryRoutes);

const start = async () => {
  try {
    fastify.listen({ port: 5000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
