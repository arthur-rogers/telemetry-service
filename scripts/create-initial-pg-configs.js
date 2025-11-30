//@ts-check
import dotenv from 'dotenv';
import {
  getPostgresDBName,
  getPostgresPassword,
  getPostgresUser,
} from '../src/env/environment.js';

dotenv.config({ path: '.env.dev', quiet: true });

const pgDbName = getPostgresDBName();
const pgUser = getPostgresUser();
const pgPass = getPostgresPassword();
process.stdout.write(`
CREATE DATABASE ${pgDbName};
CREATE USER ${pgUser} WITH ENCRYPTED PASSWORD '${pgPass}';
GRANT ALL PRIVILEGES ON DATABASE ${pgDbName} to ${pgUser};
\\connect ${pgDbName};
GRANT ALL PRIVILEGES ON SCHEMA public TO ${pgUser};
ALTER SCHEMA public OWNER TO ${pgUser}
`);
