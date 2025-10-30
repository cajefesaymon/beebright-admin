import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Card from "../../components/Card";

const Announcements = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "New Tutor Applications Open!",
      content: "We’re accepting new tutor applicants this month — apply before November 15.",
      date: "2025-10-25",
    },
    {
      id: 2,
      title: "Holiday Class Schedule 🎄",
      content: "Classes will pause from December 24–26 and resume on December 27.",
      date: "2025-10-30",
    },
  ]);

  const filtered = announcements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditingAnnouncement(null);
    setShowModal(true);
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  const handleSave = (formData) => {
    if (editingAnnouncement) {
      setAnnouncements(
        announcements.map((a) =>
          a.id === editingAnnouncement.id ? { ...formData, id: a.id } : a
        )
      );
    } else {
      setAnnouncements([...announcements, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-neutral-900">
          Announcements 📣
        </h2>
        <button
          onClick={handleAdd}
          className="bg-purple-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-600 transition flex items-center gap-2"
        >
          <Plus size={20} /> New Announcement
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search announcements..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-purple-500 focus:outline-none mb-6"
      />

      {/* Announcements List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="p-5 border border-neutral-200 rounded-2xl hover:bg-neutral-50 transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-neutral-900">{a.title}</h3>
                <span className="text-sm text-neutral-500">{a.date}</span>
              </div>
              <p className="text-neutral-700 mb-3">{a.content}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(a)}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-neutral-500">No announcements found.</p>
      )}

      {showModal && (
        <AnnouncementModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editingAnnouncement={editingAnnouncement}
        />
      )}
    </Card>
  );
};

/* ---------------------- MODAL COMPONENT ---------------------- */
const AnnouncementModal = ({ onClose, onSave, editingAnnouncement }) => {
  const [formData, setFormData] = useState(
    editingAnnouncement || {
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-700"
        >
          <X size={22} />
        </button>
        <h3 className="text-xl font-bold mb-4 text-neutral-900">
          {editingAnnouncement ? "Edit Announcement" : "New Announcement"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Content
            </label>
            <textarea
              rows="4"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-xl font-semibold hover:bg-purple-600 transition"
          >
            {editingAnnouncement ? "Save Changes" : "Add Announcement"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Announcements;
