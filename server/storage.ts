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

// Konversi scrypt ke Promise
const scryptAsync = promisify(scrypt);

// Antarmuka penyimpanan
export interface IStorage {
  // Manajemen pengguna
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  
  // Manajemen pesanan
  getAllOrders(filter?: {status?: string}): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, updates: Partial<UpdateOrder>): Promise<Order>;
  deleteOrder(id: string): Promise<void>;
  deleteAllOrders(): Promise<void>;
  
  // Manajemen pesan kontak
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  updateContactMessage(id: number, updates: UpdateContactMessage): Promise<ContactMessage>;
  
  // Manajemen notifikasi
  createNotification(notification: InsertNotification): Promise<Notification>;
  getAdminNotifications(): Promise<Notification[]>;
  markNotificationAsRead(id: number): Promise<Notification>;
  
  // Penyimpanan session untuk Express
  sessionStore: session.Store;
  
  // Metode utilitas
  hashPassword(password: string): Promise<string>;
  comparePasswords(supplied: string, stored: string): Promise<boolean>;
}

// Implementasi penyimpanan PostgreSQL
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    const PgStore = ConnectPgSimple(session);
    this.sessionStore = new PgStore({
      pool,
      tableName: 'session', // Gunakan nama tabel session default
      createTableIfMissing: true
    });
    
    // Inisialisasi database dengan user admin jika belum ada
    this.initializeAdminUser();
  }
  
  // Fungsi untuk membuat user admin jika belum ada
  private async initializeAdminUser() {
    const adminExists = await this.getUserByUsername("admin");
    
    if (!adminExists) {
      // Buat user admin dengan password terenkripsi
      const hashedPassword = await this.hashPassword("admin123");
      await this.createUser({
        username: "admin",
        password: hashedPassword,
        isAdmin: true
      });
      console.log("User admin berhasil dibuat");
    }
  }
  
  // Fungsi untuk mengenkripsi password
  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }
  
  // Fungsi untuk membandingkan password
  async comparePasswords(supplied: string, stored: string): Promise<boolean> {
    const [hashed, salt] = stored.split(".");
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedBuf, suppliedBuf);
  }

  // ========== MANAJEMEN PENGGUNA ==========
  
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

  // ========== MANAJEMEN PESANAN ==========
  
  async getAllOrders(filter?: {status?: string}): Promise<Order[]> {
    if (filter?.status) {
      return await db.select()
        .from(orders)
        .where(eq(orders.status, filter.status))
        .orderBy(desc(orders.createdAt));
    }
    
    return await db.select()
      .from(orders)
      .orderBy(desc(orders.createdAt));
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    return result.length ? result[0] : undefined;
  }

  async createOrder(orderData: InsertOrder): Promise<Order> {
    // Generate ID pesanan
    const orderId = `ORD-${nanoid(6).toUpperCase()}`;
    
    const [order] = await db
      .insert(orders)
      .values({
        ...orderData,
        id: orderId,
      })
      .returning();
    
    // Buat notifikasi untuk admin
    await this.createNotification({
      title: "Pesanan Baru Diterima",
      message: `Pesanan baru #${orderId} untuk ${orderData.productName} telah dibuat.`,
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
      throw new Error(`Pesanan dengan ID ${id} tidak ditemukan`);
    }
    
    // Set updatedAt ke timestamp saat ini
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };
    
    const [updatedOrder] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning();
    
    // Jika status berubah, buat notifikasi
    if (updates.status && updates.status !== currentOrder.status) {
      await this.createNotification({
        title: `Status Pesanan Diperbarui`,
        message: `Status pesanan #${id} berubah dari ${currentOrder.status} menjadi ${updates.status}.`,
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
  
  // Fungsi untuk menghapus pesanan tunggal
  async deleteOrder(id: string): Promise<void> {
    // Hapus notifikasi terkait terlebih dahulu
    await db.delete(notifications).where(eq(notifications.orderId, id));
    
    // Kemudian hapus pesanan
    await db.delete(orders).where(eq(orders.id, id));
  }
  
  // Fungsi untuk menghapus semua pesanan
  async deleteAllOrders(): Promise<void> {
    
    // Hapus semua notifikasi terlebih dahulu
    await db.delete(notifications).where(isNull(notifications.orderId));
    
    // Kemudian hapus semua pesanan
    await db.delete(orders);
  }

  // ========== MANAJEMEN PESAN KONTAK ==========
  
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
    
    // Buat notifikasi untuk admin
    await this.createNotification({
      title: "Pesan Kontak Baru",
      message: `Anda menerima pesan kontak baru dari ${message.name}.`,
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
  
  // ========== MANAJEMEN NOTIFIKASI ==========
  
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

// Ekspor instance penyimpanan
export const storage = new DatabaseStorage();