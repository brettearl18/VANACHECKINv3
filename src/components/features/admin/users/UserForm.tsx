'use client';

import { useState } from 'react';
import Link from 'next/link';

const initialForm = { name: '', email: '', role: '', status: 'Active' };

export default function UserForm({ mode, user }: { mode: 'create' | 'edit'; user?: any }) {
  const [form, setForm] = useState(user || initialForm);
  const [saved, setSaved] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    // Here you would call your API to save changes
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create User' : 'Edit User'}</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            className="border rounded px-3 py-2 w-full"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            className="border rounded px-3 py-2 w-full"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Role</label>
          <select
            className="border rounded px-3 py-2 w-full"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">Select role</option>
            <option value="Admin">Admin</option>
            <option value="Coach">Coach</option>
            <option value="Client">Client</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Status</label>
          <select
            className="border rounded px-3 py-2 w-full"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{mode === 'create' ? 'Create' : 'Save'}</button>
          <Link href="/admin/users" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Cancel</Link>
        </div>
        {saved && <div className="text-green-600 mt-2">{mode === 'create' ? 'User created (mock).' : 'Changes saved (mock).'}</div>}
      </form>
    </div>
  );
} 