import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from '@shared/schema';
import { log } from './vite';

// Config for Neon database connection
neonConfig.webSocketConstructor = ws;

// Check if the database URL is provided
if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is not set. Please create a PostgreSQL database.'
  );
}

// Create a connection pool
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Initialize Drizzle ORM with our schema
export const db = drizzle(pool, { schema });

// Log database connection
log('Database connected successfully', 'drizzle');