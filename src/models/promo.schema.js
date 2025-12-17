import mongoose from "mongoose";

// Define the schema for the Promo collection in MongoDB
const promoSchema = new mongoose.Schema({
  // Promo code string
  code: String,
  // Type of the promo, can be either FREE_SEAT or FLAT_250
  type: { type: String, enum: ["FREE_SEAT", "FLAT_250"] },
  // Expiry date of the promo
  expiry: Date
});

// Mongoose model for the Promo collection in MongoDB
module.exports = mongoose.model("Promo", promoSchema);