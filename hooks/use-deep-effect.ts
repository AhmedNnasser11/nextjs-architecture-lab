// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { useEffect, useRef } from "react";

/**
 * useDeepEffect — like useEffect, but with deep comparison of dependencies.
 *
 * WHY THIS EXISTS:
 * React's useEffect compares dependencies by reference (===).
 * If you pass an object or array that is re-created every render,
 * the effect fires on EVERY render — even when the actual values
 * inside haven't changed.
 *
 * useDeepEffect solves this by comparing the stringified snapshot
 * of the dependencies. The effect only fires when the deep content
 * actually changes.
 *
 * WHEN TO USE:
 * - Your dependency is an object, array, or nested structure
 *   that gets re-created on every render (e.g. from props or context).
 * - You want the effect to fire only when the deep value changes.
 *
 * WHEN NOT TO USE:
 * - Your dependencies are primitives (string, number, boolean) —
 *   regular useEffect already works fine.
 * - Your dependencies contain non-serializable values (functions,
 *   class instances, DOM nodes) — JSON.stringify will lose them.
 * - Performance-critical paths with very large objects — the
 *   stringify comparison has a cost.
 */
export function useDeepEffect(
    effect: () => void | (() => void),
    dependencies: unknown[],
) {
    // Store a stringified snapshot of the previous dependencies
    const previousDepsRef = useRef<string | undefined>(undefined);

    // We use a counter to trigger useEffect when the deep value changes
    const changeCounterRef = useRef(0);

    const currentSnapshot = JSON.stringify(dependencies);

    if (previousDepsRef.current !== currentSnapshot) {
        previousDepsRef.current = currentSnapshot;
        changeCounterRef.current += 1;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, [changeCounterRef.current]);
}
