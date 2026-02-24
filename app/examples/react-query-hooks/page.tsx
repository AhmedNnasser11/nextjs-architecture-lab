"use client";

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "sonner";

import useFetchQuery from "@/hooks/use-fetch-query";
import useMutateRequest from "@/hooks/use-mutate-request";

type Post = {
  id: number;
  title: string;
};

type PostPayload = {
  title: string;
  body: string;
};

function ReactQueryHooksContent() {
  const postsQuery = useFetchQuery<Post[]>({
    url: "https://jsonplaceholder.typicode.com/posts?_limit=5",
  });

  const createPost = useMutateRequest<Post, PostPayload>({
    method: "POST",
    showSuccessToast: true,
    successMessage: (data) =>
      `Created post with id ${data.id}`,
  });

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          useFetchQuery and useMutateRequest
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          This page shows how to use the custom hooks to fetch data and
          perform a mutation using Axios and React Query.
        </p>
      </section>

      <section className="space-y-3 rounded-md border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Latest posts
        </h2>

        {postsQuery.isLoading && (
          <p className="text-xs text-zinc-500">
            Loading posts...
          </p>
        )}

        {postsQuery.isError && (
          <p className="text-xs text-red-500">
            Failed to load posts.
          </p>
        )}

        {postsQuery.data && (
          <ul className="space-y-1 text-xs text-zinc-800 dark:text-zinc-100">
            {postsQuery.data.map((post) => (
              <li key={post.id} className="line-clamp-1">
                {post.title}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3 rounded-md border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Create a fake post
        </h2>

        <form
          className="space-y-3 text-xs"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const title = String(formData.get("title") || "");
            const body = String(formData.get("body") || "");

            createPost.mutate({
              urlPath: "https://jsonplaceholder.typicode.com/posts",
              body: { title, body },
            });
          }}
        >
          <label className="flex flex-col gap-1">
            <span className="text-zinc-700 dark:text-zinc-300">
              Title
            </span>
            <input
              name="title"
              className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
              placeholder="Post title"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-zinc-700 dark:text-zinc-300">
              Body
            </span>
            <textarea
              name="body"
              className="h-20 rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
              placeholder="Post body"
            />
          </label>

          <button
            type="submit"
            disabled={createPost.isPending}
            className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-50 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            {createPost.isPending ? "Submitting..." : "Submit post"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function ReactQueryHooksExamplePage() {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <Toaster richColors />
      <ReactQueryHooksContent />
    </QueryClientProvider>
  );
}
