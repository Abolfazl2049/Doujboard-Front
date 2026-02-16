<script setup lang="ts">
import { fetchGiftCodeList } from "~/core/@services/management/fetch.utils";
import { GiftCode } from "~/core/@services/management/model";

const { title = "Gift Code", placeholder = "Select Gift Code" } = defineProps<{
  title?: string;
  placeholder?: string;
  noBinding?: boolean;
}>();

const giftCode = defineModel<GiftCode>();
const giftCodeList = ref<GiftCode[]>([]);

onMounted(() => {
  fetchGiftCodeList({ page_size: MAX_PAGE_SIZE.toString() }).then((res) => {
    giftCodeList.value = res.results.map((g) => new GiftCode(g));
  });
});
</script>
<template>
  <!-- @vue-generic {GiftCode} -->
  <Select
    v-model="giftCode"
    :placeholder="placeholder"
    :options="giftCodeList.filter((c) => c.isAvailable)"
    :label="title">
    <template #icon>
      <slot name="icon">
        <CSharedIMapPin />
      </slot>
    </template>
    <template #item="{ item }">
      <div class="flex items-center gap-1">
        <p>{{ item.code }}</p>
        <!-- <p class="text-fruit-salad font-semibold">{{ item.isActive ? "Active" : "Inactive" }}</p>
        <p class="text-red font-semibold">{{ item.hasExpired ? "Expired" : "" }}</p> -->
      </div>
    </template>
    <template #selectValue="{ value }">
      <div class="flex items-center gap-1">
        <p>{{ value.code }}</p>
        <!-- <p class="text-fruit-salad font-semibold">{{ value.isActive ? "Active" : "Inactive" }}</p>
        <p class="text-red font-semibold">{{ value.hasExpired ? "Expired" : "" }}</p> -->
      </div>
    </template>
  </Select>
</template>
