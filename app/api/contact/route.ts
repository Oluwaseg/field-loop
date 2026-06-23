import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const ContactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  interest: z.string().trim().min(1).max(120),
  message: z.string().trim().min(5).max(4000),
});

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[c];
  });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = ContactSchema.parse(body);

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const to = process.env.CONTACT_TO_EMAIL;

    if (!host || !port || !user || !pass || !to) {
      return NextResponse.json(
        { error: 'Missing SMTP configuration.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    const adminSubject = `FieldLoop contact from ${data.firstName} ${data.lastName}`;
    const adminText = [
      `Name: ${data.firstName} ${data.lastName}`,
      `Email: ${data.email}`,
      `Interest: ${data.interest}`,
      '',
      data.message,
    ].join('\n');

    const adminHtml = `
      <div style="font-family:system-ui,sans-serif;color:#0f172a;line-height:1.55">
        <h2 style="margin:0 0 12px;color:#1f4a2f">New contact submission</h2>
        <p><strong>Name:</strong> ${esc(data.firstName)} ${esc(data.lastName)}</p>
        <p><strong>Email:</strong> ${esc(data.email)}</p>
        <p><strong>Interest:</strong> ${esc(data.interest)}</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0" />
        <p style="white-space:pre-wrap">${esc(data.message)}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"FieldLoop" <${user}>`,
      to,
      replyTo: data.email,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
    });

    const replySubject = 'We received your message — FieldLoop';
    const replyText = `Hi ${data.firstName},

Thanks for reaching out to FieldLoop. We received your message about "${data.interest}" and will get back to you soon.

— FieldLoop Team`;

    const replyHtml = `
      <div style="font-family:system-ui,sans-serif;color:#0f172a;line-height:1.6">
        <p>Hi ${esc(data.firstName)},</p>
        <p>Thanks for reaching out to FieldLoop. We received your message about <strong>${esc(
          data.interest
        )}</strong> and will get back to you soon.</p>
        <p>— FieldLoop Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"FieldLoop" <${user}>`,
      to: data.email,
      subject: replySubject,
      text: replyText,
      html: replyHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('CONTACT API ERROR:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data.', issues: error.flatten() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong while sending email.' },
      { status: 500 }
    );
  }
}
