import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Simple schedule schema
const scheduleSchema = new mongoose.Schema({
  time: String,
  room: String,
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" },
  subject: String,
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

// ✅ GET all schedules
router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Error fetching schedules" });
  }
});

// ✅ CREATE schedule
router.post("/", async (req, res) => {
  try {
    const newSchedule = new Schedule(req.body);
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json({ message: "Error creating schedule" });
  }
});

// ✅ UPDATE schedule
router.put("/:id", async (req, res) => {
  try {
    const updated = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating schedule" });
  }
});

// ✅ DELETE schedule
router.delete("/:id", async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: "Schedule deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting schedule" });
  }
});

export default router;
