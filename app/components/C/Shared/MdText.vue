<script setup lang="ts">
import { parse } from "marked";
defineProps<{ text: string }>();
</script>

<template>
  <div class="prose min-w-full!" v-html="parse(text || '')" />
</template>
