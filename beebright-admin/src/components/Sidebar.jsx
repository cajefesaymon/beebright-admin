import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  Shield,
  GraduationCap,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const pages = [
    { name: "Dashboard", path: "/admin", icon: <Home color="#FACC15" /> },
    { name: "Enrollments", path: "/admin/enrollments", icon: <BookOpen color="#F97316" />, badge: 2 },
    { name: "Users", path: "/admin/users", icon: <Users color="#2563EB" /> },
    { name: "Admins", path: "/admin/admins", icon: <Shield color="#DC2626" /> },
    { name: "Tutors", path: "/admin/tutors", icon: <GraduationCap color="#8B5CF6" /> },
    { name: "Announcements", path: "/admin/announcements", icon: <Bell color="#16A34A" /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings color="#6B7280" /> },
  ];

  return (
    <aside
      className={`bg-white h-screen flex flex-col border-r border-neutral-200 transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo / Header */}
      <div className="flex items-center gap-2 px-4 py-5 border-b">
        <img
          src="/logo.png"
          alt="BeeBright Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        {sidebarOpen && (
          <h1 className="font-bold text-lg text-neutral-800">
            <span className="text-yellow-400">Bee</span>
            <span className="text-green-600">Bright</span>
          </h1>
        )}
      </div>

      {/* Admin Info Card */}
      {sidebarOpen && (
        <div className="mx-4 mt-4 p-3 rounded-2xl bg-gradient-to-br from-yellow-50 to-white shadow-sm border border-yellow-100">
          <div className="flex items-center gap-3">
            <img
              src="/avatar.png"
              alt="Admin"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-sm text-neutral-800">
                Admin User
              </h2>
              <p className="text-xs text-neutral-500">Admin</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 mt-4 space-y-1 px-2">
        {pages.map((p) => {
          const isActive = location.pathname === p.path;
          return (
            <Link
              key={p.name}
              to={p.path}
              className={`flex items-center justify-between group px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-yellow-100 text-yellow-700"
                  : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <div className="flex items-center gap-3">
                {p.icon}
                {sidebarOpen && <span>{p.name}</span>}
              </div>

              {/* Badge (for notifications) */}
              {sidebarOpen && p.badge && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 rounded-full">
                  {p.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t px-4 py-4">
        <button className="flex items-center gap-3 w-full text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl font-semibold transition">
          <LogOut size={18} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
