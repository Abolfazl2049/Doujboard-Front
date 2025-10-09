import type { App, Component } from "vue";
import type { TopNavVariant } from "../types/layout";

class AppRoute {
  path: string | RegExp;
  name: keyof typeof AppRouteName;
  section: AppSection;
  options: {
    isPublic: boolean;
    shouldGetAuthenticated: boolean;
    bottomNav: { show: boolean };
    topNav: { variant?: TopNavVariant };
    backPathFallback?: string;
  };

  constructor(path: string | RegExp, name: keyof typeof AppRouteName, section: AppSection, options: Partial<AppRoute["options"]> = {}) {
    this.path = path;
    this.name = name;
    this.section = section;
    const { isPublic = false, shouldGetAuthenticated = true, backPathFallback, bottomNav = { show: false }, topNav = { variant: "DEFAULT" } } = options;
    this.options = {
      isPublic,
      shouldGetAuthenticated,
      backPathFallback,
      bottomNav,
      topNav,
    };
  }
}

enum AppSectionName {
  AUTH = "auth",
  HOME = "home",
  USER = "user",
  PUBLIC = "public",
  SETTINGS = "settings",
  ACCOUNT = "account",
  SUPPORT = "support",
  CHAT = "chat",
  SHOP = "shop",
  NOTIFICATION = "notification",
}
enum AppRouteName {
  INTRO = "intro",
  AUTH_SELECT_LANGUAGE = "auth-select-language",
  AUTH_SIGN_UP = "auth-sign-up",
  AUTH_SEND_OTP = "auth-send-otp",
  AUTH_REFERRAL_CODE = "auth-referral-code",
  AUTH_VERIFY_OTP = "auth-verify-otp",
  AUTH_NAME_COUNTRY = "auth-name-country",
  AUTH_BIRTH_DATE = "auth-birth-date",
  AUTH_GENDER = "auth-gender",
  AUTH_ATTRACTED_TO = "auth-attracted-to",
  AUTH_PHOTO = "auth-photo",
  AUTH_LOCATION = "auth-location",
  AUTH_SIGN_IN = "auth-sign-in",
  AUTH_EMAIL_SIGN_IN = "auth-email-sign-in",
  AUTH_FORGOT_PASSWORD = "auth-forgot-password",
  HOME = "home",
  NEARBY = "nearby",
  SETTINGS = "settings",
  SETTINGS_LANGUAGE = "settings-language",
  OUR_APPS = "our-apps",
  SETTINGS_THEME = "settings-theme",
  PRIVACY = "privacy",
  TERMS = "terms",
  ABOUT_US = "about-us",
  FAQ = "faq",
  ACCOUNT_PROFILE = "profile",
  ACCOUNT_SELFIE = "selfie",
  ACCOUNT_EDIT_PROFILE = "edit-profile",
  ACCOUNT_WALLET = "wallet",
  ACCOUNT_TRANSACTION = "transaction",
  ACCOUNT_GIFT_CODE = "gift-code",
  ACCOUNT_FRIENDS = "friends",
  ACCOUNT_BLUE_BADGE_VERIFICATION = "verification",
  ACCOUNT_DELETE_ACCOUNT = "account-delete-account",
  ACCOUNT_REACTIVE_ACCOUNT = "account-reactive-account",
  ACCOUNT_MANAGE_STATUS = "account-manage-status",
  ACCOUNT_CHANGE_PASSWORD = "account-change-password",
  ACCOUNT_ACTIVITY = "account-activity",
  SUPPORT_HOME = "support-home",
  SUPPORT_NEW_TICKET = "support-new-ticket",
  SUPPORT_TICKET_CHAT = "support-ticket-chat",
  CHAT_HOME = "chat-home",
  SHOP_HOME = "shop-home",
  NOTIFICATION_HOME = "notification-home",
  USER_PROFILE = "user-profile",
  SWIPE_FILTERS = "swipe-filters",
}

