"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { useEffect, useState } from "react";

import { UsersTable } from "@/features/users/ui";
import type { UsersPage } from "@/features/users/data";
import { SearchInput } from "@/components/search-input";

const PAGE_SIZE = 5;

export default function UsersDashboardPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<UsersPage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(PAGE_SIZE),
        });

        if (search.trim()) {
          params.set("q", search.trim());
        }

        const response = await fetch(`/api/users?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to load users");
        }

        const json = (await response.json()) as UsersPage;

        if (!isCancelled) {
          setData(json);
        }
      } catch {
        if (!isCancelled) {
          setError("Something went wrong while loading users.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [page, search]);

  const total = data?.total ?? 0;
  const totalPages = total > 0 ? Math.ceil(total / PAGE_SIZE) : 1;

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Dashboard Users Table (Client Component)
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          This page is a{" "}
          <strong className="font-semibold">Client Component</strong>. It fetches
          data from a{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            /api/users
          </code>{" "}
          API route on the client, because dashboards usually do not need SEO.
          Prioritising fast, interactive UI is more important here than
          server-rendered HTML for search engines.
        </p>
      </section>

      <section className="space-y-4 rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-[220px] flex-1">
            <SearchInput
              label="Search users"
              initialValue={search}
              placeholder="Search by name or email..."
              delayMs={300}
              onDebouncedChange={(next) => {
                setPage(1);
                setSearch(next.trim());
              }}
            />
          </div>

          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Dashboard pages use client-side data fetching because they are used
            by authenticated users, not search engines.
          </span>
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {isLoading && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Loading users...
          </p>
        )}

        <UsersTable users={data?.users ?? []} />

        <div className="flex items-center justify-between pt-2 text-xs text-zinc-600 dark:text-zinc-400">
          <div>
            Page {page} of {totalPages} &middot; {total} users
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              className="rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
