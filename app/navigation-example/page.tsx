"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import Link from "next/link";
import { useLinkStatus } from "next/link";

function LinkLoadingIndicator() {
  const { pending } = useLinkStatus();

  return (
    <span
      aria-hidden
      className="relative ml-2 inline-flex h-3 w-3 items-center justify-center"
    >
      <span
        className={`h-2 w-2 rounded-full bg-blue-500 transition-opacity duration-150 ${
          pending ? "animate-ping opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
}

export default function NavigationStatusExamplePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          useLinkStatus Navigation Example
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          This page is a Client Component that uses{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            useLinkStatus
          </code>{" "}
          to show a tiny loading indicator while navigating. Navigation feedback
          improves UX on slow networks by confirming that a click is doing
          something.
        </p>
      </section>

      <section className="space-y-3 rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Click the link below to navigate to the details page. The dot next to
          the link animates while the transition is pending.
        </p>

        <Link
          href="/navigation-example/details"
          prefetch={false}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Go to details
          <LinkLoadingIndicator />
        </Link>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          useLinkStatus is most useful when navigation might be slow and you do
          not already have a{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-[0.7rem] dark:bg-zinc-800">
            loading.tsx
          </code>{" "}
          fallback. Prefer route-level loading UIs for larger sections of the
          app; useLinkStatus is for small inline hints.
        </p>
      </section>
    </main>
  );
}

