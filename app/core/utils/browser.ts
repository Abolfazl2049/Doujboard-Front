function checkBrowser() {
  // Get the user-agent string
  let userAgentString = navigator.userAgent;

  // Detect Chrome
  let chromeAgent = userAgentString.indexOf("Chrome") > -1;

  // Detect Internet Explorer
  let IExplorerAgent = userAgentString.indexOf("MSIE") > -1 || userAgentString.indexOf("rv:") > -1;

  // Detect Firefox
  let firefoxAgent = userAgentString.indexOf("Firefox") > -1;

  // Detect Safari
  let safariAgent = userAgentString.indexOf("Safari") > -1;

  // Discard Safari since it also matches Chrome
  if (chromeAgent && safariAgent) safariAgent = false;

  // Detect Opera
  let operaAgent = userAgentString.indexOf("OP") > -1;

  // Discard Chrome since it also matches Opera
  if (chromeAgent && operaAgent) chromeAgent = false;
  return {
    chromeAgent,
    firefoxAgent,
    safariAgent,
  };
}
let isDesktop = () => {
  const { width } = useWindowSize({ initialWidth: 1024 });
  return width.value >= 1024;
};
let isTablet = () => {
  const { width } = useWindowSize({ initialWidth: 1024 });
  return width.value >= 768;
};
let setRandomUUID = () => {
  let uuid = localStorage.getItem("uuid") || genUUID();
  localStorage.setItem("uuid", uuid);
  return uuid;
};

let genUUID = () => {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uuid = "";
  for (let i = 0; i < 10; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uuid;
};
let getToken = () => {
  if (import.meta.client) return localStorage.getItem("token");
  else return "";
};
function getCookie(name: string) {
  if (import.meta.client) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(";").shift();
  }
}

function clearUserDataInLocalStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("uuid");
}
export { isDesktop, setRandomUUID, genUUID, getToken, checkBrowser, isTablet, getCookie, clearUserDataInLocalStorage };
