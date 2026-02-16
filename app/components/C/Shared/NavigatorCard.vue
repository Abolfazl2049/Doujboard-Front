<script setup lang="ts">
import { CUserIUsers } from "#components";
import type { Component } from "vue";
import { useAccountStore } from "~/core/@services/account/store";

const { color, icon = CUserIUsers } = defineProps<{
  title: string;
  count?: number;
  color: "orange" | "green" | "blue" | "red" | "yellow" | "purple" | "brown" | "gray" | "pink" | "lime" | "paleBlue";
  route?: AppRoute;
  path?: string;
  icon?: Component;
}>();
const accountStore = useAccountStore();
const getColorDetail = () => {
  switch (color) {
    case "orange":
      return {
        iconColor: "**:stroke-[#E04A05] bg-[#FFE8D5]",
        blurBox: "#FF8749",
        bg: "#FFF3E8",
      };

    case "green":
      return {
        iconColor: "**:stroke-[#1E4620] bg-[#D4F4DD]",
        blurBox: "#4CAF50",
        bg: "#33B6471A",
      };

    case "blue":
      return {
        iconColor: "**:stroke-[#392DCA] bg-[#D5E3FF]",
        blurBox: "#2962FF",
        bg: "#2962FF1A",
      };

    case "red":
      return {
        iconColor: "**:stroke-[#D81B60] bg-[#FFD5DC]",
        blurBox: "#F48FB1",
        bg: "#FFB6C133",
      };

    case "yellow":
      return {
        iconColor: "**:stroke-[#896300] bg-[#FFF4CC]",
        blurBox: "#FFB700",
        bg: "#FFE3001A",
      };

    case "purple":
      return {
        iconColor: "**:stroke-[#300066] bg-[#E8D5FF]",
        blurBox: "#762DCA",
        bg: "#762DCA1A",
      };

    case "brown":
      return {
        iconColor: "**:stroke-[#4E342E] bg-[#E0D5D1]",
        blurBox: "#8D6E63",
        bg: "#7955481A",
      };

    case "gray":
      return {
        iconColor: "**:stroke-[#263238] bg-[#CFD8DC]",
        blurBox: "#78909C",
        bg: "#607D8B1A",
      };

    case "pink":
      return {
        iconColor: "**:stroke-[#880E4F] bg-[#FFD5E5]",
        blurBox: "#EC407A ",
        bg: "#EC407A1A",
      };

    case "paleBlue":
      return {
        iconColor: "**:stroke-[#01579B] bg-[#CCF0FF]",
        blurBox: "#03A9F4",
        bg: "#03A9F41A",
      };

    case "lime":
      return {
        iconColor: "**:stroke-[#33691E] bg-[#E8F5D8]",
        blurBox: "#9CCC65",
        bg: "#9CCC651A",
      };
  }
};
</script>
<template>
  <NuxtLink
    v-if="!route || accountStore.data?.role.hasAccessToAppSection(route.section.name)"
    class="hover-opacity relative w-full overflow-hidden rounded-[14px] border-2 border-black/5"
    :style="`background: ${getColorDetail().bg};`"
    :to="path! || (route?.path as string)">
    <div
      class="absolute -top-3 -left-4 size-20 rounded-full opacity-70 blur-[40px]"
      :style="`background: ${getColorDetail().blurBox};`" />
    <div class="relative z-1 px-4 py-6">
      <div class="flex w-full justify-between">
        <div class="flex-center size-12 rounded-xl *:size-5.5" :class="getColorDetail().iconColor">
          <component :is="icon" />
        </div>
      </div>
      <div class="mt-6 flex w-full justify-between">
        <p class="text-xl">{{ title }}</p>
        <div class="mt-4 text-[24px] font-light text-[#404040]" v-if="typeof count === 'number'">
          {{ formatPrice(count as number) }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
