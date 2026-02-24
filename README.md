# 🎓 Next.js & React Patterns – Educational Examples

> A collection of **intentionally simple**, hands-on examples that explain key Next.js 16 and React 19 concepts. Each lesson focuses on **one idea**, with clear comments explaining the _why_ behind every decision.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

🚀 **[Live Preview: nextjs-architecture-lab.vercel.app](https://nextjs-architecture-lab.vercel.app/)**

---

## 📚 What You'll Learn

| #   | Lesson                         | Route                                | Concept                                                                    | Rendering       |
| --- | ------------------------------ | ------------------------------------ | -------------------------------------------------------------------------- | --------------- |
| 1   | **Architecture**               | _project structure_                  | Feature-based folder structure separating UI, logic, and data              | Server + Client |
| 2   | **Design System Layer**        | `/examples/design-system`            | Wrapping shadcn/ui base components without modifying them                  | Server          |
| 3   | **Suspense & Streaming**       | `/examples/suspense-streaming`       | Independent sections that stream HTML as each one becomes ready            | Server          |
| 4   | **SEO Products Page**          | `/seo/products`                      | Server-side data fetching with `searchParams` for SEO-friendly filters     | Server          |
| 5   | **Dashboard Users Table**      | `/dashboard/users`                   | Client-side table with pagination, search & API route — no SEO needed      | Client          |
| 6   | **nuqs URL State**             | `/examples/nuqs-search`              | Syncing filter state with the URL query string using `nuqs`                | Client          |
| 7   | **useTransition**              | `/examples/use-transition`           | Non-blocking list filtering that keeps the UI responsive                   | Client          |
| 8   | **useOptimistic**              | `/examples/use-optimistic`           | Instant UI feedback before the server confirms (like button)               | Client          |
| 9   | **useSyncExternalStore**       | `/examples/use-sync-external-store`  | Subscribing to state that lives outside React safely in concurrent mode    | Client          |
| 10  | **Navigation Feedback**        | `/navigation-example`                | Global top loading bar during route transitions                            | Client          |
| 11  | **Combobox + Infinite Scroll** | `/examples/combobox-infinite-scroll` | Dropdown list that loads items from an API page by page on scroll          | Client          |
| 12  | **React Query Hooks**          | `/examples/react-query-hooks`        | Custom `useFetchQuery` & `useMutateRequest` built on Axios + React Query   | Client          |
| 13  | **useDeepEffect**              | `/examples/use-deep-effect`          | Custom hook: like `useEffect` but with deep comparison of dependencies     | Client          |
| 14  | **Proxy (Modular Validation)** | `/examples/proxy-validation`         | Splitting `proxy.ts` into reusable auth, rate-limit, and locale validators | Server          |

> 📖 See [decision matrix](./decision-matrix.md) for a quick reference on when to use Server vs Client Components, Suspense, Optimistic UI, and URL state management.

---

## 🏗️ Project Structure

```
ed-repo/
├── app/
│   ├── layout.tsx                          # Root layout (NuqsAdapter, TopLoader)
│   ├── page.tsx                            # Home – links to every lesson
│   ├── api/users/route.ts                  # API route for the dashboard example
│   ├── dashboard/users/page.tsx            # Lesson 5 — Client-side dashboard
│   ├── seo/products/page.tsx               # Lesson 4 — Server-side SEO page
│   ├── navigation-example/                 # Lesson 10 — Navigation feedback
│   └── examples/
│       ├── design-system/page.tsx          # Lesson 2
│       ├── suspense-streaming/page.tsx     # Lesson 3
│       ├── nuqs-search/page.tsx            # Lesson 6
│       ├── use-transition/page.tsx         # Lesson 7
│       ├── use-optimistic/page.tsx         # Lesson 8
│       ├── use-sync-external-store/page.tsx# Lesson 9
│       ├── combobox-infinite-scroll/page.tsx# Lesson 11
│       ├── react-query-hooks/page.tsx      # Lesson 12
│       ├── use-deep-effect/page.tsx        # Lesson 13
│       └── proxy-validation/page.tsx      # Lesson 14
├── features/
│   ├── products/                           # Data, logic, UI for the SEO page
│   └── users/                              # Data + UI for the dashboard
├── components/
│   ├── ui/button.tsx                       # Base button (shadcn-style)
│   ├── design/primary-button.tsx           # Design-system wrapper
│   └── search-input.tsx                    # Reusable debounced search
├── hooks/
│   ├── use-deep-effect.ts                  # Deep-comparison useEffect
│   ├── use-fetch-query.ts                  # Generic GET hook (Axios + React Query)
│   └── use-mutate-request.ts               # Generic mutation hook
├── lib/utils.ts                            # cn() + URL helpers
├── proxy.ts                                # Main proxy — chains validators
├── proxy/
│   ├── validate-auth.ts                    # Auth check (session cookie)
│   ├── validate-locale.ts                  # Browser language → locale redirect
│   └── validate-rate-limit.ts              # IP-based rate limiting
└── decision-matrix.md                      # Quick-reference decision guide
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/ed-repo.git
cd ed-repo

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:3000** — the home page lists every lesson with a direct link.

---

## 🛠️ Tech Stack

| Package                             | Purpose                                                  |
| ----------------------------------- | -------------------------------------------------------- |
| **Next.js 16**                      | App Router, Server Components, API routes                |
| **React 19**                        | `useOptimistic`, `useTransition`, `useSyncExternalStore` |
| **TypeScript 5**                    | Type safety across every example                         |
| **Tailwind CSS 4**                  | Utility-first styling                                    |
| **nuqs**                            | Type-safe URL state management                           |
| **React Query**                     | Data fetching & mutation hooks                           |
| **Axios**                           | HTTP client used inside custom hooks                     |
| **Sonner**                          | Toast notifications                                      |
| **nextjs-toploader**                | Global navigation progress bar                           |
| **react-infinite-scroll-component** | Infinite scroll for the combobox example                 |
| **use-debounce**                    | Debounced search input                                   |

---

## 🎯 Who Is This For?

- **Junior to mid-level developers** learning Next.js App Router patterns
- **Anyone preparing for technical interviews** on React & Next.js
- **Senior developers** looking for clean, copy-paste-ready reference examples

Every example is **intentionally minimal** — the goal is to explain the concept clearly, not to build a complex production system.

---

## 📄 License

MIT — feel free to use, share, and build on top of these examples.
"# nextjs-architecture-lab"
