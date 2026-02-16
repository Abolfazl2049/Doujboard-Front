<script lang="ts">
interface SelectProps<Option extends Record<string, any> = Partial<Variant<any, any>>> {
  label?: string;
  options?: Option[];
  id?: string;
  placeholder?: string;
  searchable?: boolean;
  bindKey?: string;
  headerType?: "default" | "featured" | "none";
  icon?: Component;
  labelKey?: string;
  multiple?: boolean;
  required?: boolean;
  canClear?: boolean;
  description?: string;
  boundedKey?: string | number;
  disabled?: boolean;
  size?: "sm" | "md";
}
export type { SelectProps };
</script>

<script setup lang="ts" generic="Option extends Record<string, any> = Partial<Variant<any, any>>">
import type { Variant } from "#imports";
import { Icon } from "@iconify/vue";
import Fuse from "fuse.js";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "reka-ui";
import type { WatchHandle } from "vue";

const selectedValue = defineModel<Option | Option[]>();
const isOpen = defineModel("open", { default: false, type: Boolean });
const {
  headerType = "default",
  options = [],
  labelKey = "displayName",
  required,
  boundedKey,
  bindKey,
  multiple,
} = defineProps<SelectProps<Option>>();

const searchQuery = ref("");
const computedFuse = computed(() => {
  return new Fuse(options, {
    keys: ["displayName", "name"],
    threshold: 0.2,
  });
});
const hasSelected = computed(() => {
  return Boolean(multiple ? (selectedValue.value as Option[]).length : selectedValue.value);
});

const filteredOptions = computed(() => {
  if (!searchQuery.value.trim()) {
    return options;
  }
  return computedFuse.value.search(searchQuery.value).map((result) => result.item);
});

const onOpenToggle = (open: boolean) => {
  isOpen.value = open;
  if (!open) {
    searchQuery.value = "";
  }
};
onMounted(async () => {
  let watcherToDispose: WatchHandle | null = null;
  await new Promise((resolve) => {
    watcherToDispose = watch(
      () => options.length,
      (length, old) => {
        if (length) {
          return resolve(true);
        }
      },
      { immediate: true },
    );
  });
  if (watcherToDispose) (watcherToDispose as WatchHandle)?.stop();
  watch(
    () => boundedKey,
    () => {
      if (!bindKey) return;
      const found = options.find((f) => f[bindKey as keyof Option] == boundedKey);
      if (found) {
        selectedValue.value = found;
      }
    },
    { immediate: true },
  );
});
</script>

<template>
  <div class="group relative w-full" :data-size="size" :id="id">
    <!-- header -->
    <div v-if="headerType === 'default'" class="input-con flex gap-1">
      <p class="input-label group-data-[size=sm]:text-sm!">{{ label }}</p>
      <p class="text-red" v-if="required">*</p>
      <span v-if="description" class="text-pale-sky mt-0.5 ml-2 text-xs">{{ description }} </span>
    </div>
    <FormHeader v-else-if="headerType === 'featured'" :title="label || ''">
      <template #icon>
        <slot name="icon" />
      </template>
    </FormHeader>

    <!-- select -->
    <SelectRoot
      v-model="selectedValue"
      :multiple="multiple"
      v-model:open="isOpen"
      @update:open="onOpenToggle"
      class="relative w-full"
      :disabled="disabled">
      <!-- select trigger -->
      <SelectTrigger
        @click="isOpen = !isOpen"
        :data-icon="icon ? true : undefined"
        class="group bg-athens-gray-200 trigger data-is-valid:text-cod-gray-200 text-placeholder relative mt-1 flex h-(--input-h) w-full items-center justify-between rounded-(--input-radius) px-3 text-sm group-data-[size=sm]:h-(--input-h-sm) data-icon:pl-12"
        :data-is-valid="hasSelected ? true : undefined">
        <component v-if="icon" :is="icon" class="a-center-y icon absolute left-3 z-40 min-h-5 min-w-5" />
        <SelectValue class="mr-auto line-clamp-1" :placeholder="placeholder">
          <template v-if="hasSelected && selectedValue">
            <slot name="selectValue" :value="selectedValue">
              <template v-if="multiple && Array.isArray(selectedValue)">
                {{ selectedValue?.map((s) => s[labelKey as keyof Option])?.join(", ") }}
              </template>

              <template v-else>
                {{ selectedValue[labelKey] || selectedValue }}
              </template>
            </slot>
          </template>
        </SelectValue>
        <div class="a-center-y trigger-arrow absolute ltr:right-4 rtl:right-auto rtl:left-4">
          <CSharedIArrow class="size-3 transition-colors duration-200" />
        </div>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          position="popper"
          sticky="always"
          class="relative z-200 mt-1 min-w-(--reka-select-trigger-width) rounded-lg border border-white/10 bg-white p-2 shadow-xl backdrop-blur-sm dark:border-gray-600/20 dark:bg-[#383838]"
          :side-offset="5">
          <!-- Search Input -->
          <div
            v-if="searchable"
            class="mb-2 flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-700/50">
            <CSharedISearch class="size-4 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
              @click.stop />
          </div>
          <!-- select options -->
          <SelectViewport>
            <SelectGroup class="flex max-h-[300px] flex-col gap-1 overflow-y-auto py-0.5">
              <template v-if="filteredOptions.length > 0">
                <SelectItem
                  v-for="(i, index) in filteredOptions"
                  :key="index"
                  class="group relative flex w-full items-center justify-between rounded-md px-2 py-2 text-xs transition-colors duration-200 outline-none select-none hover:bg-black/5"
                  :value="i">
                  <slot name="item" :item="i">
                    <SelectItemText class="group-data-[state=checked]:text-primary transition-colors duration-200">
                      <!-- @vue-ignore -->
                      {{ i?.[labelKey] || i }}
                    </SelectItemText>
                  </slot>
                  <SelectItemIndicator>
                    <Icon icon="radix-icons:check" class="text-primary size-5" />
                  </SelectItemIndicator>
                </SelectItem>
              </template>
              <div v-else class="py-4 text-center text-xs text-gray-400">No results found</div>
            </SelectGroup>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <!-- clear btn -->
    <div
      v-if="selectedValue && canClear"
      class="clearer absolute right-8.5 bottom-[10px] cursor-pointer"
      @click.stop="selectedValue = null as any">
      <CSharedICross class="size-4" />
    </div>
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
