//@ts-check
import { sequelize } from './infrastructure/db/postgresql/config/db.js';
import mongoose from 'mongoose';
import { getMongoDBConnectionString } from './env/environment.js';
import { JsonRuleModel } from './infrastructure/db/mongo/models/JsonRuleModel.js';
import { TelemetryRules } from '../static/rules/rules.js';
import { buildFastify } from './app.js';

const server = await buildFastify();

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log(`postgresql connected`);
    await sequelize.sync({ alter: true });
    console.log(`sequelize synced`);
    await mongoose.connect(getMongoDBConnectionString());
    console.log(`mongodb connected`);
    await JsonRuleModel.insertMany(TelemetryRules);
    server.listen({ port: Number(process.env.PORT) || 5000, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
