import { revalidateTime, isStaleTime } from "@beyond/server/utils/time";
import { removeURLParameter } from "@beyond/server/utils/url";
import LRU from "lru-cache";
import { rm } from "fs";
import type { FastifyRequest } from "fastify";

type CacheData = {
  revalidateAfter: number;
  html: string;
};

export default class IncrementalSSG {
  cache = new LRU<string, CacheData>({
    dispose: (key: string) => {
      this.del(key);
    },
  });

  del(key: string) {
    rm(key, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  set(req: FastifyRequest, html: string, time: number) {
    const url = removeURLParameter(req.url);

    const { revalidateAfter } = this.cache.get(url) ?? {
      revalidateAfter: new Date().getTime(),
    };

    const timeToRevalidate = revalidateTime(time, revalidateAfter);

    const cacheData = {
      revalidateAfter: timeToRevalidate,
      html: html,
    };

    if (!this.cache.set(url, cacheData, timeToRevalidate)) {
      console.warn(`${url} failed put in cache`);
    }
  }
  get(req: FastifyRequest) {
    const url = removeURLParameter(req.url);
    const cache = this.cache.get(url);

    if (!cache) return undefined;

    const { revalidateAfter, html } = cache;

    if (isStaleTime(revalidateAfter)) {
      return undefined;
    }

    return html;
  }
}
