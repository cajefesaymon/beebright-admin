import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Shield, GraduationCap, BarChart, BookOpen } from "lucide-react";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    admins: 0,
    tutors: 0,
    pending: 0,
  });
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch enrollment data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/enrollments");
        if (!res.ok) throw new Error("Failed to fetch enrollments");
        const data = await res.json();

        // sort by date (newest first)
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setEnrollments(sorted.slice(0, 5)); // show top 5

        // set stats
        setStats({
          users: 3, // replace with dynamic count later
          admins: 2, // replace with backend data if available
          tutors: 3, // replace with backend data if available
          pending: data.filter((e) => e.status === "pending").length,
        });
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <Users className="w-6 h-6 text-purple-600" />,
      border: "shadow-purple-100",
    },
    {
      title: "Admin Accounts",
      value: stats.admins,
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      border: "shadow-blue-100",
    },
    {
      title: "Tutors",
      value: stats.tutors,
      icon: <GraduationCap className="w-6 h-6 text-green-600" />,
      border: "shadow-green-100",
    },
    {
      title: "Pending Enrollments",
      value: stats.pending,
      icon: <BarChart className="w-6 h-6 text-pink-600" />,
      border: "shadow-pink-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-3xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Admin Dashboard <span className="text-2xl">👨‍💼</span>
        </h1>
        <p className="text-sm text-purple-100 mt-1">
          Complete overview of Bee Bright operations
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition ${stat.border}`}
          >
            <div className="flex flex-col items-start gap-3">
              <div className="p-3 bg-gray-50 rounded-full">{stat.icon}</div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Enrollments */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <BookOpen className="text-orange-500" /> Recent Enrollments
          </h2>
          <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {stats.pending} pending
          </span>
        </div>

        {loading ? (
          <p>Loading recent enrollments...</p>
        ) : enrollments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {enrollments.map((enroll) => (
              <li key={enroll._id} className="flex justify-between py-3 items-center">
                <div>
                  <p className="font-semibold text-gray-800">{enroll.studentName}</p>
                  <p className="text-sm text-gray-500">
                    {enroll.grade || "N/A"} •{" "}
                    {new Date(enroll.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    enroll.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : enroll.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {enroll.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No recent enrollments found.</p>
        )}

        <button
          onClick={() => navigate("/admin/enrollment")}
          className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition"
        >
          View All Enrollments
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
