import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import { storage } from "./storage";
import * as schema from "@shared/schema";
import { log } from "./vite";


// Define a type for user in the system
type AppUser = schema.User;

export function setupAuth(app: Express) {
  // Set up session
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "LiboyyStoreSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production", // Set to true in production with HTTPS
    },
    store: storage.sessionStore,
  };
  

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Set up LocalStrategy for authentication
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        
        if (!user) {
          return done(null, false, { message: "Username tidak ditemukan" });
        }
        
        const passwordMatch = await storage.comparePasswords(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Password salah" });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  // Serialize and deserialize user
  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Authentication endpoints
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    const user = req.user as AppUser;
    
    // Return only safe user data (not password)
    const safeUser = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    
    log(`User ${user.username} logged in`, "auth");
    res.status(200).json(safeUser);
  });

  app.post("/api/admin/login", passport.authenticate("local"), (req, res) => {
    const user = req.user as AppUser;
    
    if (!user.isAdmin) {
      req.logout((err) => {
        if (err) {
          log(`Error logging out non-admin user: ${err}`, "auth");
        }
      });
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }
    
    // Return only safe user data (not password)
    const safeUser = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    
    log(`Admin ${user.username} logged in`, "auth");
    res.status(200).json(safeUser);
  });

  app.post("/api/logout", (req, res, next) => {
    const username = (req.user as AppUser)?.username || "Anonymous";
    
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      log(`User ${username} logged out`, "auth");
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    const user = req.user as AppUser;
    
    // Return only safe user data
    const safeUser = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    
    res.json(safeUser);
  });

  // Middleware for checking admin access
  app.use('/api/admin', (req: Request, res: Response, next: NextFunction) => {
    if (req.path === '/login') {
      return next();
    }
    
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const user = req.user as AppUser;
    if (!user.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }
    
    next();
  });
}

// Middleware for checking if user is authenticated
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Authentication required" });
}

// Middleware for checking if user is admin
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const user = req.user as AppUser;
  if (!user.isAdmin) {
    return res.status(403).json({ error: "Access denied. Admin privileges required." });
  }
  
  next();
}