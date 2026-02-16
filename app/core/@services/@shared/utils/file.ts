let uploadFile = async ({ accept, maxSize }: { accept: string; maxSize?: number } = { accept: "image/jpeg,image/jpg" }) => {
  let input = document.createElement("input") as HTMLInputElement;
  input.type = "file";
  input.accept = accept;

  if (maxSize) input.size = maxSize;

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
  if (localStorage.getItem("enable-sound") === "false") return;
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

function parseBytes(bytes: number = 0) {
  const mb = bytes / 1024 / 1024;
  const kb = bytes / 1024;
  let str = "";
  if (mb > 1) {
    str = `${mb.toFixed(2)} MB`;
  } else {
    str = `${kb.toFixed(2)} KB`;
  }
  return {
    mb,
    kb,
    str,
  };
}

const srcToFile = async (src: string, fileName: string, mimeType: string): Promise<File> => {
  return new Promise<File>((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        resolve(new File([blob!], fileName, { type: mimeType }));
      });
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
};
export { uploadFile, playAudio, parseBytes, srcToFile };
