<script setup lang="ts">
import { fetchSignup } from "~/core/@services/auth/fetch";
import { useAccountStore } from "~/core/@services/account/store";
import { useToast } from "vue-toastification";
import { PasswordRegex } from "~/core/constants/regex";
import { validateValue } from "~/core/utils/validation";

// Meta
definePageMeta({
  layout: "auth",
});

const { t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();
const accountStore = useAccountStore();
const toast = useToast();

// Form data
const formData = reactive({
  username: "",
  password: "",
  acceptPrivacy: false,
});

// Handle form submission
const handleSubmit = async (finish: () => void) => {
  // Validate using your validation system
  if (
    validateValue(formData.username, "#username-input", { regex: OnlyEngLetterAndNumberRegex }, { message: "Please enter a valid username" }) &&
    validateValue(formData.password, "#password-input", { regex: PasswordRegex }, { message: "Password must be at least 8 characters with letters, numbers, and special characters" })
  ) {
    try {
      const response = await fetchSignup(formData.username, formData.password);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        reInitFetch();

        toast.success("Account created successfully!");
        navigateTo(localePath("/"));
      }
    } catch (err) {
      console.log(err);
    } finally {
      finish();
    }
  } else finish();
};

</script>

<template>
  <div class="signup-form">
    <!-- Header -->
    <div class="mb-8">
      <div class="mb-6 flex h-8 w-8 items-center justify-center rounded bg-black">
        <Icon name="heroicons:plus" class="h-5 w-5 text-white" />
      </div>
      <h1 class="mb-2 text-2xl font-bold text-black">Create account</h1>
      <p class="text-sm text-gray-500">Please enter your details</p>
    </div>

    <!-- Form -->
    <div>
      <!-- Username Field -->
      <InputAuth
        v-model="formData.username"
        label="Username"
        type="text"
        placeholder="Enter your username"
        :options="{ regex: { input: OnlyEngLetterAndNumberRegex } }"
        id="username-input" />

      <!-- Password Field -->
      <InputAuth
        v-model="formData.password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        :show-password-toggle="true"
        :options="{ regex: { input: OnlyEnglishCharsRegex, focusout: PasswordRegex } }"
        id="password-input"
        class="mt-6" />

      <!-- Privacy Policy -->
      <div class="mt-6">
        <label class="flex items-start space-x-2 text-sm">
          <Checkbox v-model="formData.acceptPrivacy" />
          <span class="text-gray-600">
            I accept the
            <NuxtLinkLocale to="/privacy" type="button" class="inline-block text-black hover:underline">Privacy Policy</NuxtLinkLocale>
          </span>
        </label>
      </div>
      <!-- Submit Button -->
      <BtnPrimary @click="handleSubmit" enable-loading :disabled="!formData.acceptPrivacy" class="mt-6 w-full">
        {{ "Create account" }}
      </BtnPrimary>
    </div>

    <!-- Sign In Link -->
    <div class="mt-8 text-center text-sm text-gray-500">
      Already have an account?
      <NuxtLinkLocale to="/auth/signin" class="font-medium text-black hover:underline">Sign In</NuxtLinkLocale>
    </div>
  </div>
</template>

<style scoped>
.signup-form {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
