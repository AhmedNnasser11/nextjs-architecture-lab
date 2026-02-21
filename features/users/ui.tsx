// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

import type { User } from "./data";

type UsersTableProps = {
  users: User[];
};

export function UsersTable({ users }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No users match the current filters.
      </p>
    );
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <th className="py-2">Name</th>
          <th className="py-2">Email</th>
          <th className="py-2">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="border-b border-zinc-100 text-zinc-900 last:border-0 dark:border-zinc-800 dark:text-zinc-50"
          >
            <td className="py-2 align-top">{user.name}</td>
            <td className="py-2 align-top">{user.email}</td>
            <td className="py-2 align-top capitalize">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

