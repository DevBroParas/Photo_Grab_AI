import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./auth/passport.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("API is running");
});

import authRoutes from "./auth/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";




app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});