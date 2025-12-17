import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.schema.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const user = await User.create({
    ...req.body,
    password: await bcrypt.hash(req.body.password, 10)
  });
  res.json(user);
});

authRouter.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

export default authRouter;
