// lib/db.ts

import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cachedDb: Connection | null = null;

export async function connectToDatabase(): Promise<Connection> {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await mongoose.connect(MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as Parameters<typeof mongoose.connect>[1]);

  const db = client.connection;
  cachedDb = db;

  return db;
}
