// 🏛️ Architecture: Design System Wrapper
// ✅ لماذا نعدل في ملف منفصل؟
// ### Why wrap base UI components instead of modifying them?
//
// We never modify base components (e.g. shadcn/ui files) directly.
// Instead, we create a wrapper layer inside `components/design/`.
//
// Why?
// - If we update the UI library later, our changes will NOT be lost.
// - It keeps a clear separation between third-party code and our own design system.
// - It allows us to enforce branding (colors, spacing, variants) from one place.
// - It keeps upgrades safe and predictable.
//
// This approach prevents "update conflicts" and keeps the codebase maintainable.
//
// (This example is intentionally simple to explain the concept.)
import * as React from "react";

import { Button } from "@/components/ui/button";

type PrimaryButtonProps = React.ComponentProps<typeof Button>;

export function PrimaryButton({ className, ...props }: PrimaryButtonProps) {
  const classes = [
    "bg-blue-600 text-white hover:bg-blue-500",
    "dark:bg-blue-500 dark:text-zinc-950 dark:hover:bg-blue-400",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Button className={classes} {...props} />;
}
