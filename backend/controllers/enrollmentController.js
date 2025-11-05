// controllers/enrollmentController.js
import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// ✅ 1. GET all enrollments (used by frontend list)
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollments", error });
  }
};

// ✅ 2. APPROVE enrollment and send email
export const approveEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findById(id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    // Generate temp password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Create user
    const user = new User({
      name: enrollment.studentName,
      email: enrollment.contactEmail,
      password: hashedPassword,
      role: "student",
    });
    await user.save();

    // Update enrollment status
    enrollment.status = "approved";
    await enrollment.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BeeBright Admin" <${process.env.EMAIL_USER}>`,
      to: enrollment.contactEmail,
      subject: "Your Temporary Password - BeeBright",
      html: `
        <h3>Welcome, ${enrollment.studentName}!</h3>
        <p>Your enrollment has been approved 🎉</p>
        <p><b>Email:</b> ${enrollment.contactEmail}</p>
        <p><b>Temporary Password:</b> ${tempPassword}</p>
        <p>Please log in and change your password right away.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Enrollment approved and email sent successfully!" });
  } catch (error) {
    console.error("Error approving enrollment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
