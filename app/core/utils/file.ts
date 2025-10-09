let uploadFile = async (options?: { accept: string }) => {
  let input = document.createElement("input") as HTMLInputElement;
  input.type = "file";
  input.accept = options?.accept || "image/*";
  
  input.click();
  return await new Promise<FileList>((resolve, reject) => {
    input.addEventListener(
      "change",
      () => {
        resolve(input.files as FileList);
      },
      { once: true },
    );
    input.addEventListener("cancel", () => {
      reject("cancel file pick by user");
    });
  });
};

let playAudio = async (src: string) => {
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