class AppSection {
  name: keyof typeof AppSectionName;
  icon?: Component;
  constructor(name: keyof typeof AppSectionName, icon?: Component) {
    this.name = name;
    this.icon = icon;
  }
}
class RouteRegistryClass {
  sections: Record<keyof typeof AppSectionName, AppSection> = {
    HOME: new AppSection("HOME"),
    AUTH: new AppSection("AUTH"),
    USER: new AppSection("USER"),
    SETTINGS: new AppSection("SETTINGS"),
    PUBLIC: new AppSection("PUBLIC"),
    ACCOUNT: new AppSection("ACCOUNT"),
    SUPPORT: new AppSection("SUPPORT"),
    CHAT: new AppSection("CHAT"),
    SHOP: new AppSection("SHOP"),
    NOTIFICATION: new AppSection("NOTIFICATION"),
  };
  routes: Record<keyof typeof AppRouteName, AppRoute> = {
    // auth
    AUTH_SELECT_LANGUAGE: new AppRoute("/auth/select-language", "AUTH_SELECT_LANGUAGE", this.sections.AUTH, { isPublic: true }),
    AUTH_SIGN_UP: new AppRoute("/auth/sign-up", "AUTH_SIGN_UP", this.sections.AUTH, { isPublic: true }),
    AUTH_SEND_OTP: new AppRoute("/auth/send-otp", "AUTH_SEND_OTP", this.sections.AUTH, { isPublic: true }),
    AUTH_REFERRAL_CODE: new AppRoute("/auth/referral-code", "AUTH_REFERRAL_CODE", this.sections.AUTH, { isPublic: true }),
    AUTH_VERIFY_OTP: new AppRoute("/auth/verify-otp", "AUTH_VERIFY_OTP", this.sections.AUTH, { isPublic: true }),
    AUTH_NAME_COUNTRY: new AppRoute("/auth/name-country", "AUTH_NAME_COUNTRY", this.sections.AUTH),
    AUTH_BIRTH_DATE: new AppRoute("/auth/birth-date", "AUTH_BIRTH_DATE", this.sections.AUTH),
    AUTH_GENDER: new AppRoute("/auth/gender", "AUTH_GENDER", this.sections.AUTH),
    AUTH_ATTRACTED_TO: new AppRoute("/auth/attracted-to", "AUTH_ATTRACTED_TO", this.sections.AUTH),
    AUTH_PHOTO: new AppRoute("/auth/photo", "AUTH_PHOTO", this.sections.AUTH),
    AUTH_LOCATION: new AppRoute("/auth/location", "AUTH_LOCATION", this.sections.AUTH),
    AUTH_SIGN_IN: new AppRoute("/auth/sign-in", "AUTH_SIGN_IN", this.sections.AUTH, { isPublic: true }),
    AUTH_EMAIL_SIGN_IN: new AppRoute("/auth/email-sign-in", "AUTH_EMAIL_SIGN_IN", this.sections.AUTH, { isPublic: true }),
    AUTH_FORGOT_PASSWORD: new AppRoute("/auth/forgot-password", "AUTH_FORGOT_PASSWORD", this.sections.AUTH, { isPublic: true }),

    // settings
    SETTINGS: new AppRoute("/settings", "SETTINGS", this.sections.SETTINGS, { backPathFallback: "/", bottomNav: { show: true } }),
    SETTINGS_LANGUAGE: new AppRoute("/settings/language", "SETTINGS_LANGUAGE", this.sections.SETTINGS, { backPathFallback: "/settings" }),
    SETTINGS_THEME: new AppRoute("/settings/theme", "SETTINGS_THEME", this.sections.SETTINGS, { backPathFallback: "/settings" }),

    // public
    INTRO: new AppRoute("/intro", "INTRO", this.sections.PUBLIC, { isPublic: true }),
    PRIVACY: new AppRoute("/privacy", "PRIVACY", this.sections.PUBLIC, { backPathFallback: "/settings" }),
    TERMS: new AppRoute("/terms", "TERMS", this.sections.PUBLIC, { backPathFallback: "/settings" }),
    ABOUT_US: new AppRoute("/about", "ABOUT_US", this.sections.PUBLIC, { backPathFallback: "/settings" }),
    FAQ: new AppRoute("/faq", "FAQ", this.sections.PUBLIC, { backPathFallback: "/account/profile" }),
    OUR_APPS: new AppRoute("/our-apps", "OUR_APPS", this.sections.PUBLIC, { backPathFallback: "/settings" }),

    // account
    ACCOUNT_PROFILE: new AppRoute("/account/profile", "ACCOUNT_PROFILE", this.sections.ACCOUNT, { backPathFallback: "/", bottomNav: { show: true } }),
    // ACCOUNT_SELFIE: new AppRoute("/account/selfie", "ACCOUNT_SELFIE", this.sections.ACCOUNT, { backPathFallback: "/account/profile" }),
    ACCOUNT_EDIT_PROFILE: new AppRoute("/account/edit-profile", "ACCOUNT_EDIT_PROFILE", this.sections.ACCOUNT, { backPathFallback: "/account/profile" }),
    ACCOUNT_WALLET: new AppRoute("/account/wallet", "ACCOUNT_WALLET", this.sections.ACCOUNT, { backPathFallback: "/account/profile", topNav: { variant: "WALLET" } }),
    ACCOUNT_TRANSACTION: new AppRoute("/account/transaction", "ACCOUNT_TRANSACTION", this.sections.ACCOUNT, { backPathFallback: "/account/profile" }),
    ACCOUNT_GIFT_CODE: new AppRoute("/account/gift-code", "ACCOUNT_GIFT_CODE", this.sections.ACCOUNT, { backPathFallback: "/account/profile" }),
    ACCOUNT_FRIENDS: new AppRoute("/account/friends", "ACCOUNT_FRIENDS", this.sections.ACCOUNT, { backPathFallback: "/account/profile" }),
    ACCOUNT_BLUE_BADGE_VERIFICATION: new AppRoute("/account/blue-badge-verification", "ACCOUNT_BLUE_BADGE_VERIFICATION", this.sections.ACCOUNT, {
      backPathFallback: "/account/profile",
      topNav: { variant: "TRANSPARENT" },
    }),
    ACCOUNT_DELETE_ACCOUNT: new AppRoute("/account/delete-account", "ACCOUNT_DELETE_ACCOUNT", this.sections.ACCOUNT, { backPathFallback: "/account/profile" }),
    ACCOUNT_MANAGE_STATUS: new AppRoute("/account/manage-status", "ACCOUNT_MANAGE_STATUS", this.sections.ACCOUNT, { backPathFallback: "/settings" }),
    ACCOUNT_REACTIVE_ACCOUNT: new AppRoute("/account/reactive-account", "ACCOUNT_REACTIVE_ACCOUNT", this.sections.ACCOUNT, { backPathFallback: "/account/profile" }),
    ACCOUNT_CHANGE_PASSWORD: new AppRoute("/account/change-password", "ACCOUNT_CHANGE_PASSWORD", this.sections.ACCOUNT, { backPathFallback: "/account/profile" }),
    ACCOUNT_ACTIVITY: new AppRoute("/account/activity", "ACCOUNT_ACTIVITY", this.sections.ACCOUNT, { backPathFallback: "/account/profile" }),
    ACCOUNT_SELFIE: new AppRoute("/account/selfie", "ACCOUNT_SELFIE", this.sections.ACCOUNT, { backPathFallback: "/account/profile" }),

    // home
    HOME: new AppRoute("/", "HOME", this.sections.HOME, {
      bottomNav: { show: true },
      topNav: { variant: "HOME" },
    }),
    NEARBY: new AppRoute("/nearby", "NEARBY", this.sections.HOME, { backPathFallback: "/" }),
    SWIPE_FILTERS: new AppRoute("/swipe-filters", "SWIPE_FILTERS", this.sections.HOME, { backPathFallback: "/" }),
    // support
    SUPPORT_HOME: new AppRoute("/support", "SUPPORT_HOME", this.sections.SUPPORT, { backPathFallback: "/" }),
    SUPPORT_NEW_TICKET: new AppRoute("/support/new-ticket", "SUPPORT_NEW_TICKET", this.sections.SUPPORT, { backPathFallback: "/support" }),
    SUPPORT_TICKET_CHAT: new AppRoute("/support/ticket-chat", "SUPPORT_TICKET_CHAT", this.sections.SUPPORT, { backPathFallback: "/support", topNav: { variant: "TICKET_CHAT" } }),

    // chat
    CHAT_HOME: new AppRoute("/chat", "CHAT_HOME", this.sections.CHAT, { backPathFallback: "/", bottomNav: { show: true } }),

    // shop
    SHOP_HOME: new AppRoute("/shop", "SHOP_HOME", this.sections.SHOP, { backPathFallback: "/" }),

    // notification
    NOTIFICATION_HOME: new AppRoute("/notification", "NOTIFICATION_HOME", this.sections.NOTIFICATION, { backPathFallback: "/" }),

    // user
    USER_PROFILE: new AppRoute(/^\/user\/[^/]+\/profile$/, "USER_PROFILE", this.sections.USER, { backPathFallback: "/", topNav: { variant: "USER_PROFILE" } }),
  };

  routesArray: AppRoute[] = Object.values(this.routes);

  findRouteByName(name: keyof typeof AppRouteName): AppRoute {
    return this.routes[name];
  }
  findRouteByPath(path: string): AppRoute | undefined {
    let formattedPath = removeRouteLocaleParams(path);
    return this.routesArray.find((route) => route.path === formattedPath || (route.path instanceof RegExp && route.path.test(formattedPath)));
  }
}

const RouteRegistry = new RouteRegistryClass();

export { RouteRegistry };
export type { AppSection, AppRoute, AppRouteName };
