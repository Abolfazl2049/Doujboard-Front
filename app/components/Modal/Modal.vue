<script setup>
import { AnimatePresence, Motion } from "motion-v";
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from "reka-ui";

const { enabledClose } = defineProps({
  enabledClose: {
    type: Boolean,
    default: true,
  },
  conAttrs: Object,
  closeIcon: Boolean,
});
const open = defineModel({ default: false });
const emits = defineEmits(["close", "open"]);
watch(open, (val) => {
  emits(val ? "open" : "close");
});
const localeHead = useLocaleHead({ dir: true });
defineOptions({
  inheritAttrs: false,
});
</script>
<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <AnimatePresence>
        <DialogOverlay class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[3px]" />
        <DialogContent as-child>
          <Motion :initial="{ opacity: 0, top: '0%' }" :animate="{ opacity: 1, top: '50%' }" :exit="{ opacity: 0, top: '30%' }">
            <div :dir="localeHead.dir" class="a-center fixed z-[100]" :class="$attrs.class">
              <slot />
              <IconRoundedX v-if="closeIcon" class="mx-auto mt-3" @click="open = false" />
            </div>
          </Motion>
        </DialogContent>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>
</template>
