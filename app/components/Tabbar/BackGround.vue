<script setup lang="ts">
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from "reka-ui";

const { options } = defineProps({
  options: {
    type: Array as PropType<
      {
        title: string;
        contentName: string;
        badge?: number;
      }[]
    >,
    required: true,
  },
});
const selectedTab = defineModel<string | number>();

const onTabChange = (value: string | number) => {
  const tabNode = document.querySelector(`.tab-trigger-${options.findIndex((i) => i.contentName === value)}`);
  tabNode?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
};
</script>
<template>
  <TabsRoot
    class="w-full flex-col overflow-hidden"
    v-model="selectedTab"
    v-on:update:model-value="onTabChange"
    :default-value="options[0]?.contentName">
    <TabsList class="box relative mx-auto flex w-full overflow-auto rounded-xl px-2.5 py-2">
      <TabsIndicator
        class="a-center-y absolute left-0 h-[83%] w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) rounded-full transition-all duration-300">
        <div class="bg-gradient-primary h-full w-full rounded-[10px]" />
      </TabsIndicator>
      <TabsTrigger
        v-for="(i, index) in options"
        :key="index"
        class="group flex-center relative z-1 flex-1 px-8 py-1 !font-medium transition-all duration-300 max-lg:px-3"
        :class="[i.contentName, `tab-trigger-${index}`]"
        :value="i.contentName">
        <div class="relative">
          <p
            class="relative px-5 text-sm font-medium text-nowrap transition-colors duration-400 group-data-[state=active]:text-white max-lg:text-xs">
            {{ i.title }}
          </p>
          <p
            v-if="i.badge"
            class="bg-primary max-lg:text-2xs absolute -top-1 right-0 z-10 scale-90 px-[5px] text-[11px] font-medium text-white transition-colors duration-300 group-data-[state=active]:bg-white group-data-[state=active]:text-black">
            {{ i.badge }}
          </p>
        </div>
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="(i, index) in options" :value="i.contentName" :key="index">
      <ClientOnly>
        <slot :name="i.contentName" />
      </ClientOnly>
    </TabsContent>
  </TabsRoot>
</template>
