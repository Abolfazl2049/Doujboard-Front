interface ValidateValueOptions {
  regex?: RegExp;
}
interface OnValueValidateFailOptions {
  message?: string;
  insertAfterQuery?: string;
}
export type { ValidateValueOptions, OnValueValidateFailOptions };
