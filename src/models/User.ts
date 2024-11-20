import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for User document
interface IUser extends Document {
  profileName: string;
  email: string;
  password: string;
}

// User schema definition
const UserSchema: Schema = new mongoose.Schema({
  profileName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export User model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;