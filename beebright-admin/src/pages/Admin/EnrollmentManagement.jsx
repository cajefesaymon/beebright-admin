import React, { useState, useEffect } from "react";
import { Check, X, Mail, Phone, User } from "lucide-react";

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch enrollments from backend
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/enrollments");
        const data = await response.json();
        // show only pending enrollments
        setEnrollments(data.filter((e) => e.status === "pending"));
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
      await fetch(`http://localhost:5001/api/enrollments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      // Remove enrollment from local list after status change
      setEnrollments((prev) => prev.filter((e) => e._id !== id));

      if (newStatus === "approved") {
        alert("Enrollment approved and added to users list!");
      } else {
        alert("Enrollment rejected and removed.");
      }
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
        <span className="bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-xl">
          {enrollments.length} Pending
        </span>
      </div>

      <div className="space-y-5">
        {enrollments.length === 0 ? (
          <p className="text-center text-neutral-500">No pending enrollments.</p>
        ) : (
          enrollments.map((e) => (
            <div
              key={e._id}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-5 shadow-sm relative"
            >
              <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-orange-500 text-white">
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
          ))
        )}
      </div>
    </div>
  );
};

export default EnrollmentManagement;
