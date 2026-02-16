<script setup lang="ts">
import Zoomist from "zoomist";
import type { PropType } from "vue";

const { src, external } = defineProps({
  src: {
    type: String as PropType<string>,
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
});

let isLoaded = ref(false);
let imgSrc = ref();
const imgRef = useTemplateRef("img");
const emits = defineEmits(["load", "error"]);
const zoomist = ref<Zoomist>();
const zoomContainer = useTemplateRef("zoomist-container");

const initZoomist = () => {
  // Destroy previous instance if exists
  if (zoomist.value) {
    zoomist.value.destroy();
  }

  nextTick(() => {
    if (zoomContainer.value && isLoaded.value) {
      zoomist.value = new Zoomist(zoomContainer.value as HTMLElement, {
        draggable: true,
        wheelable: true,
        pinchable: true,
        bounds: true,
        zoomRatio: 0.2,
        minScale: 1,
        maxScale: 15,
        initScale: 1,
        dragReleaseOnBounds: true,
        wheelReleaseOnMinMax: true,
        disableDraggingClass: "disabled",
        disableWheelingClass: "disabled",
        smooth: { damping: 1 },
        slider: false,
        zoomer: false,
      });
    }
  });
};

const onLoad = () => {
  isLoaded.value = true;
  initZoomist();
  emits("load");
};

const onError = () => emits("error");

watch(
  () => src,
  () => {
    if (external) {
      if (src) imgSrc.value = src?.includes("http") ? src : `${BASE_API_URL}${src}`;
    } else {
      imgSrc.value = src;
    }
    isLoaded.value = false;
  },
  { immediate: true },
);
defineExpose({
  zoomist,
  imgRef,
  isLoaded,
});
</script>
<template>
  <div ref="zoomist-container" class="group zoomist-container relative overflow-hidden">
    <div class="zoomist-wrapper">
      <div class="zoomist-image">
        <img
          ref="img"
          :src="imgSrc"
          @load="onLoad"
          :class="$attrs.class"
          class="size-full object-contain group-data-[is-contain=true]:object-contain"
          @error="onError" />
      </div>
    </div>
  </div>
</template>
