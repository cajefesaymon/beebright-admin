// src/pages/Admin/Schedule.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card";
import { Plus, Edit2, Trash2 } from "lucide-react";

const defaultTimes = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];
const defaultRooms = ["Room A", "Room B", "Room C"];

const Schedule = () => {
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects] = useState(["Math", "Science", "English"]);
  const [slots, setSlots] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [form, setForm] = useState({
    tutorId: "",
    room: defaultRooms[0],
    selectedStudents: [],
    subject: subjects[0],
    time: defaultTimes[0],
  });

  // ✅ Fetch tutors, students, and schedules from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tutorRes, studentRes, scheduleRes] = await Promise.all([
          axios.get("http://localhost:5000/api/tutors"),
          axios.get("http://localhost:5000/api/enrollments"),
          axios.get("http://localhost:5000/api/schedules"),
        ]);

        setTutors(tutorRes.data || []);
        setStudents(studentRes.data || []);

        // Convert fetched schedules into slot map
        const scheduleMap = {};
        (scheduleRes.data || []).forEach((item) => {
          scheduleMap[item.time + "|" + item.room] = item;
        });
        setSlots(scheduleMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  // ✅ Create or update schedule
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const studentId = form.selectedStudents[0] || null;
    const payload = {
      time: form.time,
      room: form.room,
      tutorId: form.tutorId,
      studentId,
      subject: form.subject,
    };

    try {
      if (editingSlot) {
        // update
        await axios.put(
          `http://localhost:5000/api/schedules/${slots[form.time + "|" + form.room]._id}`,
          payload
        );
      } else {
        // create
        await axios.post("http://localhost:5000/api/schedules", payload);
      }

      const res = await axios.get("http://localhost:5000/api/schedules");
      const updatedMap = {};
      res.data.forEach((item) => {
        updatedMap[item.time + "|" + item.room] = item;
      });
      setSlots(updatedMap);

      setModalOpen(false);
      setEditingSlot(null);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  // ✅ Delete or clear schedule
  const handleClear = async (time, room) => {
    const key = time + "|" + room;
    const slot = slots[key];
    if (!slot || !slot._id) return;

    try {
      await axios.delete(`http://localhost:5000/api/schedules/${slot._id}`);
      setSlots((prev) => ({ ...prev, [key]: null }));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const getStudent = (id) => students.find((s) => s._id === id);
  const getTutor = (id) => tutors.find((t) => t._id === id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Schedule <span className="ml-2">📅</span>
        </h1>
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
                  <th key={room} className="py-3 px-4 text-left">
                    {room}
                  </th>
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
                            <div className="font-semibold">
                              {student?.studentName || "—"}
                            </div>
                            <div className="text-xs text-neutral-500">
                              Tutor: {tutor?.name || "—"}
                            </div>
                            <div className="text-xs text-neutral-400">
                              {slot.subject}
                            </div>

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
                            <div className="text-xs text-neutral-400">
                              — Unassigned —
                            </div>
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

      {/* ✅ Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">
              {editingSlot ? "Edit Schedule" : "Create Schedule"}
            </h3>

            <form onSubmit={handleCreateOrUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Tutor
                  </label>
                  <select
                    value={form.tutorId}
                    onChange={(e) =>
                      setForm({ ...form, tutorId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border"
                  >
                    <option value="">— Select Tutor —</option>
                    {tutors.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Room
                  </label>
                  <select
                    value={form.room}
                    onChange={(e) => setForm({ ...form, room: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border"
                  >
                    {defaultRooms.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Students
                </label>
                <div className="border rounded-xl p-3 max-h-36 overflow-auto">
                  {students.map((s) => (
                    <label key={s._id} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={form.selectedStudents.includes(s._id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setForm((prev) => {
                            const set = new Set(prev.selectedStudents);
                            if (checked) set.add(s._id);
                            else set.delete(s._id);
                            return {
                              ...prev,
                              selectedStudents: Array.from(set),
                            };
                          });
                        }}
                      />
                      <span className="text-sm">
                        {s.studentName} — {s.contactEmail}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border"
                  >
                    {subjects.map((sub) => (
                      <option key={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Time
                  </label>
                  <select
                    value={form.time}
                    onChange={(e) =>
                      setForm({ ...form, time: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border"
                  >
                    {defaultTimes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingSlot(null);
                  }}
                  className="px-4 py-2 rounded-xl border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-yellow-400"
                >
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
