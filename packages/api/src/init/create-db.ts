import { Client } from 'pg';
import { readFileSync } from 'fs';
import config from 'config';

const create = async () => {
  const sql: string = readFileSync('./src/init/create-database.sql').toString();

  const client = new Client(config.database);

  console.log('connecting client');
  client.connect();

  console.log('create database schema');
  await client.query(sql);
};

export default create;

create()
  .then(() => 'Database populated!')
  .catch((err) => console.error(err));