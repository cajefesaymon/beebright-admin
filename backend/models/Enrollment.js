import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    age: Number,
    grade: String,
    school: String,
    password: String,
    contactEmail: String,
    contactPhone: String,
    address: String,
    schedule: String,
    notes: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);
