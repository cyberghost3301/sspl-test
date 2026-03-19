import { Resend } from 'resend';

// Vercel automatically injects this from your dashboard settings
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
    // Reject anything that isn't a POST request
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Destructure the exact keys you mapped in Contact.tsx
        const { name, business, email, phone, subject, message } = req.body;

        const data = await resend.emails.send({
            from: 'Spirecrest Portal <info@spirecrest.in>', // Change to info@spirecrest.in after domain verification
            to: ['dcwebsols@gmail.com'], // ⚠️ MUST be the email you used to sign up for Resend
            subject: `Enterprise Inquiry: ${business || name} - ${subject}`,
            html: `
        <div style="font-family: sans-serif; color: #111827; max-width: 600px;">
          <h2 style="color: #0284c7;">New Spirecrest Lead</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${business || 'Not provided'}</p>
          <p><strong>Scope:</strong> ${subject}</p>
          <br/>
          <h3 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Message:</h3>
          <p style="background: #f3f4f6; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message || 'No message provided.'}</p>
        </div>
      `,
        });

        // Matches the result.message expectation in your frontend
        return res.status(200).json({ message: "Message sent successfully!", data });
    } catch (error) {
        return res.status(400).json({ message: "Failed to send message. Please try again.", error });
    }
}