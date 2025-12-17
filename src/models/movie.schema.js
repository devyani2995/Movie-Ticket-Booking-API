import mongoose from "mongoose";

// Define the schema for the Movie collection in MongoDB
const movieSchema = new mongoose.Schema({
    // Title of the movie
    title: String,
    // Total seats available for the movie
    totalSeats: Number,
    // Seats currently available for booking
    availableSeats: Number
});

// Mongoose model for the Movie collection in MongoDB
module.exports = mongoose.model("Movie", movieSchema);