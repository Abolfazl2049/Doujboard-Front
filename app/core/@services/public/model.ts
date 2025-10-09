class PublicModel {
  id: number;
  name: string;
  constructor(init: Record<string, any>) {
    this.id = init.id;
    this.name = init.name;
  }
}
class Country extends PublicModel {
  code: string;
  flag: string;
  svgFlag: string;
  hasStates: boolean;
  constructor(init: Record<string, any>) {
    super(init);
    this.id = init.id;
    this.name = init.name;
    this.code = init.code;
    this.flag = init.flag_png;
    this.svgFlag = init.flag_svg;
    this.hasStates = init.has_states;
  }
}
class City extends PublicModel {
  state: State;
  constructor(init: Record<string, any>) {
    super(init);
    this.id = init.id;
    this.name = init.name;
    this.state = new State(init.state);
  }
}

class State extends PublicModel {
  country: Country;
  constructor(init: Record<string, any>) {
    super(init);
    this.country = new Country(init.country);
  }
}
class Job extends PublicModel {
  constructor(init: Record<string, any>) {
    super(init);
  }
}
class Interest extends PublicModel {
  constructor(init: Record<string, any>) {
    super(init);
  }
}
class Language extends PublicModel {
  constructor(init: Record<string, any>) {
    super(init);
  }
}

class Car extends PublicModel {
  constructor(init: Record<string, any>) {
    super(init);
  }
}
class OurApplication {
  id: number;
  image: string;
  link: string;
  name: string;
  nameFa: string;
  nameEn: string;
  description: string;
  descriptionFa: string;
  descriptionEn: string;
  order_number: number;
  created_at: string;
  updated_at: string;
  constructor(init: Record<string, any>) {
    this.id = init.id;
    this.image = init.image;
    this.link = init.link;
    this.name = init.name;
    this.nameFa = init.name_fa;
    this.nameEn = init.name_en;
    this.description = init.description;
    this.descriptionFa = init.description_fa;
    this.descriptionEn = init.description_en;
    this.order_number = init.order_number;
    this.created_at = init.created_at;
    this.updated_at = init.updated_at;
  }
}
class Settings {
  id: number;
  created_at: string;
  updated_at: string;
  version: number;
  aboutUs: string;
  aboutUsFa: string;
  aboutUsEn: string;
  privacy: string;
  privacyFa: string;
  privacyEn: string;
  terms: string;
  termsFa: string;
  termsEn: string;
  email: string;
  whatsapp: string;
  messenger: string;
  referralBonus: number;
  privacyUrl: string;
  termsAndConditionUrl: string;
  playStoreUrl: string;
  appStoreUrl: string;
  underRepair: boolean;
  updateList: string;
  updateListFa: string;
  updateListEn: string;
  shareText: string;
  shareTextFa: string;
  shareTextEn: string;
  prizesWon: number;
  givenPrizes: number;
  telegram: string = "https://t.me/yourchannel";
  Instagram: string = "https://www.instagram.com/yourprofile";
  constructor(init: Record<string, any>) {
    this.id = init.id;
    this.created_at = init.created_at;
    this.updated_at = init.updated_at;
    this.version = init.version;
    this.aboutUs = init.about_us;
    this.aboutUsFa = init.about_us_fa;
    this.aboutUsEn = init.about_us_en;
    this.privacy = init.privacy;
    this.privacyFa = init.privacy_fa;
    this.privacyEn = init.privacy_en;
    this.terms = init.terms;
    this.termsFa = init.terms_fa;
    this.termsEn = init.terms_en;
    this.email = init.email;
    this.whatsapp = init.whatsapp;
    this.messenger = init.messenger;
    this.referralBonus = init.referral_bonus;
    this.privacyUrl = init.privacy_url;
    this.termsAndConditionUrl = init.terms_and_condition_url;
    this.playStoreUrl = init.play_store_url;
    this.appStoreUrl = init.app_store_url;
    this.underRepair = init.under_repair;
    this.updateList = init.update_list;
    this.updateListFa = init.update_list_fa;
    this.updateListEn = init.update_list_en;
    this.shareText = init.share_text;
    this.shareTextFa = init.share_text_fa;
    this.shareTextEn = init.share_text_en;
    this.prizesWon = init.prizes_won;
    this.givenPrizes = init.given_prizes;
  }
}
class Faq {
  id: number;
  answer: string;
  answer_en: string;
  answer_fa: string;
  question: string;
  question_en: string;
  question_fa: string;
  created_at: string;
  updated_at: string;

  constructor(init: Record<string, any>) {
    this.id = init.id;
    this.answer = init.answer;
    this.answer_en = init.answer_en;
    this.answer_fa = init.answer_fa;
    this.question = init.question;
    this.question_en = init.question_en;
    this.question_fa = init.question_fa;
    this.created_at = init.created_at;
    this.updated_at = init.updated_at;
  }
}

export { Country, OurApplication, Settings, City, State, Faq, Job, Interest, Language, PublicModel, Car };
