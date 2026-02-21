# Next.js & React Decision Matrix

This document is intentionally simple.  
The goal is to explain the concepts clearly, not to cover every edge case.

---

## Server Components vs Client Components

- **Server Component**
  - Runs on the server.
  - Can safely access databases, APIs with secrets, and the filesystem.
  - Marked by default in the App Router (no `"use client"` directive).
- **Client Component**
  - Runs in the browser.
  - Can use hooks like `useState`, `useEffect`, and `useTransition`.
  - Must start with `"use client"` at the top of the file.

### When to use a Server Component

- You are building SEO pages, marketing pages, or blog posts.
- You need to fetch data on the server.
- You do not need interactive browser-only features.

```tsx
// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import type { Metadata } from "next";

import { fetchAllProducts } from "@/features/products/data";

export const metadata: Metadata = {
  title: "SEO Products",
};

export default async function ProductsPage() {
  const products = await fetchAllProducts();

  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}
```

### When to use a Client Component

- You need interactivity: inputs, buttons, modals, or complex dashboards.
- You are working with browser-only APIs (`localStorage`, `window`, etc.).
- SEO is not critical (e.g. signed-in dashboards).

```tsx
"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      Clicked {count} times
    </button>
  );
}
```

---

## Suspense Usage

Suspense lets you show a lightweight loading UI while waiting for slower data.

Use it when:

- You have independent sections of a page that can load separately.
- You want to avoid blocking the whole page on one slow request.

```tsx
// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { Suspense } from "react";

async function SlowSection() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return <p>Slow content loaded.</p>;
}

export default function Page() {
  return (
    <main>
      <h1>Suspense demo</h1>
      <Suspense fallback={<p>Loading section...</p>}>
        <SlowSection />
      </Suspense>
    </main>
  );
}
```

---

## Optimistic UI

Optimistic UI updates the interface **before** the server confirms the change.
This makes apps feel fast and responsive.

Use it when:

- User actions are likely to succeed (likes, toggles, small updates).
- You want instant feedback and are prepared to handle failures.

```tsx
"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { useOptimistic, useState } from "react";

async function saveLikeOnServer(currentLikes: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return currentLikes + 1;
}

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current, delta: number) => current + delta,
  );

  async function handleClick() {
    addOptimisticLike(1);
    const nextLikes = await saveLikeOnServer(likes);
    setLikes(nextLikes);
  }

  return <button onClick={handleClick}>Likes: {optimisticLikes}</button>;
}
```

If the server fails, show an error and return to the last confirmed state.

---

## URL State Management

URL state means storing state in the query string so it can be shared,
bookmarked, and restored after refresh.

Examples: search terms, filters, pagination, active tab.

`nuqs` provides a simple, type-safe way to sync React state with the URL.

```tsx
"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { parseAsString, useQueryState } from "nuqs";

const ITEMS = ["apple", "banana", "orange"];

export default function SearchPage() {
  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withDefault(""),
  );

  const filtered = ITEMS.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value || null)}
        placeholder="Search..."
      />
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
```

Avoid putting sensitive or very noisy data (like passwords or rapid slider
values) into the URL.

---

## Dashboard vs SEO Pages

### SEO Pages

Examples: marketing pages, blog posts, public product listings.

- Use **Server Components**.
- Fetch data on the server.
- Use `searchParams` for filters.
- Aim for clean, shareable URLs.

```tsx
// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const search = searchParams?.q ?? "";
  // Fetch and filter products on the server here.

  return <main>{/* Render filtered products */}</main>;
}
```

### Dashboard Pages

Examples: admin panels, analytics dashboards, user settings.

- Usually **not indexed** by search engines.
- Prioritise interactivity over SEO.
- Fetch data on the client from API routes.
- Use Client Components and hooks.

```tsx
"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { useEffect, useState } from "react";

type User = { id: number; name: string };

export default function UsersDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/users");
      const json = (await response.json()) as { users: User[] };
      setUsers(json.users);
    }

    load();
  }, []);

  return (
    <main>
      <h1>Dashboard users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
```

In practice, many apps mix both approaches: SEO pages for public content and
client-heavy dashboards for signed-in users.

