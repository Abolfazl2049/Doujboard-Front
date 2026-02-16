const clickOnBtn = (query: string = "button") => {
  const btnEl: HTMLButtonElement | null = document.querySelector(query);
  btnEl?.click();
};

export { clickOnBtn };
