import { Sequelize } from 'sequelize';
import {
  getNodeEnv,
  getPGPort,
  getPostgresDBName,
  getPostgresHost,
  getPostgresPassword,
  getPostgresUser,
} from '../../../../env/environment';

const user = getPostgresUser();
const password = getPostgresPassword();
const host = getPostgresHost();
const database = getPostgresDBName();
const port = getPGPort();

export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  sync: ['dev', 'test'].includes(getNodeEnv()),
  logging: true,
  port,
});
