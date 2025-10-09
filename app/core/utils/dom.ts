const clickOnMyBtn = (query: string = "button") => {
  const btnEl: HTMLButtonElement | null = document.querySelector(query);
  btnEl?.click();
};
export { clickOnMyBtn };
