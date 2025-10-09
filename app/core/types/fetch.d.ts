interface BaseFetchResponse {
  message?: string;
  ok?: boolean;
  data?: Object;
  [key: string]: any;
}

interface FetchPaginationListResponse<T = any> {
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
export { BaseFetchResponse, FetchPaginationListResponse, AuthWithThirdPartyFetchResponse };
