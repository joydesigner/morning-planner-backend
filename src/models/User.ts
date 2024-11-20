import mongoose, { Schema, Document } from "mongoose";

// Interface for User document
export interface IUser extends Document {
  profileName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the User collection
const UserSchema: Schema<IUser> = new Schema(
    {
      profileName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    },
    {
      timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
    }
);
// Create and export the User model
export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);