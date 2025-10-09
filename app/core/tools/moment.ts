import moment from "moment";
import momentJalaali from "moment-jalaali";
const useMoment = () => {
  const nuxtApp = useNuxtApp();
  if (nuxtApp.$i18n.locale.value === "en-GB") return moment;
  else {
    momentJalaali.loadPersian({ dialect: "persian" });
    return momentJalaali;
  }
};
export { useMoment };
