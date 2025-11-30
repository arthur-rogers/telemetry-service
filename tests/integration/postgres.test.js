//@ts-check
import { generatePreviousRejectedTelemetry } from '../unit/__mocks__/fake-telemetry-generator.js';
import { sequelize } from '../../src/infrastructure/db/postgresql/config/db.js';
import { Telemetry } from '../../src/infrastructure/db/postgresql/models/telemetry.model.js';

describe('Test postgres connection and model', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await Telemetry.sync();
  });

  afterAll(async () => {
    await Telemetry.drop();
    await sequelize.close();
  });

  it(`Should create and retrieve an item`, async () => {
    console.log(sequelize.modelManager.all.map((m) => m.tableName));
    const fake = generatePreviousRejectedTelemetry();
    //@ts-ignore
    const result = await Telemetry.create(fake);
    const received = await Telemetry.findByPk(1);
    received;
    console.debug(`received`, received?.toJSON());
    console.debug(`result`, result);
    expect(result).toBeDefined();
  });
});
