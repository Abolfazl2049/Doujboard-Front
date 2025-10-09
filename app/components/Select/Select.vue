<script lang="ts">
const BaseSelectProps = {
  searchable: Boolean,
  options: { type: Object as PropType<Record<string, Variant>> },
  optionKey: { type: String, default: "displayName" },
  valueKey: { type: String, default: "name" },
  placeholder: { type: String },
  multiple: Boolean,
  disabled: Boolean,
};
export {
  BaseSelectProps
}
</script>
<script setup lang="ts">
import type { PropType, Variant } from "#imports";
import { Icon } from "@iconify/vue";
import { SelectContent, SelectGroup, SelectItem, SelectItemIndicator, SelectItemText, SelectPortal, SelectRoot, SelectSeparator, SelectTrigger, SelectValue, SelectViewport } from "reka-ui";

let selectedValue = defineModel({ default: null, type: Object as PropType<Partial<Variant<any, any>> | null | undefined> });
let isOpen = defineModel("open", { default: false, type: Boolean });
const localeHead = useLocaleHead();

defineProps({
  title: String,
  options: Array<Partial<Variant<any, any>>>,
  id: String,
});
</script>

<template>
  <div class="relative w-full" :id="id">
    <SelectRoot :dir="(localeHead.htmlAttrs?.dir as 'ltr' | 'rtl') || 'ltr'" v-model="selectedValue" v-model:open="isOpen" class="relative w-full">
      <SelectTrigger
        @click="isOpen = !isOpen"
        class="group relative flex h-13 w-full items-center justify-between rounded-xl px-3 text-sm before:rounded-xl rtl:flex-row-reverse"
        :class="[isOpen ? 'border-gradient-primary' : 'outline outline-[#565656]']"
        :data-selected="Boolean(selectedValue)">
        <SelectValue class="mr-auto rtl:mr-0 rtl:ml-auto">{{ selectedValue?.displayName ? selectedValue["displayName"][$i18n.locale] : "" }}</SelectValue>
        <Motion
          class="a-center-y absolute ltr:right-4 rtl:right-auto rtl:left-4"
          :animate="{
            rotate: isOpen ? 90 : -90,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 20,
            },
          }">
          <IconArrowLeft class="size-3.5 transition-colors duration-200 **:!fill-black **:dark:!fill-white" />
        </Motion>
        <InputPartsLabel :label="title" :should-float="Boolean(selectedValue)" />
      </SelectTrigger>
      <SelectPortal>
        <AnimatePresence>
          <Motion
            v-if="isOpen"
            :initial="{ opacity: 0, scale: 0.95, y: -10 }"
            :animate="{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.8,
              },
            }"
            :exit="{
              opacity: 0,
              scale: 0.95,
              y: -10,
              transition: {
                duration: 0.15,
                ease: 'easeOut',
              },
            }"
            key="content"
            class="relative z-[100]">
            <SelectContent
              position="popper"
              sticky="always"
              class="relative z-[200] mt-1 min-w-[var(--reka-select-trigger-width)] rounded-lg border border-white/10 bg-gray-200 p-2 shadow-xl backdrop-blur-sm dark:border-gray-600/20 dark:bg-[#383838]"
              :side-offset="5">
              <SelectViewport>
                <SelectGroup class="flex max-h-[300px] flex-col gap-1 overflow-y-auto py-0.5">
                  <SelectItem
                    v-for="(i, index) in options?.filter((o) => !o.isKey)"
                    class="group relative flex w-full items-center justify-between rounded-md px-2 py-2 text-xs transition-colors duration-200 outline-none select-none hover:bg-white/10"
                    :value="i"
                    :data-selected="selectedValue === i">
                    <SelectItemText class="group-data-[selected=true]:text-primary transition-colors duration-200">
                      {{ i?.displayName?.[$i18n.locale] || "" }}
                    </SelectItemText>
                    <SelectItemIndicator>
                      <Icon icon="radix-icons:check" class="text-primary size-5" />
                    </SelectItemIndicator>
                  </SelectItem>
                </SelectGroup>
              </SelectViewport>
            </SelectContent>
          </Motion>
        </AnimatePresence>
      </SelectPortal>
    </SelectRoot>
  </div>
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
