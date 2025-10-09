import type { FetchPaginationListResponse } from "../../types/fetch";

const fetchCountryList = async () => await $$fetch<Record<string, any>[]>("/public/countries");
const fetchOurAppsList = async () => await $$fetch<Record<string, any>[]>("/public/other-apps");
const fetchSettingsData = async () => await $$fetch<Record<string, any>>("/public/setting");
const fetchStateList = async (country: number) => await $$fetch<FetchPaginationListResponse>("/public/state", { params: { country } });
const fetchCityList = async (state: number) => await $$fetch<FetchPaginationListResponse>("/public/city", { params: { state } });
const fetchJobList = async () => await $$fetch<FetchPaginationListResponse>("/public/jobs");
const fetchLanguageList = async () => await $$fetch<FetchPaginationListResponse>("/public/languages");
const fetchInterestList = async () => await $$fetch<FetchPaginationListResponse>("/public/interests", { params: { page_size: 500 } });
const fetchDepartmentList = async () => await $$fetch<Record<string, any>[]>("/tickets/departments");
const fetchFaqList = async () => await $$fetch<Record<string, any>[]>("/public/faq");
const fetchCarList = async () => await $$fetch<FetchPaginationListResponse>("/public/car");
const fetchGiftCode = async (giftCode: string) => await $$fetch("/payment/giftcard/submit", { method: "POST", body: { code: giftCode } });
const fetchReportCategoryList = async () => await $$fetch<FetchPaginationListResponse>("/public/report-categories", { params: { page_size: 20 } });
export {
  fetchCountryList,
  fetchOurAppsList,
  fetchSettingsData,
  fetchStateList,
  fetchCityList,
  fetchJobList,
  fetchLanguageList,
  fetchInterestList,
  fetchDepartmentList,
  fetchFaqList,
  fetchCarList,
  fetchGiftCode,
  fetchReportCategoryList,
};
