import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage as dataStorage } from "./storage";
import { generateOrderId } from "@/lib/helpers";
import { insertOrderSchema, insertContactMessageSchema, updateOrderSchema } from "@shared/schema";
import path from "path";
import fs from "fs";
import multer from "multer";
import { auth } from "./auth";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const multerStorage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, uploadDir);
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: multerStorage });

// Extend Express Request type to include session and file properties
declare global {
  namespace Express {
    interface Request {
      session: any;
      file?: any;
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Make uploads directory accessible
  app.use('/uploads', express.static(uploadDir));

  // API Routes
  // 1. Order Management
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertOrderSchema.parse(req.body);
      
      // Generate order ID
      const orderId = generateOrderId();
      
      // Create new order
      const order = await dataStorage.createOrder({
        id: orderId,
        ...validatedData,
        accountZone: validatedData.accountZone || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      return res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(400).json({ message: "Invalid order data" });
    }
  });

  app.get("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      const order = await dataStorage.getOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      return res.json(order);
    } catch (error) {
      console.error("Error getting order:", error);
      return res.status(500).json({ message: "Error retrieving order" });
    }
  });

  // Upload payment proof
  app.post("/api/orders/:id/confirm", upload.single('paymentProof'), async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      const order = await dataStorage.getOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      if (!req.file) {
        return res.status(400).json({ message: "Payment proof is required" });
      }
      
      // Update order with payment proof filename
      const updatedOrder = await dataStorage.updateOrder(orderId, {
        paymentProof: req.file.filename,
        status: "processing",
        updatedAt: new Date(),
      });
      
      return res.json(updatedOrder);
    } catch (error) {
      console.error("Error confirming payment:", error);
      return res.status(500).json({ message: "Error confirming payment" });
    }
  });

  // 2. Contact Form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Create contact message
      const message = await dataStorage.createContactMessage({
        ...validatedData,
        createdAt: new Date(),
      });
      
      return res.status(201).json(message);
    } catch (error) {
      console.error("Error saving contact message:", error);
      return res.status(400).json({ message: "Invalid contact data" });
    }
  });

  // 3. Admin Routes
  // Admin login
  app.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      // Authenticate admin
      const token = await auth.authenticateAdmin(username, password);
      
      if (!token) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Set session data
      req.session.adminToken = token;
      req.session.isAdmin = true;
      
      return res.json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Error processing login" });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Error logging out" });
      }
      
      res.clearCookie("connect.sid");
      return res.json({ message: "Logout successful" });
    });
  });

  // Check admin authentication
  app.get("/api/admin/check", auth.requireAdmin, (req: Request, res: Response) => {
    return res.json({ authenticated: true });
  });

  // Get all orders (admin only)
  app.get("/api/admin/orders", auth.requireAdmin, async (req: Request, res: Response) => {
    try {
      const orders = await dataStorage.getAllOrders();
      return res.json(orders);
    } catch (error) {
      console.error("Error getting orders:", error);
      return res.status(500).json({ message: "Error retrieving orders" });
    }
  });

  // Get order by ID (admin only)
  app.get("/api/admin/orders/:id", auth.requireAdmin, async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      const order = await dataStorage.getOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      return res.json(order);
    } catch (error) {
      console.error("Error getting order:", error);
      return res.status(500).json({ message: "Error retrieving order" });
    }
  });

  // Update order status (admin only)
  app.patch("/api/admin/orders/:id", auth.requireAdmin, async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      const order = await dataStorage.getOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // Validate request body
      const validatedData = updateOrderSchema.parse(req.body);
      
      // Update order status
      const updatedOrder = await dataStorage.updateOrder(orderId, {
        status: validatedData.status,
        updatedAt: new Date(),
      });
      
      return res.json(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      return res.status(500).json({ message: "Error updating order" });
    }
  });

  // Get all contact messages (admin only)
  app.get("/api/admin/contacts", auth.requireAdmin, async (req: Request, res: Response) => {
    try {
      const messages = await dataStorage.getAllContactMessages();
      return res.json(messages);
    } catch (error) {
      console.error("Error getting contact messages:", error);
      return res.status(500).json({ message: "Error retrieving contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
