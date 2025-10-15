const parseApiResMessage = (data: any) => {
  let objectFirstKey = Object.keys(data);
  if (Array.isArray(data)) return data.join("-");
  else if (data.message) return data.message;
  else if (data.data) return data.data;
  // @ts-ignore
  else if (objectFirstKey) return `${data[objectFirstKey[0]]}`;
  else return `${data ?? "Server connection error"}`;
};
const onFetchError = (err: any) => {
  const { _data: resData, status } = err.response;
  if (Object.values(resData)[0] === "FetchError" && !status) toast.error("Server connection error");
  let apiMessage = parseApiResMessage(resData);

  switch (status) {
    case 404:
      toast.error("404 - Not found");
      break;
    case 500:
    case 502:
      toast.error("Server connection error");
      break;
    default:
      toast.error(apiMessage);
  }
};
const getHeaders = (): HeadersInit => {
  return {
    ...(getToken() ? { Authorization: `${getToken()}` } : {}),
    "Accept-Language": getCookie("i18n_redirected")?.split("-")[0] ?? "en",
  };
};

let $$fetch: typeof $fetch = $fetch.create({
  headers: getHeaders(),
  baseURL: BASE_API_URL,
  // credentials: "include",
  onResponseError: onFetchError,
  onRequestError: () => {
    toast.error("Connection error");
  },
});

function reInitFetch() {
  $$fetch = $fetch.create({
    headers: getHeaders(),
    baseURL: BASE_API_URL,
    // credentials: "include",
    onResponseError: onFetchError,
    onRequestError: () => {
      toast.error("Connection error");
    },
  });
}
export { $$fetch, reInitFetch };
