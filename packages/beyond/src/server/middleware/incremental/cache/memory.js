import LRU from "lru-cache";

const LRUCache = new LRU({ max: Infinity });

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
