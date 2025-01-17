import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManage: Cache) {}

  async setValue(key: string, value: string) {
    return await this.cacheManage.set(key, value);
  }

  async getValue(key: string): Promise<string> {
    return await this.cacheManage.get(key);
  }
}
