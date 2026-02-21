"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { parseAsString, useQueryState } from "nuqs";

import { SearchInput } from "@/components/search-input";

const ALL_ITEMS = [
  "Next.js routing",
  "React Server Components",
  "Optimistic UI",
  "Suspense and streaming",
  "URL state management with nuqs",
  "Dashboard patterns",
];

export default function NuqsSearchExamplePage() {
  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      history: "replace",
    }),
  );

  const normalizedSearch = search.toLowerCase().trim();
  const filteredItems = ALL_ITEMS.filter((item) =>
    item.toLowerCase().includes(normalizedSearch),
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          nuqs URL State Example
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          This page uses{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            useQueryState
          </code>{" "}
          to keep the search field in sync with the URL query string. Updating
          the input updates the{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            ?q=
          </code>{" "}
          parameter, so users can share or bookmark the filtered view.
        </p>
      </section>

      <section className="space-y-4 rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <SearchInput
          label="Search topics"
          initialValue={search}
          placeholder="Type to filter and watch the URL..."
          delayMs={300}
          onDebouncedChange={(next) =>
            setSearch(next.trim() || null, { scroll: false })
          }
        />
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          URL-synced state is useful when filters should be shareable,
          bookmarkable, or restorable after refresh. A small debounce keeps the
          URL from updating on every keystroke.
        </span>

        <ul className="space-y-1 text-sm text-zinc-800 dark:text-zinc-100">
          {filteredItems.map((item) => (
            <li key={item} className="rounded bg-zinc-50 px-2 py-1 dark:bg-zinc-800">
              {item}
            </li>
          ))}
          {filteredItems.length === 0 && (
            <li className="text-xs text-zinc-500 dark:text-zinc-400">
              No results. Try a different search term.
            </li>
          )}
        </ul>
      </section>
    </main>
  );
}
