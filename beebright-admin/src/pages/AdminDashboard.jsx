import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

const AppContent = () => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('login');

  // If user is logged in and role is admin, show admin dashboard
  if (user && user.role === 'admin') {
    return <AdminDashboard onLogout={logout} />;
  }

  // Otherwise, show login page
  return <Login onLoginSuccess={() => setCurrentPage('admin')} />;
};

const App = () => {
  return (
    <AuthProvider>
      <div className="font-sans">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;
