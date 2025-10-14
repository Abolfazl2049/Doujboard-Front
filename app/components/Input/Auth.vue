<script setup lang="ts">
import { BaseInputProps, type BaseInputEmits } from "~/components/Input/Base.vue";

const props = defineProps({
  ...BaseInputProps,
  label: { type: String, required: true },
  error: { type: String, required: false },
  showPasswordToggle: { type: Boolean, default: false },
});

const emit = defineEmits<BaseInputEmits>();

const value = defineModel<string>({ default: "" });
const isFocused = ref(false);
const showPassword = ref(false);

// Handle password toggle
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Get the actual input type
const inputType = computed(() => {
  if (props.type === "password" && props.showPasswordToggle) {
    return showPassword.value ? "text" : "password";
  }
  return props.type;
});

// Handle focus events
const handleFocus = () => {
  isFocused.value = true;
  emit("focus");
};

const handleFocusout = (data: { isValid: boolean; value: string }) => {
  isFocused.value = false;
  emit("focusout", data);
};
</script>

<template>
  <div :id="id" class="auth-input">
    <!-- Label -->
    <label class="mb-1 block text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Base Input -->
      <InputBase
        v-model="value"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :max-length="maxLength"
        :input-mode="inputMode"
        :options="options"
        class="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-black focus:ring-0"
        @focus="handleFocus"
        @focusout="handleFocusout"
        @change="emit('change', $event)"
        @press-enter="emit('pressEnter')" />

      <!-- Password Toggle Button -->
      <button v-if="type === 'password' && showPasswordToggle" type="button" @click="togglePassword" class="absolute top-2 right-0 text-gray-400 hover:text-gray-600">
        <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="h-5 w-5" />
      </button>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-xs text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.auth-input {
  @apply w-full;
}

/* Focus styles */
.auth-input input:focus {
  @apply outline-none;
}
</style>
