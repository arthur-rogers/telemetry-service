//@ts-check
import { getMongoDBConnectionString } from '../../src/env/environment';
import mongoose from 'mongoose';
import rules from '../../static/rules/rules.json';
import { JsonRuleModel } from '../../src/infrastructure/db/mongo/models/JsonRuleModel';

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
    await JsonRuleModel.insertMany(rules);
    const result = await JsonRuleModel.find();
    console.debug(result);
    expect(result).toBeDefined();
  });
});
