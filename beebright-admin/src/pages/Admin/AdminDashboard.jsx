import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  GraduationCap,
  UserCog,
  Megaphone,
  BookOpen,
  FileText,
  Settings as SettingsIcon,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FileText size={18} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
    { name: "Tutors", path: "/admin/tutors", icon: <GraduationCap size={18} /> },
    { name: "Admins", path: "/admin/admins", icon: <UserCog size={18} /> },
    { name: "Announcements", path: "/admin/announcements", icon: <Megaphone size={18} /> },
    { name: "Enrollment", path: "/admin/enrollment", icon: <BookOpen size={18} /> },
    { name: "Logs", path: "/admin/logs", icon: <FileText size={18} /> },
    { name: "Settings", path: "/admin/settings", icon: <SettingsIcon size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* ✅ Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pages={pages.map((p) => ({
          ...p,
          onClick: () => navigate(p.path),
          active: location.pathname === p.path,
        }))}
        brand="BeeBright"
      />

      {/* ✅ Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Topbar */}
        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-800 capitalize">
            {pages.find((p) => p.path === location.pathname)?.name || "Admin Panel"}
          </h2>
          <div className="text-sm text-neutral-500">
            Welcome back, <span className="font-semibold text-neutral-700">Admin</span> 👋
          </div>
        </div>

        {/* ✅ Nested Page Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
