interface BaseFetchResponse {
  message?: string;
  ok?: boolean;
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

interface FetchPaginationRes<T = Record<string, unknown>> {
  results: T[];
  next: string | null;
  prev: string | null;
  count: number;
}
interface AuthWithThirdPartyFetchResponse {
  status: string;
  data: {
    token: string;
    login: boolean;
  };
}
type FetchPaginationFn<T = Record<string, any>> = (
  query: Record<string, string | undefined> = {},
) => Promise<FetchPaginationRes<T>>;
type FetchDeleteFn = (id: string) => Promise<unknown>;
type FetchRetrieveFn<T = unknown> = (id: string) => Promise<T>;
type FetchQuery = Record<string, string | undefined>;
export {
  BaseFetchResponse,
  FetchPaginationRes,
  AuthWithThirdPartyFetchResponse,
  FetchPaginationFn,
  FetchDeleteFn,
  FetchRetrieveFn,
  FetchQuery,
};
