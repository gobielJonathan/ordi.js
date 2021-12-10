import { revalidateTime, isStaleTime } from "@beyond/server/utils/time";
import { removeURLParameter } from "@beyond/server/utils/url";
import LRU from "lru-cache";
import { rm } from "fs";

export default class IncrementalSSG {
  cache = new LRU({
    dispose: (key) => {
      this.del(key);
    },
  });

  del(key) {
    rm(key, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  set(req, content, time) {
    const url = removeURLParameter(req.url);

    const { revalidateAfter } = this.cache.get(url) ?? {
      revalidateAfter: new Date().getTime(),
    };

    const timeToRevalidate = revalidateTime(time, revalidateAfter);

    const cacheData = {
      revalidateAfter: timeToRevalidate,
      html: content,
    };

    this.cache.set(url, cacheData, timeToRevalidate);
    console.info(`${url} put in cache`);
  }
  get(req) {
    const url = removeURLParameter(req.url);
    if (!this.cache.get(url)) return undefined;
    console.info(`${url} get in cache`);
    const { revalidateAfter, html } = this.cache.get(url);
    if (isStaleTime(revalidateAfter)) {
      return undefined;
    }
    return html;
  }
}
