let uploadFile = async (options?: { multiple?: boolean }) => {
  let input = document.createElement("input") as HTMLInputElement;
  input.type = "file";
  input.accept = "image/*";
  if (options?.multiple) input.multiple = true;
  input.click();
  return await new Promise((resolve, reject) => {
    input.addEventListener(
      "change",
      () => {
        resolve(input.files);
      },
      { once: true },
    );
    input.addEventListener("cancel", () => {
      reject("cancel file pick by user");
    });
  });
};

let playAudio = async (src: string = "/audio/cashout.mp3") => {
  const audio = new Audio(src);
  await new Promise((resolve, reject) => {
    audio.addEventListener("canplaythrough", () => {
      audio.play();
      resolve("played");
    });
    audio.addEventListener("error", () => {
      reject("audio playback error");
    });
    audio.load();
  });
};
export { uploadFile, playAudio };
