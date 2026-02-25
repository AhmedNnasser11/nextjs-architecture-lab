"use client";

// 🏛️ Architecture: useSyncExternalStore
// ✅ لماذا نستخدم useSyncExternalStore؟
// ### Why use useSyncExternalStore?
//
// When state lives outside React (like a custom store),
// we need a safe way to subscribe.
//
// This hook:
// - Prevents inconsistent state.
// - Works correctly with concurrent rendering.
//
// It is the correct way to read external state in modern React.
//
// (This example is intentionally simple to explain the concept.)

import { useSyncExternalStore } from "react";

type Listener = () => void;

let count = 0;
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return count;
}

function increment() {
  count += 1;
  for (const listener of listeners) {
    listener();
  }
}

export default function UseSyncExternalStoreExamplePage() {
  const value = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          useSyncExternalStore Counter
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          An external store is any state that lives outside React, like this
          simple global counter.{" "}
          <span className="font-mono text-[0.7rem]">useSyncExternalStore</span>{" "}
          lets React subscribe to it safely in concurrent rendering, avoiding
          tearing between renders.
        </p>
      </section>

      <section className="space-y-4 rounded-md border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-zinc-800 dark:text-zinc-100">
          Current value: <span className="font-semibold">{value}</span>
        </p>
        <button
          type="button"
          onClick={increment}
          className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Increment external store
        </button>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Multiple components using{" "}
          <span className="font-mono text-[0.7rem]">useSyncExternalStore</span>{" "}
          can subscribe to the same store and stay in sync, even with concurrent
          rendering and React Suspense.
        </p>
      </section>
    </main>
  );
}
