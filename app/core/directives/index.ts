import type {Directive} from "vue";

const onViewportEnter: Directive = {
  mounted(el, binding, vnode) {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) binding.value();
      },
      {threshold: 0.1}
    );

    if (el) observer.observe(el);
  }
};
export {onViewportEnter};
