import type { ApiUserModel } from "~/core/@services/user/types";

const fetchAccountData = async () => {
  return $$fetch<ApiUserModel>("/account/profile");
};

export { fetchAccountData };
