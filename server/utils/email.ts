import nodemailer from 'nodemailer';

interface SendNotificationParams {
  enquiryNumber: string;
  fullName: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
  service: string;
  budgetRange?: string | null;
  message: string;
}

export async function sendNewEnquiryNotification(data: SendNotificationParams): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const recipient = process.env.NOTIFICATION_RECIPIENT || 'eclipto.in@gmail.com';
  const from = process.env.SMTP_FROM || 'eclipto.in@gmail.com';

  // If credentials are not configured, log gracefully and return true (don't fail the enquiry save)
  if (!user || !pass) {
    console.log(`[SMTP Notice] SMTP credentials not configured. Mock notification for enquiry ${data.enquiryNumber}:`);
    console.log(`  To: ${recipient}`);
    console.log(`  From: ${data.fullName} <${data.email}>`);
    console.log(`  Service: ${data.service} | Budget: ${data.budgetRange || 'Not specified'}`);
    console.log(`  Message: ${data.message.substring(0, 100)}...`);
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user, pass },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0205; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #e6004c;">
        <div style="border-bottom: 2px solid #e6004c; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #ff1053; margin: 0; font-size: 24px; text-transform: uppercase;">New Project Enquiry Received</h2>
          <p style="color: #888888; margin: 5px 0 0 0; font-size: 13px;">Reference ID: <strong style="color: #ffffff;">${data.enquiryNumber}</strong></p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #aaaaaa; width: 140px;">Client Name:</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: bold;">${data.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #aaaaaa;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #ff1053;">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; color: #aaaaaa;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #ffffff;">${data.phone}</a></td></tr>` : ''}
          ${data.companyName ? `<tr><td style="padding: 8px 0; color: #aaaaaa;">Company:</td><td style="padding: 8px 0; color: #ffffff;">${data.companyName}</td></tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #aaaaaa;">Requested Service:</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: bold;">${data.service}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #aaaaaa;">Budget Range:</td>
            <td style="padding: 8px 0; color: #ffffff;">${data.budgetRange || 'Flexible / Not specified'}</td>
          </tr>
        </table>

        <div style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 25px;">
          <h4 style="margin: 0 0 8px 0; color: #ff1053; font-size: 13px; text-transform: uppercase;">Client Requirements:</h4>
          <p style="margin: 0; line-height: 1.6; color: #e0e0e0; font-size: 14px; white-space: pre-wrap;">${data.message}</p>
        </div>

        <div style="font-size: 12px; color: #666666; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 15px;">
          ECLIPTØ Digital Agency Backend System • ${new Date().getFullYear()}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"ECLIPTØ Portal" <${from}>`,
      to: recipient,
      subject: `[ECLIPTO ENQUIRY] ${data.enquiryNumber} - ${data.fullName} (${data.service})`,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error('[SMTP Error] Failed to send email notification:', error);
    return false; // Still returns safely so database record isn't rolled back
  }
}
