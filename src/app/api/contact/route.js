import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validate
    if (!name || !email || !message) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to you
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Portfolio Contact — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #1a0f28; color: #76dbdb; border-radius: 12px;">
          <h2 style="color: #f75082; margin: 0 0 24px 0; font-size: 20px;">New Portfolio Message</h2>
          <div style="background: rgba(118,219,219,0.08); border: 1px solid rgba(118,219,219,0.2); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; color: rgba(118,219,219,0.5); text-transform: uppercase; letter-spacing: 2px;">Name</p>
            <p style="margin: 0; font-size: 16px; color: #76dbdb;">${name}</p>
          </div>
          <div style="background: rgba(118,219,219,0.08); border: 1px solid rgba(118,219,219,0.2); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; color: rgba(118,219,219,0.5); text-transform: uppercase; letter-spacing: 2px;">Email</p>
            <p style="margin: 0; font-size: 16px; color: #76dbdb;"><a href="mailto:${email}" style="color: #f75082;">${email}</a></p>
          </div>
          <div style="background: rgba(118,219,219,0.08); border: 1px solid rgba(118,219,219,0.2); border-radius: 8px; padding: 20px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; color: rgba(118,219,219,0.5); text-transform: uppercase; letter-spacing: 2px;">Message</p>
            <p style="margin: 0; font-size: 15px; color: #76dbdb; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin: 24px 0 0 0; font-size: 11px; color: rgba(118,219,219,0.3); text-align: center;">Sent from [F]elina Portfolio</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}