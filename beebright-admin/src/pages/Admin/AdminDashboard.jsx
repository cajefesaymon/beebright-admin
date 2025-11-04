import React, { useState, useEffect } from "react";
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
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // ✅ Fetch recent enrollments when on Dashboard page
  useEffect(() => {
    const fetchRecentEnrollments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/enrollments");
        if (!res.ok) throw new Error("Failed to fetch enrollments");
        const data = await res.json();

        // Sort by creation date and get top 5
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentEnrollments(sorted.slice(0, 5));
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      } finally {
        setLoading(false);
      }
    };

    if (location.pathname.endsWith("/admin/dashboard")) {
      fetchRecentEnrollments();
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* ✅ Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pages={pages.map((p) => ({
          ...p,
          onClick: () => navigate(p.path),
          active: location.pathname.endsWith(p.path),
        }))}
        brand="BeeBright"
      />

      {/* ✅ Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Topbar */}
        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-800 capitalize">
            {pages.find((p) => location.pathname.endsWith(p.path))?.name || "Admin Panel"}
          </h2>
          <div className="text-sm text-neutral-500">
            Welcome back, <span className="font-semibold text-neutral-700">Admin</span> 👋
          </div>
        </div>

        {/* ✅ Page Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {location.pathname.endsWith("/admin/dashboard") ? (
            <>
              <h3 className="text-xl font-semibold mb-4">Recent Enrollments</h3>
              {loading ? (
                <p>Loading...</p>
              ) : recentEnrollments.length > 0 ? (
                <table className="w-full bg-white shadow rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left px-4 py-2">Student</th>
                      <th className="text-left px-4 py-2">Grade</th>
                      <th className="text-left px-4 py-2">Status</th>
                      <th className="text-left px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEnrollments.map((enroll) => (
                      <tr key={enroll._id} className="border-t">
                        <td className="px-4 py-2">{enroll.studentName}</td>
                        <td className="px-4 py-2">{enroll.grade || "-"}</td>
                        <td
                          className={`px-4 py-2 capitalize ${
                            enroll.status === "approved"
                              ? "text-green-600"
                              : enroll.status === "rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {enroll.status}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(enroll.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No recent enrollments found.</p>
              )}
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
