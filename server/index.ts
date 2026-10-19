import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import enquiriesRouter from './routes/enquiries';
import adminRouter from './routes/admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Trust proxy for rate limiting if behind reverse proxy
app.set('trust proxy', 1);

// Security Headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Let Vite dev server manage scripts/styles in dev
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration supporting credentials (cookies)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      if (origin === CLIENT_ORIGIN || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// JSON and URL-encoded body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Cookie parser for JWT session cookies
app.use(cookieParser());

// Rate Limiter for public enquiry submission
const enquirySubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // limit each IP to 25 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: 'Too many enquiries submitted from this network. Please wait 15 minutes before submitting again.',
  },
});

// Health check endpoint (Public)
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'ECLIPTO Digital Agency API',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// Public enquiry endpoint with rate limiting
app.use('/api/enquiries', enquirySubmitLimiter, enquiriesRouter);

// Admin routes (Auth, Management, Analytics)
app.use('/api/admin', adminRouter);

// 404 handler for API routes
app.all(/^\/api(\/.*)?$/, (_req: Request, res: Response) => {
  res.status(404).json({
    ok: false,
    message: 'API endpoint not found or unsupported method.',
  });
});

// In production, serve static frontend assets built by Vite
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, '../dist');
  app.use(express.static(distPath));

  // SPA fallback for frontend client-side routing
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Centralized error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[API Server Error]', err);
  res.status(err.status || 500).json({
    ok: false,
    message: err.message || 'An unexpected internal server error occurred.',
  });
});

// Start listening
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`  ECLIPTØ BACKEND API SERVER RUNNING`);
    console.log(`  Port:        http://localhost:${PORT}`);
    console.log(`  Health:      http://localhost:${PORT}/api/health`);
    console.log(`  Public API:  POST http://localhost:${PORT}/api/enquiries`);
    console.log(`  Admin Auth:  POST http://localhost:${PORT}/api/admin/auth/login`);
    console.log(`===============================================`);
  });
}

export default app;
