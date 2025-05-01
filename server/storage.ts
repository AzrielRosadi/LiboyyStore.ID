import { 
  User, InsertUser, Order, ContactMessage, Notification,
  InsertContactMessage, InsertOrder, InsertNotification,
  UpdateOrder, UpdateContactMessage
} from "@shared/schema";
import { eq, asc, desc, and, or, isNull, sql } from "drizzle-orm";
import { db } from "./db";
import { users, orders, contactMessages, notifications } from "@shared/schema";
import { nanoid } from "nanoid";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

// Promisify scrypt
const scryptAsync = promisify(scrypt);

// Storage interface
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  
  // Order management
  getAllOrders(filter?: {status?: string}): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, updates: Partial<UpdateOrder>): Promise<Order>;
  
  // Contact message management
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  updateContactMessage(id: number, updates: UpdateContactMessage): Promise<ContactMessage>;
  
  // Notification management
  createNotification(notification: InsertNotification): Promise<Notification>;
  getAdminNotifications(): Promise<Notification[]>;
  markNotificationAsRead(id: number): Promise<Notification>;
  
  // Session store for Express
  sessionStore: session.Store;
  
  // Utility methods
  hashPassword(password: string): Promise<string>;
  comparePasswords(supplied: string, stored: string): Promise<boolean>;
}

// Postgres storage implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    const PgStore = ConnectPgSimple(session);
    this.sessionStore = new PgStore({
      pool,
      tableName: 'session', // Use default session table name
      createTableIfMissing: true
    });
    
    // Initialize the database with admin user if not exists
    this.initializeAdminUser();
  }
  
  private async initializeAdminUser() {
    const adminExists = await this.getUserByUsername("admin");
    
    if (!adminExists) {
      // Create admin user with hashed password
      const hashedPassword = await this.hashPassword("admin123");
      await this.createUser({
        username: "admin",
        password: hashedPassword,
        isAdmin: true
      });
      console.log("Admin user created successfully");
    }
  }
  
  // Password utilities
  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }
  
  async comparePasswords(supplied: string, stored: string): Promise<boolean> {
    const [hashed, salt] = stored.split(".");
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedBuf, suppliedBuf);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result.length ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result.length ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Order methods
  async getAllOrders(filter?: {status?: string}): Promise<Order[]> {
    let query = db.select().from(orders);
    
    if (filter?.status) {
      query = query.where(eq(orders.status, filter.status));
    }
    
    return await query.orderBy(desc(orders.createdAt));
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    return result.length ? result[0] : undefined;
  }

  async createOrder(orderData: InsertOrder): Promise<Order> {
    // Generate order ID
    const orderId = `ORD-${nanoid(6).toUpperCase()}`;
    
    const [order] = await db
      .insert(orders)
      .values({
        ...orderData,
        id: orderId,
      })
      .returning();
    
    // Create notification for admin
    await this.createNotification({
      title: "New Order Received",
      message: `A new order #${orderId} for ${orderData.productName} has been placed.`,
      type: "info",
      isForAdmin: true,
      data: {
        orderId,
        productName: orderData.productName,
        amount: orderData.price
      }
    });
    
    return order;
  }

  async updateOrder(id: string, updates: Partial<UpdateOrder>): Promise<Order> {
    const currentOrder = await this.getOrderById(id);
    
    if (!currentOrder) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    // Set updatedAt to current timestamp
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };
    
    const [updatedOrder] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning();
    
    // If status changed, create a notification
    if (updates.status && updates.status !== currentOrder.status) {
      await this.createNotification({
        title: `Order Status Updated`,
        message: `Order #${id} status changed from ${currentOrder.status} to ${updates.status}.`,
        type: "info",
        isForAdmin: true,
        data: {
          orderId: id,
          oldStatus: currentOrder.status,
          newStatus: updates.status
        }
      });
    }
    
    return updatedOrder;
  }

  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const result = await db.select().from(contactMessages).where(eq(contactMessages.id, id)).limit(1);
    return result.length ? result[0] : undefined;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    
    // Create notification for admin
    await this.createNotification({
      title: "New Contact Message",
      message: `You received a new contact message from ${message.name}.`,
      type: "info",
      isForAdmin: true,
      data: {
        contactId: contactMessage.id,
        name: message.name,
        contact: message.contact
      }
    });
    
    return contactMessage;
  }
  
  async updateContactMessage(id: number, updates: UpdateContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .update(contactMessages)
      .set({
        ...updates,
        updatedAt: new Date()
      })
      .where(eq(contactMessages.id, id))
      .returning();
    
    return message;
  }
  
  // Notification methods
  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db
      .insert(notifications)
      .values(notification)
      .returning();
    
    return newNotification;
  }
  
  async getAdminNotifications(): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.isForAdmin, true))
      .orderBy(desc(notifications.createdAt));
  }
  
  async markNotificationAsRead(id: number): Promise<Notification> {
    const [notification] = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id))
      .returning();
    
    return notification;
  }
}

export const storage = new DatabaseStorage();
