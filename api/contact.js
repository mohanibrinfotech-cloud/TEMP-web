import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // ✅ FIX 1: Destructure all fields the form actually sends
    const { name, mobile, email, message, token } = req.body;

    // ✅ FIX 2: Validate all required fields including mobile
    if (!name || !mobile || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ FIX 3: Verify Turnstile token server-side before sending email
    //    Without this, anyone can bypass the captcha and spam your inbox
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Captcha token is missing",
      });
    }

    const turnstileRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY, // Add this to your .env
          response: token,
        }),
      }
    );

    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      return res.status(403).json({
        success: false,
        message: "Captcha verification failed. Please try again.",
      });
    }

    // ✅ FIX 4: Include mobile in the email body
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "mohanibrinfotech@gmail.com",
      subject: `New Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
}