import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleContactSubmission } from './api/contact-handler';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env file
  const env = loadEnv(mode, process.cwd(), '');
  process.env.EMAIL_USER = env.EMAIL_USER || process.env.EMAIL_USER;
  process.env.EMAIL_PASS = env.EMAIL_PASS || process.env.EMAIL_PASS;
  process.env.SMTP_HOST = env.SMTP_HOST || process.env.SMTP_HOST;
  process.env.SMTP_PORT = env.SMTP_PORT || process.env.SMTP_PORT;
  process.env.SMTP_SECURE = env.SMTP_SECURE || process.env.SMTP_SECURE;

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/contact' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk.toString();
            });
            req.on('end', async () => {
              try {
                const payload = body ? JSON.parse(body) : {};
                const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
                const result = await handleContactSubmission(payload, clientIp);
                
                res.writeHead(result.status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result.body));
              } catch (error: any) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message || 'Invalid JSON request' }));
              }
            });
            return;
          }
          next();
        });
      }
    }
  };
});

