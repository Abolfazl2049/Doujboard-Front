<script lang="ts">
export interface HeadlessDropzoneProps {
  fileSize: number;
  accept?: string;
}
</script>
<script setup lang="ts">
import type { MyFile } from "~/core/@services/@shared/types/component";
import Dropzone from "dropzone";
const { fileSize, accept = "image/jpeg,image/jpg" } = defineProps<HeadlessDropzoneProps>();

const file = defineModel<MyFile | null>();

const triggerUpload = async () => {
  const res: FileList = await uploadFile({ accept });
  if (res[0] && res[0].size < fileSize) {
    file.value = {
      raw: res[0],
      src: URL.createObjectURL(res[0]),
    };
  } else {
    file.value = null;
    toast.error(`File size must be less than ${fileSize} `);
  }
};
onMounted(() => {
  Dropzone.autoDiscover = false;
  new Dropzone(".dropzone", {
    addedfile(addedFile) {
      file.value = {
        src: URL.createObjectURL(addedFile),
        raw: addedFile,
      };
    },
    url: "any",
    autoProcessQueue: false,
    acceptedFiles: accept,
    uploadMultiple: false,
    dictDefaultMessage: "",
    maxFilesize: 5 * 1024 * 1024,
  });
});
</script>
<template>
  <div
    @click="triggerUpload"
    class="dropzone relative cursor-pointer overflow-hidden [&_.image-preview_~_*]:opacity-0!">
    <div v-if="file" class="flex-center group image-preview absolute inset-0 z-100" :data-is-valid="Boolean(file)">
      <!-- <p class="font-semibold">File selected</p> -->
      <Img :src="file.src" class="h-full max-w-full" />
      <div class="absolute top-2 right-2" @click.stop="file = undefined">
        <BtnBase class="rounded-lg bg-[#D4183D] px-1.5 py-1 text-xs text-white">
          <CSharedICross class="size-4 **:stroke-white" />
          Remove
        </BtnBase>
      </div>
    </div>

    <slot :trigger-upload="triggerUpload" />
  </div>
</template>
