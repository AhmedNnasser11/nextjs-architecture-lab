"use client";

// 🏛️ Architecture: useOptimistic
// ✅ لماذا نستخدم useOptimistic؟
// ### Why use useOptimistic?
//
// Users expect instant feedback.
//
// Instead of waiting for the server response,
// we update the UI immediately.
//
// If the server fails,
// React rolls back automatically.
//
// This creates a modern, fast user experience.
//
// (This example is intentionally simple to explain the concept.)

import { useOptimistic, useState } from "react";

async function simulateServerLike(currentLikes: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const shouldFail = Math.random() < 0.2;
  if (shouldFail) {
    throw new Error("Server failed to save like");
  }

  return currentLikes + 1;
}

export default function UseOptimisticExamplePage() {
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [optimisticLikes, addOptimisticLike] = useOptimistic<number, number>(
    likes,
    (currentLikes, optimisticDelta) => currentLikes + optimisticDelta,
  );

  async function handleLikeClick() {
    setError(null);
    addOptimisticLike(1);

    try {
      const nextLikes = await simulateServerLike(likes);
      setLikes(nextLikes);
    } catch {
      setError(
        "The server failed to save your like. The UI snaps back to the last confirmed value.",
      );
      setLikes(likes);
    }
  }

  const hasPendingLike = optimisticLikes !== likes;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          useOptimistic Like Button
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          Optimistic UI updates the interface immediately, before the server
          responds. This makes apps feel fast, as long as we handle failures and
          roll back when needed.
        </p>
      </section>

      <section className="space-y-4 rounded-md border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <button
          type="button"
          onClick={handleLikeClick}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50 dark:bg-blue-500 dark:text-zinc-950 dark:hover:bg-blue-400"
        >
          ❤️ Like
          {hasPendingLike && (
            <span className="text-xs text-blue-100 dark:text-blue-950">
              Saving...
            </span>
          )}
        </button>

        <p className="text-sm text-zinc-800 dark:text-zinc-100">
          Visible likes:{" "}
          <span className="font-semibold">{optimisticLikes}</span>
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          The number above updates immediately using{" "}
          <span className="font-mono text-[0.7rem]">useOptimistic</span>,
          instead of waiting for the server. If the server fails, we show an
          error and revert to the last confirmed value.
        </p>

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </section>
    </main>
  );
}
