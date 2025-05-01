import { Request, Response, NextFunction } from "express";
import { storage } from "./storage";

export interface AuthInterface {
  authenticateAdmin(username: string, password: string): Promise<string | null>;
  requireAdmin(req: Request, res: Response, next: NextFunction): void;
}

class Auth implements AuthInterface {
  /**
   * Authenticate admin user
   * @param username Admin username
   * @param password Admin password
   * @returns Authentication token if successful, null otherwise
   */
  async authenticateAdmin(username: string, password: string): Promise<string | null> {
    try {
      const user = await storage.getUserByUsername(username);
      
      // Check if user exists and is admin
      if (!user || !user.isAdmin) {
        return null;
      }
      
      // In a production app, we would compare hashed passwords
      if (user.password !== password) {
        return null;
      }
      
      // Generate a simple token (in a real app, use JWT)
      return `admin-${Date.now()}`;
    } catch (error) {
      console.error("Authentication error:", error);
      return null;
    }
  }

  /**
   * Middleware to require admin authentication
   */
  requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.session || !req.session.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    next();
  }
}

export const auth = new Auth();
