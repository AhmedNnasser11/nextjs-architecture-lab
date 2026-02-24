// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

// ──────────────────────────────────────────────────────────
// VALIDATE LOCALE
//
// Detects the user's preferred language from the
// Accept-Language header and redirects to the correct
// locale prefix if missing.
//
// Example: a French user visiting /about gets redirected
// to /fr/about, so the correct translation is served.
//
// In a real app this would integrate with next-intl or
// a similar i18n library. Here we keep it minimal.
// ──────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "ar", "fr"];
const DEFAULT_LOCALE = "en";

export function validateLocale(request: NextRequest): NextResponse | null {
    const { pathname } = request.nextUrl;

    // Check if the URL already has a locale prefix
    const hasLocale = SUPPORTED_LOCALES.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (hasLocale) {
        return null; // Locale already present — skip
    }

    // Read the user's preferred language from the browser header
    const acceptLanguage = request.headers.get("accept-language") ?? "";

    // Extract the first preferred language code (e.g. "fr-FR,fr;q=0.9" → "fr")
    const preferredLanguage = acceptLanguage.split(",")[0]?.split("-")[0]?.trim();

    const locale =
        preferredLanguage && SUPPORTED_LOCALES.includes(preferredLanguage)
            ? preferredLanguage
            : DEFAULT_LOCALE;

    // If the preferred locale is the default, no redirect needed
    if (locale === DEFAULT_LOCALE) {
        return null;
    }

    // Redirect to the locale-prefixed URL
    const localizedUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(localizedUrl);
}
