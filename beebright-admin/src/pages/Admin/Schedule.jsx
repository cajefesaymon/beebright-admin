// src/pages/Admin/Schedule.jsx
import React, { useState } from "react";
import Card from "../../components/Card"; // your Card component
import { Plus, Edit2, Trash2 } from "lucide-react";

const defaultTimes = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];
const defaultRooms = ["Room A", "Room B", "Room C"];

const Schedule = () => {
  // sample data
  const [tutors] = useState([
    { id: "t1", name: "Ms. Garcia" },
    { id: "t2", name: "Mr. Rodriguez" },
  ]);
  const [students] = useState([
    { id: "s1", name: "Alex Chen", email: "alex@student.com", tutor: "Ms. Garcia" },
    { id: "s2", name: "Maria Santos", email: "maria@student.com", tutor: "Mr. Rodriguez" },
    { id: "s3", name: "Mrs. Chen", email: "parent@beebright.com", tutor: "Ms. Garcia" },
  ]);
  const [subjects] = useState(["Math", "Science", "English"]);

  // schedule entries keyed by time+room
  const [slots, setSlots] = useState(() => {
    // initialize all slots as unassigned
    const s = {};
    defaultTimes.forEach((time) => {
      defaultRooms.forEach((room) => {
        s[time + "|" + room] = null; // null = unassigned or an object if assigned
      });
    });
    // example assigned
    s["9:00 AM|Room A"] = {
      studentId: "s1",
      tutorId: "t1",
      subject: "Math",
    };
    s["11:00 AM|Room A"] = {
      studentId: "s2",
      tutorId: "t2",
      subject: "Science",
    };
    s["4:00 PM|Room A"] = {
      studentId: "s3",
      tutorId: "t1",
      subject: "English",
    };
    return s;
  });

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null); // { time, room } or null
  const [form, setForm] = useState({
    tutorId: "",
    room: defaultRooms[0],
    selectedStudents: [],
    subject: subjects[0],
    time: defaultTimes[0],
  });

  const openCreate = (time = defaultTimes[0], room = defaultRooms[0]) => {
    setEditingSlot(null);
    setForm({
      tutorId: "",
      room,
      selectedStudents: [],
      subject: subjects[0],
      time,
    });
    setModalOpen(true);
  };

  const openEdit = (time, room) => {
    const key = time + "|" + room;
    const slot = slots[key];
    setEditingSlot({ time, room });
    setForm({
      tutorId: slot?.tutorId || "",
      room,
      selectedStudents: slot?.studentId ? [slot.studentId] : [],
      subject: slot?.subject || subjects[0],
      time,
    });
    setModalOpen(true);
  };

  const handleCreateOrUpdate = (e) => {
    e.preventDefault();
    // We'll assign first selected student (UI shows checkboxes - but schedule assigns single student per cell in the screenshot)
    const studentId = form.selectedStudents[0] || null;
    const key = form.time + "|" + form.room;
    setSlots((prev) => ({
      ...prev,
      [key]: studentId
        ? {
            studentId,
            tutorId: form.tutorId,
            subject: form.subject,
          }
        : null,
    }));
    setModalOpen(false);
    setEditingSlot(null);
  };

  const handleClear = (time, room) => {
    const key = time + "|" + room;
    setSlots((prev) => ({ ...prev, [key]: null }));
  };

  const getStudent = (id) => students.find((s) => s.id === id);
  const getTutor = (id) => tutors.find((t) => t.id === id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Schedule <span className="ml-2">📅</span></h1>
        <button
          onClick={() => openCreate()}
          className="bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition flex items-center gap-2"
        >
          <Plus size={16} /> Create Schedule
        </button>
      </div>

      <Card className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-100">
                <th className="py-3 px-4 text-left">Time</th>
                {defaultRooms.map((room) => (
                  <th key={room} className="py-3 px-4 text-left">{room}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {defaultTimes.map((time) => (
                <tr key={time} className="border-t">
                  <td className="py-6 px-4 font-semibold w-28">{time}</td>

                  {defaultRooms.map((room) => {
                    const key = time + "|" + room;
                    const slot = slots[key];
                    const student = slot ? getStudent(slot.studentId) : null;
                    const tutor = slot ? getTutor(slot.tutorId) : null;

                    return (
                      <td key={key} className="py-6 px-4 align-top">
                        {slot ? (
                          <div>
                            <div className="font-semibold">{student?.name}</div>
                            <div className="text-xs text-neutral-500">Tutor: {tutor?.name}</div>

                            <div className="mt-3 flex gap-3">
                              <button
                                onClick={() => openEdit(time, room)}
                                className="bg-yellow-400 text-black px-3 py-1 rounded-md text-sm flex items-center gap-2"
                              >
                                <Edit2 size={14} /> Edit
                              </button>
                              <button
                                onClick={() => handleClear(time, room)}
                                className="bg-pink-300 text-black px-3 py-1 rounded-md text-sm flex items-center gap-2"
                              >
                                <Trash2 size={14} /> Clear
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <div className="text-xs text-neutral-400">— Unassigned —</div>
                            <button
                              onClick={() => openCreate(time, room)}
                              className="self-start bg-yellow-400 text-black px-3 py-1 rounded-md text-sm"
                            >
                              Assign
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Create Schedule</h3>

            <form onSubmit={handleCreateOrUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Tutor</label>
                  <select
                    value={form.tutorId}
                    onChange={(e) => setForm({ ...form, tutorId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border"
                  >
                    <option value="">— Select Tutor —</option>
                    {tutors.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Room</label>
                  <select
                    value={form.room}
                    onChange={(e) => setForm({ ...form, room: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border"
                  >
                    {defaultRooms.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Students</label>
                <div className="border rounded-xl p-3 max-h-36 overflow-auto">
                  {students.map((s) => (
                    <label key={s.id} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={form.selectedStudents.includes(s.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setForm((prev) => {
                            const set = new Set(prev.selectedStudents);
                            if (checked) set.add(s.id); else set.delete(s.id);
                            return { ...prev, selectedStudents: Array.from(set) };
                          });
                        }}
                      />
                      <span className="text-sm">{s.name} — {s.email}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border"
                  >
                    {subjects.map((sub) => <option key={sub}>{sub}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Time</label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border"
                  >
                    {defaultTimes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); setEditingSlot(null); }}
                  className="px-4 py-2 rounded-xl border"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-yellow-400">
                  {editingSlot ? "Save" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
