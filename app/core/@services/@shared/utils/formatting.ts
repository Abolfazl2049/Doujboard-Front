import type { LocaleValue } from "~/core/@services/@shared/types";

let formatPrice = (
  v: number,
  options: {
    locale: LocaleValue;
  } = {
    locale: "en-GB",
  },
) => {
  return new Intl.NumberFormat(options.locale).format(Math.round(v));
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

let toKebabCase = (str: string) =>
  str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());

const toCamelize = (str: string) =>
  str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

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

const secondsToMinutes = (seconds: number = 0) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const generateRandomStr = () => {
  let generatedCode = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < Math.floor(Math.random() * 11) + 10; i++)
    generatedCode += chars.charAt(Math.floor(Math.random() * chars.length));
  return generatedCode;
};

export {
  toEngDigit,
  toFaDigit,
  formatPrice,
  toKebabCase,
  formatCardNumber,
  removeTwoSpaces,
  toPascalCase,
  secondsToMinutes,
  toCamelize,
  generateRandomStr,
};
