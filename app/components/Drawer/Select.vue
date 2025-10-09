<script lang="ts">
class ExtendedPublicMode extends PublicModel {
  [key: string]: any;
  constructor(data: any) {
    super(data);
  }
}
</script>
<script setup lang="ts" generic="T extends PublicModel">
import { Icon } from "@iconify/vue";
import Fuse, { type IFuseOptions } from "fuse.js";
import { PublicModel } from "~/core/@services/public/model";
import type { FetchPaginationListResponse } from "~/core/types/fetch";

const { fetchList, model, multiple, options } = defineProps<{
  fetchList: () => Promise<FetchPaginationListResponse | Record<string, any>[]>;
  model: new (data: any) => T;
  multiple?: boolean;
  options?: {
    maxLength?: number;
    noRegex?: boolean;
  };
  ltr?: boolean;
}>();

const open = defineModel("open", {
  default: false,
});
const selected = defineModel<T | undefined>("selected");
const selectedList = defineModel<T[]>("selectedList", { default: [] });

const tempSelectedList = ref<T[]>([]);

const search = ref();
const isReceived = ref(false);
const list = ref<T[]>([]);
const { t } = useI18n();
const fuseOptions: IFuseOptions<T> = {
  includeScore: true,
  threshold: 0.1,
  keys: ["name"],
};
const countryFuse = computed(() => new Fuse((list.value as T[]) ?? [], fuseOptions));
const emit = defineEmits<{
  submit: [T | undefined];
  submitList: [T[]];
}>();

const searchResult = computed(() => {
  if (search.value) {
    return countryFuse.value.search(search.value).map((r) => r.item);
  } else return list.value;
});

const onSelect = (item: T) => {
  if (multiple) {
    if (tempSelectedList.value.find((i) => i.id === item.id))
      tempSelectedList.value.splice(
        tempSelectedList.value.findIndex((i) => i.id === item.id),
        1,
      );
    else {
      if (options?.maxLength && tempSelectedList.value.length >= options?.maxLength) toast.warning(t("max_selected_count_reached"));
      else tempSelectedList.value.push(item as any);
    }
  } else {
    selected.value = item;
    open.value = false;
  }
};

const onSubmit = () => {
  selectedList.value = [...tempSelectedList.value] as T[];
  open.value = false;
};
const onOpen = () => {
  tempSelectedList.value = [...selectedList.value] as any;
  if (!isReceived.value)
    fetchList()
      .then((res) => {
        if (Array.isArray(res)) {
          list.value = res.map((c) => new model(c));
        } else {
          list.value = res.results.map((c) => new model(c));
        }
      })
      .finally(() => {
        isReceived.value = true;
      });
};
</script>
<template>
  <Drawer v-model:open="open" class="!min-h-[450px]" @open="onOpen">
    <button autofocus class="sr-only" />
    <Input
      v-model="search"
      :options="{
        regex: {
          input: options?.noRegex ? undefined : OnlyEnglishLetterRegex,
        },
      }"
      :title="$t('search')"
      class="mt-4 mb-3 w-[90%] scale-y-[.90]"
      ltr />
    <div v-if="multiple" class="flex gap-1 overflow-x-auto">
      <div
        v-for="(c, indx) in tempSelectedList"
        :key="c.id"
        class="dark:bg-mine-shaft bg-alto flex w-fit flex-initial items-center gap-2 rounded-xl px-2 py-1 text-xs"
        @click="tempSelectedList.splice(indx, 1)">
        <span>
          {{ c.name }}
        </span>
        <Icon icon="material-symbols:cancel" class="text-primary size-3.5" />
      </div>
    </div>
    <DataTemplate :data="searchResult" :is-complete="isReceived">
      <div class="mt-5 flex max-h-[300px] min-h-[250px] flex-col gap-4.5 overflow-y-scroll px-3" :dir="ltr || $i18n.locale === 'en-GB' ? 'ltr' : 'rtl'">
        <div
          v-for="i in searchResult.filter(({ id }) => !tempSelectedList.find((item) => item.id === id))"
          class="group relative flex w-full items-center gap-2"
          :data-selected="selected === i || Boolean(tempSelectedList.find((item) => item.id === i.id))"
          @click="onSelect(i as T)">
          <slot name="option" :option="i">
            <p class="group group-data-[selected=true]:text-primary text-base data-[selected=true]:font-medium">{{ i.name }}</p>
            <Icon icon="material-symbols:fitbit-check-small-sharp" class="text-primary a-center-y absolute hidden size-5.5 group-data-[selected=true]:block ltr:right-2 rtl:left-2" />
          </slot>
        </div>
      </div>
      <div v-if="multiple" class="mx-auto flex w-[95%] gap-2">
        <BtnGray class="flex-1" @click="open = false">
          {{ $t("cancel") }}
        </BtnGray>
        <BtnPrimary class="flex-1" @click="onSubmit">
          {{ $t("submit") }}
        </BtnPrimary>
      </div>
      <template #loading>
        <div class="mt-5 flex max-h-[300px] flex-col gap-2 overflow-y-hidden px-3">
          <div v-for="i in 10" class="flex h-8 w-full items-center justify-between">
            <div class="h-5 w-24 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-400"></div>
            <div class="h-5 w-8 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-400"></div>
          </div>
        </div>
      </template>
      <template #empty>
        <span class="pt-10 text-center">
          {{ $t("no_data_found") }}
        </span>
      </template>
    </DataTemplate>
    <!-- country list -->
  </Drawer>
</template>
