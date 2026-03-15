"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { useEffect, useState } from "react";
import { useQueryStates } from "nuqs";
import { useDebounce } from "use-debounce";

import { productsSearchParams } from "./search-params";

export function ProductsFilterFormClient() {
  const [{ q, category }, setParams] = useQueryStates(productsSearchParams, {
    shallow: false,
  });

  const [searchValue, setSearchValue] = useState(q);
  const [debouncedSearch] = useDebounce(searchValue, 300);

  useEffect(() => {
    setParams({ q: debouncedSearch || null }, { scroll: false });
  }, [debouncedSearch, setParams]);

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-md border border-zinc-200 bg-white p-3 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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
          value={category}
          onChange={(event) =>
            setParams(
              {
                category:
                  event.target.value === "all" ? null : event.target.value,
              },
              { scroll: false },
            )
          }
          className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        >
          <option value="all">All</option>
          <option value="books">Books</option>
          <option value="clothes">Clothes</option>
          <option value="tech">Tech</option>
        </select>
      </label>
    </div>
  );
}
