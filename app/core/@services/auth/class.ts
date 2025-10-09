class AuthenticationStep {
  showLogo?: boolean;
  progress?: number;
  showMadeWithLoveBox?: boolean;
  patternImageSrc?: string;
  prevStep: () => AuthenticationStep | null = () => null;
  nextStep: () => AuthenticationStep | null = () => null;
  path: string;
  goToNextStep: () => void;
  goToPrevStep: () => void;

  constructor(path: string) {
    this.path = path;
    const routeName: keyof typeof AppRouteName | undefined = RouteRegistry.findRouteByPath(path)?.name as keyof typeof AppRouteName | undefined;
    switch (routeName) {
      case "AUTH_SELECT_LANGUAGE":
        this.showLogo = true;
        this.showMadeWithLoveBox = true;
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SIGN_UP").path as string);
        break;
      case "AUTH_SIGN_UP":
        this.showLogo = true;
        this.showMadeWithLoveBox = true;
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SELECT_LANGUAGE").path as string);
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SEND_OTP").path as string);
        break;
      case "AUTH_SEND_OTP":
        this.progress = 10;
        this.patternImageSrc = "/media/images/auth-pattern/send-otp.png";
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SIGN_UP").path as string);
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_VERIFY_OTP").path as string);
        break;
      case "AUTH_REFERRAL_CODE":
        this.progress = 10;
        this.patternImageSrc = "/media/images/auth-pattern/verify-otp.png";
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SEND_OTP").path as string);
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SEND_OTP").path as string);
        break;
      case "AUTH_VERIFY_OTP":
        this.progress = 30;
        this.patternImageSrc = "/media/images/auth-pattern/verify-otp.png";
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SEND_OTP").path as string);
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_NAME_COUNTRY").path as string);
        break;
      case "AUTH_NAME_COUNTRY":
        this.progress = 50;
        this.patternImageSrc = "/media/images/auth-pattern/name-country.png";
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SIGN_UP").path as string);
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_BIRTH_DATE").path as string);
        break;
      case "AUTH_BIRTH_DATE":
        this.progress = 70;
        this.patternImageSrc = "/media/images/auth-pattern/birth-date.png";
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_NAME_COUNTRY").path as string);
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_GENDER").path as string);
        break;
      case "AUTH_GENDER":
        this.progress = 75;
        this.patternImageSrc = "/media/images/auth-pattern/gender.png";
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_BIRTH_DATE").path as string);
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_ATTRACTED_TO").path as string);
        break;
      case "AUTH_ATTRACTED_TO":
        this.progress = 80;
        this.patternImageSrc = "/media/images/auth-pattern/attracted-to.png";
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_GENDER").path as string);
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_PHOTO").path as string);
        break;
      case "AUTH_PHOTO":
        this.progress = 90;
        this.patternImageSrc = "/media/images/auth-pattern/photo.png";
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_ATTRACTED_TO").path as string);
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_LOCATION").path as string);
        break;
      case "AUTH_LOCATION":
        this.patternImageSrc = "/media/images/auth-pattern/location.png";
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_PHOTO").path as string);
        break;
      case "AUTH_SIGN_IN":
        this.showLogo = true;
        this.showMadeWithLoveBox = true;
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SIGN_UP").path as string);
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_EMAIL_SIGN_IN").path as string);
        break;
      case "AUTH_EMAIL_SIGN_IN":
        this.progress = 0;
        this.showLogo = true;
        this.showMadeWithLoveBox = true;
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SIGN_IN").path as string);
        break;
      case "AUTH_FORGOT_PASSWORD":
        this.progress = 0;
        this.patternImageSrc = "/media/images/auth-pattern/forgot-password.png";
        this.prevStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SIGN_IN").path as string);
        this.nextStep = () => new AuthenticationStep(RouteRegistry.findRouteByName("AUTH_SIGN_IN").path as string);
        break;
    }

    this.goToNextStep = () => {
      const localePath = useLocalePath();
      const nextStepPath = this.nextStep()?.path;
      if (nextStepPath)
        navigateTo({
          path: localePath(nextStepPath),
          replace: true,
        });
      else console.error("No next step available");
    };
    this.goToPrevStep = () => {
      const localePath = useLocalePath();
      const prevStepPath = this.prevStep()?.path;
      if (prevStepPath)
        navigateTo({
          path: localePath(prevStepPath),
          replace: true,
        });
      else console.error("No previous step available");
    };
  }
}
export { AuthenticationStep };
