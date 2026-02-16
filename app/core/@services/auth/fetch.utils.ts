interface SigninResponse {
  status: string;
  data: {
    message: string;
    token: string | null;
  };
}

async function fetchSignin(email: string, password: string) {
  return await $$fetch<SigninResponse>("/auth/dashboard/login", {
    method: "POST",
    body: {
      username: email,
      password: password,
    },
  });
}

async function fetchVerifyOtp(email: string, password: string, code: string) {
  return await $$fetch<SigninResponse>("/auth/dashboard/login", {
    method: "POST",
    body: {
      username: email,
      password,
      code,
    },
  });
}

export { fetchSignin, fetchVerifyOtp };
