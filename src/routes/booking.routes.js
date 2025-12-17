import express from "express";
import auth from "../middleware/auth.js";
import { bookTickets } from "../services/booking.service.js";

const bookingRouter = express.Router();

bookingRouter.post("/", auth, async (req, res) => {
  try {
    const result = await bookTickets(
      req.user.id,
      req.body.movieId,
      req.body.seats,
      req.body.promoCode
    );
    res.json(result);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default bookingRouter;
