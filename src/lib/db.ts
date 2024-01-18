import { Redis } from "@upstash/redis"

const redisUrl = `${process.env.UPSTASH_REDIS_REST_URL}`;
const redisToken = `${process.env.UPSTASH_REDIS_REST_TOKEN}`;

export const db = new Redis({
    url: redisUrl,
    token: redisToken
})