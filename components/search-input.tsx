"use client";

// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type SearchInputProps = {
  label?: string;
  initialValue?: string;
  placeholder?: string;
  delayMs?: number;
  onDebouncedChange?: (value: string) => void;
};

export function SearchInput({
  label = "Search",
  initialValue = "",
  placeholder = "Type to search...",
  delayMs = 300,
  onDebouncedChange,
}: SearchInputProps) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue] = useDebounce(value, delayMs);

  useEffect(() => {
    onDebouncedChange?.(debouncedValue);
  }, [debouncedValue, onDebouncedChange]);

  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-zinc-700 dark:text-zinc-300">{label}</span>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      />
    </label>
  );
}
