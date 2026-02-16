<script setup lang="ts">
import { useAccountStore } from "~/core/@services/account/store";

const isDesktopLocal = ref(false);
const isExpanded = defineModel({ default: true });
const isOpen = defineModel("open", { default: true });
const accountStore = useAccountStore();
const close = () => {
  isOpen.value = false;
};
onMounted(() => {
  isDesktopLocal.value = isDesktop();
  if (!isDesktopLocal.value) isOpen.value = false;
});
</script>
<template>
  <div
    class="group fixed inset-y-0 left-0 z-52 bg-white max-lg:hidden max-lg:data-open:block"
    :data-expanded="isExpanded ? true : false"
    :data-open="isOpen ? true : undefined">
    <div class="relative h-screen min-w-30 transition-all duration-500 group-data-[expanded=true]:min-w-70">
      <div
        class="absolute right-0 h-screen w-px min-w-px bg-linear-to-b from-[#00000099] via-transparent via-50% to-[#00000099]" />
      <div class="group h-full w-full min-w-30 transition-all duration-500 data-[expanded=true]:min-w-70">
        <div
          class="*:group-data-[expanded=false]:flex-center relative size-full flex-col gap-3.5 overflow-hidden py-6 **:font-medium **:text-nowrap">
          <div
            class="flex items-center justify-between gap-4 transition-all duration-500 group-data-[expanded=true]:px-9">
            <NuxtLink
              @click="
                () => {
                  if (!isDesktopLocal) close();
                }
              "
              to="/"
              class="flex-center cursor-pointer gap-3 font-medium">
              <Img src="/media/images/app-logo.png" class="size-11 rounded-xl" />
              <Transition name="fade">
                <span class="group-data-[expanded=false]: absolute left-23 text-[17px]" v-if="isExpanded"
                  >Doujboard
                </span>
              </Transition>
            </NuxtLink>
            <CSharedIArrowBrown
              class="hover-opacity transition-transform duration-500 select-none group-data-[expanded=true]:rotate-180 max-lg:hidden"
              @click="isExpanded = !isExpanded" />
          </div>
          <div class="mx-auto mt-1 max-h-px min-h-px w-10/12 bg-[#484848] opacity-50" />
          <ClientOnly>
            <div
              class="flex-col overflow-auto transition-transform duration-500 *:h-13 *:min-h-13 group-data-[expanded=false]:pr-1 group-data-[expanded=true]:pl-3">
              <NuxtLink
                v-for="(i, index) in Object.values(RouteRegistry.sections).filter(
                  ({ homePath, name }) => Boolean(homePath) && accountStore.data?.role.hasAccessToAppSection(name),
                )"
                :to="i.homePageRoute?.path as string"
                class="group data-[active=true]:text-primary active data-[active=false]:hover-opacity relative flex items-center gap-3 rounded-l-full from-[#fb8c0004] to-[#ff7f4f26] transition-all duration-500 group-data-[expanded=false]:!rounded-none group-data-[expanded=false]:!px-6 group-data-[expanded=true]:!pl-7.5 data-[active=true]:group-data-[expanded=true]:bg-linear-[270deg] data-[active=true]:[&>.line]:opacity-100"
                :data-active="RouteRegistry.activeRoute?.section.name === i.name"
                @click="() => (isDesktopLocal ? undefined : close())"
                :key="index">
                <div
                  class="a-center-y line from-primary to-primary absolute right-0 h-full w-0.5 bg-linear-[135deg] !opacity-0 transition-all duration-150 group-data-[expanded=true]:-right-[3px] group-data-[expanded=true]:w-1.5 group-data-[active=true]:group-data-[expanded=true]:!opacity-100" />
                <div
                  class="flex-center group-data-[expanded=false]:hover-opacity relative *:size-6 *:transition-transform *:duration-500 *:group-data-[expanded=true]:size-5">
                  <component
                    :is="i.icon"
                    class="absolute opacity-100 transition-opacity duration-300 group-data-[active=true]:opacity-0" />
                  <component
                    :is="i.activeIcon"
                    class="absolute opacity-0 transition-opacity duration-300 **:transition-colors **:duration-500 group-data-[active=true]:opacity-100" />
                </div>
                <Transition name="fade">
                  <p class="absolute left-14 font-medium select-none lg:text-sm" v-if="isExpanded">
                    {{ i.displayName }}
                  </p>
                </Transition>
              </NuxtLink>
            </div>
            <template #fallback>
              <LayoutSkeletonSidebar :is-expanded="true" />
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed inset-0 z-51 hidden bg-black/40 max-lg:block" v-if="isOpen" @click="close" />
</template>
