import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load saved session
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const mockUsers = [
    { email: "admin@beebright.com", password: "admin123", role: "admin" },
    { email: "staff@beebright.com", password: "staff123", role: "staff" },
  ];

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    console.log("Attempted login with:", cleanEmail, cleanPass); // Debug

    const foundUser = mockUsers.find(
      (u) =>
        u.email.toLowerCase() === cleanEmail &&
        u.password === cleanPass
    );

    if (foundUser) {
      console.log("Login success:", foundUser);
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate("/admin/users");
    } else {
      console.error("Invalid credentials for:", cleanEmail);
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
