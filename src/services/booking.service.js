import mongoose from "mongoose";
import Movie from "../models/movie.schema.js";
import Booking from "../models/booking.schema.js";
import Promo from "../models/promo.schema.js";
import { User } from "../models/user.schema.js";

const bookTickets = async (userId, movieId, seats, promoCode) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const movie = await Movie.findById(movieId).session(session);
    if (!movie || movie.availableSeats < seats)
      throw new Error("Not enough seats");

    let amount = seats * 300;

    if (promoCode) {
      const promo = await Promo.findOne({ code: promoCode });
      if (!promo || promo.expiry < new Date())
        throw new Error("Invalid promo");

      if (promo.type === "FREE_SEAT") amount -= 300;
      if (promo.type === "FLAT_250") amount -= 250;
    }

    movie.availableSeats -= seats;
    await movie.save({ session });

    await Booking.create([{ user: userId, movie: movieId, seats, amount }], {
      session
    });

    await User.findByIdAndUpdate(
      userId,
      { $inc: { totalSpent: amount } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return { success: true, amount };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

module.exports = { bookTickets };
