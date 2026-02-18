interface SigninResponse {
  status: string;
  data: {
    message: string;
    token: string | null;
  };
}

async function fetchSignin(email: string, password: string) {
  return await $$fetch<SigninResponse>("/auth/signin", {
    method: "POST",
    body: {
      username: email,
      password: password,
    },
  });
}

export { fetchSignin };
