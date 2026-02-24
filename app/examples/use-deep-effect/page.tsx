"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { useEffect, useState } from "react";

import { useDeepEffect } from "@/hooks/use-deep-effect";

/**
 * This page demonstrates the difference between useEffect and useDeepEffect.
 *
 * We create an object dependency that is re-created every render.
 * - useEffect fires on EVERY render because the object reference changes.
 * - useDeepEffect fires only when the object's content actually changes.
 */

type Filters = {
  category: string;
  minPrice: number;
};

export default function UseDeepEffectExamplePage() {
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [unrelatedCounter, setUnrelatedCounter] = useState(0);

  // This object is re-created every render (new reference each time)
  const filters: Filters = { category, minPrice };

  // --- Track how many times each effect fires ---
  const [normalEffectCount, setNormalEffectCount] = useState(0);
  const [deepEffectCount, setDeepEffectCount] = useState(0);

  // Regular useEffect: fires on EVERY render because `filters` is a
  // new object reference each time, even if category and minPrice haven't changed.
  useEffect(() => {
    setNormalEffectCount((count) => count + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // useDeepEffect: fires only when the content of `filters` actually changes.
  useDeepEffect(() => {
    setDeepEffectCount((count) => count + 1);
  }, [filters]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          useDeepEffect vs useEffect
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          Both effects depend on the same{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            filters
          </code>{" "}
          object. Because the object is re-created on every render,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            useEffect
          </code>{" "}
          fires every time — even when you change something unrelated.{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            useDeepEffect
          </code>{" "}
          only fires when the actual values inside the object change.
        </p>
      </section>

      <section className="space-y-4 rounded-md border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="text-zinc-600 dark:text-zinc-300">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            >
              <option value="all">All</option>
              <option value="books">Books</option>
              <option value="tech">Tech</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="text-zinc-600 dark:text-zinc-300">Min price</span>
            <input
              type="number"
              value={minPrice}
              onChange={(event) => setMinPrice(Number(event.target.value))}
              className="w-20 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
          </label>

          <button
            type="button"
            onClick={() => setUnrelatedCounter((count) => count + 1)}
            className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Increment unrelated counter ({unrelatedCounter})
          </button>
        </div>

        {/* Results */}
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950/30">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400">
              useEffect fired
            </p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {normalEffectCount}×
            </p>
            <p className="mt-1 text-xs text-red-600/70 dark:text-red-400/70">
              Fires on every render because the object reference changes
            </p>
          </div>

          <div className="rounded-md border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950/30">
            <p className="text-xs font-semibold text-green-700 dark:text-green-400">
              useDeepEffect fired
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {deepEffectCount}×
            </p>
            <p className="mt-1 text-xs text-green-600/70 dark:text-green-400/70">
              Fires only when the actual filter values change
            </p>
          </div>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Try clicking &quot;Increment unrelated counter&quot; — it causes a
          re-render but does not change the filters. Notice how{" "}
          <span className="font-mono text-[0.7rem]">useEffect</span> fires but{" "}
          <span className="font-mono text-[0.7rem]">useDeepEffect</span> does
          not.
        </p>
      </section>
    </main>
  );
}
