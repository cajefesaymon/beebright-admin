import React, { useState, useEffect } from "react";
import { Check, X, Mail, Phone, User } from "lucide-react";

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from backend API
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/enrollments");
        const data = await response.json();
        setEnrollments(data);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
  try {
    await fetch(`http://localhost:5000/api/enrollments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    // Update local state after success
    setEnrollments((prev) =>
      prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
    );
  } catch (error) {
    console.error("Error updating status:", error);
  }
};


  if (loading) {
    return <div className="p-6 text-center">Loading enrollments...</div>;
  }

  return (
    <div className="p-6 bg-neutral-50 min-h-screen rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl flex items-center gap-2 text-neutral-900">
          📖 Enrollment Management
        </h2>
        <div className="flex gap-3">
          <span className="bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-xl">
            {enrollments.filter((e) => e.status === "pending").length} Pending
          </span>
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-xl">
            {enrollments.filter((e) => e.status === "approved").length} Approved
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {enrollments.map((e) => (
          <div
            key={e._id}
            className="bg-orange-50 border border-orange-100 rounded-2xl p-5 shadow-sm relative"
          >
            <span
              className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                e.status === "pending"
                  ? "bg-orange-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {e.status.toUpperCase()}
            </span>

            <div className="flex justify-between flex-wrap gap-6">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">
                  {e.studentName}
                </h3>
                <p className="text-sm text-neutral-500">
                  Submitted:{" "}
                  {new Date(e.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-neutral-500">
                    STUDENT INFO
                  </p>
                  <p className="text-sm flex items-center gap-2 mt-1 text-neutral-800">
                    <User size={14} /> {e.grade}
                  </p>
                  <p className="text-sm text-neutral-700">{e.address}</p>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-neutral-500">
                    SCHOOL
                  </p>
                  <p className="text-sm text-neutral-800">{e.school}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-neutral-500">
                  CONTACT INFO
                </p>
                <p className="text-sm flex items-center gap-2 text-neutral-700 mt-1">
                  <Mail size={14} /> {e.contactEmail}
                </p>
                <p className="text-sm flex items-center gap-2 text-neutral-700">
                  <Phone size={14} /> {e.contactPhone}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-neutral-500">
                    PREFERRED SCHEDULE
                  </p>
                  <p className="text-sm text-neutral-800">{e.schedule}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-3 border-t border-neutral-200 pt-4">
              <button
                onClick={() => handleStatusChange(e._id, "approved")}
                className="flex-1 bg-green-500 text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition"
              >
                <Check size={18} /> Approve & Create Account
              </button>
              <button
                onClick={() => handleStatusChange(e._id, "rejected")}
                className="flex-1 bg-red-500 text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition"
              >
                <X size={18} /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrollmentManagement;
