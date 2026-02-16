<script setup lang="ts" generic="S extends Record<string, any> = {}">
const { fetchFn } = defineProps<{
  fetchFn: () => Promise<{ data: S }>;
  fields: {
    uiVariant?: "sm" | "secondary" | "default";
    class: string;
    icon: Component;
    key: keyof S;
    label: string;
    valueClass?: string;
    iconClass?: string;
  }[];
  title?: string;
  conClass?: string;
}>();
const isFetched = ref(false);
const stats = defineModel<S>();
onMounted(() => {
  fetchFn()
    .then((res) => {
      stats.value = res.data;
    })
    .finally(() => {
      isFetched.value = true;
    });
});
</script>

<template>
  <div>
    <DataTemplate :data="stats" :is-fetched="isFetched">
      <div v-if="stats">
        <div v-if="title" class="mb-4 flex items-center justify-between">
          <p class="text-lg font-medium">{{ title }}</p>
        </div>
        <div
          class="grid gap-2 max-lg:grid-cols-1!"
          :class="conClass"
          :style="{ gridTemplateColumns: `repeat(${fields.length}, minmax(0, 1fr))` }">
          <div
            v-for="field in fields"
            :class="{
              'stats-card': field.uiVariant === 'default' || !field.uiVariant,
              'stats-card-secondary': field.uiVariant === 'secondary',
              'stats-card-sm': field.uiVariant === 'sm',
              [field.class]: true,
            }"
            :key="field.key">
            <template v-if="field.uiVariant === 'default'">
              <div>
                <p>{{ field.label }}</p>
                <p :class="field.valueClass">{{ formatPrice(stats[field.key]) }}</p>
              </div>
              <component :is="field.icon" :class="field.iconClass" />
            </template>
            <template v-else>
              <div>
                <component :is="field.icon" :class="field.iconClass" />
                <p>{{ field.label }}</p>
              </div>
              <p :class="field.valueClass">{{ stats[field.key] }}</p>
            </template>
          </div>
        </div>
      </div>
      <template #loading>
        <div class="h-32 w-full animate-pulse rounded-xl bg-[#F5F5F5]" />
      </template>
      <template #empty> <div class="text-center">Failed to Retrieve Stats</div> </template>
    </DataTemplate>
  </div>
</template>
<style>
@reference '~/assets/css/tailwind.css';

.stats-card {
  @apply flex-between [&_p]:first:text-river-bed [&_p]:last:text-cod-gray-200 rounded-xl border bg-linear-[135deg] px-4 py-6 [&_p]:first:text-sm [&_p]:last:text-3xl;
}
.stats-card > svg {
  @apply size-8;
}
.stats-card-secondary {
  @apply flex-col gap-10 rounded-xl border bg-linear-[135deg] px-6 py-4.5;
}
.stats-card-secondary > div {
  @apply text-cod-gray-200 flex items-center gap-2 text-[15px];
}
.stats-card-secondary > p {
  @apply mt-6 text-3xl;
}
.stats-card-sm {
  @apply flex-between rounded-xl border bg-linear-[135deg] px-4 py-5.5;
}
.stats-card-sm > p {
  @apply text-2xl;
}
.stats-card-sm > div > p {
  @apply text-cod-gray-200 text-[17px];
}
.stats-card-sm > div {
  @apply flex items-center gap-1.5;
}
.stats-card-sm svg {
  @apply size-5;
}
.stats-card-con {
  @apply grid w-full gap-3.5;
}
</style>
