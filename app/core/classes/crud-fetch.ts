import type { BaseFetchResponse, FetchPaginationListResponse } from "~/core/types/public/fetch";

class CrudFetch {
  fetchDelete: (id: number) => Promise<BaseFetchResponse>;
  fetchCreateUpdate: (data: any, id?: number | string) => Promise<BaseFetchResponse>;
  fetchRetrieve: (id: number | string) => Promise<Object>;
  fetchList: (query?: Object) => Promise<FetchPaginationListResponse>;
  fetchRawList: (query?: Object) => Promise<Record<string, any>[]>;
  constructor(
    path: string,
    options?: {
      path?: {
        list?: string;
      };
    },
  ) {
    const endsWithSlash = path.endsWith("/");

    this.fetchDelete = async (id: number) => await $$fetch(`${path}` + (endsWithSlash ? id.toString() : `/${id}`), { method: "DELETE" });
    this.fetchCreateUpdate = async (data: any, id?: number | string) =>
      await $$fetch(`${path}${id ? `${endsWithSlash ? id : `/${id}`}` : ""}`, { method: id ? "PATCH" : "POST", body: data });
    this.fetchRetrieve = async (id: number | string) => await $$fetch(path + (endsWithSlash ? id.toString() : `/${id}`), { method: "GET" });
    this.fetchList = async (query?: Object) => await $$fetch(options?.path?.list ?? path, { method: "GET", params: query });
    this.fetchRawList = async (query?: Object) => await $$fetch(options?.path?.list ?? path, { method: "GET", params: query });
  }
}
export { CrudFetch };
