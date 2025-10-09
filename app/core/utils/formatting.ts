import type { LocaleValue } from "../types";

let formatPrice = (
  v: number,
  options: {
    locale: LocaleValue;
  } = {
    locale: "en-GB",
  },
) => {
  return new Intl.NumberFormat(options.locale).format(v);
};
let toEngDigit = (str: string) => {
  let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  if (typeof str === "string") {
    for (let i = 0; i < 10; i++) {
      str = str.replaceAll(persianNumbers[i] as RegExp, i.toString());
    }
  }
  return str;
};
const toFaDigit = (input: string | number): string => {
  const enToFa = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };
  // @ts-ignore
  return String(input).replace(/[0-9]/g, (d) => enToFa[d as keyof typeof enToFa]);
};
const formatCardNumber = (value: string) => {
  value = value
    .replaceAll(" ", "")
    .replace(/(.{4})/g, "$1-")
    .replace(/-$/, "");
  value = value.trim();
  return toFaDigit(value);
};
let kebabize = (str: string) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());
const toUsdDollar = (s: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(s);
};
const toIrRial = (s: number) => {
  return new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
  }).format(s);
};
let formatDate = (date: string, options?: { dateString: boolean }) => {
  if (date) {
    if (options?.dateString) return new Date(date).toLocaleDateString("en-GB");
    return new Date(date).toLocaleString("en-GB");
  } else return "-";
};
const toPascalCase = (value: string) => {
  let f = "";
  let arr = value.split(" ");
  let indx = 0;
  for (let s of arr) {
    let firstChar = s.charAt(0).toUpperCase();
    s = firstChar + s.slice(1);
    f += s;
    if (indx !== arr.length - 1) f += " ";
    indx++;
  }
  return f;
};
const removeTwoSpaces = (value: string) => {
  let result = value;
  for (let i = 0; i < 2; i++) {
    result = result.replace(" ", "");
  }
  return result;
};
export { toEngDigit, toFaDigit, formatPrice, kebabize, toUsdDollar, toIrRial, formatCardNumber, formatDate, removeTwoSpaces, toPascalCase };
