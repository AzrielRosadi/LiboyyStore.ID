import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import path from 'path';
import { log } from './vite';

// Folder untuk menyimpan data sesi WhatsApp
const SESSION_DATA_PATH = path.join(process.cwd(), '.whatsapp-session');

// Buat instance client WhatsApp dengan konfigurasi sederhana
const client = new Client({
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
});

// Status koneksi WhatsApp
let isReady = false;

// Event saat QR code perlu dipindai
client.on('qr', (qr) => {
  log('WhatsApp QR Code diterima, silakan scan dengan ponsel Anda:', 'whatsapp');
  qrcode.generate(qr, { small: true });
});

// Event saat siap menerima pesan
client.on('ready', () => {
  isReady = true;
  log('WhatsApp client siap!', 'whatsapp');
});

// Event saat terautentikasi
client.on('authenticated', () => {
  log('WhatsApp berhasil diautentikasi!', 'whatsapp');
});

// Event saat autentikasi gagal
client.on('auth_failure', (msg) => {
  log(`WhatsApp autentikasi gagal: ${msg}`, 'whatsapp');
  isReady = false;
});

// Event saat koneksi terputus
client.on('disconnected', (reason) => {
  log(`WhatsApp terputus: ${reason}`, 'whatsapp');
  isReady = false;
  
  // Coba hubungkan kembali setelah 5 detik
  setTimeout(() => {
    initWhatsApp();
  }, 5000);
});

/**
 * Inisialisasi klien WhatsApp
 */
export function initWhatsApp() {
  try {
    log('Menginisialisasi WhatsApp client...', 'whatsapp');
    client.initialize();
  } catch (error) {
    log(`Error menginisialisasi WhatsApp: ${error}`, 'whatsapp');
  }
}

/**
 * Kirim pesan WhatsApp
 * @param to - Nomor penerima (format: 628xxx tanpa '+' atau '0')
 * @param message - Pesan yang akan dikirim
 * @returns Promise yang akan resolve saat pesan terkirim
 */
export async function sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
  if (!isReady) {
    log('WhatsApp client belum siap, tidak dapat mengirim pesan', 'whatsapp');
    return false;
  }

  try {
    // Format nomor telepon
    const number = to.includes('@c.us') ? to : `${to}@c.us`;
    
    // Kirim pesan
    await client.sendMessage(number, message);
    log(`Pesan WhatsApp berhasil dikirim ke ${to}`, 'whatsapp');
    return true;
  } catch (error) {
    log(`Error mengirim pesan WhatsApp: ${error}`, 'whatsapp');
    return false;
  }
}

/**
 * Kirim pesan WhatsApp dengan lampiran file (gambar/dokumen)
 * @param to - Nomor penerima (format: 628xxx tanpa '+' atau '0')
 * @param message - Caption pesan yang akan dikirim
 * @param filePath - Path absolut ke file yang akan dikirim
 * @returns Promise yang akan resolve saat pesan terkirim
 */
export async function sendWhatsAppMessageWithMedia(to: string, message: string, filePath: string): Promise<boolean> {
  if (!isReady) {
    log('WhatsApp client belum siap, tidak dapat mengirim pesan', 'whatsapp');
    return false;
  }

  try {
    // Format nomor telepon
    const number = to.includes('@c.us') ? to : `${to}@c.us`;
    
    // Import MessageMedia
    const { MessageMedia } = require('whatsapp-web.js');
    
    // Buat media dari file path
    const media = MessageMedia.fromFilePath(filePath);
    
    // Kirim pesan dengan media
    await client.sendMessage(number, media, { caption: message });
    
    log(`Pesan WhatsApp dengan media berhasil dikirim ke ${to}`, 'whatsapp');
    return true;
  } catch (error) {
    log(`Error mengirim pesan WhatsApp dengan media: ${error}`, 'whatsapp');
    return false;
  }
}

/**
 * Periksa apakah WhatsApp client sudah siap
 */
export function isWhatsAppReady(): boolean {
  return isReady;
}

// Ekspor client jika perlu mengakses fungsi lainnya
export { client };