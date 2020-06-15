import { ServerConfig } from 'config';

const config: ServerConfig = {
  database: {
    host: 'localhost',
    port: 5432,
    database: 'twocats',
    user: 'postgres',
    password: 'docker',
  },
  server: {
    port: 4000,
  },
  auth: {
    bcryptSaltRounds: 10,
    jwtKey: 'somethingisfishy',
  },
  storage: {
    imageFolder: '/home/jag/projects/twocats/server/images'
  }
};

export default config;
