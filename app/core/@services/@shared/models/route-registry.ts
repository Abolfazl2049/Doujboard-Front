import {
  LayoutISidebarActiveAdmin,
  LayoutISidebarActiveAdvertisements,
  LayoutISidebarActiveDashboard,
  LayoutISidebarActiveGallery,
  LayoutISidebarActiveManagements,
  LayoutISidebarActiveMessage,
  LayoutISidebarActiveReport,
  LayoutISidebarActiveSettings,
  LayoutISidebarActiveShop,
  LayoutISidebarActiveTickets,
  LayoutISidebarActiveUsers,
  LayoutISidebarActiveVerification,
  LayoutISidebarAdmins,
  LayoutISidebarAdvertisements,
  LayoutISidebarDashboard,
  LayoutISidebarGallery,
  LayoutISidebarManagements,
  LayoutISidebarMessage,
  LayoutISidebarReports,
  LayoutISidebarSettings,
  LayoutISidebarShop,
  LayoutISidebarTickets,
  LayoutISidebarUsers,
  LayoutISidebarVerification,
} from "#components";
import type { Component } from "vue";

class AppRoute {
  path: string | RegExp;
  name: keyof typeof AppRouteName;
  section: AppSection;
  displayName: string;
  options: {
    isPublic: boolean;
    backPathFallback?: string;
  };

  constructor(
    path: string | RegExp,
    name: keyof typeof AppRouteName,
    section: AppSection,
    displayName: string,
    options: Partial<AppRoute["options"]> = {},
  ) {
    this.path = path;
    this.name = name;
    this.displayName = displayName;
    this.section = section;
    const { isPublic = false, backPathFallback } = options;
    this.options = {
      isPublic,
      backPathFallback,
    };
  }
}

export enum AppSectionName {
  AUTH,
  HOME,
  USER,
  VERIFICATION,
  GALLERY,
  ISSUES,
  TICKET,
  MESSAGE,
  MANAGEMENT,
  ADMIN,
  AD,
  SHOP,
  PROFILE,
  // BLOG ,
  // ANALYTICS ,
  // SYSTEM_LOG ,
  SETTINGS,
}
enum AppRouteName {
  // auth
  AUTH_SIGNIN,
  AUTH_VERIFY_OTP,

  // home
  HOME,

  // user
  USER_HOME,
  USER_DIRECTORY,
  USER_SUSPENDS,
  USER_WATCH_LIST,
  USER_DETAILS,

  // issues
  ISSUES_HOME,
  ISSUES_REPORTS,
  ISSUES_SETTINGS,
  ISSUES_FLAGS,

  // admin
  ADMIN_HOME,
  ADMIN_DIRECTORY,
  ADMIN_ROLES,
  ADMIN_ACTION_HISTORY,

  // profile
  PROFILE,

  // gallery
  GALLERY_HOME,

  // ticket
  TICKET_HOME,
  TICKET_CHAT,

  // message
  MESSAGE_HOME,
  MESSAGE_NOTIFICATION,
  MESSAGE_NEWS,
  MESSAGE_EMAIL_CAMPAIGN,
  MESSAGE_TEMPLATE,
  MESSAGE_SYSTEM,

  // management
  MANAGEMENT_HOME,
  MANAGEMENT_CARS,
  MANAGEMENT_JOBS,
  MANAGEMENT_INTERESTS,
  MANAGEMENT_STATES,
  MANAGEMENT_COUNTRIES,
  MANAGEMENT_AVATARS,
  MANAGEMENT_OUR_APPLICATIONS,
  MANAGEMENT_GIFT_CODE,
  MANAGEMENT_REWARD,
  MANAGEMENT_SOCIAL_MEDIA,
  MANAGEMENT_MISSION,
  MANAGEMENT_EVENT_FREE_COIN,
  MANAGEMENT_FILTER,
  MANAGEMENT_DAILY_REWARD,
  MANAGEMENT_ROBOT,

  // advertisement
  AD_HOME,
  AD_CREATE,
  AD_EDIT,
  // shop
  SHOP_HOME,

  // VERIFICATION
  VERIFICATION_HOME,
  VERIFICATION_REQUEST,
  VERIFICATION_HISTORY,
  VERIFICATION_POSE,
  VERIFICATION_REQUEST_DETAIL,

  // SETTINGS
  SETTINGS_HOME,
  SETTINGS_PRIVACY,
  SETTINGS_SAFETY,
  SETTINGS_FAQ,
  SETTINGS_EXPORT_BACKUP,
  SETTINGS_DOWNLOAD_LINKS,
  SETTINGS_ABOUT,
  SETTINGS_APP_UPDATE,
  SETTINGS_MAINTENANCE_MODE,
  SETTINGS_LOGO,
  SETTINGS_SOCIAL_MEDIA,
  SETTINGS_IN_REVIEW_MODE,
  SETTINGS_EXPORT_EMAILS,
}

