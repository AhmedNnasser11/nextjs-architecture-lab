// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium",
    "bg-zinc-900 text-zinc-50 hover:bg-zinc-800",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "transition-colors",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} {...props} />;
}

