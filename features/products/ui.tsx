// 🏛️ Architecture: Feature-Based Folders
// ✅ لماذا نستخدم مجلدات تعتمد على الميزات؟
// ### Why use feature-based folders?
//
// Instead of grouping by type (components, hooks, services),
// we group related logic together by feature (products, users).
//
// Why?
// - Everything related to one feature lives in one place.
// - Easier to scale when the project grows.
// - Reduces cross-folder jumping.
// - Makes onboarding easier for new developers.
//
// This mirrors how real production systems are structured.
//
// (This example is intentionally simple to explain the concept.)
import type { Product } from "./data";
import { ProductsFilterFormClient } from "./filter-form.client";

type ProductsPageViewProps = {
  products: Product[];
  search: string;
  category: string;
};

export function ProductsPageView({
  products,
  search,
  category,
}: ProductsPageViewProps) {
  return (
    <div className="space-y-6">
      <ProductsFilterFormClient search={search} category={category} />
      <ProductsTable products={products} />
    </div>
  );
}

type ProductsTableProps = {
  products: Product[];
};

function ProductsTable({ products }: ProductsTableProps) {
  if (products.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No products match your filters.
      </p>
    );
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <th className="py-2">Name</th>
          <th className="py-2">Category</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            className="border-b border-zinc-100 text-zinc-900 last:border-0 dark:border-zinc-800 dark:text-zinc-50"
          >
            <td className="py-2 align-top">{product.name}</td>
            <td className="py-2 align-top capitalize">{product.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
