export interface UseFetch<Data> {
  fetchKey: unknown[];
  fetcher: () => Promise<Data>;
  onSuccess?: (data: Data) => void;
  onError?: (error: Error) => void;
  initialData?: Data;
  ssr?: boolean;
}