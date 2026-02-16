import type { Directive } from "vue";

const onViewportEnter: Directive = {
  mounted(el, binding) {
    const root = document.querySelector(el.dataset.containerQuery as string);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          binding.value();
        }
      },
      { threshold: 0.1, root },
    );

    if (el) observer.observe(el);
  },
  unmounted(el) {
    const observer = el.__observer;
    if (observer) observer.disconnect();
  },
};
export { onViewportEnter };
