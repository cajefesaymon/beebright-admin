import React, { useState } from "react";
import Card from "../../components/Card";

const Logs = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const [logs] = useState([
    {
      id: 1,
      type: "Login",
      message: "Admin John logged in successfully.",
      user: "John",
      date: "2025-10-30 08:45 AM",
    },
    {
      id: 2,
      type: "Update",
      message: "Tutor information updated by Admin Anna.",
      user: "Anna",
      date: "2025-10-30 09:10 AM",
    },
    {
      id: 3,
      type: "Delete",
      message: "Deleted student record: Maria Santos.",
      user: "John",
      date: "2025-10-30 09:45 AM",
    },
    {
      id: 4,
      type: "Create",
      message: "Added new tutor: Mr. Dela Cruz.",
      user: "Anna",
      date: "2025-10-30 10:00 AM",
    },
  ]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || log.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-neutral-900">
          Activity Logs 🧾
        </h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-blue-500 focus:outline-none"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded-xl border-2 border-neutral-200 focus:border-blue-500 focus:outline-none"
        >
          <option>All</option>
          <option>Login</option>
          <option>Create</option>
          <option>Update</option>
          <option>Delete</option>
        </select>
      </div>

      {/* Logs Table */}
      {filteredLogs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead className="bg-neutral-100">
              <tr className="text-left text-neutral-700">
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-neutral-200 hover:bg-neutral-50 transition"
                >
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        log.type === "Login"
                          ? "bg-green-100 text-green-700"
                          : log.type === "Create"
                          ? "bg-blue-100 text-blue-700"
                          : log.type === "Update"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {log.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{log.message}</td>
                  <td className="py-3 px-4 font-semibold text-neutral-700">
                    {log.user}
                  </td>
                  <td className="py-3 px-4 text-sm text-neutral-500">
                    {log.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-8 text-neutral-500">No logs found.</p>
      )}
    </Card>
  );
};

export default Logs;
