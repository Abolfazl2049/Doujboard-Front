import type { LocaleValue } from "~/core/types";

type UserOsName = "ANDROID" | "IOS" | "WEB";
type UserOsKey = 1 | 2 | 3;
const UserOsVariant = buildVariant<UserOsName, UserOsKey>([
  {
    name: "ANDROID",
    key: 1,
  },
  {
    name: "IOS",
    key: 2,
  },
  {
    name: "WEB",
    key: 3,
  },
]);
type UserLangName = LocaleValue;
type UserLangKey = "en" | "fa";
const UserLangVariant = buildVariant<UserLangName, UserLangKey>([
  {
    name: "en-GB",
    key: "en",
  },
  {
    name: "fa-IR",
    key: "fa",
  },
]);
type UserGenderName = "FEMALE" | "MALE";
type UserGenderKey = 0 | 1;
const UserGenderVariant = buildVariant<UserGenderName, UserGenderKey>([
  {
    name: "FEMALE",
    key: 0,
    displayName: new MultiLocaleValue("Female", "زن"),
  },
  {
    name: "MALE",
    key: 1,
    displayName: new MultiLocaleValue("Male", "مرد"),
  },
]);
type UserAuthStepKey = 1 | 2 | 3 | 4 | 5 | 6;
type UserAuthStepName = "NAME_COUNTRY" | "BIRTH_DATE" | "GENDER" | "ATTRACTED_TO" | "PHOTO" | "COMPLETE";
const UserAuthStepVariant = buildVariant<UserAuthStepName, UserAuthStepKey>([
  {
    name: "NAME_COUNTRY",
    key: 1,
  },
  {
    name: "BIRTH_DATE",
    key: 2,
  },
  {
    name: "GENDER",
    key: 3,
  },
  {
    name: "ATTRACTED_TO",
    key: 4,
  },
  {
    name: "PHOTO",
    key: 5,
  },
  {
    name: "COMPLETE",
    key: 6,
  },
]);
type ReasonChoicesName = "CHAT" | "DATE" | "RELATIONSHIP";
type ReasonChoicesKey = 1 | 2 | 3;
const ReasonChoicesVariant = buildVariant<ReasonChoicesName, ReasonChoicesKey>([
  {
    name: "CHAT",
    key: 1,
    displayName: new MultiLocaleValue("Chat", "چت"),
  },
  {
    name: "DATE",
    key: 2,
    displayName: new MultiLocaleValue("Date", "قرار"),
  },
  {
    name: "RELATIONSHIP",
    key: 3,
    displayName: new MultiLocaleValue("Relationship", "رابطه بلند مدت"),
  },
]);

type RelationShipStatusName = "SINGLE" | "IN_RELATIONSHIP" | "ENGAGED" | "MARRIED" | "DIVORCED" | "WIDOWED" | "COMPLICATED";
type RelationShipStatusKey = 1 | 2 | 3 | 4 | 5 | 6 | 7;
const RelationShipStatusVariant = buildVariant<RelationShipStatusName, RelationShipStatusKey>([
  {
    name: "SINGLE",
    key: 1,
    displayName: new MultiLocaleValue("Single", "مجرد"),
  },
  {
    name: "IN_RELATIONSHIP",
    key: 2,
    displayName: new MultiLocaleValue("In a Relationship", "در رابطه"),
  },
  {
    name: "ENGAGED",
    key: 3,
    displayName: new MultiLocaleValue("Engaged", "نامزد"),
  },
  {
    name: "MARRIED",
    key: 4,
    displayName: new MultiLocaleValue("Married", "متأهل"),
  },
  {
    name: "DIVORCED",
    key: 5,
    displayName: new MultiLocaleValue("Divorced", "طلاق"),
  },
  {
    name: "WIDOWED",
    key: 6,
    displayName: new MultiLocaleValue("Widowed", "بیوه"),
  },
  {
    name: "COMPLICATED",
    key: 7,
    displayName: new MultiLocaleValue("Complicated", "رابطه پیچیده"),
  },
]);

