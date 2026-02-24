"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type ProductsFilterFormClientProps = {
  search: string;
  category: string;
};

export function ProductsFilterFormClient({
  search,
  category,
}: ProductsFilterFormClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(search);
  const [categoryValue, setCategoryValue] = useState(category);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    const trimmedSearch = searchValue.trim();
    if (trimmedSearch) {
      params.set("q", trimmedSearch);
    } else {
      params.delete("q");
    }

    if (categoryValue && categoryValue !== "all") {
      params.set("category", categoryValue);
    } else {
      params.delete("category");
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.push(url);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-3 rounded-md border border-zinc-200 bg-white p-3 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <label className="flex flex-1 items-center gap-2 min-w-[220px]">
        <span className="text-zinc-600 dark:text-zinc-300">Search</span>
        <input
          name="q"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search products..."
          className="flex-1 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        />
      </label>

      <label className="flex items-center gap-2">
        <span className="text-zinc-600 dark:text-zinc-300">Category</span>
        <select
          name="category"
          value={categoryValue}
          onChange={(event) => setCategoryValue(event.target.value)}
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

