import {getAccountData} from "../api/auth";

export const accountStore = defineStore("account", () => {
  let data = ref();
  let getData = async () => {
    let res = await callApi(getAccountData, []);
    data.value = res.data;
  };
  return {
    data,
    getData
  };
});
