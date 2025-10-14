<script setup lang="ts">
// Meta
definePageMeta({
  layout: "default",
});

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    navigateTo("/");
  }
};
</script>

<template>
  <div class="privacy-page min-h-screen bg-white">
    <!-- Header -->
    <div class="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-4xl px-4 py-4">
        <div class="flex items-center space-x-4">
          <button @click="goBack" class="rounded-lg p-2 transition-colors hover:bg-gray-100">
            <Icon name="heroicons:arrow-left" class="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 class="text-2xl font-bold text-black">Privacy Policy</h1>
            <p class="text-sm text-gray-500">How we protect your data</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="mx-auto max-w-4xl px-4 py-8">
      <div class="prose prose-gray max-w-none">
        <h2>Introduction</h2>
        <p>Welcome to Doujboard! We are committed to protecting your privacy and ensuring the security of your personal information.</p>

        <h2>What We Collect</h2>
        <ul>
          <li><strong>Email Address:</strong> Used for account creation and communication</li>
          <li><strong>Password:</strong> Securely hashed and stored for authentication</li>
          <li><strong>Usage Data:</strong> Basic analytics to improve our service</li>
        </ul>

        <h2>What We DON'T Collect</h2>
        <ul>
          <li>❌ Personal tracking data</li>
          <li>❌ Advertising identifiers</li>
          <li>❌ Location data</li>
          <li>❌ Device fingerprints</li>
          <li>❌ Third-party cookies</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Create and maintain your user account</li>
          <li>Save and sync your personal data across devices</li>
          <li>Send important updates about your account</li>
          <li>Improve our service based on usage patterns</li>
        </ul>

        <h2>Data Security</h2>
        <p>All data is encrypted in transit and at rest. We use industry-standard security measures to protect your information.</p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>✅ Access your personal data</li>
          <li>✅ Correct inaccurate information</li>
          <li>✅ Delete your account and data</li>
          <li>✅ Export your data</li>
          <li>✅ Opt-out of communications</li>
        </ul>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p><strong>Email:</strong> privacy@doujboard.co.uk</p>

        <p class="mt-8 text-sm text-gray-500">
          <em>Last updated: {{ new Date().toLocaleDateString() }}</em>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.privacy-page {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.prose h2 {
  @apply mt-8 mb-4 text-xl font-semibold text-black;
}

.prose h2:first-child {
  @apply mt-0;
}

.prose p {
  @apply mb-4 leading-relaxed text-gray-700;
}

.prose ul {
  @apply mb-4 space-y-2;
}

.prose li {
  @apply text-gray-700;
}

.prose strong {
  @apply font-semibold text-black;
}
</style>
