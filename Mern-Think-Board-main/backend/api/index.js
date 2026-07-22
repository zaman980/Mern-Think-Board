import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "../src/routes/notesRoutes.js";
import { connectDB } from "../src/config/db.js";
import rateLimiter from "../src/middleware/rateLimiter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);

let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  next();
});

app.use("/api/notes", notesRoutes);

export default app;