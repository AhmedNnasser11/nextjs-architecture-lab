// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

export default function ProxyExamplePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Proxy (Modular Validation)
        </h1>
        <p className="max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
          Next.js 16 replaced{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            middleware.ts
          </code>{" "}
          with{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            proxy.ts
          </code>
          . It runs on the server <strong>before</strong> any route is rendered
          — perfect for auth, rate limiting, locale detection, and more.
        </p>
      </section>

      <section className="space-y-4 rounded-md border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Why split into multiple files?
        </h2>
        <p className="text-xs text-zinc-700 dark:text-zinc-300">
          In real projects, proxy logic grows fast: auth checks, CORS headers,
          locale redirects, rate limiting, feature flags, etc. Instead of one
          massive function, we break each concern into its own validator file
          and compose them in{" "}
          <span className="font-mono text-[0.7rem]">proxy.ts</span>.
        </p>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Architecture
          </h3>
          <pre className="overflow-auto rounded-md bg-zinc-50 p-3 text-xs text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
            {`proxy.ts                      ← main entry, chains validators
proxy/
├── validate-rate-limit.ts    ← blocks abusive IPs (runs first)
├── validate-auth.ts          ← checks session cookie on /dashboard
└── validate-locale.ts        ← redirects to /fr, /ar based on browser`}
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            How it works
          </h3>
          <pre className="overflow-auto rounded-md bg-zinc-50 p-3 text-xs text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
            {`// proxy.ts — simplified view

const validators = [
  validateRateLimit,   // 1. block abuse early
  validateAuth,        // 2. check authentication
  validateLocale,      // 3. detect language
];

export async function proxy(request) {
  for (const validate of validators) {
    const result = await validate(request);
    if (result) return result;  // short-circuit
  }
  return NextResponse.next();   // all passed
}`}
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Benefits
          </h3>
          <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
            <li>
              ✅ <strong>Single responsibility</strong> — each file does one
              thing
            </li>
            <li>
              ✅ <strong>Easy to test</strong> — mock a request, check the
              response
            </li>
            <li>
              ✅ <strong>Easy to toggle</strong> — comment out a validator to
              skip it
            </li>
            <li>
              ✅ <strong>Order matters</strong> — rate limit runs before auth so
              we don&apos;t waste cycles on abusive requests
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-2 rounded-md border border-dashed border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
        <p>
          <strong>Note:</strong> The proxy runs at the server level, not in the
          browser. You won&apos;t see its effect on this page directly —
          instead, try visiting{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-[0.7rem] dark:bg-zinc-800">
            /dashboard/users
          </code>{" "}
          without a session cookie to see the auth redirect in action.
        </p>
      </section>
    </main>
  );
}
