import LRU from "lru-cache";
import sizeOf from "object-sizeof";

const LRUCache = new LRU({
  max: 0,
  length: (n) => {
    return sizeOf(n);
  },
});

export const get = (key) => {
  return LRUCache.get(key);
};

export const del = (key) => {
  return LRUCache.del(key);
};

export const set = (key, value, maxAge) => {
  return LRUCache.set(key, value, maxAge);
};

export const getKeys = () => {
  return LRUCache.keys();
};
