import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Card from "../../components/Card";

const EnrollmentManagement = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingEnrollment, setEditingEnrollment] = useState(null);

  const [enrollments, setEnrollments] = useState([
    {
      id: 1,
      studentName: "Juan Dela Cruz",
      subject: "Mathematics",
      tutor: "Mr. Reyes",
      schedule: "Mon & Wed, 3:00 PM - 4:30 PM",
      status: "Active",
    },
    {
      id: 2,
      studentName: "Maria Santos",
      subject: "Science",
      tutor: "Ms. Lopez",
      schedule: "Tue & Thu, 1:00 PM - 2:30 PM",
      status: "Completed",
    },
  ]);

  const filtered = enrollments.filter((e) =>
    e.studentName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditingEnrollment(null);
    setShowModal(true);
  };

  const handleEdit = (enrollment) => {
    setEditingEnrollment(enrollment);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setEnrollments(enrollments.filter((e) => e.id !== id));
  };

  const handleSave = (formData) => {
    if (editingEnrollment) {
      setEnrollments(
        enrollments.map((e) =>
          e.id === editingEnrollment.id ? { ...formData, id: e.id } : e
        )
      );
    } else {
      setEnrollments([...enrollments, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-neutral-900">
          Enrollment Management 🎓
        </h2>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition flex items-center gap-2"
        >
          <Plus size={20} /> New Enrollment
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by student name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-blue-500 focus:outline-none mb-6"
      />

      {/* Table */}
      {filtered.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead className="bg-neutral-100">
              <tr className="text-left text-neutral-700">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Tutor</th>
                <th className="py-3 px-4">Schedule</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-neutral-200 hover:bg-neutral-50 transition"
                >
                  <td className="py-3 px-4">{e.studentName}</td>
                  <td className="py-3 px-4">{e.subject}</td>
                  <td className="py-3 px-4">{e.tutor}</td>
                  <td className="py-3 px-4">{e.schedule}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        e.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(e)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-8 text-neutral-500">No enrollments found.</p>
      )}

      {showModal && (
        <EnrollmentModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editingEnrollment={editingEnrollment}
        />
      )}
    </Card>
  );
};

/* ---------------------- MODAL COMPONENT ---------------------- */
const EnrollmentModal = ({ onClose, onSave, editingEnrollment }) => {
  const [formData, setFormData] = useState(
    editingEnrollment || {
      studentName: "",
      subject: "",
      tutor: "",
      schedule: "",
      status: "Active",
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
          {editingEnrollment ? "Edit Enrollment" : "New Enrollment"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Student Name"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            required
          />
          <FormInput
            label="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />
          <FormInput
            label="Tutor"
            value={formData.tutor}
            onChange={(e) => setFormData({ ...formData, tutor: e.target.value })}
            required
          />
          <FormInput
            label="Schedule"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            placeholder="e.g. Mon & Wed, 3:00 PM - 4:30 PM"
            required
          />
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-400"
            >
              <option>Active</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            {editingEnrollment ? "Save Changes" : "Add Enrollment"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ---------------------- REUSABLE INPUT ---------------------- */
const FormInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-neutral-700 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default EnrollmentManagement;
