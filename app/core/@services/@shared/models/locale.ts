class MultiLocaleValue<valueType = string> {
  en: valueType | null;
  fa: valueType | null;
  constructor(enValue: valueType | null = null, faValue: valueType | null = null) {
    this.en = enValue;
    this.fa = faValue;
  }
}
export {MultiLocaleValue};
