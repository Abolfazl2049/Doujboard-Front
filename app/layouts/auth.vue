<script setup lang="ts">
const route = useRoute();
const appRoute = computed(() => RouteRegistry.findRouteByPath(route.path));
</script>
<template>
  <div class="auth-layout-container relative flex h-dvh w-full items-center overflow-auto *:h-full *:w-1/2">
    <Img src="/media/images/auth-side-picture.png" class="max-lg:hidden" />
    <ClientOnly>
      <div class="flex-center relative max-lg:w-full">
        <div class="my-auto w-1/2 flex-col gap-6 max-lg:w-[90%]">
          <Img class="mx-auto size-30" src="/media/images/app-logo.png" />
          <div>
            <div class="flex-col gap-5 max-lg:gap-3.5">
              <p class="text-3xl font-bold max-lg:text-xl">
                {{ appRoute?.name === "AUTH_SIGN_IN" ? "Welcome to Doujboard" : "Verify Code" }}
              </p>
              <p class="text-primary">
                {{
                  appRoute?.name === "AUTH_SIGN_IN"
                    ? "Let’s login into your Doujboard account first"
                    : "We'll need your email to stay in touch"
                }}
              </p>
            </div>
          </div>
          <slot />
        </div>
        <p class="absolute inset-x-0 bottom-10 text-center text-sm text-[#6C7278]">
          © {{ new Date().getFullYear() }} Doujboard. All rights reserved.
        </p>
      </div>
    </ClientOnly>
  </div>
</template>
