import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { UseFetch } from "./types";
import { useFetchContext } from "../..";

class InternalState {
  private toQueryResultCache = new Map<string, any>();

  public useFetch<Data = any>(args: UseFetch<Data>) {
    const { ssr = true } = args;

    const context = useFetchContext();

    const initialLoad = useRef(true);

    const fetchKey = JSON.stringify(args.fetchKey);
    const ssrData = context?.data?.[fetchKey] as Data | undefined;

    const [data, setData] = useState<Data | undefined>(
      ssrData ?? args.initialData
    );

    const [loading, setLoading] = useState(() => {
      /**
       * @note if ssr, we check data is exists or not,
       * if exists means it success to load in server, make loading is false
       */
      if (ssr) {
        return !Boolean(data);
      }
      return true;
    });

    const [error, setError] = useState<Error | undefined>(undefined);

    const fetcher = useCallback(async () => {
      if (this.toQueryResultCache.has(fetchKey)) {
        setData(this.toQueryResultCache.get(fetchKey));
        return;
      }

      try {
        setLoading(true);
        const response = await args.fetcher();
        if (args.onSuccess) args.onSuccess(response);
        setData(response);
        this.toQueryResultCache.set(fetchKey, response);
      } catch (err) {
        const _error = err instanceof Error ? err : Error(String(err));
        if (args.onError) args.onError(_error);
        setError(_error);
      } finally {
        setLoading(false);
      }
    }, [fetchKey]);

    /**
     * @note for runtime
     */
    useEffect(() => {
      !initialLoad.current && fetcher();
    }, [fetcher]);

    /**
     * @note if ssr failed load in server
     */
    useEffect(() => {
      if (ssr && !data) {
        fetcher().then(() => {
          initialLoad.current = false;
        });
      }
    }, []);

    /**
     * @note fetching in client
     */

    useEffect(() => {
      if (!ssr) {
        fetcher().then(() => {
          initialLoad.current = false;
        });
      }
    }, []);

    if (!context) {
      return { data: undefined, loading: true, error: undefined };
    }

    /**
     * @note for now collector value is only from ssr
     */

    if (ssr && context.collector) {
      const result = context.collector.getPromise(fetchKey);
      if (!result) context.collector.addPromise(fetchKey, args.fetcher);
    }

    return useMemo(() => ({ data, loading, error }), [data, loading, error]);
  }
}

const useInternalState = () => {
  const [state] = useState(new InternalState());
  return state;
};

export const useFetch = <Data = any>(args: UseFetch<Data>) =>
  useInternalState().useFetch(args);
