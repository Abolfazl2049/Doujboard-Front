import type { todoObject } from "~/types";

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
  // let toast = useToast(); 
  if (customMessage) {
    // toast.add({
    //   color: "error",
    //   title: customMessage,
    // });
    return;
  }
  // if (Object.values(res)[0] === "FetchError" && !res.statusCode) return toast.add({ title: "خطا در برقراری ارتباط", color: "neutral" });
  let data = res.data;
  let apiMessage = parseApiResMessage(data);

  switch (res.statusCode) {
    case 404:
      // toast.add({
      //   title: "یافت نشد",
      //   description: apiMessage,
      //   color: "error",
      // });
      break;
    case 500:
    case 502:
      // toast.add({
      //   title: "خطا در برقراری ارتباط با سرور",
      //   color: "error",
      // });
      break;
    default:
      // toast.add({
      //   title: apiMessage,
      //   color: "error",
      // });
  }
};
let handleToDo = (todo: todoObject) => {
  // let toast = useToast();
  if (todo.navigateTo) navigateTo(todo.navigateTo);
  if (todo.message){}
    // toast.add({
    //   title: todo.message,
    //   icon: "i-heroicons-check-circle",
    // });
};
let parseApiResMessage = (data: any) => {
  let objectFirstKey = Object.keys(data);
  if (Array.isArray(data)) return data.join("-");
  else if (data.message) return data.message;
  else if (objectFirstKey) return `${objectFirstKey[0]} : ${data[objectFirstKey[0]]}`;
  else return `${data ?? "خطا در برقراری ارتباط"}`;
};
export { callApi };
