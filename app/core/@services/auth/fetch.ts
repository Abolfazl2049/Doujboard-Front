import type { UserAuthStepKey, UserAuthStepName } from "../user/variant";
import type { AuthWithThirdPartyFetchResponse, BaseFetchResponse } from "../../types/fetch";
import type { ApiUserModel } from "../user/types";

const fetchRequestForgotPassword = async (email: string) => {
  return $$fetch<{ data: { code: string } }>("/auth/forgot-password", {
    method: "POST",
    body: {
      email,
    },
  });
};
const fetchSignIn = async (email: string, password: string) => {
  return $$fetch<{ token: string }>("/auth/login", {
    method: "POST",
    body: {
      username: email,
      password,
    },
  });
};
const fetchAuthWithApple = async (token: string, audience: string) => {
  return await $$fetch<AuthWithThirdPartyFetchResponse>("/auth/login-apple", {
    method: "POST",
    body: {
      id_token: token,
      audience,
    },
  });
};
const fetchAuthWithGoogle = async (token: string) => {
  return await $$fetch<AuthWithThirdPartyFetchResponse>("/auth/login-google", {
    method: "POST",
    body: {
      id_token: token,
    },
  });
};
const fetchSendOtp = async (email: string) => {
  return await $$fetch<BaseFetchResponse>("/auth/send-code", {
    method: "POST",
    body: {
      email,
    },
  });
};
const fetchVerifyOtp = async (email: string, password: string, referrerCode: string, code: string) => {
  return await $$fetch<{ status: string; data: { message: string; token: string } }>("/auth/register", {
    method: "POST",
    body: {
      email,
      password,
      code,
      referrer_code: referrerCode ? referrerCode : undefined,
    },
  });
};
const fetchVerifyForgotPassword = async (email: string, code: string, newPassword: string) => {
  return await $$fetch("/auth/reset-password", {
    method: "POST",
    body: {
      email,
      code,
      new_password: newPassword,
    },
  });
};
const fetchSetImage = async (
  file: File | null,
  options: Partial<{
    id: number;
    isPrimary: boolean;
    authStep: UserAuthStepKey;
    blueCheck: boolean;
  }> = {},
) => {
  const formData = new FormData();
  if (file) formData.append("image", file);
  if (options.id) formData.append("id", options.id.toString());
  if (options.isPrimary) formData.append("primary", "true");
  if (options.authStep) formData.append("auth_step", options.authStep.toString());
  if (options.blueCheck) formData.append("blue_check", "true");
  return await $$fetch<{ data: ApiUserModel }>("/account/set-image", {
    method: "POST",
    body: formData,
  });
};
export { fetchRequestForgotPassword, fetchSignIn, fetchAuthWithApple, fetchAuthWithGoogle, fetchSendOtp, fetchVerifyOtp, fetchVerifyForgotPassword, fetchSetImage };
