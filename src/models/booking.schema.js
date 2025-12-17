import mongoose from "mongoose";

// Define the schema for the Booking collection in MongoDB
const bookingSchema = new mongoose.Schema({
  // Reference to the User who made the booking
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // Reference to the Movie that was booked
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  // Number of seats booked
  seats: Number,
  // Total amount for the booking
  amount: Number,
  // Timestamp of when the booking was created
  createdAt: { type: Date, default: Date.now }
});

// Mongoose model for the Booking collection in MongoDB
module.exports = mongoose.model("Booking", bookingSchema);