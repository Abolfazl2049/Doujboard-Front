<script setup lang="ts">
import { useAccountStore } from "~/core/@services/account/store";
// import { NavBackChannel } from "~/core/pub-subs";

let backBtn = ref();
const scrollTop = ref(0);
const route = useRoute();
const account = useAccountStore();
const accountStore = useAccountStore();
const localPath = useLocalePath();
const currentAppRoute = computed(() => {
  return RouteRegistry.findRouteByPath(route.path);
});
// const Public = publicStore();
const detectBackPath = (fallback: string) => {
  let historyBackPath = removeRouteLocaleParams(window?.history?.state?.back?.split("?")[0] ?? "");
  let currentPath = removeRouteLocaleParams(route.path);
  if (historyBackPath && currentPath !== historyBackPath) return historyBackPath;
  else return fallback;
};

const goBack = () => {
  function n() {
    navigateTo({ path: detectBackPath(currentAppRoute?.value?.options?.backPathFallback as string), replace: true });
  }
  if (NavBackChannel.subscriberCount > 0) NavBackChannel.publish({ goBack: n });
  else n();
};
onMounted(() => {
  document.getElementById("default-layout-con")?.addEventListener("scroll", (ev) => {
    // @ts-ignore
    scrollTop.value = ev.target.scrollTop;
  });
  backBtn.value = removeRouteLocaleParams(route.fullPath).replaceAll("/", "");
});
</script>
<template>
  <nav
    dir="ltr"
    :data-is-sticked="scrollTop > 5"
    :data-v="currentAppRoute?.options.topNav.variant?.toLowerCase()"
    class="dark:data-[is-sticked=true]:bg-mine-shaft group sticky top-0 z-50 flex items-center justify-between border-b border-b-[rgba(152,152,152,0.25)] px-4 py-4 data-[is-sticked=true]:bg-white data-[v=wallet]:border-black/40"
    :data-is-bg-gradient="currentAppRoute?.options.topNav.variant === 'HOME' || currentAppRoute?.options.topNav.variant === 'WALLET'">
    <div class="flex items-center">
      <NuxtLinkLocale to="/nearby" v-if="currentAppRoute?.options.topNav.variant === 'HOME'" class="flex items-center gap-2">
        <div class="flex-center size-9 rounded-full border-[#BC3B00] bg-white/50">
          <IconLocationMark />
        </div>
        <span class="font-medium">
          {{ $t("nearby") }}
        </span>
      </NuxtLinkLocale>
      <button v-else-if="currentAppRoute?.options?.backPathFallback" @click="goBack">
        <div class="flex w-fit items-center gap-3.5 text-[#0F172A]">
          <IconArrowLeft class="h-[19px] max-w-fit transform duration-100 ease-in-out **:!fill-black group-data-[is-bg-gradient=true]:**:!fill-black **:dark:!fill-white" />
          <span class="line-clamp-1 text-lg font-[500] group-data-[is-bg-gradient=true]:text-black dark:text-white">{{ $t(`${currentAppRoute?.name?.toLowerCase()}_route_name`) }}</span>
        </div>
      </button>
      <NuxtLinkLocale to="/" replace v-else> </NuxtLinkLocale>
    </div>

    <div class="relative flex items-center gap-2">
      <ClientOnly>
        <div
          class="group border-gradient-primary group-data-[is-bg-gradient=true]:border-gradient-bloody bg-primary-100/30 flex items-center gap-[3px] rounded-full py-[7px] pr-2 pl-2.5 transition-all group-data-[is-bg-gradient=true]:bg-[#FEBB86] group-data-[is-bg-gradient=true]:text-black before:!rounded-full dark:bg-[#37282D]">
          <span class="min-w-[30px] text-sm font-medium">{{ formatPrice(account.data?.coin as number, { locale: $i18n.locale }) }} </span>
          <IconCoin class="h-[20px] w-[23px]" />
        </div>
      </ClientOnly>
      <NuxtLinkLocale class="relative" to="/shop">
        <IconShop class="size-[26px] **:!fill-black group-data-[is-bg-gradient=true]:**:!fill-black **:dark:!fill-white" />
      </NuxtLinkLocale>
      <NuxtLinkLocale to="/notification" class="relative">
        <IconNotification class="size-[25px] cursor-pointer **:!fill-black group-data-[is-bg-gradient=true]:**:!fill-black **:dark:!fill-white" />
        <div v-if="true" class="absolute -top-1 right-[-5px] size-1.5 rounded-full bg-red-600" />
      </NuxtLinkLocale>
    </div>
    <NodeHomeTopGradient v-if="currentAppRoute?.options.topNav.variant === 'HOME'" />
  </nav>
</template>
