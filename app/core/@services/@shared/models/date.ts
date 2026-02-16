import moment from "moment";
export enum DisplayFormatVariant {
  DATE_STRING,
  SHORT_LETTER,
  TICKET_CHAT,
  FROM_NOW,
  CHAT,
  TICKET_CARD,
  DATE,
  FULL_DATE,
  FULL_DATE_NUMBER,
  FULL_12_TIME,
  FULL_TIME,
  KEBAB_DATE,
  TICKET,
}

class MyDate {
  utc: string;
  formatted: string;
  displayFormatted: string;
  isToday: boolean;
  constructor(date: string | undefined, options?: { displayFormatVariant: keyof typeof DisplayFormatVariant }) {
    this.utc = moment(date).utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
    this.formatted = moment(date).format("YYYY-MM-DDTHH:mm");
    this.isToday = moment(date).isSame(moment(), "day");
    if (!date) {
      this.displayFormatted = "-";
      return;
    }
    // display format
    switch (options?.displayFormatVariant) {
      case "DATE_STRING":
        this.displayFormatted = moment(date).format(`${"DD MMM YYYY"}${" - "}${"HH:mm"}`);
        break;
      case "DATE":
        this.displayFormatted = moment(date).format("DD/MM/YYYY");
        break;
      case "TICKET_CARD":
        this.displayFormatted = moment(date).format("jDD jMMMM jYYYY");
        break;
      case "SHORT_LETTER":
        this.displayFormatted = moment(date).format("MMM DD, YYYY").replace(".", "");
        break;
      case "TICKET_CHAT":
        if (this.isToday) this.displayFormatted = "Today";
        else this.displayFormatted = moment(date).format("DD MMM YYYY");
        break;
      case "FROM_NOW":
        this.displayFormatted = moment(date).locale("en").fromNow();
        break;
      case "CHAT":
        this.displayFormatted = new Date(date).toLocaleString("en-GB", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        break;
      case "FULL_DATE":
        this.displayFormatted = moment(date).format("MMM DD, YYYY - hh:mm A").replace(".", "");
        break;
      case "FULL_DATE_NUMBER":
        this.displayFormatted = moment(date).format("DD/MM/YYYY, hh:mm:ss A").replace(".", "");
        break;
      case "FULL_12_TIME":
        this.displayFormatted = moment(date).format("hh:mm:ss A");
        break;
      case "FULL_TIME":
        this.displayFormatted = moment(date).format("hh:mm:ss");
        break;
      case "KEBAB_DATE":
        this.displayFormatted = moment(date).format("DD-MM-YYYY");
        break;
      case "TICKET":
        this.displayFormatted = moment(date).format("DD-MM-YYYY hh:mm");
        break;
      default:
        this.displayFormatted = new Date(date).toLocaleString();
    }
  }
}
export { MyDate };
