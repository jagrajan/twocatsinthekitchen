import { Pool } from 'pg';
import config from 'config';

const pool: Pool = new Pool(config.database);

export default pool;


