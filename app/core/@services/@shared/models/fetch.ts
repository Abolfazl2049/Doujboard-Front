import type { BaseFetchResponse, FetchPaginationFn, FetchQuery } from "~/core/@services/@shared/types/fetch";

class CrudFetch<Body = Record<string, any>, Dto = Record<string, any>> {
  fetchDelete: (id: string) => Promise<BaseFetchResponse>;
  fetchCreateUpdate: (data: Body, id?: number | string) => Promise<Dto>;
  fetchRetrieve: (id: string | string) => Promise<Dto>;
  fetchList: FetchPaginationFn;
  fetchRawList: (query?: FetchQuery) => Promise<Dto[]>;
  constructor(
    path: string,
    {
      path: optionPath,
      isBodyFormData,
    }: {
      path?: {
        list?: string;
      };
      isBodyFormData?: boolean;
    } = {},
  ) {
    const endsWithSlash = path.endsWith("/");

    this.fetchDelete = async (id) =>
      await $$fetch(`${path}` + (endsWithSlash ? id.toString() : `/${id}`), { method: "DELETE" });

    this.fetchCreateUpdate = async (data, id) => {
      const formData = new FormData();
      if (isBodyFormData) {
        for (const entry of Object.entries(data as object)) {
          if (entry[1] || entry[1] === 0 || entry[1] === false) formData.append(entry[0], entry[1]);
        }
      }

      return $$fetch(`${path}${id ? `${endsWithSlash ? id : `/${id}`}` : ""}`, {
        method: id ? "PATCH" : "POST",
        body: isBodyFormData ? formData : (data as BodyInit),
      });
    };

    this.fetchRetrieve = async (id) =>
      await $$fetch(path + (endsWithSlash ? id.toString() : `/${id}`), { method: "GET" });

    this.fetchList = async (query) => await $$fetch(optionPath?.list ?? path, { method: "GET", params: query });

    this.fetchRawList = async (query) => await $$fetch(optionPath?.list ?? path, { method: "GET", params: query });
  }
}
export { CrudFetch };