class AppSection {
  name: keyof typeof AppSectionName;
  icon?: Component;
  activeIcon?: Component;
  homePath?: keyof typeof AppRouteName;
  displayName?: string;

  constructor(
    name: keyof typeof AppSectionName,
    options?: { icon?: Component; homePath: keyof typeof AppRouteName; displayName?: string; activeIcon?: Component },
  ) {
    this.name = name;
    this.icon = options?.icon;
    this.activeIcon = options?.activeIcon;
    this.homePath = options?.homePath;
    this.displayName = options?.displayName;
  }
  get homePageRoute(): AppRoute | undefined {
    if (this.homePath) return RouteRegistry.findRouteByName(this.homePath);
  }
}
class RouteRegistryClass {
  sections: Record<keyof typeof AppSectionName, AppSection> = {
    AUTH: new AppSection("AUTH"),

    HOME: new AppSection("HOME", {
      icon: LayoutISidebarDashboard,
      activeIcon: LayoutISidebarActiveDashboard,
      homePath: "HOME",
      displayName: "Dashboard",
    }),

    USER: new AppSection("USER", {
      homePath: "USER_HOME",
      icon: LayoutISidebarUsers,
      displayName: "Users",
      activeIcon: LayoutISidebarActiveUsers,
    }),

    VERIFICATION: new AppSection("VERIFICATION", {
      homePath: "VERIFICATION_HOME",
      icon: LayoutISidebarVerification,
      displayName: "Verification",
      activeIcon: LayoutISidebarActiveVerification,
    }),

    GALLERY: new AppSection("GALLERY", {
      homePath: "GALLERY_HOME",
      icon: LayoutISidebarGallery,
      displayName: "Gallery",
      activeIcon: LayoutISidebarActiveGallery,
    }),

    ISSUES: new AppSection("ISSUES", {
      homePath: "ISSUES_HOME",
      icon: LayoutISidebarReports,
      displayName: "Reports & Flags",
      activeIcon: LayoutISidebarActiveReport,
    }),

    TICKET: new AppSection("TICKET", {
      homePath: "TICKET_HOME",
      icon: LayoutISidebarTickets,
      displayName: "Tickets",
      activeIcon: LayoutISidebarActiveTickets,
    }),

    MANAGEMENT: new AppSection("MANAGEMENT", {
      homePath: "MANAGEMENT_HOME",
      icon: LayoutISidebarManagements,
      displayName: "Managements",
      activeIcon: LayoutISidebarActiveManagements,
    }),

    ADMIN: new AppSection("ADMIN", {
      homePath: "ADMIN_HOME",
      icon: LayoutISidebarAdmins,
      displayName: "Admins",
      activeIcon: LayoutISidebarActiveAdmin,
    }),

    PROFILE: new AppSection("PROFILE"),

    SETTINGS: new AppSection("SETTINGS", {
      homePath: "SETTINGS_HOME",
      icon: LayoutISidebarSettings,
      displayName: "Settings",
      activeIcon: LayoutISidebarActiveSettings,
    }),

    MESSAGE: new AppSection("MESSAGE", {
      homePath: "MESSAGE_HOME",
      icon: LayoutISidebarMessage,
      displayName: "Messages",
      activeIcon: LayoutISidebarActiveMessage,
    }),

    AD: new AppSection("AD", {
      homePath: "AD_HOME",
      icon: LayoutISidebarAdvertisements,
      displayName: "Advertisements",
      activeIcon: LayoutISidebarActiveAdvertisements,
    }),

    SHOP: new AppSection("SHOP", {
      homePath: "SHOP_HOME",
      icon: LayoutISidebarShop,
      displayName: "Shop",
      activeIcon: LayoutISidebarActiveShop,
    }),
  };
  routes: Record<keyof typeof AppRouteName, AppRoute> = {
    // auth
    AUTH_SIGNIN: new AppRoute("/auth/signin", "AUTH_SIGNIN", this.sections.AUTH, "Sign In", { isPublic: true }),
    AUTH_VERIFY_OTP: new AppRoute("/auth/verify-otp", "AUTH_VERIFY_OTP", this.sections.AUTH, "Verify OTP", {
      isPublic: true,
    }),

    // home
    HOME: new AppRoute("/", "HOME", this.sections.HOME, "Home"),

    // user
    USER_HOME: new AppRoute("/user", "USER_HOME", this.sections.USER, "Users"),
    USER_DIRECTORY: new AppRoute("/user/directory", "USER_DIRECTORY", this.sections.USER, "User List", {
      backPathFallback: "/user",
    }),
    USER_SUSPENDS: new AppRoute("/user/suspends", "USER_SUSPENDS", this.sections.USER, "Suspended Users", {
      backPathFallback: "/user",
    }),
    USER_WATCH_LIST: new AppRoute("/user/watch-list", "USER_WATCH_LIST", this.sections.USER, "Watch List", {
      backPathFallback: "/user",
    }),
    USER_DETAILS: new AppRoute(/^\/user\/[^/]+\/detail$/, "USER_DETAILS", this.sections.USER, "User Details", {
      backPathFallback: "/user/directory",
    }),

    // issues
    ISSUES_HOME: new AppRoute("/issues", "ISSUES_HOME", this.sections.ISSUES, "Reports & Flag"),
    ISSUES_REPORTS: new AppRoute("/issues/reports", "ISSUES_REPORTS", this.sections.ISSUES, "Reports List", {
      backPathFallback: "/issues",
    }),
    ISSUES_FLAGS: new AppRoute("/issues/flags", "ISSUES_FLAGS", this.sections.ISSUES, "Flag List", {
      backPathFallback: "/issues",
    }),
    ISSUES_SETTINGS: new AppRoute(
      "/issues/settings",
      "ISSUES_SETTINGS",
      this.sections.ISSUES,
      "Report & Flag Threshold",
      {
        backPathFallback: "/issues/reports",
      },
    ),

    // admin
    ADMIN_HOME: new AppRoute("/admin", "ADMIN_HOME", this.sections.ADMIN, "Admins"),
    ADMIN_DIRECTORY: new AppRoute("/admin/directory", "ADMIN_DIRECTORY", this.sections.ADMIN, "Admin List", {
      backPathFallback: "/admin",
    }),
    ADMIN_ROLES: new AppRoute("/admin/roles", "ADMIN_ROLES", this.sections.ADMIN, "Admin Roles", {
      backPathFallback: "/admin/directory",
    }),
    ADMIN_ACTION_HISTORY: new AppRoute(
      "/admin/actions-history",
      "ADMIN_ACTION_HISTORY",
      this.sections.ADMIN,
      "Admin Action History",
      {
        backPathFallback: "/admin/roles",
      },
    ),

    // profile
    PROFILE: new AppRoute("/profile", "PROFILE", this.sections.PROFILE, "Admin Profile", { backPathFallback: "/" }),

    // gallery
    GALLERY_HOME: new AppRoute("/gallery", "GALLERY_HOME", this.sections.GALLERY, "Gallery"),

    // ticket
    TICKET_HOME: new AppRoute("/ticket", "TICKET_HOME", this.sections.TICKET, "Tickets"),
    TICKET_CHAT: new AppRoute(/^\/ticket\/[^/]+\/chat$/, "TICKET_CHAT", this.sections.TICKET, "Ticket Detail  ", {
      backPathFallback: "/ticket",
    }),

    // message
    MESSAGE_HOME: new AppRoute("/message", "MESSAGE_HOME", this.sections.MESSAGE, "Messages"),
    MESSAGE_NEWS: new AppRoute("/message/news", "MESSAGE_NEWS", this.sections.MESSAGE, "News", {
      backPathFallback: "/message",
    }),
    MESSAGE_EMAIL_CAMPAIGN: new AppRoute(
      "/message/email-campaign",
      "MESSAGE_EMAIL_CAMPAIGN",
      this.sections.MESSAGE,
      "Emails",
      {
        backPathFallback: "/message",
      },
    ),
    MESSAGE_TEMPLATE: new AppRoute("/message/template", "MESSAGE_TEMPLATE", this.sections.MESSAGE, "Text Templates", {
      backPathFallback: "/message",
    }),
    MESSAGE_SYSTEM: new AppRoute("/message/system", "MESSAGE_SYSTEM", this.sections.MESSAGE, "System Messages", {
      backPathFallback: "/message",
    }),
    MESSAGE_NOTIFICATION: new AppRoute(
      "/message/notification",
      "MESSAGE_NOTIFICATION",
      this.sections.MESSAGE,
      "Notifications",
      {
        backPathFallback: "/message",
      },
    ),

    // management
    MANAGEMENT_HOME: new AppRoute("/management", "MANAGEMENT_HOME", this.sections.MANAGEMENT, "Managements"),
    MANAGEMENT_CARS: new AppRoute("/management/cars", "MANAGEMENT_CARS", this.sections.MANAGEMENT, "Cars Management", {
      backPathFallback: "/management",
    }),
    MANAGEMENT_JOBS: new AppRoute("/management/jobs", "MANAGEMENT_JOBS", this.sections.MANAGEMENT, "Jobs Management", {
      backPathFallback: "/management",
    }),
    // interests
    MANAGEMENT_INTERESTS: new AppRoute(
      "/management/interests",
      "MANAGEMENT_INTERESTS",
      this.sections.MANAGEMENT,
      "Interest Management",
      {
        backPathFallback: "/management",
      },
    ),
    MANAGEMENT_STATES: new AppRoute(
      "/management/states",
      "MANAGEMENT_STATES",
      this.sections.MANAGEMENT,
      "States Management",
      {
        backPathFallback: "/management",
      },
    ),
    MANAGEMENT_COUNTRIES: new AppRoute(
      "/management/countries",
      "MANAGEMENT_COUNTRIES",
      this.sections.MANAGEMENT,
      "Countries Management",
      {
        backPathFallback: "/management",
      },
    ),
    MANAGEMENT_AVATARS: new AppRoute(
      "/management/avatars",
      "MANAGEMENT_AVATARS",
      this.sections.MANAGEMENT,
      "Avatars Management",
      {
        backPathFallback: "/management",
      },
    ),
    MANAGEMENT_OUR_APPLICATIONS: new AppRoute(
      "/management/our-applications",
      "MANAGEMENT_OUR_APPLICATIONS",
      this.sections.MANAGEMENT,
      "Our Applications",
      {
        backPathFallback: "/management",
      },
    ),
    MANAGEMENT_GIFT_CODE: new AppRoute(
      "/management/gift-code",
      "MANAGEMENT_GIFT_CODE",
      this.sections.MANAGEMENT,
      "Gift Code Management",
      {
        backPathFallback: "/management",
      },
    ),
    MANAGEMENT_REWARD: new AppRoute(
      "/management/reward",
      "MANAGEMENT_REWARD",
      this.sections.MANAGEMENT,
      "Rewards Management",
      {
        backPathFallback: "/management",
      },
    ),
    MANAGEMENT_SOCIAL_MEDIA: new AppRoute(
      "/management/reward/social-media",
      "MANAGEMENT_SOCIAL_MEDIA",
      this.sections.MANAGEMENT,
      "Social Media",
      {
        backPathFallback: "/management/reward",
      },
    ),
    MANAGEMENT_MISSION: new AppRoute(
      "/management/reward/mission",
      "MANAGEMENT_MISSION",
      this.sections.MANAGEMENT,
      "Missions",
      {
        backPathFallback: "/management/reward",
      },
    ),
    MANAGEMENT_FILTER: new AppRoute(
      "/management/reward/filter",
      "MANAGEMENT_FILTER",
      this.sections.MANAGEMENT,
      "Filters",
      {
        backPathFallback: "/management/reward",
      },
    ),
    MANAGEMENT_EVENT_FREE_COIN: new AppRoute(
      "/management/reward/free-coin",
      "MANAGEMENT_EVENT_FREE_COIN",
      this.sections.MANAGEMENT,
      "Manage Free Coin Events",
      {
        backPathFallback: "/management/reward",
      },
    ),
    MANAGEMENT_DAILY_REWARD: new AppRoute(
      "/management/reward/daily-reward",
      "MANAGEMENT_DAILY_REWARD",
      this.sections.MANAGEMENT,
      "Daily Rewards",
      {
        backPathFallback: "/management/reward",
      },
    ),
    MANAGEMENT_ROBOT: new AppRoute("/management/robot", "MANAGEMENT_ROBOT", this.sections.MANAGEMENT, "Robots", {
      backPathFallback: "/management",
    }),

    // advertisement
    AD_HOME: new AppRoute("/ad", "AD_HOME", this.sections.AD, "Advertisements Management"),
    AD_CREATE: new AppRoute("/ad/create", "AD_CREATE", this.sections.AD, "Create New Advertisement", {
      backPathFallback: "/ad",
    }),
    AD_EDIT: new AppRoute("/ad/edit", "AD_EDIT", this.sections.AD, "Edit Advertisement", {
      backPathFallback: "/ad",
    }),
    // shop
    SHOP_HOME: new AppRoute("/shop", "SHOP_HOME", this.sections.SHOP, "Shop"),

    // verification
    VERIFICATION_HOME: new AppRoute("/verification", "VERIFICATION_HOME", this.sections.VERIFICATION, "Verification"),
    VERIFICATION_REQUEST: new AppRoute(
      "/verification/request",
      "VERIFICATION_REQUEST",
      this.sections.VERIFICATION,
      "Verification Requests",
      {
        backPathFallback: "/verification",
      },
    ),
    VERIFICATION_HISTORY: new AppRoute(
      "/verification/history",
      "VERIFICATION_HISTORY",
      this.sections.VERIFICATION,
      "Verification History",
      {
        backPathFallback: "/verification",
      },
    ),
    VERIFICATION_POSE: new AppRoute(
      "/verification/pose",
      "VERIFICATION_POSE",
      this.sections.VERIFICATION,
      "Verification Poses",
      {
        backPathFallback: "/verification",
      },
    ),
    VERIFICATION_REQUEST_DETAIL: new AppRoute(
      /^\/verification\/request\/[^/]+\/detail$/,
      "VERIFICATION_REQUEST_DETAIL",
      this.sections.VERIFICATION,
      "Verification History",
      { backPathFallback: "/verification/history" },
    ),

    // settings
    SETTINGS_HOME: new AppRoute("/settings", "SETTINGS_HOME", this.sections.SETTINGS, "Settings"),
    SETTINGS_PRIVACY: new AppRoute("/settings/privacy", "SETTINGS_PRIVACY", this.sections.SETTINGS, "Privacy Policy", {
      backPathFallback: "/settings",
    }),
    SETTINGS_SAFETY: new AppRoute("/settings/safety", "SETTINGS_SAFETY", this.sections.SETTINGS, "Safety", {
      backPathFallback: "/settings",
    }),
    SETTINGS_FAQ: new AppRoute("/settings/faq", "SETTINGS_FAQ", this.sections.SETTINGS, "FAQ", {
      backPathFallback: "/settings",
    }),
    SETTINGS_EXPORT_BACKUP: new AppRoute(
      "/settings/export/backup",
      "SETTINGS_EXPORT_BACKUP",
      this.sections.SETTINGS,
      "Backup",
      { backPathFallback: "/settings" },
    ),
    SETTINGS_DOWNLOAD_LINKS: new AppRoute(
      "/settings/download-links",
      "SETTINGS_DOWNLOAD_LINKS",
      this.sections.SETTINGS,
      "Download Links",
      { backPathFallback: "/settings" },
    ),
    SETTINGS_ABOUT: new AppRoute("/settings/about", "SETTINGS_ABOUT", this.sections.SETTINGS, "About Us", {
      backPathFallback: "/settings",
    }),
    SETTINGS_APP_UPDATE: new AppRoute(
      "/settings/app-update",
      "SETTINGS_APP_UPDATE",
      this.sections.SETTINGS,
      "App Update",
      { backPathFallback: "/settings" },
    ),
    SETTINGS_MAINTENANCE_MODE: new AppRoute(
      "/settings/maintenance-mode",
      "SETTINGS_MAINTENANCE_MODE",
      this.sections.SETTINGS,
      "Maintenance",
      { backPathFallback: "/settings" },
    ),
    SETTINGS_LOGO: new AppRoute("/settings/logo", "SETTINGS_LOGO", this.sections.SETTINGS, "Logo Events", {
      backPathFallback: "/settings",
    }),
    SETTINGS_SOCIAL_MEDIA: new AppRoute(
      "/settings/social-media",
      "SETTINGS_SOCIAL_MEDIA",
      this.sections.SETTINGS,
      "Social Media",
      { backPathFallback: "/settings" },
    ),
    SETTINGS_IN_REVIEW_MODE: new AppRoute(
      "/settings/in-review-mode",
      "SETTINGS_IN_REVIEW_MODE",
      this.sections.SETTINGS,
      "In Review",
      { backPathFallback: "/settings" },
    ),
    SETTINGS_EXPORT_EMAILS: new AppRoute(
      "/settings/export/emails",
      "SETTINGS_EXPORT_EMAILS",
      this.sections.SETTINGS,
      "Export Email",
      { backPathFallback: "/settings" },
    ),
  };

  routesArray: AppRoute[] = Object.values(this.routes);

  findRouteByName(name: keyof typeof AppRouteName): AppRoute {
    return this.routes[name];
  }
  findRouteByPath(path: string): AppRoute | undefined {
    return this.routesArray.find(
      (route) => route.path === path || (route.path instanceof RegExp && route.path.test(path)),
    );
  }
  get activeRoute() {
    let path = useRoute().path;
    const lastCHar = path.charAt(path.length - 1);
    if (lastCHar === "/" && path !== "/") path = path.substring(0, path.length - 1);

    return this.findRouteByPath(path);
  }
}

const RouteRegistry = new RouteRegistryClass();

export { RouteRegistry };
export type { AppSection, AppRoute, AppRouteName };
