import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import Card from "../../components/Card";

const API_URL = "http://localhost:5001/api/enrollments";

const Users = () => {
  const [searchUser, setSearchUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);

  // ✅ Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        // Only show approved users
        const approved = data.filter((e) => e.status === "approved");
        setUsers(
          approved.map((u) => ({
            id: u._id,
            name: u.studentName,
            role: "Student",
            email: u.contactEmail,
            phone: u.contactPhone || "—",
            joinDate: new Date(u.createdAt).toLocaleDateString(),
            emoji: "🧑‍🎓",
          }))
        );
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingUser) {
        // Update existing user
        const res = await fetch(`${API_URL}/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        setUsers(
          users.map((u) =>
            u.id === editingUser.id ? { ...u, ...updated } : u
          )
        );
      } else {
        // Add new enrollment
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentName: formData.name,
            contactEmail: formData.email,
            contactPhone: formData.phone,
            status: "approved",
          }),
        });
        const newUser = await res.json();
        setUsers([
          ...users,
          {
            id: newUser._id,
            name: newUser.studentName,
            role: "Student",
            email: newUser.contactEmail,
            phone: newUser.contactPhone,
            joinDate: new Date(newUser.createdAt).toLocaleDateString(),
            emoji: "🧑‍🎓",
          },
        ]);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
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
                      No approved users found.
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
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-neutral-700 mb-1 capitalize">
                {field}
              </label>
              <input
                type="text"
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-400"
                required={field !== "phone"}
              />
            </div>
          ))}

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