type EducationChoicesName = "RATHER_NOT_SAY" | "ASSOCIATED" | "BACHELORS" | "MASTERS" | "DOCTORAL";
type EducationChoicesKey = 0 | 1 | 2 | 3 | 4;
const EducationChoicesVariant = buildVariant<EducationChoicesName, EducationChoicesKey>([
  {
    name: "RATHER_NOT_SAY",
    key: 0,
    displayName: new MultiLocaleValue("Rather not to say", "ترجیح می‌دهم چیزی نگویم"),
  },
  {
    name: "ASSOCIATED",
    key: 1,
    displayName: new MultiLocaleValue("Associate", "فوق دیپلم"),
  },
  {
    name: "BACHELORS",
    key: 2,
    displayName: new MultiLocaleValue("Bachelors", "کارشناسی"),
  },
  {
    name: "MASTERS",
    key: 3,
    displayName: new MultiLocaleValue("Masters", "کارشناسی ارشد"),
  },
  {
    name: "DOCTORAL",
    key: 4,
    displayName: new MultiLocaleValue("Doctoral", "دکترا"),
  },
]);

type DrinkingStatusName = "RATHER_NOT_SAY" | "NEVER" | "IN_PARTY" | "SOBER" | "OFTEN";
type DrinkingStatusKey = 0 | 1 | 2 | 3 | 4;
const DrinkingStatusVariant = buildVariant<DrinkingStatusName, DrinkingStatusKey>([
  {
    name: "NEVER",
    key: 1,
    displayName: new MultiLocaleValue("Never", "هرگز"),
  },
  {
    name: "IN_PARTY",
    key: 2,
    displayName: new MultiLocaleValue("In Party", "در مهمانی"),
  },
  {
    name: "SOBER",
    key: 3,
    displayName: new MultiLocaleValue("Sober", "هوشیار"),
  },
  {
    name: "OFTEN",
    key: 4,
    displayName: new MultiLocaleValue("Often", "مرتب"),
  },
  {
    name: "RATHER_NOT_SAY",
    key: 0,
    displayName: new MultiLocaleValue("Rather not to say", "ترجیح می‌دهم بیان نکنم"),
  },
]);

type SmokingStatusName = "RATHER_NOT_SAY" | "NEVER" | "SOMETIMES" | "PERMANENT";
type SmokingStatusKey = 0 | 1 | 2 | 3;
const SmokingStatusVariant = buildVariant<SmokingStatusName, SmokingStatusKey>([
  {
    name: "NEVER",
    key: 1,
    displayName: new MultiLocaleValue("Never", "هرگز"),
  },
  {
    name: "SOMETIMES",
    key: 2,
    displayName: new MultiLocaleValue("Sometimes", "گاهی اوقات"),
  },
  {
    name: "PERMANENT",
    key: 3,
    displayName: new MultiLocaleValue("Permanent", "سیگاری"),
  },
  {
    name: "RATHER_NOT_SAY",
    key: 0,
    displayName: new MultiLocaleValue("Rather Not To Say", "ترجیح می‌دهم بیان نکنم"),
  },
]);

type PetName = "NOT_HAVE" | "CAT" | "DOG" | "EXOTIC_PET" | "OTHER";
type PetKey = 0 | 1 | 2 | 3 | 4;
const PetVariant = buildVariant<PetName, PetKey>([
  {
    name: "CAT",
    key: 1,
    displayName: new MultiLocaleValue("Cat", "گربه"),
  },
  {
    name: "DOG",
    key: 2,
    displayName: new MultiLocaleValue("Dog", "سگ"),
  },
  {
    name: "EXOTIC_PET",
    key: 3,
    displayName: new MultiLocaleValue("Exotic pet", "حیوان خانگی نادر دارم"),
  },
  {
    name: "OTHER",
    key: 4,
    displayName: new MultiLocaleValue("Other", "سایر حیوانات خانگی"),
  },
  {
    name: "NOT_HAVE",
    key: 0,
    displayName: new MultiLocaleValue("No Pets", "حیوان خانگی ندارم"),
  },
]);

