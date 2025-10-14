<script setup lang="ts">
import { fetchSignIn } from "~/core/@services/auth/fetch";
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
});

// Form state
const isLoading = ref(false);
const rememberMe = ref(false);

// Validation
const errors = reactive({
  email: "",
  password: "",
});

// Handle form submission
const handleSubmit = async () => {
  // Reset errors
  errors.email = "";
  errors.password = "";

  // Validate using your validation system
  const emailValid = validateValue(formData.email, "#email-input", { regex: EmailRegex }, { message: "Please enter a valid email address" });

  const passwordValid = validateValue(
    formData.password,
    "#password-input",
    { regex: PasswordRegex },
    { message: "Password must be at least 8 characters with letters, numbers, and special characters" },
  );

  if (!emailValid || !passwordValid) {
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetchSignIn(formData.email, formData.password);

    if (response.token) {
      localStorage.setItem("token", response.token);
      accountStore.setToken(response.token);

      toast.success("Welcome back!");
      await router.push(localePath("/"));
    }
  } catch (error: any) {
    if (error.status === 401) {
      toast.error("Invalid email or password");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } finally {
    isLoading.value = false;
  }
};

// Handle Google Sign In
const handleGoogleSignIn = () => {
  toast.info("Google Sign-In coming soon!");
};

// Handle forgot password
const handleForgotPassword = () => {
  toast.info("Forgot password feature coming soon!");
};

// Switch to signup
const switchToSignup = () => {
  router.push(localePath("/auth/signup"));
};
</script>

<template>
  <div class="signin-form">
    <!-- Header -->
    <div class="mb-8">
      <div class="mb-6 flex h-8 w-8 items-center justify-center rounded bg-black">
        <Icon name="heroicons:plus" class="h-5 w-5 text-white" />
      </div>
      <h1 class="mb-2 text-2xl font-bold text-black">Welcome back!</h1>
      <p class="text-sm text-gray-500">Please enter your details</p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Email Field -->
      <AuthInput v-model="formData.email" label="Email" type="email" placeholder="Enter your email" :error="errors.email" :options="{ regex: { focusout: EmailRegex } }" id="email-input" />

      <!-- Password Field -->
      <AuthInput
        v-model="formData.password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        :error="errors.password"
        :show-password-toggle="true"
        :options="{ regex: { focusout: PasswordRegex } }"
        id="password-input" />

      <!-- Remember Me & Forgot Password -->
      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center">
          <input v-model="rememberMe" type="checkbox" class="mr-2 rounded border-gray-300" />
          Remember for 30 days
        </label>
        <button type="button" @click="handleForgotPassword" class="text-gray-500 hover:text-black">Forgot password?</button>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full rounded-lg bg-black py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
        {{ isLoading ? "Signing in..." : "Log in" }}
      </button>

      <!-- Google Sign In -->
      <button
        type="button"
        @click="handleGoogleSignIn"
        class="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
        <Icon name="logos:google-icon" class="h-5 w-5" />
        <span>Log in with Google</span>
      </button>
    </form>

    <!-- Sign Up Link -->
    <div class="mt-8 text-center text-sm text-gray-500">
      Don't have an account?
      <button type="button" @click="switchToSignup" class="font-medium text-black hover:underline">Sign Up</button>
    </div>
  </div>
</template>

<style scoped>
.signin-form {
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
