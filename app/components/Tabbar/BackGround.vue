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
    badge?: number;
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
  if (props.defaultTab) {
    (document.querySelectorAll(".single-tab-from-tab-bar p") as NodeListOf<HTMLElement>)[props.options.findIndex((i) => i.contentName === props.defaultTab)]?.click();
    emit("selectedTab", selectedTab.value);
  } else (document.querySelector(".single-tab-from-tab-bar p") as HTMLElement | null)?.click();
});
</script>
<template>
  <TabsRoot
    class="flex w-full flex-col overflow-hidden font-medium"
    v-model="selectedTab as string | number"
    @update:model-value="(value) => emit('selectedTab', value)"
    :default-value="props.options[0]?.contentName as string">
    <TabsList class="relative mx-auto flex w-fit justify-center gap-8 rounded-[9px] bg-[#4F4F4F] px-4.5 py-2" aria-label="Manage your account">
      <TabsTrigger
        v-for="i in props.options"
        @click="setUnderLineWidthAndPos"
        :data-selected-this-tab="selectedTab === i.contentName"
        class="group flex-center single-tab-from-tab-bar data-[selected-this-tab=true]: relative z-1 py-1 !font-medium text-white transition-all duration-300 select-none"
        :value="i.contentName as string | number">
        <div class="relative">
          <p class="relative px-5 text-sm transition-colors duration-400">{{ i.title }}</p>
          <p class="group-data-[selected-this-tab=true]:bg-white group-data-[selected-this-tab=true]:text-black transition-colors duration-300 bg-primary absolute -top-1 right-0 z-10 scale-90 rounded px-[5px] text-[11px] font-medium transition-colors duration-300 ">{{ i.badge }}</p>
        </div>
      </TabsTrigger>
      <div class="smart-bg absolute top-[3px] left-0 mx-auto h-full transition-all duration-400" :style="`transform: translateX(${xPos - 15}px); width: ${width + 30}px;`">
        <div class="bg-gradient-primary h-[87%] w-full rounded-[7px]" />
      </div>
    </TabsList>
    <TabsContent v-for="i in props.options" :value="i.contentName as string | number">
      <!-- v-touch:swipe.left="() => moveTab('left')"
      v-touch:swipe.right="() => moveTab('right')" -->
      <motion.div
        v-if="selectedTab === i.contentName"
        :initial="{ opacity: 1 }"
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
