import { ServerConfig } from 'config';

const config: ServerConfig = {
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  server: {
    port: 4000,
  },
  auth: {
    bcryptSaltRounds: 10,
    jwtKey: 'somethingisfishy',
  },
  storage: {
    imageFolder: '/home/jag/projects/twocats/twocats/packages/api/images'
  }
};

export default config;
