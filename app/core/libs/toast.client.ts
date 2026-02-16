let toast: {
  success: (msg: string, options?: any) => void;
  error: (msg: string, options?: any) => void;
  info: (msg: string, options?: any) => void;
  warning: (msg: string, options?: any) => void;
  clear: () => void;
};
const buildToast = async () => {
  const { useToast } = await import("vue-toastification");
  toast = useToast();
};
buildToast();

export { toast };
