<script lang="ts">
interface MenuValue<v = string> {
  displayName: string;
  value: v;
}
export type { MenuValue };
</script>
<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "reka-ui";

const isOpen = defineModel("open", { default: false });
defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<{ displayName: string; value: string }[]>,
    required: true,
  },
});
const emit = defineEmits(["select"]);
</script>
<template>
  <div class="group" @click.stop :data-is-open="isOpen">
    <DropdownMenuRoot v-model:open="isOpen">
      <DropdownMenuTrigger
        class="flex-center bg-athens-gray-200 h-12 gap-7 rounded-xl px-4 text-[15px] font-normal transition-all duration-300 max-lg:text-xs">
        <p>{{ title }}</p>
        <CSharedIArrowBottom class="size-5 transition-transform duration-300 group-data-[is-open=true]:-rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          class="DropdownMenuContent bg-athens-gray-200 mt-3 w-[var(--reka-dropdown-menu-trigger-width)] rounded-xl py-2">
          <DropdownMenuItem
            v-for="(i, index) in items"
            :value="i"
            class="hover-opacity line-clamp-1 flex h-8 items-center px-4 text-sm text-nowrap outline-none select-none"
            @select="emit('select', i)"
            :key="index">
            {{ i.displayName }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </div>
</template>
