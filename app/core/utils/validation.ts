import type { OnValueValidateFailOptions, ValidateValueOptions } from "~/core/types/validation";

const validateValue = (value: any, query: string, options?: ValidateValueOptions, onFailOptions?: OnValueValidateFailOptions) => {
  if (value === undefined || value === null || value === "") {
    onValueValidateFail(query, onFailOptions);
  } else {
    if (options?.regex && !options.regex.test(value)) {
      onValueValidateFail(query, onFailOptions);
    } else return true;
  }
};
const onValueValidateFail = (query: string, options: OnValueValidateFailOptions = {}) => {
  const { t } = useNuxtApp()?.$i18n;
  const { message = "this_field_is_required", insertAfterQuery = `${query}` } = options;

  const containerElement: HTMLDivElement | null = document.querySelector(query);
  if (containerElement) {
    containerElement?.classList.add("invalid-value-con");
    document.querySelectorAll(".invalid-value-text").forEach((el) => {
      el.remove();
    });

    // inserting text el
    const insertAfterELement = document.querySelector(insertAfterQuery);
    if (insertAfterELement) {
      const p = document.createElement("p");
      p.classList.add("invalid-value-text");
      p.setAttribute("data-message", t(message));
      insertAfterELement.parentNode?.insertBefore(p, insertAfterELement.nextSibling);
      p.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        p.remove();
      }, 8000);
    }

    setTimeout(() => {
      if (containerElement) containerElement?.classList.remove("invalid-value-con");
    }, 8000);
  }
};

export { validateValue, onValueValidateFail };
