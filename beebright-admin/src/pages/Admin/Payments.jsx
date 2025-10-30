import React, { useState } from "react";
import { Plus, Check, X } from "lucide-react";
import Card from "../../components/Card";

const Payments = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const [payments, setPayments] = useState([
    {
      id: 1,
      user: "John Doe",
      amount: 1500,
      status: "Completed",
      date: "2025-10-25",
      method: "GCash",
    },
    {
      id: 2,
      user: "Jane Smith",
      amount: 2200,
      status: "Pending",
      date: "2025-10-28",
      method: "PayPal",
    },
  ]);

  const filteredPayments = payments.filter((p) =>
    p.user.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditingPayment(null);
    setShowModal(true);
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setPayments(payments.filter((p) => p.id !== id));
  };

  const handleSave = (formData) => {
    if (editingPayment) {
      setPayments(
        payments.map((p) => (p.id === editingPayment.id ? { ...formData, id: p.id } : p))
      );
    } else {
      setPayments([...payments, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-neutral-900">
          Payment Management 💸
        </h2>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition flex items-center gap-2"
        >
          <Plus size={20} /> Add Payment
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search payments..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-green-500 focus:outline-none mb-6"
      />

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-neutral-200">
              <th className="text-left py-3 px-4 font-bold text-neutral-700">User</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Amount</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Method</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Status</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Date</th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                >
                  <td className="py-3 px-4 font-semibold text-neutral-900">{p.user}</td>
                  <td className="py-3 px-4 text-neutral-700">₱ {p.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-neutral-700">{p.method}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        p.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-700">{p.date}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="ml-2 text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-neutral-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <PaymentModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editingPayment={editingPayment}
        />
      )}
    </Card>
  );
};

/* ---------------------- MODAL COMPONENT ---------------------- */
const PaymentModal = ({ onClose, onSave, editingPayment }) => {
  const [formData, setFormData] = useState(
    editingPayment || {
      user: "",
      amount: "",
      method: "GCash",
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    }
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
          {editingPayment ? "Edit Payment" : "Add Payment"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              User
            </label>
            <input
              type="text"
              value={formData.user}
              onChange={(e) => setFormData({ ...formData, user: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Amount (₱)
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) })
              }
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Payment Method
            </label>
            <select
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-green-400"
            >
              <option value="GCash">GCash</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-green-400"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-xl font-semibold hover:bg-green-600 transition"
          >
            {editingPayment ? "Save Changes" : "Add Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payments;
