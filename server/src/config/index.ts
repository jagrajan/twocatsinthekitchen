import { PoolConfig } from "pg";
import dev from "./dev.config";
import integration from "./integration.config";

export type ServerConfig = {
  database: PoolConfig;
  server: {
    port: number;
  };
  auth: {
    bcryptSaltRounds: number;
    jwtKey: string;
  };
  storage: {
    imageFolder: string;
  };
};

const config = process.env.NODE_ENV === 'integration' ? integration : dev;

export default config;
