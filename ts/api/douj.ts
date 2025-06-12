let getDoujCategoryListApi = async (query: object) => {
  return await $fetch("/douj/category", {
    baseURL,
    ...setAuthHeader(),
    params: query
  });
};
let getDoujListApi = async (query: object) => {
  return await $fetch("/douj/", {
    baseURL,
    ...setAuthHeader(),
    params: query
  });
};
export {getDoujCategoryListApi, getDoujListApi};
