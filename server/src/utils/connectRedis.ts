import { createClient } from 'redis';

const redisUrl = `redis://localhost:6379`;
const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    await redisClient.configSet('maxmemory-policy', 'volatile-lru');
    console.log('Redis client connected...');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err.message);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

redisClient.on('error', (err) => console.error(err));

export default redisClient;
