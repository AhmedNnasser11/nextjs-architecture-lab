"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { useMemo, useState, useTransition } from "react";

const ALL_ITEMS = Array.from({ length: 5000 }, (_, index) => `Item ${index + 1}`);

export default function UseTransitionExamplePage() {
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredItems = useMemo(
    () =>
      ALL_ITEMS.filter((item) =>
        item.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter],
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);

    startTransition(() => {
      setFilter(value);
    });
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          useTransition Filter Example
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          A transition tells React that an update is non-urgent. Here we update
          the input state immediately, but defer the expensive list filtering,
          keeping the UI responsive even when the list is large.
        </p>
      </section>

      <section className="space-y-4 rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-zinc-700 dark:text-zinc-300">
            Filter large list
          </span>
          <input
            value={inputValue}
            onChange={handleChange}
            placeholder="Type to filter thousands of items..."
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          />
          {isPending && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Updating list in the background...
            </span>
          )}
        </label>

        <ul className="max-h-64 overflow-auto rounded border border-zinc-200 bg-zinc-50 text-sm dark:border-zinc-800 dark:bg-zinc-900/40">
          {filteredItems.slice(0, 100).map((item) => (
            <li
              key={item}
              className="border-b border-zinc-100 px-3 py-1 last:border-0 dark:border-zinc-800"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

