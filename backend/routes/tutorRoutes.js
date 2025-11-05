import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Tutor from "../models/Tutor.js";

const router = express.Router();

// ✅ Get all tutors
router.get("/", async (req, res) => {
  try {
    const tutors = await Tutor.find().select("-password");
    res.json(tutors);
  } catch (err) {
    console.error("❌ Error fetching tutors:", err);
    res.status(500).json({ message: "Failed to fetch tutors" });
  }
});

// ✅ Create a new tutor
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, expertise, password = "tutor123" } = req.body;

    const existingTutor = await Tutor.findOne({ email });
    if (existingTutor)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ New
const tutor = await Tutor.create({
  name,
  email,
  phone,
  expertise,
  password: hashedPassword,
  role: "tutor"
});


    const savedTutor = await tutor.save();
    const { password: _, ...tutorData } = savedTutor.toObject();

    res.status(201).json(tutorData);
  } catch (err) {
    console.error("❌ Error creating tutor:", err);
    res.status(500).json({ message: "Failed to create tutor" });
  }
});

// ✅ Update tutor
router.put("/:id", async (req, res) => {
  try {
    const { name, phone, expertise } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid tutor ID" });
    }

    const updatedTutor = await Tutor.findByIdAndUpdate(
      req.params.id,
      { name, phone, expertise },
      { new: true }
    ).select("-password");

    if (!updatedTutor)
      return res.status(404).json({ message: "Tutor not found" });

    res.json(updatedTutor);
  } catch (err) {
    console.error("❌ Error updating tutor:", err);
    res.status(500).json({ message: "Failed to update tutor" });
  }
});

// ✅ Delete tutor (FIXED)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid tutor ID" });
    }

    const deletedTutor = await Tutor.findByIdAndDelete(id);

    if (!deletedTutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    res.json({ message: "Tutor deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting tutor:", err);
    res.status(500).json({ message: "Server error deleting tutor" });
  }
});

export default router;
