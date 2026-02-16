export const useAuthStore = defineStore("auth", () => {
  const data = ref({
    email: "",
    password: "",
  });
  return {
    data,
  };
});
