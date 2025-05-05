'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { testFirestore } from '@/lib/firebase/test';

export default function HomePage() {
  const router = useRouter();
  const [testResult, setTestResult] = useState<string | null>(null);

  async function handleTest() {
    setTestResult('Testing...');
    try {
      const data = await testFirestore();
      setTestResult(`Success! Firestore says: ${data?.message}`);
    } catch (err: any) {
      setTestResult('Error: ' + err.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-2">Welcome to VanaCheckIn</h1>
      <p className="mb-8 text-gray-600">
        Your comprehensive coaching platform for fitness and wellness professionals.
      </p>
      <div className="flex gap-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => router.push('/admin')}
        >
          Admin
        </button>
        <button
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={() => router.push('/coach')}
        >
          Coach
        </button>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          onClick={() => router.push('/client')}
        >
          Client
        </button>
      </div>
      <button
        className="mt-8 px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        onClick={handleTest}
      >
        Test Firestore Connection
      </button>
      {testResult && (
        <div className="mt-4 text-lg">
          {testResult}
        </div>
      )}
    </div>
  );
} 