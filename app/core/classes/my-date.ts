import moment from "moment";
enum DisplayFormatVariant {
  DATE_STRING,
  SHORT_LETTER,
  TICKET_CHAT,
}

class MyDate {
  utc: string;
  formatted: string;
  displayFormatted: string;
  isToday: boolean;
  constructor(date: string, options?: { displayFormatVariant: keyof typeof DisplayFormatVariant }) {
    this.utc = moment(date).utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
    this.formatted = moment(date).format("YYYY-MM-DDTHH:mm");
    this.isToday = moment(date).isSame(moment(), "day");
    const { locale, t } = useNuxtApp()?.$i18n;
    console.log(options?.displayFormatVariant);

    // display format
    switch (options?.displayFormatVariant) {
      case "DATE_STRING":
        if (locale.value === "fa-IR") this.displayFormatted = new Date(date).toLocaleDateString("fa-IR");
        else this.displayFormatted = new Date(date).toLocaleDateString();
        break;
      case "SHORT_LETTER":
        this.displayFormatted = useMoment()(date).format(locale.value === "fa-IR" ? "jDD jMMMM jYYYY" : "DD MMM YYYY");
        break;
      case "TICKET_CHAT":
        if (this.isToday) this.displayFormatted = t("today");
        else this.displayFormatted = useMoment()(date).format(locale.value === "fa-IR" ? "jDD jMMMM jYYYY" : "DD MMM YYYY");
        break;
      default:
        this.displayFormatted = new Date(date).toLocaleString();
    }
  }
}
export { MyDate };
