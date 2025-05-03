import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load dotenv from absolute path
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  console.log(`Loading .env file from: ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log(`.env file not found at: ${envPath}`);
}

// Use hardcoded database URL if environment variable is not set
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:azrlrsdi31_@127.0.0.1:5432/liboyystore';
console.log("Using database URL:", DATABASE_URL.replace(/:[^:]*@/, ':***@')); // hide password

// Setup PG pool & drizzle
export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle(pool, { schema });