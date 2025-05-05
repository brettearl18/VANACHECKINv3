'use client';

export default function CompanyForm({ mode }: { mode: 'create' | 'edit' }) {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Company' : 'Edit Company'}</h2>
      <p>This is where you will {mode === 'create' ? 'create a new company.' : 'edit the company.'}</p>
    </div>
  );
} 