import mongoose from "mongoose";

// Define the schema for the User collection in MongoDB
const userSchema = new mongoose.Schema({
    // Name of the user
    name: String,
    // Email of the user, must be unique
    email: { type: String, unique: true },
    // Password for the user account
    password: String,
    // Role of the user, can be either ADMIN or CUSTOMER
    role: { type: String, enum: ["ADMIN", "CUSTOMER"] },
    // Total amount spent by the user
    totalSpent: { type: Number, default: 0 }
});

// Mongoose model for the User collection in MongoDB
export const User = mongoose.model("User", userSchema);