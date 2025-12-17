import express from "express";
import Movie from "../models/movie.schema.js";
import Booking from "../models/booking.schema.js";
import auth from "../middleware/auth.js";
import rbac from "../middleware/rbac.js";

const adminRouter = express.Router();

adminRouter.post("/movies", auth, rbac("ADMIN"), async (req, res) => {
  const movie = await Movie.create({
    ...req.body,
    availableSeats: req.body.totalSeats
  });
  res.json(movie);
});

adminRouter.get("/bookings", auth, rbac("ADMIN"), async (req, res) => {
  const bookings = await Booking.find().populate("user movie");
  res.json(bookings);
});

export default adminRouter;
