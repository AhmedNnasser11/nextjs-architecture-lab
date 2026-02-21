// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { PrimaryButton } from "@/components/design/primary-button";

export default function DesignSystemExamplePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Design System Layer Example
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          The underlying button lives in{" "}
          <span className="font-mono text-xs">components/ui/button.tsx</span>.
          We keep that base component small and generic, and wrap it in{" "}
          <span className="font-mono text-xs">PrimaryButton</span> to apply our
          design system styles without modifying the original implementation.
        </p>
      </section>

      <section className="space-y-4 rounded-md border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <PrimaryButton>Primary action</PrimaryButton>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          This pattern keeps design tokens and variants in one place, while
          keeping the auto-generated{" "}
          <span className="font-mono text-[0.7rem]">components/ui</span> folder
          untouched. In a real shadcn/ui setup, that folder would be managed by
          the generator.
        </p>
      </section>
    </main>
  );
}

