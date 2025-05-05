'use client';

export default function CompanyDetail({ companyId }: { companyId: string }) {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-xl font-bold mb-4">Company Detail</h2>
      <p>Details for company ID: {companyId}</p>
    </div>
  );
} 