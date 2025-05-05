'use client';

export default function ProgramForm({ mode }: { mode: 'create' | 'edit' }) {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Program' : 'Edit Program'}</h2>
      <p>This is where you will {mode === 'create' ? 'create a new program.' : 'edit the program.'}</p>
    </div>
  );
} 