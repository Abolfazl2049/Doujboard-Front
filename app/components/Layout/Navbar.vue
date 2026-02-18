<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuRoot, DropdownMenuTrigger } from "reka-ui";
import { useAccountStore } from "~/core/@services/account/store";
const emit = defineEmits<{ openSidebar: [] }>();
const route = useRoute();
const account = useAccountStore();
const accountStore = useAccountStore();
const isModalOpen = ref({
  search: false,
  logout: false,
});

const detectBackPath = (fallback: string) => {
  let historyBackPath = window?.history?.state?.back?.split("?")[0] ?? "";
  let currentPath = route.path;
  if (historyBackPath && currentPath !== historyBackPath) return historyBackPath;
  else return fallback;
};

const goBack = () => {
  navigateTo({
    path: detectBackPath(RouteRegistry.activeRoute?.options?.backPathFallback as string),
    replace: true,
  });
};

const handleLogout = () => {
  accountStore.logout();
  navigateTo("/auth/signin");
};
</script>
<template>
  <nav
    class="group sticky top-0 z-50 flex items-center justify-between border-b border-b-[#FB8C004D] bg-white px-6.5 py-4 max-lg:px-3.5 max-lg:py-3">
    <div class="flex items-center gap-2">
      <Icon
        icon="heroicons:bars-3-bottom-left-16-solid"
        class="hidden size-6 min-w-6 cursor-pointer max-lg:block"
        @click="emit('openSidebar')" />
      <div
        v-if="RouteRegistry.activeRoute?.options.backPathFallback"
        class="from-primary/10 to-primary/5 flex-center hover-opacity size-12 rounded-[10px] bg-linear-[135deg] max-lg:size-8 max-lg:min-w-8"
        @click="goBack">
        <LayoutINavbarArrowLeft class="max-lg:size-4" />
      </div>
      <p class="line-clamp-1 text-[23px] font-semibold max-lg:text-lg">{{ RouteRegistry.activeRoute?.displayName }}</p>
    </div>
    <div class="flex items-center gap-5 max-lg:gap-3.5">
      <LayoutINavbarSearch class="hover-opacity size-7.5 max-lg:size-5.5" @click="isModalOpen.search = true" />
      <CMessageNotificationLayoutMenu />
      <DropdownMenuRoot>
        <DropdownMenuTrigger as-child>
          <div class="group hover:bg-athens-gray -mx-2.5 flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1">
            <Img
              external
              :src="account.data?.primaryImage?.src"
              class="h-8.5 w-8.5 min-w-8.5 rounded-full max-lg:h-6.5 max-lg:w-6.5 max-lg:min-w-6.5" />
            <LayoutINavbarArrowDown class="group-hover:hover-opacity max-lg:size-5.5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="min-w-48 rounded-lg border border-black/10 bg-white p-1 shadow-lg"
          :side="'bottom'"
          :align="'end'"
          :side-offset="8">
          <DropdownMenuItem as-child @select="navigateTo('/profile')">
            <button
              class="text-cod-gray-200 flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100">
              <CUserIEdit class="size-4" />
              Profile Settings
            </button>
          </DropdownMenuItem>
          <div class="my-1 h-px bg-black/10"></div>
          <DropdownMenuItem as-child @select="handleLogout">
            <button
              class="flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
              <CProfileILogOut class="**:stroke-red size-4" />
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
      <ModalSearch v-model="isModalOpen.search" />
    </div>
  </nav>
</template>
