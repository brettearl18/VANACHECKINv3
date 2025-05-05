'use client';

import Link from 'next/link';

export default function CoachDashboard() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Coach Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link href="/coach/clients" className="text-blue-600 hover:underline text-lg">My Clients</Link>
        </li>
        <li>
          <Link href="/coach/programs" className="text-blue-600 hover:underline text-lg">My Programs</Link>
        </li>
        <li>
          <Link href="/coach/checkins" className="text-blue-600 hover:underline text-lg">Check-Ins</Link>
        </li>
      </ul>
    </div>
  );
} 