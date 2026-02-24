import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Educational Next.js Examples
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          This project contains intentionally small examples that focus on
          explaining key Next.js and React concepts, not on building a complex
          production system.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <ExampleCard
          title="Design System Layer"
          href="/examples/design-system"
          description="PrimaryButton wrapper around the base button component."
        />
        <ExampleCard
          title="SEO Products Page"
          href="/seo/products"
          description="Server Component using searchParams and server-side data fetching."
        />
        <ExampleCard
          title="Dashboard Users Table"
          href="/dashboard/users"
          description="Client-side table with pagination, search, and API route."
        />
        <ExampleCard
          title="Suspense & Streaming"
          href="/examples/suspense-streaming"
          description="Server Component with two independently streamed sections."
        />
        <ExampleCard
          title="nuqs URL State"
          href="/examples/nuqs-search"
          description="Client-side filter synced with the URL query string."
        />
        <ExampleCard
          title="Navigation Feedback"
          href="/navigation-example"
          description="Global top loading bar for navigation feedback."
        />
        <ExampleCard
          title="Combobox Infinite Scroll"
          href="/examples/combobox-infinite-scroll"
          description="Dropdown-like list that loads items from a public API on scroll."
        />
        <ExampleCard
          title="React Query Hooks"
          href="/examples/react-query-hooks"
          description="Custom useFetchQuery and useMutateRequest built on Axios and React Query."
        />
        <ExampleCard
          title="useTransition"
          href="/examples/use-transition"
          description="Non-blocking list filtering using useTransition to keep the UI responsive."
        />
        <ExampleCard
          title="useOptimistic"
          href="/examples/use-optimistic"
          description="Instant like button feedback before the server responds, with error rollback."
        />
        <ExampleCard
          title="useSyncExternalStore"
          href="/examples/use-sync-external-store"
          description="Subscribe to a global counter that lives outside React, safely in concurrent mode."
        />
        <ExampleCard
          title="useDeepEffect"
          href="/examples/use-deep-effect"
          description="Custom hook that deeply compares dependencies — fires only when values actually change."
        />
      </section>
    </main>
  );
}

type ExampleCardProps = {
  title: string;
  href: string;
  description: string;
};

function ExampleCard({ title, href, description }: ExampleCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 text-sm shadow-sm transition hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
    >
      <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      <p className="text-xs text-zinc-700 dark:text-zinc-300">{description}</p>
    </Link>
  );
}
