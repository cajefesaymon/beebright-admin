import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import Tutors from "./pages/Admin/Tutors";
import Admins from "./pages/Admin/Admins";
import Announcements from "./pages/Admin/Announcements";
import EnrollmentManagement from "./pages/Admin/EnrollmentManagement";
import Logs from "./pages/Admin/Logs";
import Settings from "./pages/Admin/Settings";

const App = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="dashboard" element={<div>Dashboard Content</div>} />
        <Route path="users" element={<Users />} />
        <Route path="tutors" element={<Tutors />} />
        <Route path="admins" element={<Admins />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="enrollment" element={<EnrollmentManagement />} />
        <Route path="logs" element={<Logs />} />
        <Route path="settings" element={<Settings />} />
      </Route>

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
