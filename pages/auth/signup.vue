<script setup lang="ts">
import {signupApi} from "~/ts/api/auth";

let username = ref();
let password = ref();
let passwordRepeat = ref();
let signup = (end: Function) => {
  if (checkValue(username.value, "#username") && checkValue(password.value, "#password")) {
    callApi(signupApi, [username.value, password.value])
      .then(res => {
        let token = res.data.token.token.split(" ")[1];
        localStorage.setItem("token", token);
        reloadNuxtApp({path: "/"});
      })
      .finally(() => {
        end();
      });
  } else end();
};
</script>
<template>
  <div class="flex-center h-screen">
    <div class="p-4 border w-[clamp(300px,90%,600px)]">
      <p class="title">
        signup
      </p>
      <TheInput v-model="username" id="username" label="username" />
      <TheInput v-model="password" id="password" label="password" type="password" />
      <TheInput v-model="passwordRepeat" id="password-repeat" label="password repeat" type="password" />
      <Btn @click="signup" />
    </div>
  </div>
</template>
