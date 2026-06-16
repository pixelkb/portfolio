import { handleContactSubmission } from './contact-handler';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Retrieve IP address
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || '';

  // Body parser fallback (Vercel usually parses req.body automatically)
  let payload = req.body;
  if (typeof req.body === 'string') {
    try {
      payload = JSON.parse(req.body);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
  }

  const result = await handleContactSubmission(payload || {}, clientIp);

  // Vercel serverless helper methods for sending response
  if (typeof res.status === 'function') {
    return res.status(result.status).json(result.body);
  } else {
    // Fallback to native Node HTTP methods
    res.writeHead(result.status, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(result.body));
  }
}
