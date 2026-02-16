interface sharedStoreDataEntry<T = Record<string, any>> {
  isFetchComplete: boolean;
  data: T;
}
type LocaleValue = "en-GB" | "fa-IR";
export type { sharedStoreDataEntry, LocaleValue };
