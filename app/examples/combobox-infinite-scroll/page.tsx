"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Post = {
  id: number;
  title: string;
};

const PAGE_SIZE = 10;

export default function ComboboxInfiniteScrollPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Combobox with Infinite Scroll
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          This client-side example mimics a{" "}
          <span className="font-mono text-xs">shadcn/ui</span> combobox, but the
          dropdown list uses{" "}
          <span className="font-mono text-xs">
            react-infinite-scroll-component
          </span>{" "}
          to load items from a public API page by page.
        </p>
      </section>

      <section className="rounded-md border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <InfiniteScrollCombobox />
      </section>
    </main>
  );
}

function InfiniteScrollCombobox() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [selected, setSelected] = useState<Post | null>(null);
  const [filter, setFilter] = useState("");

  async function loadPage(nextPage: number, options?: { replace?: boolean }) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${nextPage}&_limit=${PAGE_SIZE}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return;
    }

    const data = (await response.json()) as Post[];

    setItems((previous) =>
      options?.replace ? data : [...previous, ...data]
    );
    setPage(nextPage);
    setHasMore(data.length === PAGE_SIZE);
  }

  const filteredItems = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(normalized)
    );
  }, [filter, items]);

  useEffect(() => {
    if (!open || items.length > 0 || loadingInitial) return;

    let cancelled = false;

    void (async () => {
      await loadPage(1);
      if (!cancelled) {
        setLoadingInitial(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, items.length, loadingInitial]);

  function handleSelect(post: Post) {
    setSelected(post);
    setOpen(false);
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1 text-sm">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Select a post
        </label>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-left text-sm text-zinc-900 shadow-sm outline-none hover:border-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        >
          <span className="line-clamp-1">
            {selected ? selected.title : "Search posts..."}
          </span>
          <span className="ml-2 text-xs text-zinc-500">
            {open ? "Close" : "Open"}
          </span>
        </button>
      </div>

      {open && (
        <div className="relative">
          <div className="absolute z-10 mt-1 w-full rounded-md border border-zinc-200 bg-white text-sm shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 p-2 dark:border-zinc-800">
              <input
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Type to filter loaded posts..."
                className="w-full rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
              />
            </div>

            <div
              id="combobox-scroll-container"
              className="max-h-64 overflow-auto"
            >
              {loadingInitial && items.length === 0 ? (
                <div className="px-3 py-2 text-xs text-zinc-500">
                  Loading posts...
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="px-3 py-2 text-xs text-zinc-500">
                  No posts found.
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={items.length}
                  next={() => loadPage(page + 1)}
                  hasMore={hasMore}
                  loader={
                    <div className="px-3 py-2 text-xs text-zinc-500">
                      Loading more...
                    </div>
                  }
                  endMessage={
                    <div className="px-3 py-2 text-center text-[0.7rem] text-zinc-400">
                      You have loaded all available posts.
                    </div>
                  }
                  scrollableTarget="combobox-scroll-container"
                >
                  <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {filteredItems.map((post) => (
                      <li key={post.id}>
                        <button
                          type="button"
                          onClick={() => handleSelect(post)}
                          className="flex w-full items-start gap-2 px-3 py-2 text-left text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                          <span className="line-clamp-2 text-zinc-800 dark:text-zinc-100">
                            {post.title}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </InfiniteScroll>
              )}
            </div>
          </div>
        </div>
      )}

      {selected && (
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Selected post ID: <span className="font-mono">{selected.id}</span>
        </p>
      )}
    </div>
  );
}
