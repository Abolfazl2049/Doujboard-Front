class MultiLocaleValue {
  "en-GB": string;
  "fa-IR": string;
  constructor(enValue: string, faValue: string) {
    this["en-GB"] = enValue;
    this["fa-IR"] = faValue;
  }
  get() {
    const { locale } = useNuxtApp()?.$i18n;
    return this[locale.value];
  }
  get value() {
    return this.get();
  }
}
export { MultiLocaleValue };