type ReligionName = "MUSLIM" | "CHRISTIAN" | "JEWISH" | "ATHEIST" | "SPIRITUAL" | "AGNOSTIC" | "BUDDHIST" | "CATHOLIC" | "HINDU" | "JAIN" | "MORMON" | "ZOROASTRIAN" | "SIKH" | "OTHER";
type ReligionKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
const ReligionVariant = buildVariant<ReligionName, ReligionKey>([
  {
    name: "CHRISTIAN",
    key: 2,
    displayName: new MultiLocaleValue("Christian", "مسیحی"),
  },
  {
    name: "JEWISH",
    key: 3,
    displayName: new MultiLocaleValue("Jewish", "یهودی"),
  },
  {
    name: "MUSLIM",
    key: 1,
    displayName: new MultiLocaleValue("Muslim", "مسلمان"),
  },
  {
    name: "ATHEIST",
    key: 4,
    displayName: new MultiLocaleValue("Atheist", "بی دین"),
  },
  {
    name: "SPIRITUAL",
    key: 5,
    displayName: new MultiLocaleValue("Spiritual", "معنوی"),
  },
  {
    name: "AGNOSTIC",
    key: 6,
    displayName: new MultiLocaleValue("Agnostic", "اگنستیک"),
  },
  {
    name: "BUDDHIST",
    key: 7,
    displayName: new MultiLocaleValue("Buddhist", "بودایی"),
  },
  {
    name: "CATHOLIC",
    key: 8,
    displayName: new MultiLocaleValue("Catholic", "کاتولیک"),
  },
  {
    name: "HINDU",
    key: 9,
    displayName: new MultiLocaleValue("Hindu", "هندو"),
  },
  {
    name: "JAIN",
    key: 10,
    displayName: new MultiLocaleValue("Jain", "جین"),
  },
  {
    name: "MORMON",
    key: 11,
    displayName: new MultiLocaleValue("Mormon", "مورمون"),
  },
  {
    name: "ZOROASTRIAN",
    key: 12,
    displayName: new MultiLocaleValue("Zoroastrian", "زرتشتی"),
  },
  {
    name: "SIKH",
    key: 13,
    displayName: new MultiLocaleValue("Sikh", "سیک"),
  },
  {
    name: "OTHER",
    key: 14,
    displayName: new MultiLocaleValue("Other", "سایر"),
  },
]);

// going to add !
type LustStatusName = "RATHER_NOT_SAY" | "LOW" | "MEDIUM" | "HIGH";
type LustStatusKey = 0 | 1 | 2 | 3;
const LustStatusVariant = buildVariant<LustStatusName, LustStatusKey>([
  {
    name: "RATHER_NOT_SAY",
    key: 0,
    displayName: new MultiLocaleValue("Rather not say", "ترجیح می‌دهم نگویم"),
  },
  {
    name: "LOW",
    key: 1,
    displayName: new MultiLocaleValue("Low", "کم"),
  },
  {
    name: "MEDIUM",
    key: 2,
    displayName: new MultiLocaleValue("Medium", "متوسط"),
  },
  {
    name: "HIGH",
    key: 3,
    displayName: new MultiLocaleValue("High", "زیاد"),
  },
]);

type HouseStatusName = "RATHER_NOT_SAY" | "RENT" | "PARENTS" | "SHARED" | "TEMPORARY" | "OWN";
type HouseStatusKey = 0 | 1 | 2 | 3 | 4 | 5;
const HouseStatusVariant = buildVariant<HouseStatusName, HouseStatusKey>([
  {
    name: "OWN",
    key: 5,
    displayName: new MultiLocaleValue("Owned", "صاحب مسکن شخصی"),
  },
  {
    name: "RENT",
    key: 1,
    displayName: new MultiLocaleValue("Rent", "مسکن اجاره ای"),
  },
  {
    name: "PARENTS",
    key: 2,
    displayName: new MultiLocaleValue("At Parent's Home", "مسکن والدین"),
  },
  {
    name: "SHARED",
    key: 3,
    displayName: new MultiLocaleValue("Shared", "مسکن اشتراکی"),
  },
  {
    name: "TEMPORARY",
    key: 4,
    displayName: new MultiLocaleValue("Temporary", "مسکن موقت"),
  },
  {
    name: "RATHER_NOT_SAY",
    key: 0,
    displayName: new MultiLocaleValue("Rather not to say", "ترجیح می‌دهم بیان نکنم"),
  },
]);

type HealthStatusName = "HEALTHY" | "UNHEALTHY";
type HealthStatusKey = 1 | 2;
const HealthStatusVariant = buildVariant<HealthStatusName, HealthStatusKey>([
  {
    name: "HEALTHY",
    key: 1,
    displayName: new MultiLocaleValue("Healthy", "کاملا سالم"),
  },
  {
    name: "UNHEALTHY",
    key: 2,
    displayName: new MultiLocaleValue("Unhealthy", "بیمار"),
  },
]);

