import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Users from "./pages/Admin/Users";
import Tutors from "./pages/Admin/Tutors";
import Admins from "./pages/Admin/Admins";
import Announcements from "./pages/Admin/Announcements";
import EnrollmentManagement from "./pages/Admin/EnrollmentManagement";
import Logs from "./pages/Admin/Logs";
import Settings from "./pages/Admin/Settings";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";

const App = () => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Admin Pages (no protection) */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/tutors" element={<Tutors />} />
      <Route path="/admin/admins" element={<Admins />} />
      <Route path="/admin/announcements" element={<Announcements />} />
      <Route path="/admin/enrollment" element={<EnrollmentManagement />} />
      <Route path="/admin/logs" element={<Logs />} />
      <Route path="/admin/settings" element={<Settings />} />

      {/* 404 */}
      <Route
        path="*"
        element={
          <h1 className="text-center mt-10 text-2xl">
            404 - Page Not Found
          </h1>
        }
      />
    </Routes>
  );
};

export default App;
