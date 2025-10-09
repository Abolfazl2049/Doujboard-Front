import { Car, City, Country, Interest, Job, Language, State } from "~/core/@services/public/model";
import { Variant } from "#imports";
import {
  BlueBadgeStatusVariant,
  ChildSizeVariant,
  DrinkingStatusVariant,
  EducationChoicesVariant,
  HealthStatusVariant,
  HouseStatusVariant,
  PetVariant,
  ReasonChoicesVariant,
  RelationShipStatusVariant,
  ReligionVariant,
  SmokingStatusVariant,
  UserAuthStepVariant,
  UserDisplayOsVariant,
  UserGenderVariant,
  UserLangVariant,
  UserOsVariant,
  type BlueBadgeStatusName,
  type ChildSizeKey,
  type ChildSizeName,
  type DrinkingStatusKey,
  type DrinkingStatusName,
  type EducationChoicesKey,
  type EducationChoicesName,
  type HealthStatusKey,
  type HealthStatusName,
  type HouseStatusKey,
  type HouseStatusName,
  type PetKey,
  type PetName,
  type ReasonChoicesKey,
  type ReasonChoicesName,
  type RelationShipStatusKey,
  type RelationShipStatusName,
  type ReligionKey,
  type ReligionName,
  type SmokingStatusKey,
  type SmokingStatusName,
  type UserAuthStepName,
  type UserDisplayOsKey,
  type UserDisplayOsName,
  type UserGenderKey,
  type UserGenderName,
  type UserLangKey,
  type UserLangName,
  type UserOsKey,
  type UserOsName,
} from "~/core/@services/user/variant";
import type { ApiUserModel } from "~/core/@services/user/types";
import DeviceDetector, { type DeviceDetectorResult } from "device-detector-js";
import moment from "moment";

class User {
  id: number;
  username: string;
  email: string;
  name: string;
  isGenderEdited: boolean = false;
  gender: Variant<UserGenderName, UserGenderKey> | null = null;
  uniqueId: string;
  defaultLanguage?: Variant<UserLangName, UserLangKey>;

  state?: State;
  country?: Country;
  isCountryEdited: boolean = false;
  fcmToken?: string;
  device?: DeviceDetectorResult;
  isPaused: boolean = false;
  isHidden: boolean = false;
  additionalInfo: UserAdditionalInfo;
  os?: Variant<UserOsName, UserOsKey>;
  blueBadgeStatus?: Variant<BlueBadgeStatusName, BlueBadgeStatusName>;

  // images
  images: UserProfileImage[] = [];
  primaryImage: UserProfileImage | null = null;

  constructor(init: ApiUserModel) {
    this.id = init.id;
    this.username = init.username;
    this.email = init.email;
    this.name = init.first_name;
    this.uniqueId = init.profile?.unique_id || "";
    this.fcmToken = init.profile?.web_fcm_token;
    this.device = new DeviceDetector().parse(navigator.userAgent);
    this.os = UserOsVariant["WEB"];
    this.isPaused = init.profile?.pause_account || false;
    this.isHidden = init.profile?.hide_account || false;

    this.defaultLanguage = UserLangVariant[useNuxtApp()?.$i18n.locale.value];
    if (typeof init.profile.gender === "number") this.gender = UserGenderVariant[init.profile?.gender];

    this.isGenderEdited = init.profile?.gender_edited || false;
    this.isCountryEdited = init.profile?.country_edited || false;
    if (typeof init.profile.operating_system === "number") this.os = UserOsVariant[init.profile.operating_system];
    if (init.profile.country) this.country = new Country(init.profile.country);

    if (init.is_blue_badge_under_review) this.blueBadgeStatus = BlueBadgeStatusVariant.PENDING;

    // images assign
    this.setImages(init.profile_image);

    // additional info
    this.additionalInfo = new UserAdditionalInfo(init.side_profile || {});
  }

