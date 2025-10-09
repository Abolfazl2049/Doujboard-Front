export const useAuthStore = defineStore("auth", () => {
  const data = ref({
    email: "",
    password: "",
    referralCode: "",
  });
  return {
    data,
  };
});
