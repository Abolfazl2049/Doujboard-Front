<script setup lang="ts">
let {multiple} = defineProps({
  title: {
    default: "image",
    type: String
  },
  video: Boolean,
  multiple: Boolean
});
let files = defineModel({
  default: []
});
let providingLink = ref(false);
let link = ref();
let uploadFormFile = (end: Function) => {
  uploadFile({multiple})
    .then((selectedFiles: any) => {
      files.value = [];
      setTimeout(() => {
        for (let f of selectedFiles) {
          // @ts-ignore
          files.value.push({
            file: f as File,
            src: URL.createObjectURL(f as File)
          });
        }
      }, 200);
      end();
    })
    .finally(() => {
      end();
    });
};
let deleteFile = (indx: number) => {
  files.value.splice(indx, 1);
};
let triggerProvideLink = () => {
  providingLink.value = true;
  setTimeout(() => {
    document.getElementById("link-input")?.focus();
  }, 100);
};
let finishProvidingLink = () => {
  providingLink.value = false;
  if (link.value)
    files.value.push({
      file: undefined,
      src: link.value
    });
  link.value = "";
};
</script>
<template>
  <div :title="title" class="flex-center dropzone relative mt-5 h-[300px] w-full rounded border border-gray-300 dark:border-gray-600" :id="$attrs.id as any">
    <div v-if="!files[0]?.src" class="flex gap-2">
      <Btn v-if="!providingLink" @click="uploadFormFile" class="z-[100] !mt-0">
        <p>
          upload
          {{ title }}
        </p>
      </Btn>
      <input
        v-if="providingLink"
        class="border border-gray-300 rounded-md p-1.5 px-2.5 py-0.5"
        type="text"
        @focusout="finishProvidingLink"
        id="link-input"
        v-model="link"
        placeholder="Paste link here..."
        @keypress.enter.exact.prevent="finishProvidingLink"
      />
      <button v-else @click="triggerProvideLink" class="rounded-md p-1.5 px-2.5 py-0.5 bg-gray-300 border border-gray-400 block cursor-pointer">or provide a link</button>
    </div>
    <div v-if="files.length" class="flex-center absolute inset-0 flex-wrap gap-2 overflow-auto">
      <div v-for="(file, index) in files" :key="index" class="border-primary-200 relative overflow-hidden rounded-md border">
        <div class="h-[120px] w-[200px]">
          <video :src="file.src" class="size-full" v-if="file.src && video" autoplay muted />
          <TheImg :src="file.src" class="size-full [&_img]:object-contain" v-if="file.src && !video" />
        </div>
        <Btn class="-translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 absolute !mt-0 **:!px-4 **:!py-0 **:!text-sm" color="red" :no-loading="true" @click="deleteFile(index)"
          >delete
        </Btn>
      </div>
    </div>
  </div>
</template>
