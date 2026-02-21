// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import { NextResponse } from "next/server";

import { queryUsers } from "@/features/users/data";

const DEFAULT_PAGE_SIZE = 5;

export function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(
    searchParams.get("pageSize") ?? String(DEFAULT_PAGE_SIZE),
  );
  const search = searchParams.get("q") ?? "";

  const result = queryUsers({
    page,
    pageSize,
    search,
  });

  return NextResponse.json(result);
}

