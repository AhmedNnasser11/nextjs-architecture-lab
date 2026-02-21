// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
};

const ALL_USERS: User[] = [
  { id: 1, name: "Alex Admin", email: "alex@example.com", role: "admin" },
  { id: 2, name: "Billie Builder", email: "billie@example.com", role: "editor" },
  { id: 3, name: "Casey Creator", email: "casey@example.com", role: "editor" },
  { id: 4, name: "Dana Developer", email: "dana@example.com", role: "viewer" },
  { id: 5, name: "Evan Engineer", email: "evan@example.com", role: "viewer" },
  { id: 6, name: "Finley Founder", email: "finley@example.com", role: "admin" },
  { id: 7, name: "Gale Guest", email: "gale@example.com", role: "viewer" },
  { id: 8, name: "Harper Helper", email: "harper@example.com", role: "editor" },
  { id: 9, name: "Indie Intern", email: "indie@example.com", role: "viewer" },
  { id: 10, name: "Jordan Joiner", email: "jordan@example.com", role: "viewer" },
];

export type UsersQuery = {
  page: number;
  pageSize: number;
  search: string;
};

export type UsersPage = {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
};

export function queryUsers(query: UsersQuery): UsersPage {
  const safePage = Number.isFinite(query.page) && query.page > 0 ? query.page : 1;
  const safePageSize =
    Number.isFinite(query.pageSize) && query.pageSize > 0 ? query.pageSize : 5;

  const normalizedSearch = query.search.toLowerCase().trim();

  const filtered = ALL_USERS.filter((user) => {
    if (!normalizedSearch) return true;
    return (
      user.name.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch)
    );
  });

  const start = (safePage - 1) * safePageSize;
  const users = filtered.slice(start, start + safePageSize);

  return {
    users,
    total: filtered.length,
    page: safePage,
    pageSize: safePageSize,
  };
}

