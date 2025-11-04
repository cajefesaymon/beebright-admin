import React, { useState } from "react";
import { Check, X, Mail, Phone, User } from "lucide-react";

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([
    {
      id: 1,
      studentName: "Lucas Wong",
      submitted: "Oct 18, 2025",
      grade: "Grade 5",
      address: "123 Main St, Manila",
      parentName: "Mr. Henry Wong",
      parentEmail: "henry.wong@email.com",
      parentPhone: "09123456789",
      schedule: "Mon-Wed-Fri, 4:00 PM",
      subjects: ["Math", "Science"],
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Sophia Lee",
      submitted: "Oct 17, 2025",
      grade: "Grade 4",
      address: "456 Oak Ave, Quezon City",
      parentName: "Mrs. Sarah Lee",
      parentEmail: "sarah.lee@email.com",
      parentPhone: "09187654321",
      schedule: "Tue-Thu, 3:00 PM",
      subjects: ["English", "Filipino"],
      status: "Pending",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setEnrollments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  const pendingCount = enrollments.filter((e) => e.status === "Pending").length;
  const approvedCount = enrollments.filter((e) => e.status === "Approved").length;

  return (
    <div className="p-6 bg-neutral-50 min-h-screen rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl flex items-center gap-2 text-neutral-900">
          📖 Enrollment Management
        </h2>
        <div className="flex gap-3">
          <span className="bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-xl">
            {pendingCount} Pending
          </span>
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-xl">
            {approvedCount} Approved
          </span>
        </div>
      </div>

      {/* Enrollment Cards */}
      <div className="space-y-5">
        {enrollments.map((e) => (
          <div
            key={e.id}
            className="bg-orange-50 border border-orange-100 rounded-2xl p-5 shadow-sm relative"
          >
            {/* Status Badge */}
            <span
              className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                e.status === "Pending"
                  ? "bg-orange-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {e.status.toUpperCase()}
            </span>

            {/* Student Info */}
            <div className="flex justify-between flex-wrap gap-6">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">
                  {e.studentName}
                </h3>
                <p className="text-sm text-neutral-500">
                  Submitted: {e.submitted}
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
                    SUBJECTS REQUESTED
                  </p>
                  <div className="flex gap-2 mt-2">
                    {e.subjects.map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Parent Info */}
              <div>
                <p className="text-xs font-semibold text-neutral-500">
                  PARENT CONTACT
                </p>
                <p className="text-sm flex items-center gap-2 mt-1 text-neutral-800">
                  <User size={14} /> {e.parentName}
                </p>
                <p className="text-sm flex items-center gap-2 text-neutral-700">
                  <Mail size={14} /> {e.parentEmail}
                </p>
                <p className="text-sm flex items-center gap-2 text-neutral-700">
                  <Phone size={14} /> {e.parentPhone}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-neutral-500">
                    PREFERRED SCHEDULE
                  </p>
                  <p className="text-sm text-neutral-800">{e.schedule}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex gap-3 border-t border-neutral-200 pt-4">
              <button
                onClick={() => handleStatusChange(e.id, "Approved")}
                className="flex-1 bg-green-500 text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition"
              >
                <Check size={18} /> Approve & Create Account
              </button>
              <button
                onClick={() => handleStatusChange(e.id, "Rejected")}
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
