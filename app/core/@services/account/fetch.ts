import { UserAuthStepVariant, type UserAuthStepKey } from "~/core/@services/user/variant";
import type { Account } from "~/core/@services/account/model";
import type { ApiUserModel } from "~/core/@services/user/types";

const fetchAccountData = async () => {
  return $$fetch<ApiUserModel>("/account/profile");
};
const fetchUpdateAccountData = async (data: Account) => {
  const body: Partial<ApiUserModel> = {
    email: data.email,
    first_name: data.name,
    profile: {
      auth_step: data.authStep ? (UserAuthStepVariant[data.authStep]?.key as UserAuthStepKey) : undefined,
      state_id: data.country?.hasStates ? data.state?.id : null,
      country_id: data.country?.id,
      default_language: data.defaultLanguage?.key ?? undefined,
      gender: data.gender ? data.gender?.key : undefined,
      lat_lon: data.latLon ?? undefined,
      web_fcm_token: data.fcmToken ?? undefined,
      device: data.getDeviceStrForApi() ?? undefined,
      operating_system: data.os?.key ?? undefined,
    },
    side_profile: {
      birth_date: data.additionalInfo.birthDate ?? undefined,
      height: data.additionalInfo.height ?? undefined,
      weight: data.additionalInfo.weight ?? undefined,
      religion: data.additionalInfo.religion?.key ?? undefined,
      drinking: data.additionalInfo.drinking?.key ?? undefined,
      smoking: data.additionalInfo.smoking?.key ?? undefined,
      child_size: data.additionalInfo.childSize?.key ?? undefined,
      reason: data.additionalInfo.reason?.key ?? undefined,
      attracted_to: data.additionalInfo.attractedTo?.key ?? undefined,
      lust: data.additionalInfo.lust ?? undefined,
      health: data.additionalInfo.health?.key ?? undefined,
      house: data.additionalInfo.house?.key ?? undefined,
      operating_system: data.additionalInfo.os?.key ?? undefined,
      education: data.additionalInfo.education?.key ?? undefined,
      bio: data.additionalInfo.bio ?? undefined,
      languages_id: data.additionalInfo.languages?.map((lang) => lang.id)?.join(",") ?? undefined,
      car_id: data.additionalInfo.car?.id ?? undefined,
      interests_id: data.additionalInfo.interests?.map((interest) => interest.id)?.join(",") ?? undefined,
      job_id: data.additionalInfo.job?.id ?? undefined,
      relationship: data.additionalInfo.relationshipStatus?.key ?? undefined,
      pet: data.additionalInfo.pet?.key ?? undefined,
      ethnicity_id: data.additionalInfo.ethnicity?.id ?? undefined,
    },
  };
  return $$fetch<ApiUserModel>("/account/profile", {
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
export { fetchAccountData, fetchUpdateAccountData, fetchAddReferralFriend, fetchUpdateAccountStatus, fetchDeleteAccount, fetchChangePassword };
