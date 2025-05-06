import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage as dataStorage } from "./storage";
import { generateOrderId } from "@/lib/helpers";
import { insertOrderSchema, insertContactMessageSchema, updateOrderSchema } from "@shared/schema";
import path from "path";
import fs from "fs";
import multer from "multer";
import { setupAuth, isAuthenticated, isAdmin } from "./auth";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


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

// Request type extensions are now in types.d.ts

export async function registerRoutes(app: Express): Promise<Server> {
  function formatToJakartaTime(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  }
  // Make uploads directory accessible
  app.use('/uploads', express.static(uploadDir));

  // API Routes
  // 1. Order Management

  // Get orders by contact
  app.get("/api/orders", async (req: Request, res: Response) => {
    try {
      const contactInfo = req.query.contact as string;

      // If no contact info provided and user is not authenticated
      if (!contactInfo && !req.isAuthenticated()) {
        return res.status(401).json({ message: "You must provide contact information or be logged in" });
      }

      // If user is authenticated as admin, return all orders
      if (req.isAuthenticated() && (req.user as any)?.isAdmin) {
        const orders = await dataStorage.getAllOrders();
        return res.json(orders);
      }

      // If user provided contact info, filter orders by contact
      if (contactInfo) {
        const orders = await dataStorage.getAllOrders();
        const filteredOrders = orders.filter(order => order.contact === contactInfo);
        return res.json(filteredOrders);
      }

      // Otherwise return empty array
      return res.json([]);
    } catch (error) {
      console.error("Error getting orders:", error);
      return res.status(500).json({ message: "Error retrieving orders" });
    }
  });

  // Create new order
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertOrderSchema.parse(req.body);

      // Create new order
      const order = await dataStorage.createOrder({
        ...validatedData,
        accountZone: validatedData.accountZone || null,
      });

      // Store contact info in session for future reference
      if (req.session && validatedData.contact) {
        req.session.contactInfo = validatedData.contact;
      }

      // Create notification for admin
      await dataStorage.createNotification({
        title: "Pesanan Baru",
        message: `Pesanan baru ${order.id} telah dibuat oleh ${validatedData.contact}`,
        type: "info",
        isForAdmin: true,
        orderId: order.id,
        data: { order }
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

      // Format tanggal ke zona waktu Jakarta
      const enhancedOrder = {
        ...order,
        createdAtFormatted: formatToJakartaTime(order.createdAt),
        paymentDateFormatted: order.paymentDate ? formatToJakartaTime(order.paymentDate) : null,
        completedAtFormatted: order.completedAt ? formatToJakartaTime(order.completedAt) : null,
      };

      return res.json(enhancedOrder);

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
        paymentDate: new Date(),
      });

      // Create notification for admin about payment confirmation
      await dataStorage.createNotification({
        title: "Pembayaran Dikonfirmasi",
        message: `Bukti pembayaran untuk pesanan ${order.id} telah diunggah oleh ${order.contact}`,
        type: "success",
        isForAdmin: true,
        orderId: order.id,
        data: { order: updatedOrder }
      });

      return res.json(updatedOrder);
    } catch (error) {
      console.error("Error confirming payment:", error);
      return res.status(500).json({ message: "Error confirming payment" });
    }
  });

  // Di file server (routes.ts)
  app.post("/api/orders/:id/upload-proof", upload.single('paymentProof'), async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      const order = await dataStorage.getOrderById(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Payment proof is required" });
      }

      // Update order dengan bukti pembayaran
      const updatedOrder = await dataStorage.updateOrder(orderId, {
        paymentProof: req.file.filename,
        paymentDate: new Date(),
      });

      // Buat notifikasi untuk admin
      await dataStorage.createNotification({
        title: "Bukti Pembayaran Diunggah",
        message: `Bukti pembayaran untuk pesanan ${order.id} telah diunggah oleh ${order.contact}`,
        type: "info",
        isForAdmin: true,
        orderId: order.id,
        data: { order: updatedOrder }
      });

      return res.json(updatedOrder);
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      return res.status(500).json({ message: "Error uploading payment proof" });
    }
  });



  // 2. Contact Form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertContactMessageSchema.parse(req.body);

      // Create contact message
      const message = await dataStorage.createContactMessage(validatedData);

      return res.status(201).json(message);
    } catch (error) {
      console.error("Error saving contact message:", error);
      return res.status(400).json({ message: "Invalid contact data" });
    }
  });

  // Set up authentication
  setupAuth(app);

  // Check admin authentication
  app.get("/api/admin/check", isAdmin, (req: Request, res: Response) => {
    return res.json({ authenticated: true });
  });

  // Get all orders (admin only)
  app.get("/api/admin/orders", isAdmin, async (req: Request, res: Response) => {
    try {
      const orders = await dataStorage.getAllOrders();
      return res.json(orders);
    } catch (error) {
      console.error("Error getting orders:", error);
      return res.status(500).json({ message: "Error retrieving orders" });
    }
  });

  // Get order by ID (admin only)
  app.get("/api/admin/orders/:id", isAdmin, async (req: Request, res: Response) => {
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
  app.patch("/api/admin/orders/:id", isAdmin, async (req: Request, res: Response) => {
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
        // If status is completed, set completedAt
        ...(validatedData.status === "completed" ? { completedAt: new Date() } : {})
      });

      return res.json(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      return res.status(500).json({ message: "Error updating order" });
    }
  });

  // Get all contact messages (admin only)
  app.get("/api/admin/contacts", isAdmin, async (req: Request, res: Response) => {
    try {
      const messages = await dataStorage.getAllContactMessages();
      return res.json(messages);
    } catch (error) {
      console.error("Error getting contact messages:", error);
      return res.status(500).json({ message: "Error retrieving contact messages" });
    }
  });

  // Get admin notifications (admin only)
  app.get("/api/admin/notifications", isAdmin, async (req: Request, res: Response) => {
    try {
      const notifications = await dataStorage.getAdminNotifications();
      return res.json(notifications);
    } catch (error) {
      console.error("Error getting notifications:", error);
      return res.status(500).json({ message: "Error retrieving notifications" });
    }
  });

  // Mark notification as read
  app.patch("/api/admin/notifications/:id", isAdmin, async (req: Request, res: Response) => {
    try {
      const notificationId = parseInt(req.params.id);
      const notification = await dataStorage.markNotificationAsRead(notificationId);
      return res.json(notification);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      return res.status(500).json({ message: "Error updating notification" });
    }
  });


  const httpServer = createServer(app);
  return httpServer;
}