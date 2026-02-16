<script lang="ts">
export interface RangeDate {
  from: string | null;
  to: string | null;
}
</script>
<script setup lang="ts">
defineProps<{
  label: string;
  noIcon?: boolean;
}>();

const value = defineModel<RangeDate>({ default: { from: null, to: null } });
</script>
<template>
  <div>
    <FormHeader :title="label" :no-icon="noIcon">
      <template #icon>
        <CSharedICalendar class="**:stroke-primary" />
      </template>
    </FormHeader>
    <div class="datepicker-con mt-4 space-y-6.5">
      <Datepicker v-model="value.from" placeholder="From Date" :icon="!noIcon" />
      <Datepicker v-model="value.to" placeholder="To Date" :icon="!noIcon" />
    </div>
  </div>
</template>
