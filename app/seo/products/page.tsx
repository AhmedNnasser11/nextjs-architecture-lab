// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import type { Metadata } from "next";

import { fetchAllProducts } from "@/features/products/data";
import { filterProducts } from "@/features/products/logic";
import { ProductsPageView } from "@/features/products/ui";

type SearchParams = {
  q?: string;
  category?: string;
};

type ProductsPageProps = {
  searchParams?: SearchParams;
};

export const metadata: Metadata = {
  title: "SEO Products Example",
  description:
    "SEO-friendly products page rendered on the server using searchParams.",
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const search = searchParams?.q ?? "";
  const category = searchParams?.category ?? "all";

  const allProducts = await fetchAllProducts();
  const products = filterProducts(allProducts, { search, category });

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          SEO Products Page (Server Component)
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          This page is a{" "}
          <strong className="font-semibold">Server Component</strong>. Filters
          are read from{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            searchParams
          </code>{" "}
          and data is fetched on the server, so search engines see the filtered
          HTML immediately. There is no client-side data fetching here, which
          keeps the result SEO-friendly.
        </p>
      </section>

      <ProductsPageView
        products={products}
        search={search}
        category={category}
      />
    </main>
  );
}

