import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    age: Number,
    grade: String,
    school: String,
    password: String,
    contactEmail: { type: String, required: true },
    contactPhone: String,
    address: String,
    schedule: String,
    notes: String,

    // 👇 Restrict possible values and set a default
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);
