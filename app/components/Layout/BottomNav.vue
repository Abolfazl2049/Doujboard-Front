<script setup lang="ts">
import { Icon } from "@iconify/vue";

const route = useRoute();
const currentAppRoute = computed(() => {
  return RouteRegistry.findRouteByPath(route.path);
});
</script>
<template>
  <nav
    v-if="currentAppRoute?.options.bottomNav?.show"
    dir="ltr"
    class="dark:bg-charcoal dark:text-dusty-gray sticky bottom-0 z-50 flex items-center justify-between rounded-t-[35px] border-t border-t-[rgba(152,152,152,0.25)] bg-white px-6 pt-3 pb-1 text-sm shadow-md *:size-13 dark:border-none dark:shadow-[0px_-2px_4px_0px_#989D9E26]">
    <NuxtLinkLocale to="/account/profile" class="btm-nav-item" active-class="active">
      <div class="flex-center flex-col gap-1">
        <IconProfile class="size-[26px]" />
        <span> {{ $t("profile") }} </span>
      </div>
    </NuxtLinkLocale>
    <NuxtLinkLocale class="btm-nav-item" active-class="active" to="/chat">
      <div class="flex-center flex-col gap-1">
        <IconChat class="size-7" />
        <span> {{ $t("chat") }} </span>
      </div>
    </NuxtLinkLocale>
    <NuxtLinkLocale class="btm-nav-item group flex-center relative size-13" to="/" :data-active="currentAppRoute?.name === 'HOME'">
      <Img src="/media/images/app-logo.png" class="shadow-primary relative z-1 size-13 rounded-full" />
      <div
        class="from-primary-100 dark:from-primary-100 animate-scale absolute -inset-3 z-0 hidden bg-radial to-transparent to-[66%] group-data-[active=true]:block dark:-inset-1.5 dark:to-75%"
        data-animation-mode="slow" />
    </NuxtLinkLocale>
    <NuxtLinkLocale class="btm-nav-item" active-class="active">
      <div class="flex-center flex-col gap-1">
        <IconEarn class="size-[26px] fill-[#959393]" />
        <span class="line-clamp-1"> {{ $t("earn") }} </span>
      </div>
    </NuxtLinkLocale>
    <NuxtLinkLocale to="/settings" class="btm-nav-item" active-class="active">
      <div class="flex-center flex-col gap-1">
        <IconSettings class="size-[26px]" />
        <span> {{ $t("settings") }} </span>
      </div>
    </NuxtLinkLocale>
  </nav>
</template>
<style>
@reference '~/assets/css/tailwind.css';

.btm-nav-item.active * {
  @apply fill-primary;
}
.btm-nav-item.active svg {
  @apply drop-shadow-[0px_1px_2px_rgba(248,82,6,1)] dark:drop-shadow-[0px_1px_2px_rgba(248,82,6,1)];
}
.btm-nav-item.active span {
  @apply text-primary;
  font-weight: 600;
  @apply [text-shadow:0px_4px_4px_#00000020] dark:[text-shadow:0px_2px_4px_#FDD83518];
}
</style>
