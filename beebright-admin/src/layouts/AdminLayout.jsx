import React, { useState } from "react";
import {
  Users,
  GraduationCap,
  UserCog,
  Megaphone,
  BookOpen,
  FileText,
  Settings,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = ({ children, defaultPage = "Users" }) => {
  const [activePage, setActivePage] = useState(defaultPage);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = [
  { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
  { name: "Tutors", path: "/admin/tutors", icon: <GraduationCap size={18} /> },
  { name: "Admins", path: "/admin/admins", icon: <UserCog size={18} /> },
  { name: "Announcements", path: "/admin/announcements", icon: <Megaphone size={18} /> },
  { name: "Enrollment", path: "/admin/enrollment", icon: <BookOpen size={18} /> },
  { name: "Logs", path: "/admin/logs", icon: <FileText size={18} /> },
  { name: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
];


  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pages={pages}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Topbar activePage={activePage} userName="Admin" />

        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
