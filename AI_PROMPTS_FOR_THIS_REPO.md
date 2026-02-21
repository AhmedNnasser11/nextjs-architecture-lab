1️⃣ Prompt – Architecture (Next.js + Clean Structure)
Create a clean and simple Next.js App Router project structure example.

Requirements:
- Use feature-based architecture
- Separate UI, business logic, and data layer
- Use TypeScript
- Keep the structure easy to understand
- Add clear comments explaining why each folder exists
- Do NOT over-engineer
- Show a simple SEO page and a simple dashboard page
- Add comments explaining Server vs Client decisions
- Keep the example beginner-friendly
2️⃣ Prompt – shadcn Design System Layer
Create a clean example showing how to use shadcn/ui
without modifying the base components.

Requirements:
- Keep components/ui untouched
- Create a shared layer that wraps base components
- Show a PrimaryButton example
- Add comments explaining why we don't modify base components
- Keep it simple and production-friendly
- No unnecessary abstraction
3️⃣ Prompt – Suspense + Streaming (Clean Example)
Create a simple Next.js App Router page
that demonstrates Suspense and streaming.

Requirements:
- Page should be a Server Component
- Split the page into 2 sections
- Each section fetches data separately
- Wrap sections with Suspense
- Add simple loading skeleton
- Add comments explaining:
  - Why Suspense improves UX
  - Why this is better than blocking render
- Keep code minimal and readable
4️⃣ Prompt – SEO Page with Filters (Server + SearchParams)
Create a clean SEO-friendly products page in Next.js.

Requirements:
- Use Server Component
- Use searchParams for filters
- Fetch data on the server
- Show simple filter example (category or search)
- Explain in comments:
  - Why this is SEO-friendly
  - Why not to use client-side fetch here
- Keep it simple and easy to understand
5️⃣ Prompt – Dashboard Table (Client Component)
Create a simple dashboard users table.

Requirements:
- Make it a Client Component
- Include pagination and search input
- Fetch data from API route
- Add comments explaining:
  - Why dashboard does not need SEO
  - Why this is client-side
- Keep logic clean and not overcomplicated
6️⃣ Prompt – nuqs (URL State Sync)
Create a clean example using nuqs
to sync filter state with URL in Next.js App Router.

Requirements:
- Use useQueryState
- Add simple search input
- Show how URL updates automatically
- Add comments explaining:
  - Why URL-synced state is useful
  - When not to use nuqs
- Keep example small and readable
7️⃣ Prompt – useTransition (React)

(React)

Create a simple React example using useTransition.

Requirements:
- Add input that filters a list
- Use useTransition to make filtering non-blocking
- Show pending state
- Add comments explaining:
  - What a transition is
  - Why it keeps UI responsive
- Keep code clean and beginner-friendly
8️⃣ Prompt – useOptimistic
Create a simple example using useOptimistic.

Requirements:
- Add a like button
- Update UI immediately
- Simulate server delay
- Add comments explaining:
  - What optimistic UI means
  - Why it's good for UX
  - What happens if server fails
- Keep logic simple
9️⃣ Prompt – useSyncExternalStore
Create a clean example showing how to use useSyncExternalStore.

Requirements:
- Create a simple custom store
- Subscribe to it using useSyncExternalStore
- Add comments explaining:
  - What external store means
  - Why this hook is needed in concurrent React
- Avoid Redux or complex libraries
- Keep it minimal
🔟 Prompt – useLinkStatus (Next.js)

(Next.js)

Create a simple navigation example using useLinkStatus in Next.js.

Requirements:
- Create 2 pages
- Add navigation link
- Show loading indicator while navigating
- Add comments explaining:
  - Why navigation feedback improves UX
  - When to use useLinkStatus
- Keep example small and clear
1️⃣1️⃣ Prompt – Decision Matrix Doc
Create a simple markdown document explaining:

- Server Component vs Client Component
- When to use each
- Suspense usage
- Optimistic UI
- URL state management
- Dashboard vs SEO pages

Requirements:
- Use simple language
- Keep it structured
- Add short code examples
- Make it beginner-friendly
- Avoid advanced jargon
🔥 نصيحة مهمة لريبو تعليمي

في أول كل مثال حط comment زي:

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.