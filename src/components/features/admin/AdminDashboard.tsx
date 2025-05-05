'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link href="/admin/users" className="text-blue-600 hover:underline text-lg">Manage Users</Link>
        </li>
        <li>
          <Link href="/admin/companies" className="text-blue-600 hover:underline text-lg">Manage Companies</Link>
        </li>
        <li>
          <Link href="/admin/programs" className="text-blue-600 hover:underline text-lg">Manage Programs</Link>
        </li>
      </ul>
    </div>
  );
} 