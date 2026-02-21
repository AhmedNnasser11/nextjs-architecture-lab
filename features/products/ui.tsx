// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import type { Product } from "./data";

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
      <ProductsFilterForm search={search} category={category} />
      <ProductsTable products={products} />
    </div>
  );
}

type ProductsFilterFormProps = {
  search: string;
  category: string;
};

function ProductsFilterForm({ search, category }: ProductsFilterFormProps) {
  return (
    <form
      method="get"
      className="flex flex-wrap items-center gap-3 rounded-md border border-zinc-200 bg-white p-3 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <label className="flex flex-1 items-center gap-2 min-w-[220px]">
        <span className="text-zinc-600 dark:text-zinc-300">Search</span>
        <input
          name="q"
          defaultValue={search}
          placeholder="Search products..."
          className="flex-1 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        />
      </label>

      <label className="flex items-center gap-2">
        <span className="text-zinc-600 dark:text-zinc-300">Category</span>
        <select
          name="category"
          defaultValue={category}
          className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        >
          <option value="all">All</option>
          <option value="books">Books</option>
          <option value="clothes">Clothes</option>
          <option value="tech">Tech</option>
        </select>
      </label>

      <button
        type="submit"
        className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        Apply filters
      </button>
    </form>
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

