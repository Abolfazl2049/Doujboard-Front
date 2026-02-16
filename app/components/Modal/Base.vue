<script lang="ts">
interface BaseModalProps {
  dismissible?: boolean;
  publicModal?: boolean;
  name?: PublicModalName;
  highZ?: boolean;
}

export type { BaseModalProps };
</script>
<script lang="ts" setup>
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from "reka-ui";
import type { PublicModalName } from "~/core/@services/@shared";
const { dismissible = true, publicModal, name } = defineProps<BaseModalProps>();
const open = defineModel({ default: false });

// PM = Public Modal
const isPMOpen = ref(false);
const emits = defineEmits(["close", "open"]);

watch(open, (val) => {
  emits(val ? "open" : "close");
  if (!val && publicModal) {
    PublicModalChannel.publish({
      actionType: "close",
      name: name || "addFlag",
    });
    isPMOpen.value = false;
  }
});

const handlePointerDownOutside = (event: Event) => {
  if (!dismissible) event.preventDefault();
};

const handleEscapeKeyDown = (event: Event) => {
  if (!dismissible) event.preventDefault();
};

const onInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target?.closest(".vpd-wrapper")) return event.preventDefault();
};

onMounted(() => {
  const subscription = PublicModalChannel.subscribe((ev) => {
    if (ev.actionType === "open") isPMOpen.value = true;
  });
  onUnmounted(() => {
    subscription.unsubscribe();
  });
});
defineOptions({
  inheritAttrs: false,
});
</script>
<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay>
        <div
          :data-high-z="highZ ? true : undefined"
          class="fixed inset-0 z-[99] bg-black/70 data-high-z:z-[102]! data-public-modal:z-[101]"
          :data-public-modal="publicModal ? true : undefined" />
      </DialogOverlay>
      <DialogContent
        @pointer-down-outside="handlePointerDownOutside"
        @escape-key-down="handleEscapeKeyDown"
        @interact-outside="onInteractOutside">
        <div
          :data-high-z="highZ ? true : undefined"
          :data-public-modal="publicModal ? true : undefined"
          class="a-center fixed z-100 max-h-screen overflow-auto data-high-z:z-[102]! data-public-modal:z-101">
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
