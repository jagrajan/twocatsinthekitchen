import { ServerConfig } from 'config';

const config: ServerConfig = {
  database: {
    host: 'localhost',
    port: 5432,
    database: 'twocats',
    user: 'jag',
    password:'password',
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
