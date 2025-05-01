// Type declarations for express and multer
import 'express-session';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      session: any;
      file?: any;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    adminToken?: string;
    isAdmin?: boolean;
  }
}