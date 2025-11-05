import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  expertise: { type: String },
  password: { type: String, required: true },
  role: { type: String, default: "tutor" },
});

export default mongoose.model("Tutor", tutorSchema);
