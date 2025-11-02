import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

// Admin pages
import Users from "./pages/Admin/Users";
import Tutors from "./pages/Admin/Tutors";
import Admins from "./pages/Admin/Admins";
import Announcements from "./pages/Admin/Announcements";
import EnrollmentManagement from "./pages/Admin/EnrollmentManagement";
import Logs from "./pages/Admin/Logs";
import Settings from "./pages/Admin/Settings";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tutors"
        element={
          <ProtectedRoute>
            <Tutors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/admins"
        element={
          <ProtectedRoute>
            <Admins />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/announcements"
        element={
          <ProtectedRoute>
            <Announcements />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/enrollment"
        element={
          <ProtectedRoute>
            <EnrollmentManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/logs"
        element={
          <ProtectedRoute>
            <Logs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Catch-all 404 */}
      <Route
        path="*"
        element={<h1 className="text-center mt-10 text-2xl">404 - Page Not Found</h1>}
      />
    </Routes>
  );
};

export default App;
