import React, { useState } from "react";
import {
  Users,
  GraduationCap,
  UserCog,
  Megaphone,
  BookOpen,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// Import your pages
import UsersPage from "./Users";
import TutorsPage from "./Tutors";
import AdminsPage from "./Admins";
import AnnouncementsPage from "./Announcements";
import EnrollmentManagementPage from "./EnrollmentManagement";
import LogsPage from "./Logs";
import SettingsPage from "./Settings";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("Users");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = [
    { name: "Users", icon: <Users size={18} /> },
    { name: "Tutors", icon: <GraduationCap size={18} /> },
    { name: "Admins", icon: <UserCog size={18} /> },
    { name: "Announcements", icon: <Megaphone size={18} /> },
    { name: "Enrollment", icon: <BookOpen size={18} /> },
    { name: "Logs", icon: <FileText size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "Users":
        return <UsersPage />;
      case "Tutors":
        return <TutorsPage />;
      case "Admins":
        return <AdminsPage />;
      case "Announcements":
        return <AnnouncementsPage />;
      case "Enrollment":
        return <EnrollmentManagementPage />;
      case "Logs":
        return <LogsPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <UsersPage />;
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-neutral-200 transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <h1
            className={`font-display text-xl font-bold text-purple-600 transition-all duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            BeeBright
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-neutral-600 hover:text-purple-600"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {pages.map((p) => (
            <button
              key={p.name}
              onClick={() => setActivePage(p.name)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition ${
                activePage === p.name
                  ? "bg-purple-100 text-purple-700"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              {p.icon}
              {sidebarOpen && <span>{p.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200">
          <button className="flex items-center gap-3 w-full text-neutral-600 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl font-semibold transition">
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Topbar */}
        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-800">
            {activePage === "Enrollment" ? "Enrollment Management" : activePage}
          </h2>
          <div className="text-sm text-neutral-500">
            Welcome back, <span className="font-semibold text-neutral-700">Admin</span> 👋
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-y-auto flex-1">{renderPage()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
