'use client';

export default function ProgramDetail({ programId }: { programId: string }) {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-xl font-bold mb-4">Program Detail</h2>
      <p>Details for program ID: {programId}</p>
    </div>
  );
} 