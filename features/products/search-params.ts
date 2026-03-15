// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { createLoader, parseAsString } from "nuqs/server";

// 🏛️ Architecture: nuqs for URL State
// ✅ لماذا نعرّف معلمات البحث في مكان واحد؟
// ### Why define search params in one place?
//
// We define parsers once and reuse them:
// - Server-side: via `createLoader` to parse searchParams.
// - Client-side: via `useQueryStates` to read & update the URL.
//
// This keeps the server page and client form in sync
// with the same type-safe definitions.

export const productsSearchParams = {
    q: parseAsString.withDefault(""),
    category: parseAsString.withDefault("all"),
};

export const loadProductsSearchParams = createLoader(productsSearchParams);
