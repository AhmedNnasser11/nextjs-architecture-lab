"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import Link from "next/link";

export default function NavigationStatusExamplePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Navigation Top Loader Example
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          This page is a Client Component, but the navigation feedback is
          handled globally by{" "}
          <span className="font-mono text-xs">nextjs-toploader</span> in the
          root layout. When you navigate, a thin bar appears at the top of the
          screen to show progress.
        </p>
      </section>

      <section className="space-y-3 rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Click the link below to navigate to the details page. The top loading
          bar will appear while the route change is in progress.
        </p>

        <Link
          href="/navigation-example/details"
          prefetch={false}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Go to details
        </Link>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          A global top loader is useful when you want a consistent navigation
          indicator for every route change, without adding inline spinners to
          each link.
        </p>
      </section>
    </main>
  );
}
