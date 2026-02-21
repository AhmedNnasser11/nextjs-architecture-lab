// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

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

