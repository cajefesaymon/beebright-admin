import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Card from "../../components/Card";

const Users = () => {
  const [searchUser, setSearchUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Dummy data for now
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Student", email: "john@example.com", phone: "09123456789", joinDate: "2024-10-12" },
    { id: 2, name: "Jane Smith", role: "Parent", email: "jane@example.com", phone: "09129876543", joinDate: "2024-10-18" },
  ]);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  const handleAdd = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleSave = (formData) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...formData, id: u.id } : u)));
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-neutral-900">User Management 👥</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition flex items-center gap-2"
        >
          <Plus size={20} /> Add User
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-blue-500 focus:outline-none mb-6"
      />

      {/* User table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-neutral-200">
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Name</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Role</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Email</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Phone</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Join Date</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                >
                  <td className="py-3 px-4 font-semibold">{user.name}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4">{user.joinDate}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="ml-2 text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-neutral-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <UserModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editingUser={editingUser}
        />
      )}
    </Card>
  );
};

/* ---------------------- MODAL COMPONENT ---------------------- */
const UserModal = ({ onClose, onSave, editingUser }) => {
  const [formData, setFormData] = useState(
    editingUser || { name: "", role: "Student", email: "", phone: "", joinDate: "" }
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
          {editingUser ? "Edit User" : "Add User"}
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
            <label className="block text-sm font-semibold text-neutral-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-400"
            >
              <option value="Student">Student</option>
              <option value="Parent">Parent</option>
              <option value="Tutor">Tutor</option>
            </select>
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
            <label className="block text-sm font-semibold text-neutral-700 mb-1">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-400"
            />
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
            {editingUser ? "Save Changes" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Users;
