const PG_HOST = 'PG_HOST';
const PG_PORT = 'PG_PORT';
const PG_PASSWORD = 'PG_PASSWORD';
const PG_USER = 'PG_USERNAME';
const PG_DATABASE = 'PG_DATABASE';
const PG_TELEMETRY_TABLE = 'PG_TELEMETRY_TABLE';
const MONGO_HOST = 'MONGODB_HOST';
const MONGO_PASSWORD = 'MONGODB_PASSWORD';
const MONGO_USER = 'MONGODB_USERNAME';
const MONGODB_PORT = 'MONGODB_PORT';
const MONGODB_RULES_COLLECTION = 'MONGODB_RULES_COLLECTION';
const MONGODB_DATABASE_NAME = 'MONGODB_DATABASE_NAME';
const NODE_ENV = 'NODE_ENV';

const getEnvVar = (name) => {
  let envVar = process.env[name];
  if (!envVar) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return envVar;
};

export const getPGPort = () => getEnvVar(PG_PORT);
export const getPostgresHost = () => getEnvVar(PG_HOST);
export const getPostgresPassword = () => getEnvVar(PG_PASSWORD);
export const getPostgresUser = () => getEnvVar(PG_USER);
export const getPostgresDBName = () => getEnvVar(PG_DATABASE);
export const getTelemetryTableName = () => getEnvVar(PG_TELEMETRY_TABLE);
export const getMongoDBHost = () => getEnvVar(MONGO_HOST);
export const getMongoDBPassword = () => getEnvVar(MONGO_PASSWORD);
export const getMongoDBUser = () => getEnvVar(MONGO_USER);
export const getRulesCollectionName = () => getEnvVar(MONGODB_RULES_COLLECTION);
export const getMongoDBConnectionString = () =>
  `mongodb://${getEnvVar(MONGO_USER)}:${getEnvVar(MONGO_PASSWORD)}@${getEnvVar(
    MONGO_HOST
  )}:${getEnvVar(MONGODB_PORT)}/${getEnvVar(MONGODB_DATABASE_NAME)}`;

export const getNodeEnv = () => getEnvVar(NODE_ENV);
export const getMongoDatabaseName = () => getEnvVar(MONGODB_DATABASE_NAME);
