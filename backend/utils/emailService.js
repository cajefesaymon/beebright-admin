import nodemailer from "nodemailer";

export const sendApprovalEmail = async (toEmail, tempPassword, studentName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // your gmail address
        pass: process.env.EMAIL_PASS,  // your app password
      },
    });

    const mailOptions = {
      from: `"BeeBright Enrollment" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Your BeeBright Account Has Been Approved 🎉",
      html: `
        <div style="font-family:sans-serif; padding:20px; background:#fff3cd; border-radius:10px;">
          <h2>Welcome to BeeBright, ${studentName}!</h2>
          <p>Your enrollment has been approved! You can now log in to your student dashboard.</p>
          <p><strong>Temporary Password:</strong> ${tempPassword}</p>
          <p>We recommend changing your password after logging in.</p>
          <br>
          <p>🐝 <strong>BeeBright Learning Center</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", toEmail);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};
