const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const nodemailer = require("nodemailer");

// ✅ Nodemailer setup (use your Gmail + App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // your App Password
  },
});

// 📨 Email function
const sendApprovalEmail = async (toEmail, tempPassword, studentName) => {
  const mailOptions = {
    from: `"BeeBright Enrollment" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your BeeBright Account Has Been Approved 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; background: #fffbea; padding: 20px; border-radius: 10px;">
        <h2>Welcome to BeeBright, ${studentName}!</h2>
        <p>Your enrollment has been approved! 🎉</p>
        <p><b>Temporary Password:</b> <code>${tempPassword}</code></p>
        <p>You can now log in to your student dashboard. Please change your password after logging in for security.</p>
        <br>
        <p>🐝 <b>BeeBright Learning Center</b></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", toEmail);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};

// ==========================
// ROUTES
// ==========================

// ✅ Get all enrollments
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Approve enrollment (and send email)
router.put("/approve/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Generate temporary password (8 random chars)
    const tempPassword = Math.random().toString(36).slice(-8);

    // Update enrollment record
    enrollment.status = "Approved";
    enrollment.tempPassword = tempPassword;
    await enrollment.save();

    // Send email notification
    await sendApprovalEmail(enrollment.contactEmail, tempPassword, enrollment.firstName);

    res.json({ message: "Enrollment approved and email sent successfully!" });
  } catch (error) {
    console.error("Error approving enrollment:", error);
    res.status(500).json({ message: "Failed to approve enrollment." });
  }
});

// ✅ Reject / delete enrollment
router.delete("/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.json({ message: "Enrollment rejected/removed successfully." });
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    res.status(500).json({ message: "Failed to delete enrollment." });
  }
});

module.exports = router;
