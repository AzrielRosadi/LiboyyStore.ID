import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for authentication and admin users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  email: text("email"),
  phone: text("phone"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  notifications: many(notifications),
}));

// Orders table to store all customer orders
export const orders = pgTable("orders", {
  id: text("id").primaryKey(), // Custom order ID format (ORD-XXXXXX)
  userId: integer("user_id").references(() => users.id),
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
  paymentDate: timestamp("payment_date"),
  paymentAmount: integer("payment_amount"),
  paymentVerified: boolean("payment_verified").default(false),
  contact: text("contact").notNull(), // WhatsApp/email for contact
  notes: text("notes"), // Customer notes about the order
  adminNotes: text("admin_notes"), // Admin notes for internal use
  status: text("status").notNull().default("pending"), // pending, processing, completed, cancelled
  notificationSent: boolean("notification_sent").default(false),
  processed: boolean("processed").default(false), // Has the order been processed by admin?
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id]
  }),
  notifications: many(notifications),
}));

// Notifications table for system and admin messages
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  orderId: text("order_id").references(() => orders.id),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").default("info").notNull(), // info, success, warning, error
  isRead: boolean("is_read").default(false),
  data: json("data"), // Additional data like order details
  isForAdmin: boolean("is_for_admin").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const notificationRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id]
  }),
  order: one(orders, {
    fields: [notifications.orderId],
    references: [orders.id]
  }),
}));

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contact: text("contact").notNull(), // Email or phone
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  userId: true,
  paymentVerified: true,
  paymentDate: true,
  notificationSent: true,
  processed: true,
  adminNotes: true,
  completedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  isRead: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  isRead: true,
  adminNotes: true,
  createdAt: true,
  updatedAt: true,
});

// Update schemas
export const updateUserSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
});

export const updateOrderSchema = z.object({
  status: z.enum(["pending", "processing", "completed", "cancelled"]).optional(),
  paymentVerified: z.boolean().optional(),
  processed: z.boolean().optional(),
  adminNotes: z.string().optional(),
  paymentProof: z.string().optional(),
  paymentDate: z.date().optional(),
  notificationSent: z.boolean().optional(),
  completedAt: z.date().optional(),
});

export const updateContactMessageSchema = z.object({
  isRead: z.boolean().optional(),
  adminNotes: z.string().optional(),
});


// Types for the application
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type UpdateContactMessage = z.infer<typeof updateContactMessageSchema>;



