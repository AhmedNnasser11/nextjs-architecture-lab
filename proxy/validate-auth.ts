// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

// ──────────────────────────────────────────────────────────
// VALIDATE AUTH
//
// Checks if the user is authenticated by looking for a
// "session" cookie. If the cookie is missing and the user
// is trying to access a protected route, redirect to /login.
//
// In a real app you would verify a JWT or call a session API.
// Here we keep it simple: cookie exists = authenticated.
// ──────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const PROTECTED_PREFIXES = ["/dashboard", "/settings", "/admin"];

export function validateAuth(request: NextRequest): NextResponse | null {
    const { pathname } = request.nextUrl;
    console.log("validateAuth", pathname);

    // Only check protected routes
    const isProtected = PROTECTED_PREFIXES.some((prefix) =>
        pathname.startsWith(prefix),
    );

    if (!isProtected) {
        return null; // Not a protected route — skip this validator
    }

    const sessionCookie = request.cookies.get("session");

    if (!sessionCookie?.value) {
        // No session cookie → redirect to login
        const loginUrl = new URL("/login", request.url);

        // Preserve the original URL so we can redirect back after login
        loginUrl.searchParams.set("callbackUrl", pathname);

        return NextResponse.redirect(loginUrl);
    }

    // Authenticated — let the request continue
    return null;
}
