import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for admin authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

// Orders table to store all customer orders
export const orders = pgTable("orders", {
  id: text("id").primaryKey(), // Custom order ID format
  productId: text("product_id").notNull(),
  productName: text("product_name").notNull(),
  price: integer("price").notNull(),
  accountId: text("account_id").notNull(), // Game ID or social media username
  accountZone: text("account_zone"), // Server/zone for games like ML
  quantity: integer("quantity").notNull().default(1),
  paymentMethod: text("payment_method").notNull(),
  paymentNumber: text("payment_number").notNull(),
  paymentUsername: text("payment_username").notNull(),
  paymentProof: text("payment_proof"), // Filename of uploaded payment proof
  contact: text("contact").notNull(), // WhatsApp/email for contact
  status: text("status").notNull().default("pending"), // pending, processing, completed
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contact: text("contact").notNull(), // Email or phone
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

// Update schemas
export const updateOrderSchema = z.object({
  status: z.enum(["pending", "processing", "completed"]),
});

// Types for the application
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
