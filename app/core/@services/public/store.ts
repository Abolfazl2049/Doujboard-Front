import type { PublicStoreDataEntry } from "~/core/types";
import { PublicModel, Settings } from "./model";
import { fetchReportCategoryList } from "./fetch";
import { fetchSettingsData as baseFetchSettingsData } from "./fetch";
export const usePublicStore = defineStore("public", () => {
  const pageKeyUpdateCount = ref(0);
  const data = ref<{
    settings: PublicStoreDataEntry<Settings | null>;
    reportCategories: PublicStoreDataEntry<PublicModel[] | null>;
  }>({
    settings: {
      data: null,
      isFetchComplete: false,
    },
    reportCategories: {
      data: null,
      isFetchComplete: false,
    },
  });
  const fetchSettingsData = async () => {
    try {
      const res = await baseFetchSettingsData();
      data.value.settings.data = new Settings(res);
    } catch (error) {
      console.error(error);
    } finally {
      data.value.settings.isFetchComplete = true;
    }
  };
  const fetchReportCategories = async () => {
    try {
      const res = await fetchReportCategoryList();
      data.value.reportCategories.data = res.results.map((item) => new PublicModel(item));
    } finally {
      data.value.reportCategories.isFetchComplete = true;
    }
  };
  return {
    pageKeyUpdateCount,
    fetchSettingsData,
    fetchReportCategories,
    data,
  };
});
