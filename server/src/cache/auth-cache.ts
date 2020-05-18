import asyncRedis from 'async-redis';

const client = asyncRedis.createClient();

client.on('connect', () => {
  console.log('Connected to redis cache');
});

client.on('err', (channel, message) => {
  console.error(`REDIS ERROR ${channel}: ${message}`);
});

export default client;
