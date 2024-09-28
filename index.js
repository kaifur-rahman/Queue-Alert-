import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import "./config/googleSignin.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDb } from "./config/database.js";

dotenv.config();
const MODE = process.env.mode || "Development";
const PORT = process.env.port || 5000;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//db connection
connectDb();

//routes
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running in ${MODE} mode on port ${PORT}`);
});
