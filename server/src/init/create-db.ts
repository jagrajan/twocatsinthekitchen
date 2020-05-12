import { Client } from 'pg';
import { readFileSync } from 'fs';
import config from 'config';

const sql: string = readFileSync('src/init/create-database.sql').toString();

// const connectionString = 'postgres://' + process.env.DB_USER
//   + ':' + process.env.DB_PASSWORD
//   + '@' + process.env.DB_HOST + '/' + process.env.DB_NAME

const client = new Client(config.database);

client.connect();

client.query(sql, (err, res) => {
  console.log(err);
  client.end();
});
