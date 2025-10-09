<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { VueScrollPicker, type VueScrollPickerValue } from "vue-scroll-picker";
import "vue-scroll-picker/style.css";
import "moment/dist/locale/fa";
const { locale } = useI18n();
import moment from "moment-jalaali";

// current values
const currentValue = defineModel({ default: "" });
const momentCurrentValue = computed(() => {
  return useMoment()(currentValue.value);
});
const currentYear = computed(() => (locale.value === "fa-IR" ? momentCurrentValue.value.jYear() : momentCurrentValue.value.year()));
const currentMonth = computed(() =>
  locale.value === "fa-IR" ? months.value.find((m) => m.value === momentCurrentValue.value.jMonth() + 1) : months.value.find((m) => m.value === momentCurrentValue.value.month() + 1),
);
const currentDay = computed(() => (locale.value === "fa-IR" ? momentCurrentValue.value.jDate() : momentCurrentValue.value.date()));

// list values
const months = computed(() => {
  const today = useMoment()();
  const eighteenYearsAgo = today.clone().subtract(18, "years");
  const isCurrentYear = locale.value === "fa-IR" ? currentYear.value === eighteenYearsAgo.jYear() : currentYear.value === eighteenYearsAgo.year();

  const allMonths =
    locale.value === "fa-IR"
      ? [
          { label: "فروردین", value: 1 },
          { label: "اردیبهشت", value: 2 },
          { label: "خرداد", value: 3 },
          { label: "تیر", value: 4 },
          { label: "امرداد", value: 5 },
          { label: "شهریور", value: 6 },
          { label: "مهر", value: 7 },
          { label: "آبان", value: 8 },
          { label: "آذر", value: 9 },
          { label: "دی", value: 10 },
          { label: "بهمن", value: 11 },
          { label: "اسفند", value: 12 },
        ]
      : [
          { label: "January", value: 1 },
          { label: "February", value: 2 },
          { label: "March", value: 3 },
          { label: "April", value: 4 },
          { label: "May", value: 5 },
          { label: "June", value: 6 },
          { label: "July", value: 7 },
          { label: "August", value: 8 },
          { label: "September", value: 9 },
          { label: "October", value: 10 },
          { label: "November", value: 11 },
          { label: "December", value: 12 },
        ];

  return isCurrentYear ? allMonths.filter((month) => month.value <= (locale.value === "fa-IR" ? eighteenYearsAgo.jMonth() + 1 : eighteenYearsAgo.month() + 1)) : allMonths;
});

const years = computed(() => {
  const maxYear = locale.value === "fa-IR" ? useMoment()().jYear() - 18 : useMoment()().year() - 18;
  const lastYear = (locale.value === "fa-IR" ? useMoment()().jYear() : useMoment()().year()) - 18 - MAX_USER_AGE;
  return Array.from({ length: maxYear - lastYear + 1 }, (_, index) => lastYear + index);
});

const days = computed(() => {
  let currentMonthEnsure = 0;
  if (currentMonth.value) currentMonthEnsure = currentMonth.value.value - 1;
  const lastDay = locale.value === "fa-IR" ? moment.jDaysInMonth(currentYear.value, currentMonthEnsure) : useMoment()([currentYear.value, currentMonthEnsure]).daysInMonth();
  // Check if it's the current month of 18 years ago
  const today = useMoment()();
  const eighteenYearsAgo = today.clone().subtract(18, "years");
  const isCurrentYear = locale.value === "fa-IR" ? currentYear.value === eighteenYearsAgo.jYear() : currentYear.value === eighteenYearsAgo.year();
  const isCurrentMonth = locale.value === "fa-IR" ? currentMonth.value?.value === eighteenYearsAgo.jMonth() + 1 : currentMonth.value?.value === eighteenYearsAgo.month() + 1;

  if (isCurrentYear && isCurrentMonth) {
    return Array.from({ length: locale.value === "fa-IR" ? eighteenYearsAgo.jDate() : eighteenYearsAgo.date() }, (_, index) => index + 1);
  }
  return Array.from({ length: lastDay }, (_, index) => index + 1);
});

