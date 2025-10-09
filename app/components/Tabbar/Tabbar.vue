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
</script>
<template>
  <TabsRoot class="flex flex-col font-medium" v-model="selectedTab as string | number" :default-value="props.options[0]?.contentName as string | number">
    <TabsList class="flex gap-3 overflow-x-scroll" aria-label="Manage your account">
      <TabsTrigger
        v-for="i in props.options"
        :data-selected-this-tab="selectedTab === i.contentName"
        class="group flex-center relative mt-5 mb-4 rounded-full px-2 py-[5px] text-xs transition-all duration-300 select-none"
        :value="i.contentName as string | number">
        <p class="relative z-10 transition-colors duration-300 group-data-[selected-this-tab=true]:text-white">{{ i.title }}</p>
        <div class="bg-gradient absolute top-0 h-full w-full rounded-full opacity-0 transition-all duration-300 group-data-[selected-this-tab=true]:opacity-100" />
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="i in props.options" :value="i.contentName as string | number">
      <slot :name="i.contentName" />
    </TabsContent>
  </TabsRoot>
</template>
<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #f85206 0%, #f1ad00 100%);
}
</style>
