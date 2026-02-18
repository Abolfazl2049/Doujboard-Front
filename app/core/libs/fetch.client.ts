const parseApiResMessage = (data: any) => {
  const objectFirstKey = typeof data === "object" ? Object.keys(data)[0] : null;
  if (Array.isArray(data)) return data.join("-");
  else if (data.message) return data.message;
  else if (objectFirstKey) return `${data[objectFirstKey]}`;
  else if (typeof data === "string" && data.length < 64) return data;
  else return "Error try again";
};
const onResponseError = (err: any) => {
  const { _data: resData, status } = err.response;

  if (Object.values(resData)[0] === "FetchError" && !status) addErrToast();
  const apiMessage = parseApiResMessage(resData);

  switch (status) {
    case 500:
    case 502:
      addErrToast();
      break;
    default:
      addErrToast(apiMessage);
  }
};
const addErrToast = (message: string | null = null) => {
  if (import.meta.client) {
    const online = useOnline();
    if (online.value) toast.error(message ?? "Error try again");
    else toast.error("No internet connection");
  }
};

const onRequestError = () => {
  addErrToast();
};

const $$fetch: typeof $fetch = $fetch.create({
  baseURL: API_BASE_URL + "/api/v1",
  onResponseError,
  onRequestError,
  retry: 0,
  timeout: 30000,
  retryStatusCodes: [],
  credentials: "include",
});

export { $$fetch };
