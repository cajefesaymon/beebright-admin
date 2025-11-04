import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import Enrollment from "./models/Enrollment.js"; // ✅ NEW

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ====================================
// ✅ CONNECT TO MONGODB (yourDatabaseName)
// ====================================
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "yourDatabaseName", // ✅ ensures correct database
  })
  .then(() => {
    console.log("✅ Connected to MongoDB database: yourDatabaseName");
    createDemoAccount(); // ⬅️ Create demo account after DB connects
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Auto-create Demo Admin Account ---
async function createDemoAccount() {
  try {
    const demoEmail = "admin@beebright.com";
    const demoPassword = "admin123";

    const existing = await User.findOne({ email: demoEmail });
    if (existing) {
      console.log("ℹ️ Demo account already exists");
      return;
    }

    const hashed = await bcrypt.hash(demoPassword, 10);
    const newUser = new User({
      email: demoEmail,
      password: hashed,
      role: "admin",
    });

    await newUser.save();
    console.log("🐝 Demo admin account created:");
    console.log(`   Email: ${demoEmail}`);
    console.log(`   Password: ${demoPassword}`);
  } catch (err) {
    console.error("❌ Failed to create demo account:", err.message);
  }
}

// ====================================
// 🧩 REGISTER (for testing only)
// ====================================
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashed, role: "admin" });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====================================
// 🔑 LOGIN
// ====================================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====================================
// 📘 ENROLLMENT ROUTES
// ====================================

// Fetch all enrollments
app.get("/api/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve / Reject enrollment
app.put("/api/enrollments/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ====================================
// 🚀 START SERVER
// ====================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
