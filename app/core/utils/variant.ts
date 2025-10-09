import { Variant, type VariantInit } from "~/core/classes/variant";

function buildVariant<Names extends string, Keys extends string | number>(
  variants: VariantInit<Names, Keys>[],
  options?: { sameAsKey?: boolean },
): Record<Names | Keys, Variant<Names, Keys>> {
  const results: Record<Names | Keys, Variant<Names, Keys>> = {} as Record<Names | Keys, Variant<Names, Keys>>;
  for (const variant of variants) {
    results[variant.name as Names | Keys] = new Variant(variant);
  }
  if (!options?.sameAsKey)
    for (const variant of variants) {
      results[variant.key as Names | Keys] = new Variant({ ...variant, isKey: true });
    }
  return results;
}

export { buildVariant };
