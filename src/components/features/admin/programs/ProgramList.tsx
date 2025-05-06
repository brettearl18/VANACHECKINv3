"use client";
import { useEffect, useState } from "react";
import { getPrograms, archiveProgram, deleteProgram, Program } from "@/lib/firebase/programs";
import ProgramForm from "./ProgramForm";

export default function ProgramList() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editProgram, setEditProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [confirmChecked, setConfirmChecked] = useState(false);

  const fetchPrograms = async () => {
    setLoading(true);
    const data = await getPrograms();
    setPrograms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleEdit = (program: Program) => {
    setEditProgram(program);
    setShowForm(true);
  };

  const handleArchive = async (id: string) => {
    if (!confirmChecked) {
      alert("Please confirm by checking the box.");
      return;
    }
    await archiveProgram(id);
    setShowArchiveConfirm(null);
    setConfirmChecked(false);
    fetchPrograms();
  };

  const handleDelete = async (id: string) => {
    if (!confirmChecked) {
      alert("Please confirm by checking the box.");
      return;
    }
    await deleteProgram(id);
    setShowDeleteConfirm(null);
    setConfirmChecked(false);
    fetchPrograms();
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditProgram(null);
    fetchPrograms();
  };

  const filteredPrograms = programs.filter(p => showArchived ? p.archived : !p.archived);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Programs</h2>
        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowForm(true)}
          >
            + New Program
          </button>
          <button
            className={`px-4 py-2 rounded ${showArchived ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setShowArchived(!showArchived)}
          >
            {showArchived ? 'Show Active' : 'Show Archived'}
          </button>
        </div>
      </div>
      {showForm && (
        <ProgramForm program={editProgram} onClose={handleFormClose} />
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.map((program) => (
              <tr key={program.id}>
                <td className="px-4 py-2 border">{program.name}</td>
                <td className="px-4 py-2 border">{program.description}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(program)}
                  >
                    Edit
                  </button>
                  <a
                    href={`/admin/programs/${program.id}/clients`}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Clients
                  </a>
                  {showArchived ? (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => setShowArchiveConfirm(program.id!)}
                    >
                      Restore
                    </button>
                  ) : (
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() => setShowArchiveConfirm(program.id!)}
                    >
                      Archive
                    </button>
                  )}
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => setShowDeleteConfirm(program.id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showArchiveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Confirm Archive</h3>
            <p>Are you sure you want to archive this program?</p>
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={confirmChecked}
                  onChange={(e) => setConfirmChecked(e.target.checked)}
                  className="mr-2"
                />
                I confirm this action
              </label>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => { setShowArchiveConfirm(null); setConfirmChecked(false); }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => handleArchive(showArchiveConfirm)}
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this program?</p>
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={confirmChecked}
                  onChange={(e) => setConfirmChecked(e.target.checked)}
                  className="mr-2"
                />
                I confirm this action
              </label>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => { setShowDeleteConfirm(null); setConfirmChecked(false); }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={() => handleDelete(showDeleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 