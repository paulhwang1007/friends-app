// lib/db.js
import mongoose from "mongoose";

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const uri = process.env.MONGODB_URL;
    if (!uri) throw new Error("MONGODB_URL missing");
    cached.promise = mongoose
      .connect(uri, { dbName: "friends-app" })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
