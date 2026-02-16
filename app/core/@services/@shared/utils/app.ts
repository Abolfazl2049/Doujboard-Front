async function loadAppData() {}
function initAuthToken(token: string) {
  const authCookie = useCookie("auth_token", { maxAge: 60 * 60 * 24 * 30 }); // 30 days
  authCookie.value = token;
  reInitFetch(token);
}
export { loadAppData, initAuthToken };
