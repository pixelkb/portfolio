import nodemailer from 'nodemailer';

// Type definitions for request payload
export interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// In-memory sliding window rate limiting
const ipCache = new Map<string, number[]>();
const limitWindow = 3 * 60 * 1000; // 3 minutes
const maxRequests = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = ipCache.get(ip) || [];

  // Filter out expired timestamps
  const recentRequests = requests.filter(time => now - time < limitWindow);

  // Periodic garbage collection of empty entries to prevent memory growth
  if (ipCache.size > 1000) {
    for (const [key, times] of ipCache.entries()) {
      const validTimes = times.filter(time => now - time < limitWindow);
      if (validTimes.length === 0) {
        ipCache.delete(key);
      } else {
        ipCache.set(key, validTimes);
      }
    }
  }

  if (recentRequests.length >= maxRequests) {
    return true;
  }

  recentRequests.push(now);
  ipCache.set(ip, recentRequests);
  return false;
}

// Email format validator
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function handleContactSubmission(payload: ContactPayload, clientIp: string) {
  // 1. Spam Prevention: Rate Limiting
  const ip = clientIp || 'anonymous';
  if (isRateLimited(ip)) {
    return {
      status: 429,
      body: { error: 'Too many requests. Please wait a few minutes before trying again.' }
    };
  }

  const name = payload.name?.trim() || '';
  const email = payload.email?.trim() || '';
  const message = payload.message?.trim() || '';
  const subject = payload.subject?.trim() || `New Portfolio Message from ${name}`;

  // 2. Reject Empty Fields
  if (!name || !email || !message) {
    return {
      status: 400,
      body: { error: 'Name, email, and message are required and cannot be empty.' }
    };
  }

  // 3. Email format validation
  if (!isValidEmail(email)) {
    return {
      status: 400,
      body: { error: 'Please enter a valid email address.' }
    };
  }

  // Get SMTP Secrets from environment variables
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.error('SMTP credentials missing from environment (EMAIL_USER/EMAIL_PASS).');
    return {
      status: 500,
      body: { error: 'Internal server configuration error. SMTP credentials are not configured.' }
    };
  }

  // 4. Create Transporter (Default to Gmail/General SMTP config)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // 5. Format and Send the Email
  // Formatted exact email layout required by the user
  const emailText = `--------------------------------
New Portfolio Contact Form

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
--------------------------------`;

  const mailOptions = {
    from: emailUser,
    to: 'kritikabhatt999@gmail.com',
    subject: `[Portfolio Contact] ${subject}`,
    text: emailText,
    replyTo: email, // Direct reply to user's contact email
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      status: 200,
      body: { success: 'Message sent successfully!' }
    };
  } catch (error: any) {
    console.error('Nodemailer sendMail failed:', error);
    return {
      status: 500,
      body: { error: 'Failed to send email. Please verify SMTP settings.' }
    };
  }
}
