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
let postDoujApi = async (title: string, link: string, description: string, img: File, category: number, hidden: boolean) => {
  const form = new FormData();
  form.append("title", title);
  form.append("link", link);
  form.append("description", description);
  form.append("img", img);
  form.append("category", category.toString());
  form.append("hidden", `${hidden}`);
  return await $fetch("/douj", {
    method: "POST",
    baseURL,
    body: form,
    ...setAuthHeader()
  });
};
let postDoujCategoryApi = async (name: string) => {
  return await $fetch("/douj/category", {
    method: "POST",
    baseURL,
    body: {
      name
    },
    ...setAuthHeader()
  });
};
export {getDoujCategoryListApi, getDoujListApi, postDoujApi, postDoujCategoryApi};
