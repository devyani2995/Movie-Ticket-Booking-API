// Importing express framework for building the server
import express from 'express';

// Environment variables configuration
import dotenv from "dotenv";

// Importing the function to connect to MongoDB using Mongoose
import { connectUsingMongoose } from './src/config/mongooseConfig.js';

// Import the Auth routes to handle authentication related requests
import authRouter from './src/routes/auth.routes.js';

// Import the Admin routes to handle admin related requests
import adminRouter from './src/routes/admin.routes.js';

// Import the Booking routes to handle booking related requests
import bookingRouter from './src/routes/booking.routes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const server = express();

// Middleware to parse JSON requests
server.use(express.json());

// Parse form data to access on server side
server.use(express.urlencoded({ extended: true }));

// For all requests related to authentication, redirect to auth routes
server.use("/auth", authRouter);
// For all requests related to admin functionalities, redirect to admin routes
server.use("/admin", adminRouter);
// For all requests related to bookings, redirect to booking routes
server.use("/bookings", bookingRouter);

// Default request handler
server.get('/', (req, res) => {
    res.send('Welcome to Movie Ticket Booking APIs');
});

// Start the server and listen for requests on the specified port
server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
    // Connect to the MongoDB database
    connectUsingMongoose();
});