'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '@/lib/firebase/users';

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then(users => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  async function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Management</h2>
        <Link href="/admin/users/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create User</Link>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">
                <Link href={`/admin/users/${user.id}`} className="text-blue-600 hover:underline">{user.name}</Link>
              </td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role}</td>
              <td className="px-4 py-2 border">{user.status}</td>
              <td className="px-4 py-2 border">
                <Link href={`/admin/users/${user.id}`} className="mr-2 text-green-600 hover:underline">Edit</Link>
                <button className="text-red-600 hover:underline" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 