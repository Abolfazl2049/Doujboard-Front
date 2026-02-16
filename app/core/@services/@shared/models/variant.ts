type DefaultVDataType = Record<string, any> | undefined;
type DefaultVNameType = string;
type DefaultVKeyType = string | number;
interface VariantInit<Names = DefaultVNameType, Keys = DefaultVKeyType, Data = DefaultVDataType> {
  name: Names;
  key: Keys;
  displayName?: string;
  isKey?: boolean;
  data?: Data;
}

class Variant<Names = DefaultVNameType, Keys = DefaultVKeyType, Data = DefaultVDataType> {
  name: Names;
  key: Keys;
  displayName?: string;
  isKey?: boolean;
  // @ts-ignore
  data: Data = {};

  constructor(init: VariantInit<Names, Keys, Data>) {
    this.name = init.name;
    this.key = init.key;
    this.displayName = init.displayName;
    this.isKey = init.isKey;
    if (init.data) this.data = init.data;
  }
}

class VariantMaster<
  Names extends string = string,
  Keys extends string | number = string | number,
  Data = DefaultVDataType,
> {
  private variants: Map<Keys | Names, Variant<Names, Keys, Data>> = new Map();

  constructor(variants: VariantInit<Names, Keys, Data>[] = [], options?: { sameAsKey?: boolean }) {
    for (const variant of variants) {
      this.add(variant, options?.sameAsKey);
    }
  }

  /**
   * Add a variant dynamically with type safety
   * @param variant - The variant configuration to add
   * @param sameAsKey - Whether to register the key as itself (useful for enum-like behavior)
   * @returns The created variant instance
   */
  add(variant: VariantInit<Names, Keys, Data>, sameAsKey?: boolean): Variant<Names, Keys, Data> {
    const v = new Variant(variant);
    this.variants.set(variant.key, v as any);

    if (!sameAsKey) {
      this.variants.set(variant.name as any, new Variant({ ...variant, isKey: true }) as any);
    }

    return v;
  }

  /**
   * Remove a variant by key
   * @param key - The key of the variant to remove
   * @returns Whether the variant was removed
   */
  remove(key: Keys): boolean {
    return this.variants.delete(key);
  }

  /**
   * Get a variant by key with type safety
   * @param key - The key of the variant
   * @returns The variant or undefined if not found
   */
  get(name: Names | Keys): Variant<Names, Keys, Data> {
    return this.variants.get(name as any) as Variant<Names, Keys, Data>;
  }

  /**
   * Check if a key exists
   * @param key - The key to check
   * @returns Whether the key exists
   */
  has(key: Keys): boolean {
    return this.variants.has(key);
  }

  /**
   * Get all variants (excluding key variants)
   */
  get vars(): Variant<Names, Keys, Data>[] {
    return Array.from(this.variants.values()).filter((v) => !v.isKey);
  }
}
export { Variant, VariantMaster };
export type { VariantInit };
