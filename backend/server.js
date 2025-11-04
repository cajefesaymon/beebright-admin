import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import Enrollment from "./models/Enrollment.js"; // ✅ your schema with all fields

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ====================================
// ✅ CONNECT TO MONGODB
// ====================================
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "yourDatabaseName", // ✅ match your .env
  })
  .then(() => {
    console.log("✅ Connected to MongoDB database: yourDatabaseName");
    createDemoAccount();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ====================================
// 🧩 CREATE DEMO ADMIN
// ====================================
async function createDemoAccount() {
  try {
    const demoEmail = "admin@beebright.com";
    const demoPassword = "admin123";

    const existing = await User.findOne({ email: demoEmail });
    if (existing) {
      console.log("ℹ️ Demo admin account already exists");
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
// 🔑 LOGIN
// ====================================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

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

// ✅ TEST ENDPOINT
app.get("/", (req, res) => {
  res.send("✅ BeeBright API is running...");
});

// ✅ GET all enrollments
app.get("/api/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    console.error("❌ Error fetching enrollments:", err);
    res.status(500).json({ message: "Server error fetching enrollments" });
  }
});

// ✅ CREATE a new enrollment
app.post("/api/enrollments", async (req, res) => {
  try {
    const {
      studentName,
      age,
      grade,
      school,
      password,
      contactEmail,
      contactPhone,
      address,
      schedule,
      notes,
      status,
    } = req.body;

    const newEnrollment = new Enrollment({
      studentName,
      age,
      grade,
      school,
      password,
      contactEmail,
      contactPhone,
      address,
      schedule,
      notes,
      status: status || "pending",
    });

    await newEnrollment.save();
    res.status(201).json(newEnrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ APPROVE / REJECT enrollment (auto-create user)
app.put("/api/enrollments/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment)
      return res.status(404).json({ message: "Enrollment not found" });

    enrollment.status = status;
    await enrollment.save();

    // ✅ Auto-create user if approved
    if (status === "approved") {
      const existingUser = await User.findOne({ email: enrollment.contactEmail });

      if (!existingUser) {
        const randomPassword = Math.random().toString(36).slice(-8); // temporary password
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const newUser = new User({
          email: enrollment.contactEmail,
          password: hashedPassword,
          role: "student", // or "parent"
        });

        await newUser.save();
        console.log("🎉 User created from approved enrollment:", newUser.email);
        console.log(`   Temporary password: ${randomPassword}`);
      } else {
        console.log(`ℹ️ User already exists for ${enrollment.contactEmail}`);
      }
    }

    res.json(enrollment);
  } catch (err) {
    console.error("❌ Error approving/rejecting enrollment:", err);
    res.status(500).json({ message: err.message });
  }
});

// ====================================
// 🚀 START SERVER
// ====================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
