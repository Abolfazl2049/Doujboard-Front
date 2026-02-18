import type { ProfileImageDto, UserDto } from "../user/types";
import type { Account } from "./model";
import type { UserSessionDto } from "./session.model";

const fetchAccountData = async () => {
  return $$fetch<UserDto>("/user/profile", { retry: 5 });
};
const fetchUpdateAccountData = (data: Account) => {
  const body: Partial<UserDto> = {
    first_name: data.name,
    admin_profile: {
      two_fa: data.isTwoFaEnabled,
    },
  };
  return $$fetch<UserDto>("/account/dashboard/profile", {
    method: "PATCH",
    body,
  });
};

const fetchAddReferralFriend = async (referralCode: string, check: boolean) => {
  return $$fetch("/account/submit-referrer", {
    method: "POST",
    body: {
      referrer_code: referralCode,
      check,
    },
  });
};

const fetchUpdateAccountStatus = async (data: { isHidden?: boolean; isPaused?: boolean }) => {
  return $$fetch("/account/account-status", {
    method: "PATCH",
    body: {
      hide_account: data.isHidden,
      pause_account: data.isPaused,
    },
  });
};
const fetchDeleteAccount = async () => {
  return $$fetch("/account/delete", {
    method: "DELETE",
  });
};

const fetchChangePassword = async (oldPass: string, newPass: string) => {
  return await $$fetch("/account/change-password", {
    method: "PATCH",
    body: {
      old_password: oldPass,
      new_password: newPass,
    },
  });
};

const fetchSetMyImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("primary", "true");
  return $$fetch<ProfileImageDto>("/account/set-image", {
    method: "POST",
    body: formData,
  });
};
export const { fetchRawList: fetchUserSessions, fetchDelete: fetchDeleteUserSession } = new CrudFetch<
  any,
  UserSessionDto
>("/account/dashboard/device-token");
export {
  fetchAccountData,
  fetchUpdateAccountData,
  fetchAddReferralFriend,
  fetchUpdateAccountStatus,
  fetchDeleteAccount,
  fetchChangePassword,
  fetchSetMyImage,
};
