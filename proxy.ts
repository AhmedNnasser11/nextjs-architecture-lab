// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

// ──────────────────────────────────────────────────────────
// WHAT IS proxy.ts?
//
// proxy.ts (new in Next.js 16) replaces the old middleware.ts.
// It runs on the server BEFORE any route is rendered.
// Use it for: auth checks, redirects, header injection, logging.
//
// WHY SPLIT VALIDATIONS?
//
// In real projects, proxy logic grows fast — auth, CORS, locale,
// rate-limiting, feature flags, etc. Keeping everything in one
// big function becomes unreadable. Instead, we break each
// validation into its own file and call them here in order.
// This keeps each concern small, testable, and easy to find.
// ──────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { validateAuth } from "./proxy/validate-auth";
import { validateRateLimit } from "./proxy/validate-rate-limit";
import { validateLocale } from "./proxy/validate-locale";


// Each validator returns either a NextResponse (to redirect/block)
// or null (to let the request continue to the next validator).
type ProxyValidator = (
    request: NextRequest,
) => NextResponse | null | Promise<NextResponse | null>;

// The order here matters — validators run top to bottom.
// If any validator returns a response, we short-circuit.
const validators: ProxyValidator[] = [
    validateRateLimit,
    validateAuth,
    validateLocale,
];

export async function proxy(request: NextRequest) {
    for (const validate of validators) {
        const result = await validate(request);

        // If a validator returned a response, stop here.
        // The remaining validators will not run.
        if (result) {
            return result;
        }
    }

    // All validators passed — continue to the actual route.
    return NextResponse.next();
}

// Only run the proxy on page routes.
// Skip static files, images, and API routes for performance.
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
