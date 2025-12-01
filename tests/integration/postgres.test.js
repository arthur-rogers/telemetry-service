//@ts-check
import { generatePreviousRejectedTelemetry } from '../unit/__mocks__/fake-telemetry-generator.js';
import { sequelize } from '../../src/infrastructure/db/postgresql/config/db.js';
import { Telemetry } from '../../src/infrastructure/db/postgresql/models/telemetry.model.js';
import { v4 as uuidv4 } from 'uuid';

describe('Test postgres connection and model', () => {
  /** @type {string} */
  const sessionId = uuidv4();
  beforeAll(async () => {
    await sequelize.authenticate();
    await Telemetry.sync();
  });

  afterAll(async () => {
    await Telemetry.destroy({ where: { sessionId } });
    await sequelize.close();
  });

  it(`Should create and retrieve an item`, async () => {
    console.log(sequelize.modelManager.all.map((m) => m.tableName));
    const fake = generatePreviousRejectedTelemetry();
    //@ts-ignore
    const result = await Telemetry.create({ ...fake, sessionId });
    const received = await Telemetry.findOne({
      where: { sessionId },
    });
    received;
    console.debug(`received`, received?.toJSON());
    console.debug(`result`, result);
    expect(result).toBeDefined();
  });
});
