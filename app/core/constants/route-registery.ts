import type { Component } from "vue";
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
}
enum AppRouteName {
  AUTH_SIGN_IN = "AUTH_SIGN_IN",
  AUTH_SIGN_UP = "AUTH_SIGN_UP",
  PRIVACY = "PRIVACY",
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
    AUTH: new AppSection("AUTH"),
  };
  routes: Record<keyof typeof AppRouteName, AppRoute> = {
    // auth
    AUTH_SIGN_IN: new AppRoute("/auth/signin", "AUTH_SIGN_IN", this.sections.AUTH, { isPublic: true }),
    AUTH_SIGN_UP: new AppRoute("/auth/signup", "AUTH_SIGN_UP", this.sections.AUTH, { isPublic: true }),
    PRIVACY: new AppRoute("/privacy", "PRIVACY", this.sections.AUTH, { isPublic: true }),
  };

  routesArray: AppRoute[] = Object.values(this.routes);

  findRouteByName(name: keyof typeof AppRouteName): AppRoute {
    return this.routes[name];
  }
  findRouteByPath(path: string): AppRoute | undefined {
    let formattedPath = removeRouteLocaleParams(path);
    return this.routesArray.find((route) => route.path === formattedPath || (route.path instanceof RegExp && route.path.test(formattedPath)));
  }

  get activeRoute(): AppRoute | undefined {
    return this.findRouteByPath(useRoute().path);
  }
}

const RouteRegistry = new RouteRegistryClass();

export { RouteRegistry };
export type { AppSection, AppRoute, AppRouteName };
