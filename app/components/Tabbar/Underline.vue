<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "reka-ui";
import { motion } from "motion-v";
import Vue3TouchEvents from "vue3-touch-events";
const nuxtApp = useNuxtApp();
nuxtApp.vueApp.use(Vue3TouchEvents as any);

interface tabbarProps {
  options: Array<{
    title: String;
    contentName: String;
  }>;
  defaultTab?: string;
}

const emit = defineEmits(["selectedTab"]);
const props = defineProps<tabbarProps>();
const selectedTab = ref(props.defaultTab ?? props.options[0]?.contentName);
const xPos = ref(0);
const width = ref(0);
const setUnderLineWidthAndPos = (ev: Event) => {
  const target = ev.currentTarget as HTMLElement; // بهتر از ev.target
  const parent = target.closest(".single-tab-from-tab-bar") as HTMLElement;
  if (!parent) return;

  xPos.value = parent.offsetLeft;
  width.value = parent.offsetWidth;
};

const moveTab = (side: "left" | "right") => {
  const selectedIndex = props.options.findIndex((t) => t.contentName == selectedTab.value);
  if (side === "right" && selectedIndex > 0) {
    (document.querySelectorAll(".single-tab-from-tab-bar p") as NodeListOf<HTMLElement>)[selectedIndex - 1]?.click();
    selectedTab.value = props.options[selectedIndex - 1]?.contentName;
  }
  if (side === "left" && selectedIndex < props.options.length - 1) {
    (document.querySelectorAll(".single-tab-from-tab-bar p") as NodeListOf<HTMLElement>)[selectedIndex + 1]?.click();
    selectedTab.value = props.options[selectedIndex + 1]?.contentName;
  }
};

onMounted(() => {
  if (props.defaultTab) (document.querySelectorAll(".single-tab-from-tab-bar p") as NodeListOf<HTMLElement>)[props.options.findIndex((i) => i.contentName === props.defaultTab)]?.click();
  else (document.querySelector(".single-tab-from-tab-bar p") as HTMLElement | null)?.click();
  emit("selectedTab", selectedTab.value);
});
</script>
<template>
  <TabsRoot
    class="flex flex-col overflow-hidden font-medium"
    v-model="selectedTab as string | number"
    @update:model-value="(value) => emit('selectedTab', value)"
    :default-value="props.options[0]?.contentName as string">
    <TabsList class="relative -mx-2 flex w-fit gap-3 overflow-x-scroll px-4 py-1" aria-label="Manage your account">
      <TabsTrigger
        v-for="i in props.options"
        @click="setUnderLineWidthAndPos"
        :data-selected-this-tab="selectedTab === i.contentName"
        class="group flex-center single-tab-from-tab-bar data-[selected-this-tab=true]:text-gradient relative mb-2 text-xs transition-all duration-300 select-none **:group-data-[selected-this-tab=false]:!opacity-80"
        :value="i.contentName as string | number">
        <p class="tabbar-title relative px-2 transition-colors duration-400">{{ i.title }}</p>
      </TabsTrigger>
      <div class="smart-underline absolute top-5 left-0 mx-auto h-0.5 px-2 transition-all duration-400" :style="`transform: translateX(${xPos - 3.5}px); width: ${width + 7}px;`">
        <div class="bg-primary h-0.5 w-full rounded-full" />
      </div>
    </TabsList>
    <TabsContent v-for="i in props.options" :value="i.contentName as string | number">
      <motion.div
        class="tabbar-content"
        v-if="selectedTab === i.contentName"
        v-touch:swipe.left="() => moveTab('left')"
        v-touch:swipe.right="() => moveTab('right')"
        :initial="{ opacity: 0.5 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0.5 }"
        :transition="{ duration: 0.4 }">
        <slot :name="i.contentName" />
      </motion.div>
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
