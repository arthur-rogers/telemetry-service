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
import { sequelize } from './infrastructure/db/postgresql/config/db.js';
import mongoose from 'mongoose';
import { getMongoDBConnectionString } from './env/environment.js';
import { JsonRuleModel } from './infrastructure/db/mongo/models/JsonRuleModel.js';
import { TelemetryRules } from '../static/rules/rules.js';

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

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log(`postgresql connected`);
    await sequelize.sync({ alter: true });
    console.log(`sequelize synced`);
    await mongoose.connect(getMongoDBConnectionString());
    console.log(`mongodb connected`);
    await JsonRuleModel.insertMany(TelemetryRules);
    fastify.listen({ port: Number(process.env.PORT) || 5000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
