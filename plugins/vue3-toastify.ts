import Vue3Toastify, {toast, type Options as Vue3ToastifyOptions} from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin(nuxtApp => {
  let options: Vue3ToastifyOptions = {
    autoClose: 1000
  };
  nuxtApp.vueApp.use(Vue3Toastify, options);

  return {
    provide: {toast}
  };
});
