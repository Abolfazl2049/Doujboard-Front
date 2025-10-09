<script lang="ts">
interface BaseDrawerEmits {
  close: [];
  open: [];
}
export type { BaseDrawerEmits };
</script>
<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { animate, AnimatePresence, Motion, useMotionValue } from "motion-v";
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from "reka-ui";
const inertiaTransition = {
  type: "inertia" as const,
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300,
};

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
};

const SHEET_MARGIN = 650;

const { height } = useWindowSize();

const open = defineModel("open", {
  default: false,
});
watch(open, (v) => {
  if (v === false) emits("close");
  else emits("open");
});
const h = computed(() => height.value - SHEET_MARGIN);
const y = useMotionValue(h.value);
const {} = defineProps({
  borderGradient: Boolean,
});
const emits = defineEmits<BaseDrawerEmits>();
const localeHead = useLocaleHead({ dir: true });
</script>
<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <AnimatePresence multiple as="div">
        <DialogOverlay as-child>
          <Motion class="fixed inset-0 z-50 bg-black/30" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }" :transition="staticTransition as any" />
        </DialogOverlay>

        <DialogContent as-child>
          <Motion
            v-bind="$attrs"
            class="a-center-x border-primary dark:bg-mine-shaft fixed bottom-0 z-[50] min-h-[350px] w-full max-w-[540px] rounded-t-[35px] bg-white px-4 pb-4 shadow-lg will-change-transform !outline-none data-[border-gradient-primary=true]:border-t lg:rounded-t-[45px]"
            :data-border-gradient-primary="borderGradient ? true : false"
            :style="{ y }"
            :initial="{ y: '100%' }"
            :animate="{ y: 0 }"
            :exit="{ y: '100%' }"
            :transition="staticTransition as any"
            drag="y"
            :drag-constraints="{ top: 0, bottom: 0 }"
            @drag="
              (e, { offset }) => {
                if (offset.y < 0) {
                  y.set(0);
                }
              }
            "
            @drag-end="
              (e, { offset, velocity }) => {
                if (offset.y > height * 0.85 || velocity.y > 40) {
                  open = false;
                } else {
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }
            ">
            <div class="relative max-h-8">
              <div class="mx-auto mt-4 h-4 !max-h-[3px] w-8 rounded-full bg-[#ACACAC]" />
            </div>
            <slot />
          </Motion>
        </DialogContent>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>
</template>
