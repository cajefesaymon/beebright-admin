import React from "react";
import { Bell, UserCircle } from "lucide-react";

const Topbar = ({ activePage, userName = "Admin" }) => {
  const displayTitle =
    activePage === "Enrollment" ? "Enrollment Management" : activePage;

  return (
    <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Page title */}
      <h2 className="text-lg font-bold text-neutral-800">{displayTitle}</h2>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <button className="relative text-neutral-500 hover:text-purple-600 transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <UserCircle size={24} className="text-neutral-400" />
          <div>
            <span className="font-semibold text-neutral-700">{userName}</span>
            <span className="ml-1 text-neutral-500">👋</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
