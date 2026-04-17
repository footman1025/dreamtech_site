const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Save to DB
    const contact = new Contact(req.body);
    await contact.save();

    // Send email notification to DreamTech
    const mailOptions = {
      from: `"DreamTech Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Contact: ${service || 'General'} — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="color:#7c3aed;margin-bottom:4px;">New Message from DreamTech Site</h2>
          <p style="color:#6b7280;margin-top:0;margin-bottom:24px;">Someone submitted the contact form.</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#7c3aed;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>` : ''}
            ${service ? `<tr><td style="padding:8px 0;color:#6b7280;">Service</td><td style="padding:8px 0;">${service}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
          <p style="color:#6b7280;margin-bottom:8px;font-weight:600;">Message:</p>
          <p style="background:#f9fafb;padding:16px;border-radius:8px;color:#1e1b4b;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
          <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Telegram: @DreamTech1025</p>
        </div>
      `,
    };

    // Send async — don't block the response if email fails
    transporter.sendMail(mailOptions).catch(err => console.error('Email error:', err));

    // Send auto-reply to the user
    const replyOptions = {
      from: `"DreamTech" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'We received your message — DreamTech',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="color:#7c3aed;">Thanks, ${name}!</h2>
          <p style="color:#6b7280;line-height:1.7;">We've received your message and will get back to you within <strong>1 hour</strong>.</p>
          <p style="color:#6b7280;line-height:1.7;">In the meantime, you can also reach us at:</p>
          <ul style="color:#6b7280;line-height:2;">
            <li>📧 <a href="mailto:dreamtech1025@gmail.com" style="color:#7c3aed;">dreamtech1025@gmail.com</a></li>
            <li>✈️ Telegram: <a href="https://t.me/DreamTech1025" style="color:#7c3aed;">@DreamTech1025</a></li>
          </ul>
          <p style="color:#6b7280;">— The DreamTech Team</p>
        </div>
      `,
    };

    transporter.sendMail(replyOptions).catch(err => console.error('Auto-reply error:', err));

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET /api/contact (admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
