<script setup lang="ts">
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from "reka-ui";
const emit = defineEmits(["selectedTab"]);

const props = defineProps({
  options: {
    type: Array<{
      title: string;
      contentName: string;
    }>,
    required: true,
  },
  defaultTab: String,
});

const selectedTab = defineModel<string | number>();
</script>
<template>
  <TabsRoot
    class="flex flex-col overflow-hidden font-medium"
    v-model="selectedTab"
    @update:model-value="(value) => emit('selectedTab', value)"
    :default-value="defaultTab">
    <TabsList class="tablist relative -mx-2 flex w-fit gap-3 overflow-x-scroll px-4 py-1">
      <TabsTrigger
        v-for="(i, index) in props.options"
        class="group flex-center group trigger relative mb-2 text-xs transition-all duration-300 select-none"
        :value="i.contentName"
        :key="index">
        <p class="tabbar-title group-data-[state=active]:text-gradient relative px-2 transition-colors duration-400">
          {{ i.title }}
        </p>
      </TabsTrigger>
      <TabsIndicator
        class="smart-underline absolute bottom-0 left-0 h-[2px] w-[var(--reka-tabs-indicator-size)] translate-x-[var(--reka-tabs-indicator-position)] rounded-full transition-all duration-300">
        <div class="bg-gradient-primary h-full w-full"
      /></TabsIndicator>
    </TabsList>
    <TabsContent v-for="(i, index) in props.options" :value="i.contentName" :key="index" class="tab-content">
      <ClientOnly>
        <slot :name="i.contentName" />
      </ClientOnly>
    </TabsContent>
  </TabsRoot>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
