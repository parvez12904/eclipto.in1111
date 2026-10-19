import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';

export interface AdminPayload {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      adminUser?: {
        id: string;
        email: string;
        name: string | null;
        role: string;
      };
    }
  }
}

export async function requireAdminAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string | undefined = undefined;

    // 1. Check HTTP-only cookie
    if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    }

    // 2. Check Authorization header
    const authHeader = req.headers.authorization;
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    if (!token) {
      res.status(401).json({
        ok: false,
        message: 'Authentication required. No session or token found.',
      });
      return;
    }

    const secret = process.env.JWT_SECRET || 'fallback_secret_for_eclipto_2026';
    const decoded = jwt.verify(token, secret) as AdminPayload;

    const user = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true, isActive: true },
    });

    if (!user || !user.isActive) {
      res.status(401).json({
        ok: false,
        message: 'Admin session is invalid or user account has been disabled.',
      });
      return;
    }

    req.adminUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: 'Invalid or expired authorization token.',
    });
  }
}
