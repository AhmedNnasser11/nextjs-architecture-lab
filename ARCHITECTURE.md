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
