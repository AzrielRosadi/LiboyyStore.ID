// Type declarations for express and multer
import 'express-session';
import { Session } from 'express-session';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      session: Session & Partial<SessionData>;
      file?: Express.Multer.File;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    adminToken?: string;
    isAdmin?: boolean;
    contactInfo?: string;
  }
}