import { Client } from 'pg';
import { readFileSync } from 'fs';
import config from 'config';

const create = async () => {
  const sql: string = readFileSync('./src/init/create-database.sql').toString();

  const client = new Client(config.database);

  client.connect();

  return client.query(sql);
};

export default create;
