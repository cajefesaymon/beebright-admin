import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Card from "../../components/Card";


const Users = () => {
  const [searchUser, setSearchUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alex Chen",
      role: "Student",
      email: "alex@student.com",
      phone: "09123456789",
      joinDate: "Oct 1, 2025",
      emoji: "🧑‍🎓",
    },
    {
      id: 2,
      name: "Mrs. Chen",
      role: "Parent",
      email: "parent@beebright.com",
      phone: "09123456790",
      joinDate: "Sep 28, 2025",
      emoji: "🧑‍🦳",
    },
    {
      id: 3,
      name: "Maria Santos",
      role: "Student",
      email: "maria@student.com",
      phone: "09123456791",
      joinDate: "Oct 10, 2025",
      emoji: "👩‍🎓",
    },
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
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
   
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-2xl text-neutral-900 flex items-center gap-2">
            User Management <span>👥</span>
          </h2>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition flex items-center gap-2"
          >
            <Plus size={18} /> Add User
          </button>
        </div>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:border-blue-500 focus:outline-none mb-5"
        />

        {/* User Table */}
        <Card className="p-4 shadow-md rounded-2xl bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-left">
                  <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Name</th>
                  <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Role</th>
                  <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Email</th>
                  <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Phone</th>
                  <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Join Date</th>
                  <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                    >
                      <td className="py-3 px-4 font-semibold flex items-center gap-2">
                        <span className="text-xl">{user.emoji}</span> {user.name}
                      </td>
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
                          className="ml-3 text-red-600 hover:text-red-700 text-sm font-semibold"
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
        </Card>
      </main>

      {/* Modal */}
      {showModal && (
        <UserModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editingUser={editingUser}
        />
      )}
    </div>
  );
};

// Modal Component
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
          {["name", "email", "phone", "joinDate"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-neutral-700 mb-1 capitalize">
                {field === "joinDate" ? "Join Date" : field}
              </label>
              <input
                type={field === "joinDate" ? "date" : "text"}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-400"
                required={field !== "phone"}
              />
            </div>
          ))}

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
