// routes/enrollmentRoutes.js
const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");

// Get all enrollments
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
