import React from "react";
import { Users, Shield, GraduationCap, BarChart, BookOpen } from "lucide-react";

const DashboardHome = () => {
  const stats = [
    {
      title: "Total Users",
      value: "3",
      icon: <Users className="w-6 h-6 text-purple-600" />,
      border: "shadow-purple-100",
    },
    {
      title: "Admin Accounts",
      value: "2",
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      border: "shadow-blue-100",
    },
    {
      title: "Tutors",
      value: "3",
      icon: <GraduationCap className="w-6 h-6 text-green-600" />,
      border: "shadow-green-100",
    },
    {
      title: "Pending Enrollments",
      value: "2",
      icon: <BarChart className="w-6 h-6 text-pink-600" />,
      border: "shadow-pink-100",
    },
  ];

  const enrollments = [
    { name: "Lucas Wong", grade: "Grade 5", date: "Oct 18, 2025", status: "Pending" },
    { name: "Sophia Lee", grade: "Grade 4", date: "Oct 17, 2025", status: "Pending" },
    { name: "Ethan Cruz", grade: "Grade 6", date: "Oct 16, 2025", status: "Approved" },
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
        {stats.map((stat, idx) => (
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
            2 pending
          </span>
        </div>

        <ul className="divide-y divide-gray-200">
          {enrollments.map((enroll, i) => (
            <li key={i} className="flex justify-between py-3 items-center">
              <div>
                <p className="font-semibold text-gray-800">{enroll.name}</p>
                <p className="text-sm text-gray-500">
                  {enroll.grade} • {enroll.date}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  enroll.status === "Approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {enroll.status}
              </span>
            </li>
          ))}
        </ul>

        <button className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition">
          View All Enrollments
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
