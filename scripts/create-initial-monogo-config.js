import dotenv from 'dotenv';
import {
  getMongoDatabaseName,
  getMongoDBPassword,
  getMongoDBUser,
} from '../src/env/environment.js';
dotenv.config({ path: '.env', quiet: true });

const dbName = getMongoDatabaseName();
const user = getMongoDBUser();
const password = getMongoDBPassword();

process.stdout.write(`
    db = db.getSiblingDB("${dbName}");
    db.createUser({user: "${user}", pwd: "${password}", roles: [{role: "readWrite", db: "${dbName}"}]});
    `);
