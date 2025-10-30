import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Card from "../../components/Card";

const Admins = () => {
  const [searchAdmin, setSearchAdmin] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  // Dummy data for now
  const [admins, setAdmins] = useState([
    { id: 1, name: "Mark Reyes", email: "mark@beebright.com", role: "Super Admin", joinDate: "2024-09-21" },
    { id: 2, name: "Ella Santos", email: "ella@beebright.com", role: "Admin", joinDate: "2024-10-01" },
  ]);

  const filteredAdmins = admins.filter((a) =>
    a.name.toLowerCase().includes(searchAdmin.toLowerCase())
  );

  const handleAdd = () => {
    setEditingAdmin(null);
    setShowModal(true);
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setAdmins(admins.filter((a) => a.id !== id));
  };

  const handleSave = (formData) => {
    if (editingAdmin) {
      setAdmins(admins.map((a) => (a.id === editingAdmin.id ? { ...formData, id: a.id } : a)));
    } else {
      setAdmins([...admins, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-neutral-900">Admin Management 🧑‍💼</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition flex items-center gap-2"
        >
          <Plus size={20} /> Add Admin
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search admins..."
        value={searchAdmin}
        onChange={(e) => setSearchAdmin(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-blue-500 focus:outline-none mb-6"
      />

      {/* Admin table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-neutral-200">
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Name</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Email</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Role</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Join Date</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <tr
                  key={admin.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                >
                  <td className="py-3 px-4 font-semibold">{admin.name}</td>
                  <td className="py-3 px-4">{admin.email}</td>
                  <td className="py-3 px-4">{admin.role}</td>
                  <td className="py-3 px-4">{admin.joinDate}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="ml-2 text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-neutral-500">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editingAdmin={editingAdmin}
        />
      )}
    </Card>
  );
};

/* ---------------------- MODAL COMPONENT ---------------------- */
const AdminModal = ({ onClose, onSave, editingAdmin }) => {
  const [formData, setFormData] = useState(
    editingAdmin || { name: "", email: "", role: "Admin", joinDate: "" }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-700"
        >
          <X size={22} />
        </button>
        <h3 className="text-xl font-bold mb-4 text-neutral-900">
          {editingAdmin ? "Edit Admin" : "Add Admin"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-400"
            >
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">Join Date</label>
            <input
              type="date"
              value={formData.joinDate}
              onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            {editingAdmin ? "Save Changes" : "Add Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admins;
