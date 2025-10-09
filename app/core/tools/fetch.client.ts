const parseApiResMessage = (data: any) => {
  let objectFirstKey = Object.keys(data);
  if (Array.isArray(data)) return data.join("-");
  else if (data.message) return data.message;
  // @ts-ignore
  else if (objectFirstKey) return `${data[objectFirstKey[0]]}`;
  else return `${data ?? "خطا در برقراری ارتباط با سرور"}`;
};
const onFetchError = (err: any) => {
  const { _data: resData, status } = err.response;
  if (Object.values(resData)[0] === "FetchError" && !status) toast.error("خطا در برقراری ارتباط با سرور");
  let apiMessage = parseApiResMessage(resData);

  switch (status) {
    case 404:
      toast.error("۴۰۴ - نتیجه‌ای یافت نشد");
      break;
    case 500:
    case 502:
      toast.error("خطا در برقراری ارتباط با سرور");
      break;
    default:
      toast.error(apiMessage);
  }
};
const getHeaders = (): HeadersInit => {
  return {
    ...(getToken() ? { Authorization: `Token ${getToken()}` } : {}),
    "Accept-Language": getCookie("i18n_redirected")?.split("-")[0] ?? "en",
  };
};

let $$fetch: typeof $fetch = $fetch.create({
  headers: getHeaders(),
  baseURL: BASE_API_URL + "/api/v1",
  // credentials: "include",
  onResponseError: onFetchError,
  onRequestError: () => {
    toast.error("خطا در برقراری ارتباط");
  },
});

function reInitFetch() {
  $$fetch = $fetch.create({
    headers: getHeaders(),
    baseURL: BASE_API_URL + "/api/v1",
    // credentials: "include",
    onResponseError: onFetchError,
    onRequestError: () => {
      toast.error("خطا در برقراری ارتباط");
    },
  });
}
export { $$fetch, reInitFetch };
