import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Card from "../../components/Card";

const Tutors = () => {
  const [searchTutor, setSearchTutor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTutor, setEditingTutor] = useState(null);

  const [tutors, setTutors] = useState([
    {
      id: 1,
      name: "Andrea Lopez",
      email: "andrea@beebright.com",
      phone: "09123456789",
      expertise: ["Math", "Science"],
    },
    {
      id: 2,
      name: "Carlos Dela Cruz",
      email: "carlos@beebright.com",
      phone: "09987654321",
      expertise: ["English", "Reading"],
    },
  ]);

  const filteredTutors = tutors.filter((tutor) =>
    tutor.name.toLowerCase().includes(searchTutor.toLowerCase())
  );

  const handleAdd = () => {
    setEditingTutor(null);
    setShowModal(true);
  };

  const handleEdit = (tutor) => {
    setEditingTutor(tutor);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setTutors(tutors.filter((t) => t.id !== id));
  };

  const handleSave = (formData) => {
    if (editingTutor) {
      setTutors(
        tutors.map((t) => (t.id === editingTutor.id ? { ...formData, id: t.id } : t))
      );
    } else {
      setTutors([...tutors, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-neutral-900">Tutor Management 👨‍🏫</h2>
        <button
          onClick={handleAdd}
          className="bg-purple-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-600 transition flex items-center gap-2"
        >
          <Plus size={20} /> Add Tutor
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search tutors..."
        value={searchTutor}
        onChange={(e) => setSearchTutor(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-purple-500 focus:outline-none mb-6"
      />

      {/* Tutor Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-neutral-200">
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Name</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Email</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Expertise</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Phone</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTutors.length > 0 ? (
              filteredTutors.map((tutor) => (
                <tr
                  key={tutor.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                >
                  <td className="py-3 px-4 font-semibold text-neutral-900">{tutor.name}</td>
                  <td className="py-3 px-4 text-neutral-700">{tutor.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-2">
                      {tutor.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-xs font-semibold"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-neutral-700">{tutor.phone}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(tutor)}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tutor.id)}
                      className="ml-2 text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-neutral-500">
                  No tutors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <TutorModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editingTutor={editingTutor}
        />
      )}
    </Card>
  );
};

/* ---------------------- MODAL COMPONENT ---------------------- */
const TutorModal = ({ onClose, onSave, editingTutor }) => {
  const [formData, setFormData] = useState(
    editingTutor || { name: "", email: "", phone: "", expertise: "" }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      expertise:
        typeof formData.expertise === "string"
          ? formData.expertise.split(",").map((s) => s.trim())
          : formData.expertise,
    };
    onSave(formattedData);
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
          {editingTutor ? "Edit Tutor" : "Add Tutor"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Expertise (comma-separated)
            </label>
            <input
              type="text"
              value={
                Array.isArray(formData.expertise)
                  ? formData.expertise.join(", ")
                  : formData.expertise
              }
              onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
              placeholder="Math, Science, English"
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-xl font-semibold hover:bg-purple-600 transition"
          >
            {editingTutor ? "Save Changes" : "Add Tutor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tutors;
