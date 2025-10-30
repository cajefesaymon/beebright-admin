import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  pages,
  brand = "BeeBright",
}) => {
  const location = useLocation();

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-white border-r border-neutral-200 transition-all duration-300 flex flex-col`}
    >
      {/* Header / Brand */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
        <h1
          className={`font-display text-xl font-bold text-purple-600 transition-all duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {brand}
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-neutral-600 hover:text-purple-600"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {pages.map((p) => {
          const isActive = location.pathname === p.path;
          return (
            <Link
              key={p.name}
              to={p.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition ${
                isActive
                  ? "bg-purple-100 text-purple-700"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              {p.icon}
              {sidebarOpen && <span>{p.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-neutral-200">
        <button className="flex items-center gap-3 w-full text-neutral-600 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl font-semibold transition">
          <LogOut size={18} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
