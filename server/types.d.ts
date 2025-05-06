// types.d.ts
import 'express-session';

declare global {
  namespace Express {
    interface Request {
      session: Session & Partial<SessionData>;
      file?: Express.Multer.File;
    }
  }

  interface SessionData {
    adminToken?: string;
    isAdmin?: boolean;
    contactInfo?: string;
  }
}

declare module 'qrcode-terminal' {
  function generate(text: string, options?: { small?: boolean }): void;
  export = generate;
}

declare module 'express-session' {
  interface SessionData {
    contactInfo?: string;
    // Add other custom session properties here
  }
}

export {};