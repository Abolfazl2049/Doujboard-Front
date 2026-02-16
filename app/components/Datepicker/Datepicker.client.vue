<script lang="ts">
export interface DatepickerProps {
  placeholder?: string;
  type?: "date" | "datetime" | "time" | "month";
  min?: string | null;
  label?: string;
  styleVariant?: "outlined" | "bg";
  max?: string | null;
  icon?: boolean;
  conClass?: string;
  canClear?: boolean;
  simple?: boolean;
  size?: "sm" | "md";
}
</script>
<script setup lang="ts">
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
const {
  styleVariant = "outlined",
  min,
  icon = true,
  canClear = false,
  type = "date",
  size = "md",
} = defineProps<DatepickerProps>();
const date = defineModel();
const show = ref(false);
defineOptions({
  inheritAttrs: false,
});
</script>
<template>
  <div :data-size="size" :class="conClass" class="group relative">
    <span v-if="label" class="input-label mb-1 group-data-[size=sm]:text-sm!"> {{ label }} </span>
    <div
      :id="$attrs.id as string"
      :data-sv="styleVariant"
      :class="$attrs.class"
      class="data-[sv=bg]:bg-athens-gray-200 date-box text-cod-gray-200 flex h-(--input-h) w-full items-center gap-1 rounded-(--input-radius) border px-3 group-data-[size=sm]:h-(--input-h-sm) group-data-[size=sm]:placeholder:text-xs data-[sv=bg]:border-transparent data-[sv=outlined]:border-[#0000001A] data-[sv=outlined]:bg-white"
      @click="show = true">
      <CSharedICalendar v-if="icon" class="icon min-w-6 **:!stroke-gray-500" />
      <div class="flex-center h-full gap-2">
        <div v-if="date">
          {{ new MyDate(date as string, { displayFormatVariant: "DATE" }).displayFormatted }}
        </div>
        <p v-else class="placeholder text-gray-500">{{ placeholder }}</p>
      </div>
    </div>
    <div
      v-if="date && canClear"
      class="clearer absolute right-3 bottom-[11px] cursor-pointer"
      @click.stop="date = null">
      <CSharedICross class="size-4" />
    </div>
    <Teleport to="body">
      <Vue3PersianDatetimePicker
        :min="min"
        locale="en"
        custom-input=".none"
        :show="show"
        v-model="date"
        :type="type"
        class="datepicker size-0"
        @close="show = false"
        format="YYYY-MM-DD"
        auto-submit
        :max="max" />
    </Teleport>
  </div>
</template>