// handlers

function handleUpdateYear(value: VueScrollPickerValue | undefined) {
  currentValue.value = locale.value === "fa-IR" ? momentCurrentValue.value.jYear(value as number).format("YYYY-MM-DD") : momentCurrentValue.value.year(value as number).format("YYYY-MM-DD");
}

function handleUpdateMonth(value: VueScrollPickerValue | undefined) {
  currentValue.value =
    locale.value === "fa-IR"
      ? momentCurrentValue.value.jMonth((months.value.find((m) => m.label === value)?.value ?? 0) - 1).format("YYYY-MM-DD")
      : momentCurrentValue.value.month((months.value.find((m) => m.label === value)?.value ?? 0) - 1).format("YYYY-MM-DD");
}

function handleUpdateDay(value: VueScrollPickerValue | undefined) {
  currentValue.value = locale.value === "fa-IR" ? momentCurrentValue.value.jDate(value as number).format("YYYY-MM-DD") : momentCurrentValue.value.date(value as number).format("YYYY-MM-DD");
}
</script>
<template>
  <div id="birth-date" dir="ltr" class="flex">
    <VueScrollPicker class="day-picker !h-[440px] min-w-[80px] text-3xl" :options="days" :model-value="currentDay" @update:model-value="handleUpdateDay" />
    <VueScrollPicker
      class="month-picker relative top-0.5 !h-[440px] min-w-[180px] text-[32px]"
      :options="months?.map(({ label }) => label)"
      :model-value="currentMonth?.label"
      @update:model-value="handleUpdateMonth" />
    <VueScrollPicker class="year-picker relative bottom-1.5 !h-[440px] min-w-[80px] text-2xl" :options="years" :model-value="currentYear" @update:model-value="handleUpdateYear" />
  </div>
</template>
<style>
@reference '~/assets/css/tailwind.css';

/* public  */
.vue-scroll-picker-layer-top,
.vue-scroll-picker-layer-bottom {
  @apply border-none bg-none;
}
.vue-scroll-picker-layer-selection {
  @apply border-primary h-[80px] !border-y-3;
}
.vue-scroll-picker-item {
  @apply text-transparent;
}
.vue-scroll-picker-item[aria-selected="true"] {
  @apply text-primary-200 scale-115 font-extrabold transition-all;
}

/* First item before selected */
.vue-scroll-picker-item:has(+ [aria-selected="true"]) {
  @apply font-medium text-black dark:text-white;
}

/* Second item before selected */
.vue-scroll-picker-item:has(+ .vue-scroll-picker-item + [aria-selected="true"]) {
  @apply scale-70 text-black opacity-50 dark:text-white;
}

/* Third item before selected */
.vue-scroll-picker-item:has(+ .vue-scroll-picker-item + .vue-scroll-picker-item + [aria-selected="true"]) {
  @apply scale-60 text-black opacity-30 dark:text-white;
}

/* First item after selected */
.vue-scroll-picker-item[aria-selected="true"] + .vue-scroll-picker-item {
  @apply font-medium text-black dark:text-white;
}

/* Second item after selected */
.vue-scroll-picker-item[aria-selected="true"] + .vue-scroll-picker-item + .vue-scroll-picker-item {
  @apply scale-70 text-black opacity-50 dark:text-white;
}

/* Third item after selected */
.vue-scroll-picker-item[aria-selected="true"] + .vue-scroll-picker-item + .vue-scroll-picker-item + .vue-scroll-picker-item {
  @apply scale-60 text-black opacity-30 dark:text-white;
}

.month-picker .vue-scroll-picker-item[aria-selected="true"] {
  @apply text-primary;
}
.month-picker .vue-scroll-picker-rotator {
  @apply space-y-6;
}
.day-picker .vue-scroll-picker-rotator {
  @apply space-y-[26px];
}
.year-picker .vue-scroll-picker-rotator {
  @apply space-y-8;
}
</style>
