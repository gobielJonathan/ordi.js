import { revalidateTime, isStaleTime } from "@beyond/server/utils/time";
import * as cache from "./memory";

export const IncrementalSSG = {
  /**
   *
   *
   * @param {*} req
   * @param {*} content
   * @param {*} time
   */
  put(req, content, time) {
    const url = req.url;

    const { revalidateAfter } = cache.get(url) ?? {
      revalidateAfter: new Date().getTime(),
    };

    const timeToRevalidate = revalidateTime(time, revalidateAfter);

    const cacheData = {
      revalidateAfter: timeToRevalidate,
      html: content,
    };

    cache.set(url, cacheData, timeToRevalidate);
    console.info(`${url} put in cache`);
  },
  /**
   *
   *
   * @param {*} req
   * @return {*} array [html, status to re-generate/ssr]
   */
  get(req) {
    const url = req.url;
    if (!cache.get(url)) return [undefined, true];
    console.info(`${url} get in cache`);
    const { revalidateAfter, html } = cache.get(url);
    if (isStaleTime(revalidateAfter)) {
      return [html, true];
    }
    return [html, false];
  },
};
