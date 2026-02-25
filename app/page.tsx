import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Educational Next.js Examples
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          This project contains intentionally small examples that focus on
          explaining key Next.js and React concepts, not on building a complex
          production system.
        </p>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
          <p>
            <strong>🏛️ Architecture & Decisions:</strong> While these examples
            are small, they follow specific architectural patterns. See the{" "}
            <code>ARCHITECTURE.md</code> and <code>decision-matrix.md</code>{" "}
            files in the repository root for a deep dive into exactly{" "}
            <em>why</em> the project is structured this way.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <ExampleCard
          title="Design System Layer"
          href="/examples/design-system"
          description="How to wrap base UI components (like shadcn/ui) to enforce your design system without modifying the source."
        />
        <ExampleCard
          title="SEO Products Page"
          href="/seo/products"
          description="A Server Component that filters data on the backend using searchParams, ensuring the page is fully SEO-friendly."
        />
        <ExampleCard
          title="Dashboard Users Table"
          href="/dashboard/users"
          description="A Client Component table fetching data from an API route. Optimized for interactivity, not search engines."
        />
        <ExampleCard
          title="Suspense & Streaming"
          href="/examples/suspense-streaming"
          description="Loading independent page sections concurrently, streaming HTML to the browser as soon as each is ready."
        />
        <ExampleCard
          title="nuqs URL State"
          href="/examples/nuqs-search"
          description="Syncing React component state with the URL query string to build shareable, bookmarkable UI filters."
        />
        <ExampleCard
          title="Navigation Feedback"
          href="/navigation-example"
          description="Implementing a global top loading bar to provide instant visual feedback during Next.js route transitions."
        />
        <ExampleCard
          title="Combobox Infinite Scroll"
          href="/examples/combobox-infinite-scroll"
          description="A classic dropdown interface that fetches and appends paginated data on the fly as the user scrolls."
        />
        <ExampleCard
          title="React Query Hooks"
          href="/examples/react-query-hooks"
          description="Custom, reusable data fetching and mutation hooks powered by Axios and @tanstack/react-query."
        />
        <ExampleCard
          title="useTransition"
          href="/examples/use-transition"
          description="Keeping the UI responsive by moving heavy, non-urgent state updates (like filtering) into the background."
        />
        <ExampleCard
          title="useOptimistic"
          href="/examples/use-optimistic"
          description="Updating the UI instantly before the server responds, creating a snappy experience with automatic rollback on error."
        />
        <ExampleCard
          title="useSyncExternalStore"
          href="/examples/use-sync-external-store"
          description="Safely subscribing React components to global state that lives outside of the React tree in concurrent mode."
        />
        <ExampleCard
          title="useDeepEffect"
          href="/examples/use-deep-effect"
          description="A custom useEffect alternative that deeply compares dependencies, firing only when values actually change."
        />
        <ExampleCard
          title="Proxy (Modular Validation)"
          href="/examples/proxy-validation"
          description="Splitting proxy.ts into reusable validators — auth, rate limiting, and locale detection composed in one chain."
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

// 🏛️ Architecture: Intentionally Minimal Code
// ✅ لماذا الأمثلة صغيرة ومبسطة عمداً؟
// ### Why are examples intentionally small?
//
// The goal is clarity.
//
// Each lesson:
// - Focuses on one concept.
// - Avoids unnecessary complexity.
// - Adds comments explaining decisions.
//
// This makes learning faster and more effective.
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
