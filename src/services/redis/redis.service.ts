import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  async setValue(key: string, value: string, ttl: number): Promise<string> {
    return await this.redisClient.set(key, value, 'EX', ttl);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async deleteValue(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  async incrementValue(key: string): Promise<number> {
    return await this.redisClient.incr(key);
  }

  async getKeys(pattern: string): Promise<string[]> {
    return await this.redisClient.keys(pattern);
  }
}
