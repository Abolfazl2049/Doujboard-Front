import type {todoObject} from "~/types";

let callApi = async (func: Function, params: Array<any>, todo?: todoObject) => {
  let error = false;
  let res = await func.call(null, ...params).catch((err: any) => {
    handleError(err, todo?.errMessage);
    error = err;
  });
  if (error) throw error;
  if (res && todo) handleToDo(todo);
  return res;
};
let handleError = async (res: any, customMessage?: string) => {
  let {$toast: toast} = useNuxtApp();
  if (customMessage) {
    toast.info({
      color: "error",
      title: customMessage
    });
    return;
  }
  if (Object.values(res)[0] === "FetchError" && !res.statusCode) return toast.error("there was an error, try again");
  let data = res.data;
  let apiMessage = parseApiResMessage(data);

  switch (res.statusCode) {
    case 404:
      toast.error("NOT FOUND");
      break;
    case 500:
    case 502:
      toast.error(apiMessage);
      break;
    default:
      toast.error(apiMessage);
  }
};
let handleToDo = (todo: todoObject) => {
  let {$toast: toast} = useNuxtApp();
  if (todo.navigateTo) navigateTo(todo.navigateTo);
  if (todo.message) toast.success(todo.message);
};
let parseApiResMessage = (data: any) => {
  let objectFirstKey = Object.keys(data)[0];
  if (Array.isArray(data)) return data.join("-");
  else if (data.message) return data.message;
  else if (data.data) return data.data;
  else if (objectFirstKey) return `${objectFirstKey} : ${data[objectFirstKey]}`;
  else return `${data ?? "there was an error, try again"}`;
};
export {callApi};
