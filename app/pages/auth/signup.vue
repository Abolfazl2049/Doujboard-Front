<script setup lang="ts">
import { fetchVerifyOtp } from "~/core/@services/auth/fetch";
import { useAccountStore } from "~/core/@services/account/store";
import { useToast } from "vue-toastification";
import { EmailRegex, PasswordRegex } from "~/core/constants/regex";
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
  email: "",
  password: "",
  acceptPrivacy: false,
});

// Form state
const isLoading = ref(false);

// Handle form submission
const handleSubmit = async () => {
  // Validate using your validation system
  if (
    validateValue(formData.email, "#email-input", { regex: EmailRegex }, { message: "Please enter a valid email address" }) &&
    validateValue(formData.password, "#password-input", { regex: PasswordRegex }, { message: "Password must be at least 8 characters with letters, numbers, and special characters" })
  ) {
    isLoading.value = true;
    try {
      const response = await fetchVerifyOtp(formData.email, formData.password, "", "");

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        accountStore.setToken(response.data.token);

        toast.success("Account created successfully!");
        await router.push(localePath("/"));
      }
    } catch (error: any) {
      if (error.status === 409) {
        toast.error("This email is already registered");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      isLoading.value = false;
    }
  }
};

// Handle Google Sign Up
const handleGoogleSignUp = () => {
  toast.info("Google Sign-Up coming soon!");
};

// Switch to signin
const switchToSignin = () => {
  router.push(localePath("/auth/signin"));
};

// Open privacy policy
const openPrivacy = () => {
  window.open("/privacy", "_blank");
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
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Email Field -->
      <InputAuth v-model="formData.email" label="Email" type="email" placeholder="Enter your email" :options="{ regex: { focusout: EmailRegex } }" id="email-input" />

      <!-- Password Field -->
      <InputAuth
        v-model="formData.password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        :show-password-toggle="true"
        :options="{ regex: { focusout: PasswordRegex } }"
        id="password-input" />

      <!-- Privacy Policy -->
      <div>
        <label class="flex items-start space-x-2 text-sm">
          <input v-model="formData.acceptPrivacy" type="checkbox" class="mt-1 rounded border-gray-300" />
          <span class="text-gray-600">
            I accept the
            <button type="button" @click="openPrivacy" class="text-black hover:underline">Privacy Policy</button>
            and Terms of Service
          </span>
        </label>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full rounded-lg bg-black py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
        {{ isLoading ? "Creating account..." : "Create account" }}
      </button>

      <!-- Google Sign Up -->
      <button
        type="button"
        @click="handleGoogleSignUp"
        class="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
        <Icon name="logos:google-icon" class="h-5 w-5" />
        <span>Sign up with Google</span>
      </button>
    </form>

    <!-- Sign In Link -->
    <div class="mt-8 text-center text-sm text-gray-500">
      Already have an account?
      <button type="button" @click="switchToSignin" class="font-medium text-black hover:underline">Sign In</button>
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
