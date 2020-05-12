import { PoolConfig } from 'pg';
import dev from './dev.config';

export type ServerConfig = {
  database: PoolConfig,
  server: {
    port: number;
  },
  auth: {
    bcryptSaltRounds: number;
    jwtKey: string;
  },
  storage: {
    imageFolder: string
  },
}

export default dev;
