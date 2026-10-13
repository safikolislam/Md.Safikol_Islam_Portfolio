import nodemailer from "nodemailer";

export const mailConfigured = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Sends the visitor's message to your inbox. Reply goes straight to the visitor. */
export async function sendContactMail(m: { name: string; email: string; subject?: string; message: string }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const to = process.env.CONTACT_TO || process.env.SMTP_USER!;
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to,
    replyTo: `"${m.name.replace(/"/g, "")}" <${m.email}>`,
    subject: `[Portfolio] ${m.subject || "New message"} from ${m.name}`,
    text: `Name: ${m.name}\nEmail: ${m.email}\nSubject: ${m.subject || "-"}\n\n${m.message}`,
    html: `<div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="margin:0 0 12px">New portfolio message</h2>
      <p><b>Name:</b> ${esc(m.name)}<br/><b>Email:</b> <a href="mailto:${esc(m.email)}">${esc(m.email)}</a><br/><b>Subject:</b> ${esc(m.subject || "-")}</p>
      <div style="padding:14px;border-radius:10px;background:#f4f4f8;white-space:pre-wrap">${esc(m.message)}</div>
      <p style="color:#888;font-size:12px">Just hit Reply to answer ${esc(m.name)}.</p></div>`,
  });
}
