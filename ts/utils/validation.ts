let checkValue = (value: any, query: string) => {
  if (value === undefined || value === null || value === "") {
    const elements = document.querySelectorAll(query);
    elements.forEach(el => {
      el?.classList.add("warn");
    });
    showWarnText(elements[elements.length - 1] as HTMLElement, "this field is required");

    setTimeout(() => {
      elements.forEach(el => {
        el?.classList.remove("warn");
      });
    }, 8000);
  } else {
    return true;
  }
};
let showWarnText = (el: HTMLElement, content: string) => {
  document.querySelectorAll(".warn-text").forEach(el => {
    el.remove();
  });
  let p = document.createElement("p");
  p.classList.add("warn-text");
  p.setAttribute("warn-text-content", content);
  el.parentNode?.insertBefore(p, el.nextSibling);
  setTimeout(() => {
    p.remove();
  }, 8000);
};
export {checkValue};
