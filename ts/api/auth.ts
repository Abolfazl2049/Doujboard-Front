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
export {signupApi, loginApi};
