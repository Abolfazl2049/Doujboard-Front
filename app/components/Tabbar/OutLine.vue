<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "reka-ui";
interface tabbarProps {
  options: Array<{
    title: String;
    contentName: String;
  }>;
  defaultTab?: string;
}
const props = defineProps<tabbarProps>();
const selectedTab = ref(props.defaultTab ?? props.options[0]?.contentName);
const localeHead = useLocaleHead();
</script>
<template>
  <TabsRoot :unmount-on-hide="false" class="flex flex-col font-medium" v-model="selectedTab as string | number" :default-value="props.options[0]?.contentName as string | number">
    <TabsList class="flex gap-6 overflow-x-scroll" aria-label="Manage your account">
      <TabsTrigger
        v-for="(i, index) in props.options"
        :data-selected-this-tab="selectedTab === i.contentName"
        class="group flex-center relative mt-5 mb-4 rounded-full px-2 py-[5px] text-xs transition-all duration-300 select-none"
        :value="i.contentName as string | number">
        <p class="group-data-[selected-this-tab=true]:text-primary relative z-10 p-1 transition-colors duration-300">{{ i.title }}</p>
        <div class="border-gradient-primary !absolute top-0 h-full w-full opacity-0 transition-all duration-300 group-data-[selected-this-tab=true]:opacity-100 before:rounded-xl" />
        <div class="absolute -right-3 ml-4 h-1/2 w-px bg-black dark:bg-white" v-if="index !== props.options.length - 1" />
      </TabsTrigger>
    </TabsList>
    <TabsContent :dir="localeHead.htmlAttrs.dir" v-for="i in props.options" class="w-full" :value="i.contentName as string | number">
      <slot :name="i.contentName" />
    </TabsContent>
  </TabsRoot>
</template>
