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
  from: `"BeeBright Admin 🐝" <${process.env.EMAIL_USER}>`,
  to: enrollment.contactEmail,
  subject: "🐝 Welcome to BeeBright! Your Temporary Password",
  html: `
    <div style="
      font-family: 'Poppins', Arial, sans-serif;
      background: linear-gradient(135deg, #fffbea 0%, #fff4b0 100%);
      padding: 40px 25px;
      border-radius: 12px;
      border: 2px solid #ffd54f;
      color: #3e2f00;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 0 15px rgba(255, 204, 0, 0.3);
    ">

      <div style="text-align: center; margin-bottom: 25px;">
        <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Bee Icon" width="70" />
        <h1 style="color: #ffb300; margin-top: 10px;">BeeBright Enrollment Approved! 🍯</h1>
      </div>

      <p style="font-size: 16px;">
        Hi <b>${enrollment.studentName}</b>,<br/><br/>
        Great news! Your BeeBright enrollment has been <b>approved</b>! 🎉<br/>
        You can now buzz into your account using the credentials below:
      </p>

      <div style="
        background: #fffde7;
        border: 2px dashed #ffca28;
        padding: 15px 20px;
        margin: 20px 0;
        border-radius: 10px;
        font-size: 15px;
      ">
        <p><b>🐝 Email:</b> ${enrollment.contactEmail}</p>
        <p><b>🔑 Temporary Password:</b> <span style="color:#ff6f00">${tempPassword}</span></p>
      </div>

      <p style="font-size: 15px; line-height: 1.6;">
        Please log in to your BeeBright account and change your password right away.<br/>
        We’re excited to have you join our buzzing community of learners! 🐝💛
      </p>

      <div style="
        text-align: center;
        border-top: 1px solid #ffe082;
        margin-top: 25px;
        padding-top: 10px;
        font-size: 13px;
        color: #8d6e63;
      ">
        <p>© 2025 BeeBright | "Learn, Shine, and Bee Your Best!"</p>
      </div>
    </div>
  `,
};


    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Enrollment approved and email sent successfully!" });
  } catch (error) {
    console.error("Error approving enrollment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
