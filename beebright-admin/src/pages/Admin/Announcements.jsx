import React, { useState } from "react";
import { Megaphone } from "lucide-react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Holiday Notice",
      message: "No classes on October 25–26 due to school holidays.",
      date: "Oct 18, 2025",
      sentTo: "All users",
    },
    {
      id: 2,
      title: "New Schedule Available",
      message:
        "November schedules are now available. Please check your dashboard.",
      date: "Oct 15, 2025",
      sentTo: "Students, Parents",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    message: "",
    recipients: [],
  });

  const handleRecipientToggle = (role) => {
    setForm((prev) => {
      const recipients = prev.recipients.includes(role)
        ? prev.recipients.filter((r) => r !== role)
        : [...prev.recipients, role];
      return { ...prev, recipients };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.message || form.recipients.length === 0) return;

    const newAnnouncement = {
      id: Date.now(),
      title: form.title,
      message: form.message,
      sentTo: form.recipients.join(", "),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setForm({ title: "", message: "", recipients: [] });
  };

  return (
    <div className="p-6 rounded-2xl bg-neutral-50 min-h-screen">
      {/* Header */}
      <h2 className="font-display font-bold text-2xl text-neutral-900 flex items-center gap-2 mb-6">
        Announcements <Megaphone className="text-pink-500" size={22} />
      </h2>

      {/* Create Announcement Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8"
      >
        <label className="block mb-3">
          <input
            type="text"
            placeholder="Announcement title..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-blue-100 focus:border-blue-300 outline-none bg-white/70"
          />
        </label>

        <label className="block mb-3">
          <textarea
            placeholder="Announcement message..."
            rows="4"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-blue-100 focus:border-blue-300 outline-none bg-white/70"
          />
        </label>

        <div className="flex items-center gap-6 mb-4 text-sm text-neutral-700">
          {["Students", "Parents", "Tutors"].map((role) => (
            <label key={role} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.recipients.includes(role)}
                onChange={() => handleRecipientToggle(role)}
                className="accent-yellow-500 w-4 h-4"
              />
              {role}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="bg-yellow-400 text-white font-semibold px-6 py-2 rounded-xl hover:bg-yellow-500 transition"
        >
          Send Announcement
        </button>
      </form>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow transition"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-neutral-900">{a.title}</h3>
              <p className="text-sm text-neutral-500">{a.date}</p>
            </div>
            <p className="text-neutral-700 mt-1">{a.message}</p>
            <p className="text-sm text-blue-600 mt-2">
              Sent to: <span className="font-medium">{a.sentTo}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
