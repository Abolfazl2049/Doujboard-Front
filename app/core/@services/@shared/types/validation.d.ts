interface ValidateValueOptions {
  regex?: RegExp;
}
interface OnValueValidateFailOptions {
  message?: string;
  insertAfterQuery?: string;
  onFail?: () => void;
}
export type { ValidateValueOptions, OnValueValidateFailOptions };