  setImages(images: ApiUserModel["profile_image"]) {
    this.images = [];
    for (const img of images || []) {
      this.images.push(new UserProfileImage(img));
      if (img.is_primary) {
        this.primaryImage = new UserProfileImage(img);
      }
    }
    if (!this.primaryImage && images[0]) this.primaryImage = new UserProfileImage(images[0]);
  }
  imagesExceptPrimary() {
    return this.images.filter((img) => !img.isPrimary);
  }

  get hasBlueBadge() {
    return this.primaryImage?.isVerified;
    // return true;
  }
  get age() {
    if (this.additionalInfo.birthDate) return moment().diff(moment(this.additionalInfo.birthDate), "years");
  }
}

class UserAdditionalInfo {
  birthDate?: string;
  isBirthDateEdited: boolean = false;
  height?: number;
  weight?: number;
  religion?: Variant<ReligionName, ReligionKey>;
  drinking?: Variant<DrinkingStatusName, DrinkingStatusKey>;
  smoking?: Variant<SmokingStatusName, SmokingStatusKey>;
  childSize?: Variant<ChildSizeName, ChildSizeKey>;
  reason?: Variant<ReasonChoicesName, ReasonChoicesKey>;
  attractedTo?: Variant<UserGenderName, UserGenderKey>;
  isAttractedToEdited: boolean = false;
  lust?: string;
  health?: Variant<HealthStatusName, HealthStatusKey>;
  house?: Variant<HouseStatusName, HouseStatusKey>;
  education?: Variant<EducationChoicesName, EducationChoicesKey>;
  bio?: string;
  languages?: Language[];
  car?: Car;
  interests?: Interest[];
  job?: Job;
  ethnicity?: Country;
  relationshipStatus?: Variant<RelationShipStatusName, RelationShipStatusKey>;
  pet?: Variant<PetName, PetKey>;
  os?: Variant<UserDisplayOsName, UserDisplayOsKey>;
  isEthnicityEdited: boolean = false;
  constructor(init: ApiUserModel["side_profile"]) {
    this.birthDate = init.birth_date;
    this.isBirthDateEdited = init.birth_date_edited || false;
    if (init.health) this.height = init.height;
    if (init.weight) this.weight = init.weight;
    if (typeof init.religion === "number") this.religion = ReligionVariant[init.religion];
    if (typeof init.drinking === "number") this.drinking = DrinkingStatusVariant[init.drinking];
    if (typeof init.smoking === "number") this.smoking = SmokingStatusVariant[init.smoking];
    if (typeof init.child_size === "number") this.childSize = ChildSizeVariant[init.child_size];
    if (typeof init.reason === "number") this.reason = ReasonChoicesVariant[init.reason];
    if (typeof init.attracted_to === "number") this.attractedTo = UserGenderVariant[init.attracted_to];
    this.isAttractedToEdited = init.attracted_to_edited || false;
    if (typeof init.health === "number") this.health = HealthStatusVariant[init.health];
    if (typeof init.house === "number") this.house = HouseStatusVariant[init.house];
    if (typeof init.operating_system === "number") this.os = UserDisplayOsVariant[init.operating_system];
    if (typeof init.education === "number") this.education = EducationChoicesVariant[init.education];
    this.bio = init.bio;
    if (init.languages) this.languages = init.languages.map((lang) => new Language(lang));
    if (init.car) this.car = new Car(init.car);
    if (init.interests) this.interests = init.interests.map((interest) => new Interest(interest));
    if (init.job) this.job = new Job(init.job);
    if (typeof init.relationship === "number") this.relationshipStatus = RelationShipStatusVariant[init.relationship];
    if (init.pet) this.pet = PetVariant[init.pet];
    this.lust = init.lust;
    if (init.ethnicity) this.ethnicity = new Country(init.ethnicity);
  }
}

class UserProfileImage {
  src: string;
  isPrimary?: boolean;
  isVerified?: boolean;
  order?: number;
  id?: number;
  constructor(init: Record<string, any>) {
    this.isVerified = init.is_verified;
    this.order = init.order;
    this.isPrimary = init.is_primary;
    this.src = init.image;
    this.id = init.id;
  }
}

export { User, UserProfileImage, UserAdditionalInfo };
