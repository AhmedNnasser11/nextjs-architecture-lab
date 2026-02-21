// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import type { Product } from "./data";

export type ProductFilters = {
  search?: string;
  category?: string;
};

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  const search = filters.search?.toLowerCase().trim() ?? "";
  const category = filters.category ?? "all";

  let result = products;

  if (search) {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(search),
    );
  }

  if (category !== "all") {
    result = result.filter((product) => product.category === category);
  }

  return result;
}

