# 🎓 Next.js & React Patterns – Educational Examples

Welcome! This repository is a collection of **intentionally simple**, hands-on examples that explain key architectural concepts in Next.js 16 and React 19.

This is not a starter template for a complex SaaS application. Instead, it is an educational laboratory. Every folder, component, and file exists to teach you **one specific concept** clearly and practically.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

🚀 **[Live Preview: nextjs-architecture-lab.vercel.app](https://nextjs-architecture-lab.vercel.app/)**

---

This README explains _why_ this project was built the way it is, what you will learn from each example, and the architectural principles behind modern React development.

## 🏗️ Feature-Based Architecture

**What you will see**  
Instead of grouping files by their arbitrary type (e.g., all components in one folder, all hooks in another), code is grouped by the **feature** it belongs to (e.g., `features/products`, `features/users`).

**Why it is built this way**  
As apps grow, bouncing between 5 different folders just to edit one "User Auth" feature becomes exhausting. Grouping logic by feature keeps everything related in one single place.

**What problem it solves**  
It stops the codebase from becoming an unnavigable mess. It makes deleting, scaling, or extracting features incredibly simple.

**When to use this pattern**  
In medium to large applications where a flat folder structure becomes a cluttered bottleneck.

**When NOT to use it**  
In very small, single-page experiments where navigating a few flat folders is faster.

---

## 📂 Separation of app / features / components / hooks / lib

**What you will see**  
Strict boundaries:

- `/app` only handles Next.js routing.
- `/components` holds generic, reusable UI (like buttons).
- `/features` holds domain-specific business logic.
- `/lib` holds pure utility functions.
- `/hooks` holds global React logic.

**Why it is built this way**  
To keep the Next.js routing layer barebones and make the core logic framework-agnostic.

**What problem it solves**  
It prevents `page.tsx` files from turning into massive, untestable 1,000-line monsters. It forces you to write UI pieces that are genuinely reusable.

**When to use this pattern**  
Almost always in production Next.js App Router applications to guarantee separation of concerns.

**When NOT to use it**  
When building tiny, single-route micro-apps.

---

## 🖥️ Server Components by Default

**What you will see**  
React Components are rendered fully on the server unless user interactivity is explicitly needed.

**Why it is built this way**  
Server Components send pure HTML to the browser and zero JavaScript payload. This massively speeds up the initial page load.

**What problem it solves**  
It reduces the amount of JavaScript the user's phone or computer has to download and execute, resulting in a faster, leaner application.

**When to use this pattern**  
For any component that only fetches data or displays static UI (articles, layouts, footers).

**When NOT to use it**  
When the component needs React state (`useState`), lifecycle hooks (`useEffect`), or needs to listen to browser events (like clicking, typing, or scrolling).

---

## 🖱️ Client Components When Needed

**What you will see**  
The `"use client"` directive is pushed down to the absolute lowest possible component in the DOM tree (e.g., just the `<LikeButton />`, not the whole page).

**Why it is built this way**  
To isolate interactivity. If you put `"use client"` at the top of a page, _everything_ inside it becomes a Client Component, bloating the JS bundle.

**What problem it solves**  
It keeps the heavy, interactive parts of the UI isolated so the rest of the page remains fast and server-rendered.

**When to use this pattern**  
For forms, buttons with `onClick`, or stateful UI animations.

**When NOT to use it**  
At the layout or top-level page level, unless the entire route is a highly interactive tool (like a canvas editor).

---

## ⏳ Suspense & Streaming

**What you will see**  
Slow, data-fetching sections of a page are wrapped inside `<Suspense fallback={<Skeleton />}>`.

**Why it is built this way**  
To prevent one slow database query from freezing the entire page.

**What problem it solves**  
Instead of waiting for all data to load before rendering anything, Suspense streams the fast HTML to the browser immediately, and fills in the slow spots when they finish loading.

**When to use this pattern**  
When fetching data from third-party APIs, taking complex database queries, or doing anything that causes a noticeable delay.

**When NOT to use it**  
For hyper-local data fetches or when the entire page layout depends 100% on that data to make any visual sense.

---

## 🔍 SEO Page with searchParams

**What you will see**  
Public-facing pages (like product catalogs) are built as Server Components and read filtering data directly from the URL `searchParams`.

**Why it is built this way**  
Search engine crawlers (like Googlebot) prefer fully-rendered HTML. By fetching data on the server based on the URL, we guarantee the crawler sees the exact right content immediately.

**What problem it solves**  
It solves the empty-page problem that purely client-side React apps face, ensuring marketing pages are perfectly indexed.

**When to use this pattern**  
For e-commerce pages, blogs, landing pages, and directories where visibility on search engines is mandatory.

**When NOT to use it**  
For private dashboards behind a login screen where SEO is completely irrelevant.

---

## 📊 Dashboard with Client-Side Data Fetching

**What you will see**  
The dashboard area fetches its data on the browser side via an API route, intentionally opting out of Server Components.

**Why it is built this way**  
Dashboards are walled off by authentication (no SEO needed) and require heavy, immediate interactivity.

**What problem it solves**  
Fetching on the client allows developers to implement real-time polling, infinite scrolling, and rapid UI filtering without triggering clunky full-page server reloads.

**When to use this pattern**  
For admin panels, settings pages, or live-data monitoring tools.

**When NOT to use it**  
For public marketing pages or dynamic content that needs indexing by Google.

---

## 🎨 Design System Wrapper Layer

**What you will see**  
We never modify base components (like `shadcn/ui` files) directly. Instead, we wrap them inside `components/design/`.

**Why it is built this way**  
To create a single source of truth for branding, colors, and variants.

**What problem it solves**  
If we update the base UI library later, our custom changes will NOT be overwritten. It makes upgrades safe and keeps third-party code separated from our system.

**When to use this pattern**  
In any project expected to scale or be maintained by a team.

**When NOT to use it**  
During quick hackathons or throwaway prototypes.

---

## 🔗 nuqs for URL State

**What you will see**  
Using the `nuqs` library to sync React state (like active tabs or search inputs) directly to the URL string.

**Why it is built this way**  
Standard React `useState` vanishes if a user refreshes the page or shares the link. Syncing state to the URL ensures the state survives.

**What problem it solves**  
It allows users to bookmark filtered lists or send a perfectly configured UI state to a coworker via a simple link.

**When to use this pattern**  
For pagination, search inputs, active tabs, and list filters.

**When NOT to use it**  
For purely ephemeral UI state (like tracking if a dropdown menu is momentarily open) or sensitive data.

---

## ⚡ useTransition

**What you will see**  
Using React's `useTransition` when triggering background list filters or Server Actions.

**Why it is built this way**  
Heavy updates can block the main thread and freeze the screen. `useTransition` tells React this update is non-urgent.

**What problem it solves**  
The UI stays smooth and responsive. The user can keep typing in a search box smoothly while a massive list filters in the background.

**When to use this pattern**  
When invoking Server Actions or triggering state changes that require heavy re-rendering.

**When NOT to use it**  
For controlled form inputs where you want immediate, synchronous updates character-by-character.

---

## ❤️ useOptimistic

**What you will see**  
Using React's `useOptimistic` hook to update a Like button the exact millisecond a user clicks it, before the server actually replies.

**Why it is built this way**  
Users expect instant feedback. Waiting 500ms for a server response makes an app feel sluggish.

**What problem it solves**  
It creates a perceived latency of zero. If the server fails later, React automatically rolls the UI back to the safe state.

**When to use this pattern**  
For low-risk, highly interactive micro-actions (liking a post, checking off a todo item, saving a bookmark).

**When NOT to use it**  
For high-stakes operations where the user MUST know the exact truth immediately (like processing a payment).

---

## 🌍 useSyncExternalStore

**What you will see**  
Using `useSyncExternalStore` to connect React parts to non-React data sources (like browser APIs or custom vanila JS stores).

**Why it is built this way**  
Standard `useEffect` can cause visual "tearing" during concurrent rendering when reading outside data.

**What problem it solves**  
This hook guarantees safe, perfectly synchronized reading of external state without inconsistent renders. This is the correct way to read external state in modern React.

**When to use this pattern**  
When syncing with browser APIs (like `window.matchMedia`) or building custom global state management tools.

**When NOT to use it**  
When standard `useState` or context is perfectly capable of handling the requirement natively.

---

## 🪝 Custom React Query Hooks

**What you will see**  
Abstracting raw `useQuery` and `useMutation` calls into clean, custom hook wrappers.

**Why it is built this way**  
To standardize chaos. It ensures every developer formats cache keys, headers, and retry logic identically across the app.

**What problem it solves**  
It drastically reduces boilerplate inside UI components and prevents team members from making inconsistent API decisions.

**When to use this pattern**  
When working in a team or handling numerous API endpoints where consistency is key.

**When NOT to use it**  
In tiny apps with only one or two API calls where abstraction just adds unnecessary files.

---

## 🛡️ Proxy Modular Validation

**What you will see**  
Splitting Next.js Middleware logic (auth, localization, rate-limiting) into small, separate files and routing them through a central `proxy`.

**Why it is built this way**  
A standard `middleware.ts` file rapidly devolves into an unreadable mess of nested `if/else` statements.

**What problem it solves**  
Modularizing validation means each rule can be tested in isolation, and the central proxy acts as a clean, readable traffic controller.

**When to use this pattern**  
When your application needs to handle multiple different edge-layer concerns (tokens, tenant routing, A/B testing).

**When NOT to use it**  
If your middleware only has one simple job (e.g., checking a single auth cookie).

---

## 🧠 Why examples are intentionally small

**What you will see**  
The code for these educational patterns is stripped down to the absolute bare minimum syntax needed to function.

**Why it is built this way**  
Complexity hides intent. If an architectural pattern is buried inside 400 lines of Tailwind CSS utility classes, the core lesson is lost.

**What problem it solves**  
Minimal examples trigger the "Aha!" moment significantly faster for learners.

**When to use this pattern**  
When documenting code, teaching concepts, or submitting reproducible bug reports.

**When NOT to use it**  
In an actual production codebase where robust error handling and accessibility must be fully fleshed out.

---

## 💬 Why comments are emphasized

**What you will see**  
Extensive "Why" and "How" comments are written directly inline with the code snippets:

```typescript
// This card component is intentionally simple.
// The goal is to keep focus on architectural decisions,
// not on complex UI abstraction.
```

**Why it is built this way**  
Developers rarely read READMEs; they read code.

**What problem it solves**  
By placing the architectural reasoning directly inside the file, the context survives even if the developer copy-pastes the code into their own specific project.

**When to use this pattern**  
In educational materials, weird browser workarounds, or complex logic where the _intent_ of the code isn't easily deduced from the syntax.

**When NOT to use it**  
For self-documenting, obvious code where comments are just noise.

---

## 🧭 Core Architectural Principles Summary

1. **Clarity Over Complexity**: If a simpler pattern works, use it.
2. **Server by Default**: Lean on the server until interactivity forces you to the client.
3. **Isolate Instability**: Keep rapidly changing state and third-party UI components heavily sequestered behind wrappers or feature boundaries.
4. **Embrace the Platform**: Sync state to the URL and let the browser handle caching and history dynamically where possible.

## 🎯 Who this repo is for

- **Junior to mid-level developers** looking to understand _why_ modern App Router patterns are built the way they are.
- **Engineers** transitioning to Next.js 16 and React 19.
- **Seniors or Instructors** seeking clean, minimalistic, copy-paste-ready reference examples to share with their teams.

### Philosophy Statement

> _Architecture is about boundaries. Good React code shouldn't require a PhD in state management to read. We prioritize clear separation of concerns, native browser mechanics, and lean server HTML. Complexity should only be added when absolutely necessary, never by default._
# 🏛️ Architecture & Decisions

This document explains **WHY** each architectural decision in this educational repository was made.

It is written for junior to mid-level developers, focusing on practical reasoning without overengineering jargon.

---

## 1) Feature-Based Architecture

**What we did**  
Instead of grouping by type (components, hooks, services), we group related logic together by feature (e.g., products, users).

**Why we did it**  
Everything related to one feature lives in one place, making it easier to scale when the project grows.

**What problem it solves**  
Reduces cross-folder jumping and makes onboarding easier for new developers. This mirrors how real production systems are structured.

**When to use it**  
In medium to large applications where a flat folder structure becomes a cluttered bottleneck.

**When not to use it**  
In very small projects or quick prototypes where navigating a few flat folders is faster.

---

## 2) Separating app / features / components / hooks / lib

**What we did**  
Strict boundaries were created: `/app` only handles routing, `/components` holds generic reusable UI, `/features` holds domain-specific logic, `/lib` utility functions, and `/hooks` global React logic.

**Why we did it**  
To keep the Next.js routing layer barebones and make the core logic framework-agnostic.

**What problem it solves**  
Prevents page files from turning into massive, untestable files and ensures UI pieces are genuinely reusable.

**When to use it**  
Almost always in production Next.js App Router applications to guarantee separation of concerns.

**When not to use it**  
When building tiny, single-route micro-apps.

---

## 3) Server Components by Default

**What we did**  
React Components are rendered fully on the server unless user interactivity is explicitly needed.

**Why we did it**  
Server Components reduce JavaScript sent to the browser, improve performance, and improve SEO automatically.

**What problem it solves**  
Defaulting to Server keeps the app fast and lean, preventing unnecessary hydration costs.

**When to use it**  
For any component that only fetches data or displays static UI (articles, layouts, footers).

**When not to use it**  
We only use Client Components when we need interactivity (state, effects, event handlers) or when the UI depends on browser-only APIs.

---

## 4) SEO Page as Server Component

**What we did**  
The SEO products page fetches data on the server using `searchParams`.

**Why we did it**  
Search engines can read fully rendered HTML. Filters are shareable via URL, there is no client-side loading flicker, and it provides better Core Web Vitals.

**What problem it solves**  
Ensures marketing or public-facing pages are immediately indexable and performant.

**When to use it**  
For e-commerce pages, blogs, landing pages, and directories where visibility on search engines is mandatory.

**When not to use it**  
For private dashboards behind a login screen where SEO is completely irrelevant.

---

## 5) Dashboard as Client Component

**What we did**  
The dashboard area fetches its data on the browser side (Client Component) rather than the server side.

**Why we did it**  
Dashboards are highly interactive (search, pagination, sorting, live updates). SEO is not important here, so we prioritize interactivity over static rendering.

**What problem it solves**  
Client-side rendering gives smoother user interaction without triggering clunky full-page server reloads.

**When to use it**  
For admin panels, settings pages, or live-data monitoring tools.

**When not to use it**  
For public marketing pages or dynamic content that needs indexing by Google.

---

## 6) Suspense & Streaming

**What we did**  
Instead of waiting for all data to load before rendering, we stream each section as soon as it's ready.

**Why we did it**  
It provides faster perceived performance. The user sees content immediately, offering better UX on slow networks.

**What problem it solves**  
This avoids blocking the entire page from rendering just because one component (like a slow database query) is taking time.

**When to use it**  
When fetching data from third-party APIs, complex database queries, or anything that causes a noticeable delay.

**When not to use it**  
For fast, hyper-local data fetches or when the entire page layout depends 100% on that data to make any visual sense.

---

## 7) Design System Wrapper Decision

**What we did**  
We never modify base components (e.g., shadcn/ui files) directly. Instead, we create a wrapper layer inside `components/design/`.

**Why we did it**  
If we update the UI library later, our changes will NOT be lost. It keeps a clear separation between third-party code and our own design system.

**What problem it solves**  
It allows us to enforce branding (colors, spacing, variants) from one place. This approach prevents "update conflicts" and keeps upgrades safe and predictable.

**When to use it**  
In any project expected to scale or be maintained by a team.

**When not to use it**  
During quick hackathons or throwaway prototypes.

---

## 8) nuqs for URL State

**What we did**  
We use `nuqs` to sync component state with the URL query string.

**Why we did it**  
Filters become shareable links, state persists on refresh, and back/forward browser navigation works naturally.

**What problem it solves**  
Standard React state vanishes if a user refreshes the page or shares the link. Syncing state to the URL solves this and improves usability without complex state management.

**When to use it**  
For pagination, search inputs, active tabs, and list filters.

**When not to use it**  
For purely ephemeral UI state (like tracking if a dropdown menu is open) or highly sensitive data.

---

## 9) useTransition

**What we did**  
We use React's `useTransition` when triggering background updates or heavy state changes.

**Why we did it**  
Heavy updates (like filtering large lists) can block the UI. `useTransition` moves non-urgent updates to the background.

**What problem it solves**  
The UI stays responsive, and the user can keep typing smoothly without freezing the screen.

**When to use it**  
When invoking Server Actions manually or triggering state changes that require heavy re-rendering or network calls.

**When not to use it**  
For controlled form inputs where you want immediate, synchronous updates character-by-character.

---

## 10) useOptimistic

**What we did**  
Instead of waiting for the server response, we update the UI immediately.

**Why we did it**  
Users expect instant feedback. If the server fails, React rolls back the update automatically.

**What problem it solves**  
Creates a modern, fast user experience by creating a perceived latency of zero.

**When to use it**  
For low-risk, highly interactive micro-actions (liking a post, checking off a todo item, saving a bookmark).

**When not to use it**  
For high-stakes operations where the user MUST know the exact truth (like processing a payment).

---

## 11) useSyncExternalStore

**What we did**  
We use `useSyncExternalStore` to connect React components to non-React data sources (like browser APIs).

**Why we did it**  
When state lives outside React (like a custom store), we need a safe way to subscribe. This hook works correctly with concurrent rendering.

**What problem it solves**  
Prevents inconsistent state (tearing) when reading external data. It is the correct way to read external state in modern React.

**When to use it**  
When syncing with browser APIs (like `window.matchMedia`) or when building custom global state management tools.

**When not to use it**  
When standard `useState` or context is perfectly capable of handling the requirement.

---

## 12) Intentionally Minimal Code

**What we did**  
The code for these educational patterns was stripped down to the absolute bare minimum syntax needed to function.

**Why we did it**  
The goal is clarity. Each lesson focuses on one concept, avoids unnecessary complexity, and adds comments explaining decisions.

**What problem it solves**  
Complexity hides intent. Minimal examples make learning faster and more effective.

**When to use it**  
When documenting code, teaching concepts, or submitting reproducible bug reports to maintainers.

**When not to use it**  
In a production codebase where robust error handling, edge cases, and accessibility must be fully fleshed out.

---

## 13) Code Comments Overview

**What we did**  
Extensive "Why" and "How" comments are written directly inline with the code snippets
(e.g., `// This card component is intentionally simple. The goal is to keep focus on architectural decisions, not on complex UI abstraction.`)

**Why we did it**  
Developers rarely read READMEs; they read code. By placing the architectural reasoning directly inside the file, the context survives even if the developer copy-pastes the code.

**What problem it solves**  
Keeps focus on architectural decisions directly at the point of implementation.

**When to use it**  
In educational materials or complex algorithmic logic where the intent of the code isn't easily deduced from the syntax.

**When not to use it**  
For self-documenting, obvious code where comments would just add noise.
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
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

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

---

## `useTransition` for Non-Blocking UI

`useTransition` lets you update state without blocking the UI.

Use it when:

- You are filtering a large list or performing a heavy client-side update.
- You want the user to keep typing or interacting while the update happens.

Do **not** use it when:

- You are updating a controlled input (like a text field's value). Controlled inputs must update synchronously.

---

## `useSyncExternalStore`

This hook lets you subscribe to external data sources safely in concurrent React.

Use it when:

- You are integrating with non-React state (e.g., browser APIs like `window.innerWidth`, WebSocket connections, or legacy stores).
- You want to prevent UI "tearing" (showing different values for the same state during a single render pass).

Do **not** use it when:

- The state is entirely local to the component (use `useState`).
- You can manage the state through React Context or standard props.

---

## `useEffect` vs `useDeepEffect`

`useEffect` fires when its dependencies change, comparing them by reference (`===`).

Use `useDeepEffect` when:

- Your dependencies include objects, arrays, or deep structures that are re-created on every render (e.g., received as props).
- You want the effect to run only when the _actual values_ inside the object change.

Use standard `useEffect` when:

- Your dependencies are primitives (`string`, `number`, `boolean`).
- Your dependencies contain functions or DOM nodes (which cannot be serialized for deep comparison).

---

## `proxy.ts` (Modular Validation)

`proxy.ts` (formerly `middleware.ts`) runs on the server before a request is completed or a route is rendered.

Use it for:

- Checking authentication via cookies before hitting protected routes (redirecting to `/login`).
- Implementing IP-based rate limiting or bot protection.
- Detecting browser locales and rewriting/redirecting URLs.

Do **not** use it for:

- Fetching heavy database queries (keep it fast — it runs on every request).
- API logic or data mutations (use Route Handlers `api/` or Server Actions instead).
- Rendering HTML.
