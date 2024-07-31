type PromiseFunc = () => Promise<unknown>;

export type CollectorValue = {
  addPromise: (key: string, promise: PromiseFunc) => void;
  runAllPromise: () => Promise<void>;
  getPromise: <T>(key: string) => T;
  hasPromise: () => boolean;
  getResolved: () => Record<string, unknown>;
};

const Collector = (): CollectorValue => {
  let promises: Record<string, PromiseFunc> | undefined;

  let resolved: Record<string, unknown> = {};

  return {
    addPromise(key, promise) {
      if (!promises) promises = {};
      promises[key] = promise;
    },
    getPromise<T>(key: string) {
      return resolved[key] as T;
    },
    getResolved() {
      return resolved;
    },
    hasPromise() {
      return Boolean(promises);
    },
    async runAllPromise() {
      if (!promises) return;

      const tuplesPromise = Object.entries(promises);
      for (const [key, promise] of tuplesPromise) {
        try {
          const result = await promise();
          resolved[key] = result;
        } catch {}
      }
      promises = undefined;
    },
  };
};

export default Collector;
