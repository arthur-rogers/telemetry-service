//@ts-check
import { getMongoDBConnectionString } from '../../src/env/environment';
import mongoose from 'mongoose';
import { JsonRuleModel } from '../../src/infrastructure/db/mongo/models/JsonRuleModel';
import { TelemetryRules } from '../../static/rules/rules';

describe('Test mongo connection and model', () => {
  beforeAll(async () => {
    const connectionString = getMongoDBConnectionString();
    await mongoose.connect(connectionString);
  });

  afterAll(async () => {
    await JsonRuleModel.deleteMany();
    await mongoose.connection.close();
  });

  it('Should upload rules to db and fetch them', async () => {
    await JsonRuleModel.insertMany(TelemetryRules);
    const result = await JsonRuleModel.find();
    console.debug(result);
    expect(result).toBeDefined();
  });
});
