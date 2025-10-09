import type { MultiLocaleValue } from "#imports";

enum VariantColor {
  green,
  yellow,
  red,
  blue,
}
interface VariantInit<Names extends string = string, Keys extends string | number = string | number> {
  name: Names;
  key: Keys;
  displayName?: MultiLocaleValue;
  color?: keyof typeof VariantColor;
  isKey?: boolean;
  data?: Record<string, any>;
}

class Variant<Names extends string = string, Keys extends string | number = string | number> {
  name: Names;
  key: Keys;
  displayName?: MultiLocaleValue;
  color?: keyof typeof VariantColor;
  isKey?: boolean;
  data?: Record<string, any>;

  constructor(init: VariantInit<Names, Keys>) {
    this.name = init.name;
    this.key = init.key;
    this.displayName = init.displayName;
    this.color = init.color;
    this.isKey = init.isKey;
    this.data = init.data;
  }
}
export { Variant };
export type { VariantInit };
