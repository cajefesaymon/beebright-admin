import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // (Skip authentication logic)
    alert("✅ Login successful!");
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-200 via-yellow-100 to-white text-black">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-yellow-400">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center shadow-md">
            <span className="text-3xl font-bold text-black">🐝</span>
          </div>
          <h2 className="text-3xl font-extrabold text-black mt-4 tracking-wide">
            BeeBright Admin
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Sign in to manage your hive 🐝
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="admin@beebright.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-black bg-yellow-400 hover:bg-yellow-500 hover:shadow-md transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-neutral-500 mt-6">
          © {new Date().getFullYear()} BeeBright. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
