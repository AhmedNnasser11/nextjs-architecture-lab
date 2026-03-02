// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

// ──────────────────────────────────────────────────────────
// VALIDATE RATE LIMIT
//
// A basic in-memory rate limiter that blocks an IP if it
// exceeds the allowed number of requests per window.
//
// IMPORTANT: This is a simplified example. In-memory storage
// resets when the server restarts and does NOT work across
// multiple instances. In production, use Redis, Upstash,
// or a similar distributed store.
//
// This validator runs FIRST in the chain so we can block
// abusive traffic before wasting resources on auth or locale.
// ──────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAX_REQUESTS = 100; // requests per window
const WINDOW_MS = 60_000; // 1 minute

type RateLimitEntry = {
    count: number;
    resetAt: number;
};

// In-memory store (simplified — not suitable for multi-instance)
const ipStore = new Map<string, RateLimitEntry>();

export function validateRateLimit(request: NextRequest): NextResponse | null {
    // Get the client IP (falls back to "unknown" in dev)
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    console.log("validateRateLimit", ip);
    const now = Date.now();

    let entry = ipStore.get(ip);

    // If no entry or the window has expired, start a new window
    if (!entry || now > entry.resetAt) {
        entry = { count: 1, resetAt: now + WINDOW_MS };
        ipStore.set(ip, entry);
        return null;
    }

    entry.count += 1;

    if (entry.count > MAX_REQUESTS) {
        // Too many requests — return 429
        return new NextResponse("Too Many Requests", {
            status: 429,
            headers: {
                "Retry-After": String(Math.ceil((entry.resetAt - now) / 1000)),
            },
        });
    }

    return null; // Under the limit — continue
}
