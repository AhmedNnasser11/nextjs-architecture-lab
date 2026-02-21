// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

export default function NavigationDetailsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-4 px-6 py-10">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Navigation Details
      </h1>
      <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
        This is the destination page for the{" "}
        <span className="font-mono text-xs">useLinkStatus</span> navigation
        example. In a real app this could be a slow, data-heavy route where
        inline navigation feedback helps users understand that loading is in
        progress.
      </p>
    </main>
  );
}

