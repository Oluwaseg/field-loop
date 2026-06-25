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

    const adminSubject = `Email from ${data.firstName} ${data.lastName} (${data.email})`;
    const adminText = [
      `Name: ${data.firstName} ${data.lastName}`,
      `Email: ${data.email}`,
      `Interest: ${data.interest}`,
      '',
      data.message,
    ].join('\n');

    const adminHtml = `
      <div style="font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#0f172a; background:#f8faf8; padding:24px;">
        <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden;">
          <div style="background:#1f4a2f; padding:20px 24px; color:#ffffff;">
            <p style="margin:0;font-size:14px;letter-spacing:0.04em;text-transform:uppercase;opacity:0.85;">FieldLoop contact form</p>
            <h1 style="margin:10px 0 0;font-size:24px;line-height:1.2;">New contact submission</h1>
          </div>
          <div style="padding:24px;">
            <p style="margin:0 0 16px;font-size:16px;color:#334155;">You have a new message from the website contact form.</p>
            <table style="width:100%; border-collapse:collapse; font-size:15px; color:#334155;">
              <tr>
                <td style="padding:10px 0; font-weight:700; width:120px; vertical-align:top;">Name</td>
                <td style="padding:10px 0;">${esc(data.firstName)} ${esc(data.lastName)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0; font-weight:700; vertical-align:top;">Email</td>
                <td style="padding:10px 0;">${esc(data.email)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0; font-weight:700; vertical-align:top;">Interest</td>
                <td style="padding:10px 0;">${esc(data.interest)}</td>
              </tr>
            </table>
            <div style="margin-top:24px; padding:18px; border-radius:16px; background:#f1f7f1; border:1px solid #d6e7d6;">
              <p style="margin:0 0 10px;font-weight:700;color:#1f4a2f;">Message</p>
              <p style="margin:0; white-space:pre-wrap; color:#334155;">${esc(data.message)}</p>
            </div>
            <p style="margin:28px 0 0;font-size:13px;color:#64748b;">Reply automatically opens to the visitor's address.</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"FieldLoop Team" <${user}>`,
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
      <div style="font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#0f172a; background:#f8faf8; padding:24px;">
        <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden;">
          <div style="background:#1f4a2f; padding:20px 24px; color:#ffffff;">
            <p style="margin:0;font-size:14px;letter-spacing:0.04em;text-transform:uppercase;opacity:0.85;">FieldLoop</p>
            <h1 style="margin:10px 0 0;font-size:22px;line-height:1.2;">Thanks for reaching out</h1>
          </div>
          <div style="padding:24px; color:#334155;">
            <p style="margin:0 0 16px; font-size:16px;">Hi ${esc(data.firstName)},</p>
            <p style="margin:0 0 22px; font-size:16px; line-height:1.7;">Thanks for reaching out to FieldLoop. We received your message about <strong>${esc(data.interest)}</strong> and will get back to you soon.</p>
            <div style="padding:18px; border-radius:16px; background:#f1f7f1; border:1px solid #d6e7d6;">
              <p style="margin:0; font-weight:700; color:#1f4a2f;">What we received</p>
              <p style="margin:10px 0 0; white-space:pre-wrap; color:#334155;">${esc(data.message)}</p>
            </div>
            <p style="margin:24px 0 0; font-size:14px; color:#64748b;">We’ll respond within one business day. — FieldLoop Team</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"FieldLoop Team" <${user}>`,
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
