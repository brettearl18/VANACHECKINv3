'use client';

import Link from 'next/link';

export default function ClientDashboard() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Client Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link href="/client/programs" className="text-blue-600 hover:underline text-lg">My Programs</Link>
        </li>
        <li>
          <Link href="/client/checkins" className="text-blue-600 hover:underline text-lg">My Check-Ins</Link>
        </li>
        <li>
          <Link href="/client/profile" className="text-blue-600 hover:underline text-lg">My Profile</Link>
        </li>
      </ul>
    </div>
  );
} 