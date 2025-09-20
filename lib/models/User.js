// lib/models/User.js
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
