import React from "react";
import Card from "../../components/Card";
import { Users, BookOpen, DollarSign, Megaphone } from "lucide-react";

const DashboardHome = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,230",
      icon: <Users className="text-blue-500" size={28} />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Active Tutors",
      value: "98",
      icon: <BookOpen className="text-green-500" size={28} />,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Payments This Month",
      value: "₱ 45,700",
      icon: <DollarSign className="text-yellow-500" size={28} />,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Announcements",
      value: "12",
      icon: <Megaphone className="text-purple-500" size={28} />,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-neutral-900 mb-8">
        Welcome back, Admin 👋
      </h1>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-neutral-600 font-semibold text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</p>
            </div>
            <div
              className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-20 shadow-inner`}
            >
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>

      {/* Placeholder for analytics / recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">
            Recent Enrollments
          </h2>
          <ul className="space-y-3">
            <li className="border-b border-neutral-200 pb-2">John Doe — Math 101</li>
            <li className="border-b border-neutral-200 pb-2">Jane Smith — Science 202</li>
            <li className="border-b border-neutral-200 pb-2">Chris Evans — English 303</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">
            System Notifications
          </h2>
          <ul className="space-y-3">
            <li className="border-b border-neutral-200 pb-2 text-neutral-700">
              Tutor “Mike Dela Cruz” approved.
            </li>
            <li className="border-b border-neutral-200 pb-2 text-neutral-700">
              Payment #4321 processed successfully.
            </li>
            <li className="border-b border-neutral-200 pb-2 text-neutral-700">
              New announcement: “Holiday Schedule.”
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