type UserDisplayOsName = "ANDROID" | "IOS" | "OTHERS";
type UserDisplayOsKey = 1 | 2 | 3;
const UserDisplayOsVariant = buildVariant<UserDisplayOsName, UserDisplayOsKey>([
  {
    name: "IOS",
    key: 2,
    displayName: new MultiLocaleValue("iOS", "iOS"),
  },
  {
    name: "ANDROID",
    key: 1,
    displayName: new MultiLocaleValue("Android", "اندروید"),
  },
  {
    name: "OTHERS",
    key: 3,
    displayName: new MultiLocaleValue("Others", "سایر"),
  },
]);

type ChildSizeName = "NO_KIDS" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" | "MORE_THAN_FIVE";
type ChildSizeKey = 0 | 1 | 2 | 3 | 4 | 5 | 6;
const ChildSizeVariant = buildVariant<ChildSizeName, ChildSizeKey>([
  {
    name: "NO_KIDS",
    key: 0,
    displayName: new MultiLocaleValue("No kids", "فاقد فرزند"),
  },
  {
    name: "ONE",
    key: 1,
    displayName: new MultiLocaleValue("1 Kids", "۱ فرزند"),
  },
  {
    name: "TWO",
    key: 2,
    displayName: new MultiLocaleValue("2 Kids", "۲ فرزند"),
  },
  {
    name: "THREE",
    key: 3,
    displayName: new MultiLocaleValue("3 Kids", "۳ فرزند"),
  },
  {
    name: "FOUR",
    key: 4,
    displayName: new MultiLocaleValue("4 Kids", "۴ فرزند"),
  },
  {
    name: "FIVE",
    key: 5,
    displayName: new MultiLocaleValue("5 Kids", "۵ فرزند"),
  },
  {
    name: "MORE_THAN_FIVE",
    key: 6,
    displayName: new MultiLocaleValue("More than 5 Kids", "بیشتر از ۵ فرزند"),
  },
]);

type BlueBadgeStatusName = "INTRO" | "TIPS" | "CAMERA" | "PENDING" | "CONFIRMED" | "REJECTED";
const BlueBadgeStatusVariant = buildVariant<BlueBadgeStatusName, BlueBadgeStatusName>(
  [
    {
      name: "INTRO",
      key: "INTRO",
    },
    {
      name: "TIPS",
      key: "TIPS",
    },
    {
      name: "CAMERA",
      key: "CAMERA",
    },
    {
      name: "PENDING",
      key: "PENDING",
    },
    {
      name: "CONFIRMED",
      key: "CONFIRMED",
    },
    {
      name: "REJECTED",
      key: "REJECTED",
    },
  ],
  { sameAsKey: true },
);
export type {
  ReasonChoicesName,
  ReasonChoicesKey,
  RelationShipStatusName,
  RelationShipStatusKey,
  EducationChoicesName,
  EducationChoicesKey,
  DrinkingStatusName,
  DrinkingStatusKey,
  SmokingStatusName,
  SmokingStatusKey,
  PetName,
  PetKey,
  ReligionName,
  ReligionKey,
  LustStatusName,
  LustStatusKey,
  HouseStatusName,
  HouseStatusKey,
  HealthStatusName,
  HealthStatusKey,
  UserOsKey,
  UserLangKey,
  UserGenderKey,
  UserOsName,
  UserLangName,
  UserGenderName,
  UserAuthStepKey,
  UserAuthStepName,
  UserDisplayOsKey,
  UserDisplayOsName,
  ChildSizeKey,
  ChildSizeName,
  BlueBadgeStatusName,
};
export {
  UserOsVariant,
  UserLangVariant,
  UserGenderVariant,
  UserAuthStepVariant,
  ReasonChoicesVariant,
  RelationShipStatusVariant,
  EducationChoicesVariant,
  DrinkingStatusVariant,
  SmokingStatusVariant,
  PetVariant,
  ReligionVariant,
  LustStatusVariant,
  HouseStatusVariant,
  HealthStatusVariant,
  UserDisplayOsVariant,
  ChildSizeVariant,
  BlueBadgeStatusVariant,
};
