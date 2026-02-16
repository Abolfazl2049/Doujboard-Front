function checkBrowser() {
  // Get the user-agent string
  const userAgentString = navigator.userAgent;

  // Detect Chrome
  let chromeAgent = userAgentString.indexOf("Chrome") > -1;

  // Detect Firefox
  const firefoxAgent = userAgentString.indexOf("Firefox") > -1;

  // Detect Safari
  let safariAgent = userAgentString.indexOf("Safari") > -1;

  // Discard Safari since it also matches Chrome
  if (chromeAgent && safariAgent) safariAgent = false;

  // Detect Opera
  const operaAgent = userAgentString.indexOf("OP") > -1;

  // Discard Chrome since it also matches Opera
  if (chromeAgent && operaAgent) chromeAgent = false;
  return {
    chromeAgent,
    firefoxAgent,
    safariAgent,
  };
}
const isDesktop = () => {
  const { width } = useWindowSize({ initialWidth: 1024 });
  return width.value >= 1024;
};
const isTablet = () => {
  const { width } = useWindowSize({ initialWidth: 1024 });
  return width.value >= 768;
};
const setRandomUUID = () => {
  const uuid = localStorage.getItem("uuid") || genUUID();
  localStorage.setItem("uuid", uuid);
  return uuid;
};

const genUUID = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uuid = "";
  for (let i = 0; i < 10; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uuid;
};
const getAuthToken = () => {
  return useCookie("auth_token").value;
};
function getCookie(name: string) {
  if (import.meta.client) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(";").shift();
  }
}

function clearUserDataInLocalStorage() {
  if (import.meta.client) {
    localStorage.removeItem("uuid");
    localStorage.removeItem("show-tutorial");
    localStorage.removeItem("enable-vibrate");
    localStorage.removeItem("enable-sound");
  }
  const token = useCookie("auth_token");
  token.value = null;
}

function vibrate(ms: number = 100) {
  if (localStorage.getItem("enable-vibrate") === "false") return;
  const { vibrate, isSupported } = useVibrate();
  if (isSupported.value) vibrate(ms);
}
export {
  isDesktop,
  setRandomUUID,
  genUUID,
  getAuthToken,
  checkBrowser,
  isTablet,
  getCookie,
  clearUserDataInLocalStorage,
  vibrate,
};
