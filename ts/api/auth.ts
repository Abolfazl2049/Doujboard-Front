let signupApi = async (username: string, password: string) => {
  return await $fetch("/auth/signup", {
    method: "POST",
    body: {
      username,
      password
    },
    baseURL
  });
};
let loginApi = async (username: string, password: string) => {
  return await $fetch("/auth/login", {
    method: "POST",
    body: {
      username,
      password
    },
    baseURL
  });
};
let getAccountData = async () => {
  return await $fetch("/user/profile", {
    ...setAuthHeader(),
    baseURL
  });
};
export {signupApi, loginApi, getAccountData};
