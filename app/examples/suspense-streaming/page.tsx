// 🏛️ Architecture: Suspense & Streaming
// ✅ لماذا نستخدم Suspense و Streaming؟
// ### Why use Suspense and streaming?
//
// Instead of waiting for all data to load before rendering,
// we stream each section as soon as it's ready.
//
// Benefits:
// - Faster perceived performance.
// - The user sees content immediately.
// - Better UX on slow networks.
//
// This avoids blocking the entire page.
//
// (This example is intentionally simple to explain the concept.)
import { Suspense } from "react";

async function fetchSectionData(label: string, delayMs: number) {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return Array.from({ length: 3 }, (_, index) => `${label} item ${index + 1}`);
}

async function NewsSection() {
  const items = await fetchSectionData("News", 1500);

  return (
    <section className="space-y-2 rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Latest news
      </h2>
      <ul className="list-disc space-y-1 pl-4 text-sm text-zinc-700 dark:text-zinc-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

async function StatsSection() {
  const items = await fetchSectionData("Stats", 2500);

  return (
    <section className="space-y-2 rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Dashboard stats
      </h2>
      <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function SectionSkeleton() {
  return (
    <section className="space-y-2 rounded-md border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="h-4 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="space-y-1">
        <div className="h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-3/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Suspense lets us show this lightweight skeleton immediately instead of
        blocking the whole page while the server waits for slower sections.
      </p>
    </section>
  );
}

export default function SuspenseStreamingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Suspense &amp; Streaming Example
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          This page is a Server Component. Each section fetches data separately
          and is wrapped in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            {"<Suspense>"}
          </code>
          , so the page can start streaming HTML to the browser as soon as each
          section is ready.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Suspense fallback={<SectionSkeleton />}>
          <NewsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <StatsSection />
        </Suspense>
      </div>
    </main>
  );
}
